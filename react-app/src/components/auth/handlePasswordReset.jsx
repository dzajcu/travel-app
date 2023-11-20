const handlePasswordReset = async (email, setIsLoading, navigate, toast) => {
    try {
        const response = await fetch(
            "http://localhost:8000/api/v1/users/forgotPassword",
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                }),
            }
        );

        if (response.ok) {
            console.log("!", await response.json());
            navigate("/auth/sign-in");
            toast({
                title: "Password reset email sent!",
                status: "success",
            });
        } else {
            console.error("Registration failed:", await response.json());
            toast({
                title: "Registration failed!",
                status: "error",
            });
        }
    } catch (error) {
        console.error("Error during registration:", error);
    } finally {
        setIsLoading(false);
    }
};

export default handlePasswordReset;
