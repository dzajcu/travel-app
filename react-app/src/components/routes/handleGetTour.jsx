const handleGetTour = async (setTour, id) => {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/tours/${id}`, {
            method: "GET",
            credentials: "include",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const tour = await response.json();
            console.log("Tour fetched successfully!", tour.data.tour);
            setTour(tour.data.tour);
        } else {
            console.error("Failed to get tour!", await response.json());
        }
    } catch (error) {
        console.error("Error during trip loading:", error);
    }
};

export default handleGetTour;
