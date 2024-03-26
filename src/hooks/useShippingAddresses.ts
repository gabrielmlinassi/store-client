import { getShippingAddress } from "@/services/user"
import { ShippingAddresses } from "@/types/User"
import { useQuery } from "@tanstack/react-query"

export const useShippingAddresses = <TData = ShippingAddresses>(select?: (data?: ShippingAddresses) => TData) => {
  return useQuery({
    queryKey: ["shipping-address"],
    queryFn: getShippingAddress,
    select,
  })
}
