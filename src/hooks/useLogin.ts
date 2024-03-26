import { login } from "@/services/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"

export const useLogin = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const params = useSearchParams()

  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      queryClient.setQueryData(["session"], data)
      await queryClient.refetchQueries()
      router.push(params.get("redirect-to") ?? "/")
    },
  })
}
