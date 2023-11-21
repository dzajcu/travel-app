const handleSignUp = async (
    email,
    username,
    password,
    passwordConfirm,
    setIsLoading,
    navigate,
    toast
) => {
    try {
        const response = await fetch("http://localhost:8000/api/v1/users/signup", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                username,
                password,
                passwordConfirm,
            }),
        });

        if (response.ok) {
            console.log("Registration successful!", await response.json());
            navigate("/auth/sign-in");
            toast({
                title: "Registraion successful!",
                status: "success",
                variant: "solid",
            });
        } else {
            console.error("Error during registration:", await response.json());
            toast({
                title: "Error during registration!",
                status: "error",
            });
        }
    } catch (error) {
        console.error("Error during registration:", error);
        toast({
            title: "Registration failed, Server error!",
            status: "error",
            variant: "solid",
        });
    } finally {
        setIsLoading(false);
    }
};

export default handleSignUp;
