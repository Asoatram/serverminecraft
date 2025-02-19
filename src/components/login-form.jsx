'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { redirect } from "next/navigation"


export function LoginForm({
  className,
  ...props
}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");


  
  const submitLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submit action (page reload)
  
    const response = await fetch('/api/login', {
      method: 'POST',  // Use POST method
      headers: {
        'Content-Type': 'application/json',  // Tell the server the content type
      },
      body: JSON.stringify({ username, password }),  // Convert the data to JSON format
    });
  
    const data = await response.json();
  
    if (response.ok) {
      console.log('Login successful:', data);
      redirect('/dashboard')
    } else {
      console.error('Login failed:', data.message);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={submitLogin}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold">Welcome</h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Username</Label>
              <Input value={username} onChange={(e) => {setUsername(e.target.value)}} type="text" placeholder="Enter Username" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Password</Label>
              <Input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Enter Password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
