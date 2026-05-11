"use client";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

const DeleteDestination = ({ destination }) => {
    const router = useRouter();
    const handleDelete = async (id) => {
        const res = await fetch(
            `http://localhost:5001/all-destinations/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        const data = await res.json();

        if (data.deletedCount) {
            router.push("/destinations");
        }
    };

    return (
        <AlertDialog>
            <Button variant="danger">Delete</Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>
                                Delete this {destination.destinationName}{" "}
                                permanently?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete&nbsp;
                                {destination.destinationName} and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button
                                slot="close"
                                variant="danger"
                                onClick={() => handleDelete(destination._id)}
                            >
                                Delete
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default DeleteDestination;
