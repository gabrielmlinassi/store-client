import { fetchProducts } from "@/services/cart"
import { useQuery } from "@tanstack/react-query"

export const useProducts = (search?: string, { enabled }: { enabled?: boolean } = {}) => {
  const products = useQuery({
    queryKey: ["products", search],
    queryFn: ({ queryKey }) => fetchProducts(queryKey[1]),
    enabled,
  })

  return products
}
