"use client";

import {
    Button,
    FieldError,
    Input,
    Label,
    Modal,
    TextField,
    Select,
    ListBox,
    TextArea,
} from "@heroui/react";

import { useRouter } from "next/navigation";
import { useState } from "react";

const UpdateDestination = ({ destination }) => {
    const {
        _id,
        destinationName,
        country,
        category,
        price,
        duration,
        departureDate,
        imageUrl,
        description,
    } = destination;

    const [isPending, setIsPending] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const onSubmit = async (event) => {
        event.preventDefault();

        setIsPending(true);

        const formData = new FormData(event.target);
        const destinationData = Object.fromEntries(formData.entries());

        const response = await fetch(
            `http://localhost:5001/all-destinations/${_id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(destinationData),
            },
        );

        const data = await response.json();

        if (data.acknowledged) {
            setTimeout(() => {
                setIsOpen(false);

                setIsPending(false);
                router.refresh();
            }, 500);
        }
    };
    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
            <Button variant="secondary" onClick={() => setIsOpen(true)}>
                Edit
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-xl w-full">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Update Destination</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body>
                            <form
                                className="p-10 space-y-8"
                                onSubmit={onSubmit}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="md:col-span-2">
                                        <TextField
                                            name="destinationName"
                                            isRequired
                                            defaultValue={destinationName}
                                        >
                                            <Label>Destination Name</Label>
                                            <Input
                                                placeholder="Bali Paradise"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>
                                    </div>

                                    <TextField
                                        name="country"
                                        isRequired
                                        defaultValue={country}
                                    >
                                        <Label>Country</Label>
                                        <Input
                                            placeholder="Indonesia"
                                            className="rounded-2xl"
                                        />
                                        <FieldError />
                                    </TextField>

                                    {/* Category - Updated Select Component */}
                                    <div>
                                        <Select
                                            name="category"
                                            isRequired
                                            className="w-full"
                                            placeholder="Select category"
                                            defaultValue={category}
                                        >
                                            <Label>Category</Label>
                                            <Select.Trigger className="rounded-2xl">
                                                <Select.Value />
                                                <Select.Indicator />
                                            </Select.Trigger>
                                            <Select.Popover>
                                                <ListBox>
                                                    <ListBox.Item
                                                        id="Beach"
                                                        textValue="Beach"
                                                    >
                                                        Beach
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item
                                                        id="Mountain"
                                                        textValue="Mountain"
                                                    >
                                                        Mountain
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item
                                                        id="City"
                                                        textValue="City"
                                                    >
                                                        City
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item
                                                        id="Adventure"
                                                        textValue="Adventure"
                                                    >
                                                        Adventure
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item
                                                        id="Cultural"
                                                        textValue="Cultural"
                                                    >
                                                        Cultural
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                    <ListBox.Item
                                                        id="Luxury"
                                                        textValue="Luxury"
                                                    >
                                                        Luxury
                                                        <ListBox.ItemIndicator />
                                                    </ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>
                                    </div>

                                    {/* Price */}
                                    <TextField
                                        name="price"
                                        type="number"
                                        isRequired
                                        defaultValue={price}
                                    >
                                        <Label>Price (USD)</Label>
                                        <Input
                                            type="number"
                                            placeholder="1299"
                                            className="rounded-2xl"
                                        />
                                        <FieldError />
                                    </TextField>

                                    {/* Duration */}
                                    <TextField
                                        name="duration"
                                        isRequired
                                        defaultValue={duration}
                                    >
                                        <Label>Duration</Label>
                                        <Input
                                            placeholder="7 Days / 6 Nights"
                                            className="rounded-2xl"
                                        />
                                        <FieldError />
                                    </TextField>

                                    {/* Departure Date */}
                                    <div className="md:col-span-2">
                                        <TextField
                                            name="departureDate"
                                            type="date"
                                            isRequired
                                            defaultValue={departureDate}
                                        >
                                            <Label>Departure Date</Label>
                                            <Input
                                                type="date"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>
                                    </div>

                                    {/* Image URL - Removed preview */}
                                    <div className="md:col-span-2">
                                        <TextField
                                            name="imageUrl"
                                            isRequired
                                            defaultValue={imageUrl}
                                        >
                                            <Label>Image URL</Label>
                                            <Input
                                                type="url"
                                                placeholder="https://example.com/bali-paradise.jpg"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>
                                    </div>

                                    {/* Description */}
                                    <div className="md:col-span-2">
                                        <TextField
                                            name="description"
                                            isRequired
                                            defaultValue={description}
                                        >
                                            <Label>Description</Label>
                                            <TextArea
                                                placeholder="Describe the travel experience..."
                                                className="rounded-3xl"
                                            />
                                            <FieldError />
                                        </TextField>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <Modal.Footer>
                                    <Button slot="close" variant="secondary">
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="outline"
                                        isLoading={isPending}
                                        className=" rounded-none bg-cyan-500 text-white"
                                    >
                                        {isPending ? "Saving..." : "Save"}
                                    </Button>
                                </Modal.Footer>
                            </form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default UpdateDestination;
