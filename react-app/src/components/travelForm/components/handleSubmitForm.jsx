const handleAddTrip = async (
    place,
    username,
    uploadedFiles,
    selectedDate,
    description,
    toast,
    onSideFormClose
) => {
    try {
        const formData = new FormData();
        formData.append("date", selectedDate);
        formData.append("place", place);
        formData.append("description", description);

        uploadedFiles.forEach((file) => {
            formData.append(`images`, file);
        });
        console.log(selectedDate, place, description, uploadedFiles)
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
            console.log("Trip added successfully!", await response.json());
            toast({
                title: "Trip added successfully!",
                status: "success",
            });
            onSideFormClose();
        } else {
            console.error("Failed to add trip:", await response.json());
            // toast({
            //     title: "Failed to add trip!",
            //     status: "error",
            // });
        }
    } catch (error) {
        console.error("Error during trip addition:", error);
        // toast({
        //     title: "Failed to add trip, Server error!",
        //     status: "error",
        // });
    }
};

export default handleAddTrip;
