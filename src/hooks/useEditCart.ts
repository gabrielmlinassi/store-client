import { editCart } from "@/services/cart"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useEditCart = () => {
  const queryClient = useQueryClient()

  const cartMutation = useMutation({
    mutationFn: editCart,
    onError: (error) => alert(error.message),
    onSuccess: async (data) => {
      queryClient.setQueryData(["cart"], data)
    },
  })

  return cartMutation
}
