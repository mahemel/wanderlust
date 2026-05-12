"use client";
import { authClient } from "@/lib/auth-client";
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const LoginPage = () => {
    const router = useRouter();
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: userData.email,
            password: userData.password,
            callbackURL: "/",
        });

        if (data) {
            router.push("/");
        }
        if (error) {
            toast.error(error.message, {
                position: "top-center",
                autoClose: 3000,
            });
        }
    };

    const handleGoogleSingIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    };

    return (
        <div className=" w-full max-w-md mx-auto">
            <h2 className="font-bold text-xl text-center">Welcome Back</h2>
            <p className="text-base text-center mb-4">
                Resume your adventure with Wanderlust
            </p>

            <Form
                className="flex flex-col gap-4 border rounded-sm p-5"
                onSubmit={onSubmit}
            >
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

                <TextField isRequired name="password" type="password">
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
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
                Need an account?
                <Link href={"/signup"} className="text-blue-500">
                    Sign up
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;
