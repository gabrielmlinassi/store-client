import { fetchSession } from "@/services/user"
import { useQuery } from "@tanstack/react-query"

export const useSession = () => {
  const { data, error, isLoading } = useQuery({ queryKey: ["session"], queryFn: fetchSession })

  return {
    data,
    error,
    isLoading,
  }
}
