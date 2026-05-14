"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Card, DateField, Label } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BookingCard = ({ destination }) => {
    const router = useRouter();
    const [departureDate, setDepartureDate] = useState(null);

    const { data: session } = authClient.useSession();

    const { price, imageUrl, country } = destination;

    const handleBooking = async () => {
        if (!departureDate) {
            alert("Please select departure date");
            return;
        }
        const bookingData = {
            userId: session?.user.id,
            userEmail: session?.user.email,
            destinationId: destination._id,
            destinationName: destination.destinationName,
            price,
            imageUrl,
            country,
            departureDate: new Date(departureDate),
        };

        const { data: tokenData } = await authClient.token();

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/booking`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${tokenData?.token}`,
                },
                body: JSON.stringify(bookingData),
            },
        );

        const data = await res.json();

        if (data.insertedId) {
            router.push("/my-bookings");
        }
    };

    return (
        <Card className="border mt-6">
            <p>Starting From</p>
            <h2>${price} / Person</h2>

            <DateField
                className="w-[256px]"
                name="date"
                onChange={setDepartureDate}
            >
                <Label>Departure Date</Label>
                <DateField.Group>
                    <DateField.Input>
                        {(segment) => <DateField.Segment segment={segment} />}
                    </DateField.Input>
                </DateField.Group>
            </DateField>

            <Button onClick={handleBooking} className="w-full bg-cyan-500">
                Book Now
            </Button>
        </Card>
    );
};

export default BookingCard;
