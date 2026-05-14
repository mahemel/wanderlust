import { Button, Card } from "@heroui/react";
import Image from "next/image";
import BookingDeleteAlert from "./BookingDeleteAlert";
import Link from "next/link";

const MyBookingCard = ({ booking }) => {
    const { _id, destinationName, price, imageUrl, country, departureDate } =
        booking;

    const formattedDate = new Date(departureDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "America/Los_Angeles",
    });

    return (
        <Card className="grid grid-cols-3 rounded-sm border">
            <div className="w-full overflow-hidden aspect-video relative">
                <Image
                    className="absolute w-full h-full object-cover"
                    src={imageUrl}
                    alt={destinationName}
                    width={300}
                    height={200}
                />
            </div>

            <div className="space-y-3">
                <h2 className="font-bold text-xl">{destinationName}</h2>

                <p>Country: {country}</p>

                <p>Departure: {formattedDate}</p>

                <h3 className="font-bold text-2xl">${price}</h3>
            </div>

            <div className="flex items-end justify-end">
                <div className="flex gap-3">
                    <BookingDeleteAlert id={_id} />
                    <Link href={`/destinations/${booking.destinationId}`}>
                        <Button>View Details</Button>
                    </Link>
                </div>
            </div>
        </Card>
    );
};

export default MyBookingCard;
