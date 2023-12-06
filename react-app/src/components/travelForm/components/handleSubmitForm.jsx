const handleAddTrip = async (
    place,
    coordinates,
    uploadedFiles,
    selectedDate,
    description,
    toast,
    setIsLoading,
    onSideFormClose
) => {
    try {
        const formData = new FormData();
        formData.append("date", selectedDate);
        formData.append("place", place);
        formData.append("coordinates", coordinates);
        formData.append("description", description);
        uploadedFiles.forEach((file) => {
            formData.append(`images`, file);
        });
        const response = await fetch(
            "http://localhost:8000/api/v1/tours/createTour",
            {
                method: "POST",
                credentials: "include",
                mode: "cors",
                body: formData,
            }
        );

        if (response.ok) {
            console.log("Trip added successfully!");
            onSideFormClose();
            toast({
                title: "Trip added successfully!",
                status: "success",
            });
            setIsLoading(false);
        } else {
            console.error("Failed to add trip:", await response.json());
            toast({
                title: "Failed to add trip!",
                status: "error",
            });
            setIsLoading(false);
        }
    } catch (error) {
        console.error("Error during trip addition:", error);
        setIsLoading(false);
    } finally {
        setIsLoading(false);
    }
};

export default handleAddTrip;
