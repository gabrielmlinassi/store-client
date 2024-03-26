"use client"

import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import jwt from "jsonwebtoken"

import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/Form"
import { useUpdatePassword } from "@/hooks/useUpdatePassword"
import { useEffect } from "react"

function decodeJwt(token?: string | null) {
  try {
    if (!token) return null
    return jwt.decode(token)
  } catch (error) {
    return null
  }
}

const ChangePasswordFormSchema = z
  .object({
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export default function ChangePasswordPage() {
  const searchParams = useSearchParams()
  const recoveryToken = searchParams.get("recovery-token")

  const form = useForm<z.infer<typeof ChangePasswordFormSchema>>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {},
  })
  const updatePassword = useUpdatePassword()

  useEffect(() => {
    const decodedJwt = decodeJwt(recoveryToken)
    // @ts-ignore
    const email = decodedJwt?.email
    form.setValue("email", email)
  }, [recoveryToken, form])

  const onSubmit = (data: z.infer<typeof ChangePasswordFormSchema>) => {
    if (recoveryToken)
      updatePassword.mutate({
        flow: "password-recovery",
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        recoveryToken,
      })
  }

  return (
    <div className="shadow max-w-lg mx-auto my-20 p-20 rounded bg-gray-100">
      <h1 className="text-center text-2xl">Change Password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 flex gap-4 flex-col">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled type="email" placeholder="Email" {...field} />
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
          <Button>Confirm</Button>
        </form>
      </Form>
      {updatePassword.error && (
        <div className="bg-red-500/10 border p-3 rounded mt-4 border-red-500">{updatePassword.error.message}</div>
      )}
    </div>
  )
}
