import { useMutation, useQueryClient } from "@tanstack/react-query"
import { confirmOrder } from "@/services/order"
import { useRouter } from "next/navigation"

export const useConfirmOrder = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: confirmOrder,
    onSuccess: (data: any) => {
      console.log({ data })
      queryClient.refetchQueries({ queryKey: ["cart"] })
      router.push(`/success/?payment_intent=${data.paymentIntent}`)
    },
  })
}
