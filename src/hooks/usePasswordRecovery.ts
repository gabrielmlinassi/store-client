import { passwordRecovery } from "@/services/user"
import { useMutation } from "@tanstack/react-query"

export const usePasswordRecovery = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  return useMutation({ mutationFn: passwordRecovery, onSuccess })
}
