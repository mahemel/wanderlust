import BookingCard from "@/components/BookingCard";
import DeleteDestination from "@/components/DeleteDestination";
import UpdateDestination from "@/components/UpdateDestination";
import Image from "next/image";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { PiMapPinLineBold } from "react-icons/pi";

const DestinationDetail = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:5001/all-destinations/${id}`);
    const destination = await res.json();

    return (
        <>
            <div className="flex items-center justify-between">
                <Link href={"/destinations"} className="flex items-center">
                    <GoArrowLeft /> Back to Destinations
                </Link>

                <div className="flex gap-4">
                    <UpdateDestination
                        destination={destination}
                    ></UpdateDestination>

                    <DeleteDestination
                        destination={destination}
                    ></DeleteDestination>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        className="w-full h-100% absolute object-cover"
                        src={destination.imageUrl}
                        width={300}
                        height={200}
                        alt={destination.destinationName}
                    />
                </div>
                <div>
                    <p className="flex items-center">
                        <PiMapPinLineBold />
                        {destination.country}
                    </p>

                    <div className="flex justify-between">
                        <p>{destination.destinationName}</p>
                    </div>

                    <p className="flex items-center">
                        <FaRegCalendar></FaRegCalendar> {destination.duration}
                    </p>

                    <h2>Overview</h2>
                    <p>{destination.description}</p>
                    <BookingCard destination={destination} />
                </div>
            </div>
        </>
    );
};

export default DestinationDetail;
