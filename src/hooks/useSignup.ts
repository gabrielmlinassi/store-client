import { signup } from "@/services/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useSignup = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: signup,
    onSuccess: (newData) => queryClient.setQueryData(["user"], newData),
  })
}
