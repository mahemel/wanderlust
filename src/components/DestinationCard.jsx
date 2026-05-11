import Image from "next/image";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";
import { PiMapPinLineBold } from "react-icons/pi";

const DestinationCard = ({ destination }) => {
    return (
        <Link
            href={`/destinations/${destination._id}`}
            className="rounded-lg border overflow-hidden"
        >
            <div className="w-full relative aspect-video overflow-hidden">
                <Image
                    className="w-full h-100% absolute object-cover"
                    src={destination.imageUrl}
                    width={300}
                    height={200}
                    alt={destination.destinationName}
                />
            </div>

            <p className="flex items-center">
                <PiMapPinLineBold />
                {destination.country}
            </p>

            <div className="flex justify-between">
                <p>{destination.destinationName}</p>
                <p>${destination.price}/person</p>
            </div>

            <p className="flex items-center">
                <FaRegCalendar></FaRegCalendar> {destination.duration}
            </p>
        </Link>
    );
};

export default DestinationCard;
