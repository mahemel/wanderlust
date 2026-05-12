"use client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const BookingDeleteAlert = ({ id }) => {
    const router = useRouter();

    const handleBookingCancel = async () => {
        const res = await fetch(`http://localhost:5001/bookings/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        });
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
