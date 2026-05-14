import MyBookingCard from "@/components/MyBookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const MyBookings = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect("/destinations");
    }

    const { token } = await auth.api.getToken({
        headers: await headers(),
    });

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/all-bookings/${session?.user.id}`,
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    );
    const bookings = await res.json();

    return (
        <div>
            <h2 className="font-bold text-2xl text-center mb-3">My bookings</h2>

            <div className="space-y-5">
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <MyBookingCard
                            key={booking._id}
                            booking={booking}
                        ></MyBookingCard>
                    ))
                ) : (
                    <p>No bookings found!</p>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
