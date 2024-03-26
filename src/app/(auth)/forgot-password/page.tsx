"use client"

import { useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useLogin } from "@/hooks/useLogin"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { RetainQueryLink } from "@/components/RetainQueryLink"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/Form"
import { usePasswordRecovery } from "@/hooks/usePasswordRecovery"

const forgotPasswordFormSchema = z.object({
  email: z.string(),
})

export default function LoginPage() {
  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {},
  })
  const passwordRecovery = usePasswordRecovery()

  useEffect(() => {
    if (passwordRecovery.error) {
      const errorMessage = passwordRecovery.error.message
      if (errorMessage.toLowerCase().includes("email")) {
        form.setError("email", { message: errorMessage })
        form.setFocus("email")
      }
    }
  }, [passwordRecovery.error, form])

  const onSubmit = (data: z.infer<typeof forgotPasswordFormSchema>) => {
    passwordRecovery.mutate({ email: data.email })
  }

  return (
    <div className="shadow max-w-lg mx-auto my-20 p-20 rounded bg-gray-100">
      <h1 className="text-center text-2xl">Password Recovery</h1>
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
          <Button>Send recovery link</Button>
        </form>
      </Form>
      {passwordRecovery.data && (
        <div className="bg-green-500/10 border p-3 rounded mt-4 border-green-500">{passwordRecovery.data}</div>
      )}
      <div className="text-center mt-8 font-light flex flex-col gap-1">
        <h3>
          <RetainQueryLink href="/signup" className="hover:underline">
            Don&apos;t have an account? Sign up
          </RetainQueryLink>
        </h3>
      </div>
    </div>
  )
}
