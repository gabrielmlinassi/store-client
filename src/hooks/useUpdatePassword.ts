import { updatePassword } from "@/services/user"
import { useMutation } from "@tanstack/react-query"

export const useUpdatePassword = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  return useMutation({ mutationFn: updatePassword, onSuccess })
}
