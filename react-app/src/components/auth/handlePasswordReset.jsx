const handlePasswordReset = async (email, setIsLoading, navigate) => {
    try {
        const response = await fetch("http://localhost:8000/api/v1/users/forgotPassword", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email
            }),
        });

        if (response.ok) {
            console.log("Registration successful!", await response.json());
            navigate("/auth/sign-in");
        } else {
            console.error("Registration failed:", await response.json());
        }
    } catch (error) {
        console.error("Error during registration:", error);
    } finally {
        setIsLoading(false);
    }
};

export default handlePasswordReset;
