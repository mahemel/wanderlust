"use client";
import { authClient } from "@/lib/auth-client";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    Spinner,
    TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const SignUpPage = () => {
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);

        const userData = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            email: userData.email,
            password: userData.password,
            name: userData.name,
            image: userData.image,
            callbackURL: "/login",
            createSession: false,
        });

        if (data) {
            toast.success("Signup Successful!", {
                position: "top-center",
                autoClose: 3000,
            });
            router.push("/login");
            setIsLoading(false);
        }
        if (error?.message) {
            toast.error(error.message, {
                position: "top-center",
                autoClose: 3000,
            });

            setIsLoading(false);
        }
    };

    const handleGoogleSingIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    };
    return (
        <div className="w-full max-w-md mx-auto">
            {isLoading ? (
                <div className="flex items-center justify-center mb-5">
                    <Spinner color="accent" /> Signing Up
                </div>
            ) : (
                ""
            )}

            <h2 className="font-bold text-xl text-center">Create Account</h2>
            <p className="text-base text-center mb-4">
                Start your adventure with Wanderlust
            </p>
            <Form
                className="flex flex-col gap-4 border rounded-sm p-5"
                onSubmit={onSubmit}
            >
                <TextField
                    isRequired
                    name="name"
                    validate={(value) => {
                        if (value.length < 3) {
                            return "Name must be at least 3 characters";
                        }
                        return null;
                    }}
                >
                    <Label>Name</Label>
                    <Input placeholder="John Doe" />
                    <FieldError />
                </TextField>

                <TextField name="image" type="url">
                    <Label>Image URL</Label>
                    <Input placeholder="Enter Image url" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                value,
                            )
                        ) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Description>
                        Must be at least 8 characters with 1 uppercase and 1
                        number
                    </Description>
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    name="confirmPassword"
                    type="password"
                    validate={(value) => {
                        if (value !== password) {
                            return "Passwords do not match";
                        }

                        return null;
                    }}
                >
                    <Label>Confirm Password</Label>

                    <Input placeholder="Confirm your password" />

                    <FieldError />
                </TextField>
                <div className="flex gap-2">
                    <Button type="submit">Submit</Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>

            <div className="flex items-center gap-4 my-5">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-sm text-gray-500 font-medium uppercase">
                    Or continue with
                </span>
                <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <Button
                onClick={handleGoogleSingIn}
                className="w-full h-10 rounded-lg"
                variant="tertiary"
            >
                <FcGoogle />
                Signup with Google
            </Button>

            <p className="text-center mt-4 flex gap-1 justify-center">
                Already have an account?
                <Link href={"/login"} className="text-blue-500">
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default SignUpPage;
