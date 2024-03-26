"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/Form"
import { Input } from "@/components/ui/Input"
import { useCreateShippingAddress } from "@/hooks/useCreateShippingAddress"
import { useEffect } from "react"
import { useEditShippingAddress } from "@/hooks/useEditShippingAddress"
import { useShippingAddress } from "@/hooks/useShippingAddress"

const ShippingAddressformSchema = z.object({
  name: z.string(),
  address: z.string(),
  zip: z.string(),
  number: z.coerce.number(),
  complement: z.string().optional(),
})

type ShippingAddressFormProps = {
  type: "create" | "edit"
  afterSave?: () => void
} & ({ type: "edit"; id: number } | { type: "create"; id?: never })

export const ShippingAddressForm = ({ type, id, afterSave }: ShippingAddressFormProps) => {
  const shippingAddress = useShippingAddress(id)
  const editShippingAddress = useEditShippingAddress({ onSuccess: afterSave })
  const createShippingAddress = useCreateShippingAddress({ onSuccess: afterSave })

  const form = useForm<z.infer<typeof ShippingAddressformSchema>>({
    resolver: zodResolver(ShippingAddressformSchema),
    defaultValues: {
      name: shippingAddress.data?.name,
      address: shippingAddress.data?.address,
      zip: shippingAddress.data?.zip,
      number: shippingAddress.data?.number,
      complement: shippingAddress.data?.complement ?? undefined,
    },
  })

  useEffect(() => {
    if (createShippingAddress.error) {
      const errorMessage = createShippingAddress.error.message
      if (errorMessage.toLocaleLowerCase().includes("name")) {
        form.setError("name", { message: errorMessage })
        form.setFocus("name")
      }
    } else if (editShippingAddress.error) {
      const errorMessage = editShippingAddress.error.message
      if (errorMessage.toLocaleLowerCase().includes("address")) {
        form.setError("address", { message: errorMessage })
        form.setFocus("address")
      }
    }
  }, [createShippingAddress.error, editShippingAddress.error, form])

  const onSubmit = (data: z.infer<typeof ShippingAddressformSchema>) => {
    if (type === "create") {
      createShippingAddress.mutate({
        name: data.name,
        address: data.address,
        zip: data.zip,
        number: data.number,
      })
    } else if (type === "edit") {
      editShippingAddress.mutate({
        id,
        address: data.address,
        zip: data.zip,
        number: data.number,
        complement: data.complement,
      })
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="text-left flex flex-col gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={type === "edit"} placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ZIP</FormLabel>
                <FormControl>
                  <Input placeholder="ZIP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number</FormLabel>
                <FormControl>
                  <Input placeholder="Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="complement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complement</FormLabel>
                <FormControl>
                  <Input placeholder="Complement" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit" className="bg-blue-200 py-2 rounded">
            Register
          </button>
        </form>
      </Form>
    </div>
  )
}
