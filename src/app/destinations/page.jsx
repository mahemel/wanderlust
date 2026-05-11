import DestinationCard from "@/components/DestinationCard";

const AddDestinationPage = async () => {
    const res = await fetch("http://localhost:5001/all-destinations");
    const destinations = await res.json();

    return (
        <div>
            <h2>Destination page {destinations.length}</h2>

            <div className="grid grid-cols-3 gap-5">
                {destinations.map((destination) => (
                    <DestinationCard
                        key={destination._id}
                        destination={destination}
                    />
                ))}
            </div>
        </div>
    );
};

export default AddDestinationPage;
