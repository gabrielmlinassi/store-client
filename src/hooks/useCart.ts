import { useQuery } from "@tanstack/react-query"
import { fetchCart } from "@/services/cart"

export const useCart = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  })

  return {
    data,
    items: data?.cartItems,
    isLoading,
    error,
  }
}
