"use client"

import { PlusIcon } from "lucide-react"

import { ShippingAddressForm } from "./ShippingAddressForm"
import { Dialog, DialogContent, DialogTrigger } from "@/components/Dialog"
import { Button } from "@/components/ui/Button"

export const EmptyShippingAddress = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 w-full" variant="outline">
          <PlusIcon />
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white" onPointerDownOutside={(e) => e.preventDefault()}>
        <h3>Register Address</h3>
        <ShippingAddressForm type="create" />
      </DialogContent>
    </Dialog>
  )
}
