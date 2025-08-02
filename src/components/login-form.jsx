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
import { useState } from "react"
import toast from "react-hot-toast"

export function LoginForm({
  className,
  ...props
}) {
  const [email, setEmail]= useState("")
  const [password, setPassword]= useState("")
  const login = async() => {
    const data = {
      email: email,
      password: password
    }
    try {

      toast.loading("Logging in...")
      const req = await fetch("/api/auth/login", {
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
      localStorage.setItem("token", res.token);
    }
    else {
      toast.error(res.message)
    }
  }
  catch(error) {
    toast.dismiss();
    toast.error("An error occurred while logging in. Please try again later.");
  }
  }
  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your account details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="grid gap-6">
            
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input value={email} onChange={e=>setEmail(e.target.value)} id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                      Forgot your password?
                    </a>
                  </div>
                  <Input value={password} onChange={e=>setPassword(e.target.value)}  id="password" type="password" required />
                </div>
                <Button onClick={login} className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
    </div>)
  );
}
