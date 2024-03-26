import { logout } from "@/services/user"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logout,
    onSuccess: async (newData) => {
      queryClient.setQueryData(["session"], newData)
      await queryClient.refetchQueries()
    },
  })
}
