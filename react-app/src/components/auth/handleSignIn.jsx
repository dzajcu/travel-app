const handleSignIn = async (
    usernameOrEmail,
    password,
    setIsLoading,
    navigate,
    toast
) => {
    try {
        const response = await fetch("http://localhost:8000/api/v1/users/login", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usernameOrEmail,
                password,
            }),
        });

        if (response.ok) {
            console.log("Login successful!", await response.json());
            toast({
                title: "Login successful!",
                status: "success",
            });
            navigate("/menu/map");
        } else {
            console.error("Login failed:", await response.json());
            toast({
                title: "Login failed!",
                status: "error",
            });
        }
    } catch (error) {
        console.error("Error during login:", error);
    } finally {
        setIsLoading(false);
    }
};

export default handleSignIn;
