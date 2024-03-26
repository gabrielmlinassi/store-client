import { useShippingAddresses } from "./useShippingAddresses"

export const useShippingAddress = (id?: number) => {
  return useShippingAddresses((shippingAddresses) => {
    return shippingAddresses?.find((shippingAddress) => shippingAddress.id === id)
  })
}
