const getUser = async (setUsername, setTours, navigate, toast) => {
    try {
        const response = await fetch("http://localhost:8000/api/v1/users/me", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const userData = await response.json();
            setUsername(userData.data.user.username);
            setTours(userData.data.user.tours)
            console.log("User data fetched successfully:", userData);
        } else {
            console.error("Error during user data fetch:", await response.json());
            navigate("/auth/sign-in");
            toast({
                title: "You're not logged in! Please sign in to continue.",
                status: "error",
            });
        }
    } catch (error) {
        console.error("Error during user data fetch:", error);
        navigate("/auth/sign-in");
        toast({
            title: "You're not logged in! Please sign in to continue.",
            status: "error",
        });
    }
};

export default getUser;
