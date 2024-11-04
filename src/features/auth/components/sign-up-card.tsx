import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } 
from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";
import { useState } from "react";
import { TriangleAlertIcon } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";
import React from "react";
import { useRouter } from "next/navigation";

interface SignUpCardProps
{
    setState : (state: SignInFlow) => void;
};
export const SignUpCard = ({setState }: SignUpCardProps) => {
    const router = useRouter();
    const { signIn} = useAuthActions();
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const[pending, setPending] = useState(false);
    const[error, setError] = useState("");
   const[name, setName] = useState("");

    const onPasswordSignUp = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(password!==confirmPassword)
        {
            setError("Passwords do not match");
            return; 
        }
        setPending(true);
        try {
            await signIn("password", { name, email, password, flow: "signUp" });
            router.push("/auth");
        } catch (err) {
            console.error("Sign up failed", err);
            setError("Something went wrong during sign-up");
        } finally {
            setPending(false);
        }
    }; 
   

    const onProviderSignUp = async (value: "github" | "google") => {
        try {
            await signIn(value);
            // Redirect to the auth page after successful sign-up
            router.push("/auth");
        } catch (err) {
            console.error("Provider sign up failed", err);
            setError("Something went wrong with provider sign-up");
        } finally {
            setPending(false);
        }
    };

    return(

        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                Sign up to Continue
                </CardTitle>
                <CardDescription> 
                Use your email or another service to continue
            </CardDescription>
            </CardHeader>
            {!!error &&
            (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                    <TriangleAlertIcon className="size-4 "/>
                    <p> {error} </p>
                </div>

            )}
            
        <CardContent className="space-y-5 px-0 pb-0 ">
            <form onSubmit = {onPasswordSignUp}className="space-y-2.5">
            <Input
            disabled = {pending}
            value = {name}
            onChange ={ (e)=>setName(e.target.value)}
            placeholder = "Full name"
            required 
            />
             <Input
            disabled = {pending}
            value = {email}
            onChange ={ (e)=>setEmail(e.target.value)}
            placeholder = "Email"
            type = "email"
            required
            />
            <Input
            disabled = {pending}
            value = {password}
            onChange ={ (e)=>setPassword(e.target.value)}
            placeholder = "Password"
            type = "password"
            required
            />
            <Input
            disabled = {pending}
            value = {confirmPassword}
            onChange ={ (e)=>setConfirmPassword(e.target.value)}
            placeholder = "Confirm password"
            type = "password"
            required
            />
            <Button type ="submit" className="w-full" size = "lg" disabled ={pending}>
                 Continue
            </Button>
            </form>
            <Separator/>
            <div className="flex flex-col gap-y-2.5">
                <Button disabled = {pending}
                onClick={() => onProviderSignUp ("google")}
                variant= "outline" 
                size="lg"
                className="w-full relative">
                  <FcGoogle className="size-5 absolute top-3 left-2.5"/>
                    Continue with Google 
                </Button>
                <Button disabled = {pending}
                onClick={() => onProviderSignUp ("github")}
                variant= "outline" 
                size="lg"
                className="w-full relative">
                  <FaGithub  className="size-5 absolute top-3 left-2.5"/>
                    Continue with Github 
                </Button>
            </div>
            <p className="text-xs text-muted-foreground">
                Already have an account? <span onClick ={()=>setState("signIn")}className="text-sky-700 hover:underline cursor-pointer"> Sign in</span>
            </p>
       
        </CardContent>
        </Card>
    );
};