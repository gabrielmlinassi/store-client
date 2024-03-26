import { createShippingAddress } from "@/services/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateShippingAddress = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createShippingAddress,
    onSuccess: (data) => {
      queryClient.setQueryData(["shipping-address"], data)
      if (onSuccess) onSuccess()
    },
  })
}
