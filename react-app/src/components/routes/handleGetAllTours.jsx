const handleGetAllTours = async (setTours) => {
    try {
        const response = await fetch(
            "http://localhost:8000/api/v1/tours/",
            {
                method: "GET",
                credentials: "include",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (response.ok) {
            const tours = await response.json();
            //console.log("Tours fetched successfully!", tours.data.tours);
            setTours(tours.data.tours);
        } else {
            console.error("Failed to add trip:", await response.json());
        }
    } catch (error) {
        console.error("Error during trip addition:", error);
    }
};

export default handleGetAllTours;
