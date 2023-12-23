const handleAddTrip = async (formData, toast, setIsLoading, onSideFormClose) => {
    try {
        const formDataBody = new FormData();

        formDataBody.append("albumName", formData.albumName);
        formDataBody.append("albumFile", formData.albumFile);
        formDataBody.append("description", formData.description);
        formDataBody.append("date", formData.selectedDate);

        formData.places.forEach((place, index) => {
            formDataBody.append(`places[${index}][placeName]`, place.placeName);
            formDataBody.append(`places[${index}][coordinates]`, place.coordinates);

            place.uploadedFiles.forEach((file, fileIndex) => {
                formDataBody.append(`places[${index}]images[${fileIndex}]`, file);
            });
        });
        console.log("formDataBody", formDataBody);

        const response = await fetch(
            "http://localhost:8000/api/v1/tours/createTour",
            {
                method: "POST",
                credentials: "include",
                mode: "cors",
                body: formDataBody,
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
