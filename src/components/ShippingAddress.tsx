import { tv } from "tailwind-variants"
import { MouseEvent, useState } from "react"

import { ShippingAddressDTO } from "@/types/User"
import { Button } from "@/components/ui/Button"
import { Dialog, DialogContent, DialogTrigger } from "./Dialog"
import { ShippingAddressForm } from "./ShippingAddressForm"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/AlertDialog"
import { useDeleteShippingAddress } from "@/hooks/useDeleteShippingAddress"

const styles = tv({
  base: "py-3 px-2 border-2 rounded bg-gray-100 cursor-pointer",
  variants: {
    isDefault: {
      true: "border-blue-300",
      false: "border-transparent",
    },
  },
})

type ShippingAddressProps = { address: ShippingAddressDTO }

export const ShippingAddress = ({ address }: ShippingAddressProps) => {
  const [formOpen, setFormOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const deleteShippingAddress = useDeleteShippingAddress({ onSuccess: () => setAlertOpen(false) })

  const handleAlertConfirm = (e: MouseEvent) => {
    e.preventDefault()
    deleteShippingAddress.mutate({ id: address.id })
  }

  return (
    <div className={styles({ isDefault: address.isDefault })}>
      <h3 className="capitalize mb-1 font-medium">{address.name}</h3>
      <span>{address.address}</span>
      <span>, {address.zip}</span>
      <span>, {address.number}</span>
      {address.complement && <span>, {address.complement}</span>}
      <hr className="my-2" />
      <div className="flex justify-end gap-2">
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={(e) => e.stopPropagation()}>
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
            <ShippingAddressForm type="edit" id={address.id} afterSave={() => setFormOpen(false)} />
          </DialogContent>
        </Dialog>
        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
          <AlertDialogTrigger asChild>
            <Button size="sm" onClick={(e) => e.stopPropagation()}>
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>This will permanently delete your address.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAlertConfirm}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
