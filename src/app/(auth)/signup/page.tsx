"use client"

import Link from "next/link"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/Form"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useSignup } from "@/hooks/useSignup"

const SignupFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string(),
    name: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export default function SignupPage() {
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {},
  })
  const signup = useSignup()

  useEffect(() => {
    if (signup.error?.message.toLowerCase().includes("email")) {
      form.setError("email", { message: signup.error.message })
      form.setFocus("email")
    }
  }, [signup.error, form])

  const onSubmit = (data: z.infer<typeof SignupFormSchema>) => {
    signup.mutate({
      email: data.email,
      password: data.password,
      name: data.name,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="shadow max-w-lg mx-auto my-20 p-20 rounded bg-gray-100">
          <h1 className="text-center text-2xl">Sign up</h1>
          <div className="mt-8 flex gap-4 flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>Sign up</Button>
          </div>
          <div className="text-center mt-4">
            <h3>
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Login in here
              </Link>
            </h3>
          </div>
        </div>
      </form>
    </Form>
  )
}
