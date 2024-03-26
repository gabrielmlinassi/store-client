"use client"

import { useProducts } from "@/hooks/useProducts"
import { ProductItem } from "./ProductItem"
import { useCart } from "@/hooks/useCart"

export const ProductsList = () => {
  const products = useProducts()
  const cart = useCart()

  if (products.error) {
    return <div>{products.error.message}</div>
  }

  if (products.isLoading) {
    return <div>Loading Products List...</div>
  }

  if ((products.data as any)?.length <= 0) {
    return <div>No products found</div>
  }

  return (
    <ol className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 xl:gap-6 md:px-10 px-4 xl:px-20 pt-6 pb-20">
      {(products.data as any).map((product: any) => {
        const item = cart.data?.cartItems?.find((cartItem) => cartItem.productId)
        return (
          <li key={product.id}>
            <ProductItem product={product} quantity={item?.quantity} />
          </li>
        )
      })}
    </ol>
  )
}
