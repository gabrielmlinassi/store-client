"use client"

import { useShippingAddresses } from "@/hooks/useShippingAddresses"
import { useEditShippingAddress } from "@/hooks/useEditShippingAddress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"

import { EmptyShippingAddress } from "./EmptyShippingAddress"
import { ShippingAddress } from "./ShippingAddress"

export const ShippingAddressList = () => {
  const shippingAddresses = useShippingAddresses()
  const editShippingAddress = useEditShippingAddress()

  const onValueChange = (addressId: string) => {
    editShippingAddress.mutate({ id: +addressId, isDefault: true })
  }

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup className="flex flex-col gap-3" onValueChange={onValueChange}>
        {shippingAddresses.data?.map?.((shippingAddress) => (
          <div key={shippingAddress.name}>
            <label htmlFor={shippingAddress.name}>
              <ShippingAddress address={shippingAddress} />
            </label>
            <RadioGroupItem value={shippingAddress.id.toString()} id={shippingAddress.name} className="hidden" />
          </div>
        ))}
      </RadioGroup>
      <EmptyShippingAddress />
    </div>
  )
}
