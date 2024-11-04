import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } 
from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "../types";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Router, TriangleAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface SignInCardProps
{
    setState : (state: SignInFlow) => void;
};
export const SignInCard = ({setState }: SignInCardProps) => {


        const { signIn} = useAuthActions();
        const router = useRouter();

    const[error, setError] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[pending, setPending] = useState(false);
    const onPasswordSignIn = async (e:React.FormEvent<HTMLFormElement>) =>
    {
        e.preventDefault();
        setPending(true);
        try {
            await signIn("password", { email, password, flow: "signIn" });
            // Redirect to the desired page after successful sign-in
            router.push("/auth"); // Replace with your target route
        } catch {
            setError("Invalid email or Password");
        } finally {
            setPending(false);
        }
    };

    const onProviderSignIn = async (provider: "github" | "google") => {
        setPending(true);
        try {
            await signIn(provider);
            // Redirect after provider sign-in if necessary
            router.push("/auth");
        } catch {
            setError("Sign in failed. Please try again.");
        } finally {
            setPending(false);
        }
    };


    return(

        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                Login to Continue
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
            <form onSubmit = {onPasswordSignIn} className="space-y-2.5">
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
            <Button type ="submit" className="w-full" size = "lg" disabled ={pending}>
                 Continue
            </Button>
            </form>
            <Separator/>
            <div className="flex flex-col gap-y-2.5">
                <Button disabled = {pending}
                 onClick={()=>onProviderSignIn("google")}
                variant= "outline" 
                size="lg"
                className="w-full relative">
                  <FcGoogle className="size-5 absolute top-3 left-2.5"/>
                    Continue with Google 
                </Button>
                <Button disabled = {pending}
                onClick={()=>onProviderSignIn("github")}
                variant= "outline" 
                size="lg"
                className="w-full relative">
                  <FaGithub  className="size-5 absolute top-3 left-2.5"/>
                    Continue with Github 
                </Button>
            </div>
            <p className="text-xs text-muted-foreground">
                Don't have an account? <span onClick ={()=>setState("signUp")}className="text-sky-700 hover:underline cursor-pointer"> Sign up</span>
            </p>
       
        </CardContent>
        </Card>
    );
};