const handleAddTrip = async (
    place,
    placeCoordinates,
    uploadedFiles,
    selectedDate,
    description,
    onSideFormClose
) => {
    try {
        const formData = new FormData();
        formData.append("date", selectedDate);
        formData.append("place", place);
        formData.append("coordinates", placeCoordinates);
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
        } else {
            console.error("Failed to add trip:", await response.json());
        }
    } catch (error) {
        console.error("Error during trip addition:", error);
    }
};

export default handleAddTrip;
