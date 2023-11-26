import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import appError from "../utils/appError.js";
import sendEmail from "../utils/email.js";

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET.trim(), {
        expiresIn: process.env.JWT_EXPIRES_IN.trim(),
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() +
                process.env.JWT_COOKIE_EXPIRES_IN.trim() * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV.trim() === "production",
    };

    res.cookie("jwt", token, cookieOptions);

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};

export const protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        token = req.headers.authorization.split(" ")[1];

    if (!token)
        return next(
            new appError("You are not logged in! Please log in to get access.", 401)
        );

    const decoded = jwt.verify(token, process.env.JWT_SECRET.trim());

    const currentUser = await User.findById(decoded.id);
    if (!currentUser)
        return next(
            new appError(
                "The user belonging to this token does no longer exist.",
                401
            )
        );

    req.user = currentUser;
    next();
});

export const signup = catchAsync(async (req, res) => {
    const newUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
    const { usernameOrEmail, password } = req.body;
    console.log(password);
    if (!usernameOrEmail || !password) {
        return next(
            new appError("Please provide username or email and password!", 400)
        );
    }

    const user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new appError("Incorrect username or email or password", 401));
    }

    createSendToken(user, 200, res);
});

export const forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user)
        return next(new appError("There is no user with that email address.", 404));

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\n
    If you didn't forget your password, please ignore this email!\n`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Your password reset token (valid for 10 min)",
            message,
        });

        res.status(200).json({
            status: "success",
            message: "Token sent to email!",
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
            new appError("There was an error sending the email. Try again later!"),
            500
        );
    }
});

export const resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) return next(new appError("Token is invalid or has expired", 400));

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    createSendToken(user, 200, res);
});

export const updatePassword = catchAsync(async (req, res, next) => {
    console.log(req.user);
    const user = await User.findById(req.user.id).select("+password");
    console.log(user);
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new appError("Your current password is wrong.", 401));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    createSendToken(user, 200, res);
});
