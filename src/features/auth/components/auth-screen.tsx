"use client";
import { useState } from "react";
import { SignInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";

export const AuthScreen = () => {
    const [state, setState] = useState<SignInFlow>("signIn");

    return (
        <div className="h-full flex flex-col items-center justify-center bg-[#3678ab] text-white relative">
            {/* Logo positioned at top-right */}
            <div className="absolute top-6 right-6">
                <img 
                    src="/logo.png" // The correct path for the logo in the public folder
                    alt="Connectly Logo" 
                    className="w-40 h-40 object-contain"
                />
            </div>

            <div className="text-center mb-10 mt-16">
                {/* Professional Logo Text */}
                <h1 className="text-5xl font-semibold text-white tracking-wide mb-3 animate-fade-in">
                    Connectly
                </h1>
                {/* Subtext with professional fade-in animation */}
                <p className="text-lg text-gray-300 opacity-90 animate-fade-in">
                    Your go-to platform for seamless communication.
                </p>
            </div>
            
            <div className="md:h-auto md:w-[420px]">
                {state === "signIn" ? (
                    <SignInCard setState={setState} />
                ) : (
                    <SignUpCard setState={setState} />
                )}
            </div>
        </div>
    );
};
