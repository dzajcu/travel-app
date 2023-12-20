const handleUpdateUser = async (
    email,
    username,
    password,
    newPassword,
    newPasswordConfirm,
    setIsLoading,
    toast,
    setSidebarUsername,
) => {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/users/updateMe`, {
            method: "PATCH",
            credentials: "include",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                email: email,
            }),
        });
        if (response.ok) {
            const updatedUser = await response.json();
            toast({
                title: "Data updated successfully!",
                status: "success",
            });
            setSidebarUsername(updatedUser.data.user.username);
        } else {
            console.error("Error during updating data!", await response.json());
            toast({
                title: "Error during updating data! Please try again later.",
                status: "error",
            });
        }
    } catch (error) {
        console.error("Error during updating data!", error);
        toast({
            title: "Updating user failed! Please try again later.",
            status: "error",
        });
    } finally {
        setIsLoading(false);
    }
};

export default handleUpdateUser;
