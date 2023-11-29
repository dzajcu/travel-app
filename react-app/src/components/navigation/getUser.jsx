const getUser = async (setUsername) => {
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
            console.log("User data fetched successfully:", userData);
        } else {
            console.error("Error during user data fetch:", await response.json());
        }
    } catch (error) {
        console.error("Error during user data fetch:", error);
    }
};

export default getUser;
