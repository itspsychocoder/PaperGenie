"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export function SignupForm({
  className,
  ...props
}) {
  const [name, setName]= useState("")
  const [email, setEmail]= useState("")
    const [password, setPassword]= useState("");
    const router = useRouter();
    const signup = async() => {
      try {
        toast.loading("Creating account...")
        const data = {
          name: name,
          email: email,
          password: password
        }
        const req = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await req.json();
        console.log(res);
        toast.dismiss();
        if (res.type == "success") {
          toast.success(res.message)
          router.push("/login")
        }
        else {
          toast.error(res.message)
        }
      }
      catch(error) {
        toast.dismiss();
        toast.error("An error occurred while creating your account. Please try again later.");
      }
      
    }
  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create New Account</CardTitle>
          <CardDescription>
            Create new account by entering your details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="grid gap-6">
            
              <div className="grid gap-6">


                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="m@example.com" required />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="name">Full Name</Label>
                    
                  </div>
                  <Input id="name" value={name} onChange={e=>setName(e.target.value)} required />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    
                  </div>
                  <Input value={password} onChange={e=>setPassword(e.target.value)} id="password" type="password" required />
                </div>


                
                <Button onClick={signup} className="w-full">
                  Signup
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
    </div>)
  );
}
