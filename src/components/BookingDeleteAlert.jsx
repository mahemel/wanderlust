"use client";
import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const BookingDeleteAlert = ({ id }) => {
    const router = useRouter();

    const handleBookingCancel = async () => {
        const { data: tokenData } = await authClient.token();

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${id}`,
            {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${tokenData.token}`,
                },
            },
        );
        const data = await res.json();

        if (data.deletedCount > 0) {
            router.refresh();
        }
    };
    return (
        <AlertDialog>
            <Button variant="danger-soft">Cancel</Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>
                                Delete this booking permanently?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently this booking and all of
                                its data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Close
                            </Button>
                            <Button
                                slot="close"
                                variant="danger"
                                onClick={handleBookingCancel}
                            >
                                Cancel Booking
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default BookingDeleteAlert;
