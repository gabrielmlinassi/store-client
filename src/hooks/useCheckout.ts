import { checkout } from "@/services/cart"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCheckout = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: checkout,
    onSuccess: (data) => {
      queryClient.setQueryData(["orders", data.id], data)
      if (onSuccess) onSuccess()
    },
  })
}
