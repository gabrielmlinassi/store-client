import { editShippingAddress } from "@/services/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useEditShippingAddress = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editShippingAddress,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["shipping-address"] })
      if (onSuccess) onSuccess()
    },
  })
}
