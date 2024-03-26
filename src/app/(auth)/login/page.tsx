"use client"

import { useEffect } from "react"
import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useLogin } from "@/hooks/useLogin"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { RetainQueryLink } from "@/components/RetainQueryLink"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/Form"

const LoginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export default function LoginPage() {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {},
  })
  const login = useLogin()

  useEffect(() => {
    if (login.error) {
      const errorMessage = login.error.message
      if (errorMessage.toLowerCase().includes("email")) {
        form.setError("email", { message: errorMessage })
        form.setFocus("email")
      } else if (errorMessage.toLowerCase().includes("password")) {
        form.setError("password", { message: errorMessage })
        form.setFocus("password")
      }
    }
  }, [login.error, form])

  const onSubmit = (data: z.infer<typeof LoginFormSchema>) => {
    login.mutate({
      email: data.email,
      password: data.password,
    })
  }

  return (
    <div className="shadow max-w-lg mx-auto my-20 p-20 rounded bg-gray-100">
      <h1 className="text-center text-2xl">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 flex gap-4 flex-col">
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
          <Button>Login</Button>
        </form>
      </Form>
      <div className="text-center mt-8 font-light flex flex-col gap-1">
        <h3>
          <RetainQueryLink href="/signup" className="hover:underline">
            Don&apos;t have an account? Sign up
          </RetainQueryLink>
        </h3>
        <h3>
          <Link href="/forgot-password" className="hover:underline">
            Forgot my password
          </Link>
        </h3>
      </div>
    </div>
  )
}
