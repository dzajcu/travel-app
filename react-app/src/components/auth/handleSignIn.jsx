const handleSignIn = async (usernameOrEmail, password, setIsLoading, navigate) => {
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
            console.log("Registration successful!", await response.json());
            navigate("/menu/map");
        } else {
            console.error("Registration failed:", await response.json());
        }
    } catch (error) {
        console.error("Error during registration:", error);
    } finally {
        setIsLoading(false);
    }
};

export default handleSignIn;
