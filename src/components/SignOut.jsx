"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";

const SignOut = () => {
    const handleSignOut = async () => {
        await authClient.signOut();
    };
    return (
        <Button onClick={handleSignOut} variant="danger">
            Signout
        </Button>
    );
};

export default SignOut;
