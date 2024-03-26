import { useMutation, useQueryClient } from "@tanstack/react-query"

import { deleteShippingAddress } from "@/services/user"

export const useDeleteShippingAddress = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteShippingAddress,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["shipping-address"] })
      if (onSuccess) onSuccess()
    },
  })
}
