import { useCallback } from "react"
import Image from "next/image"

import { CartItem } from "@/types/Cart"
import { QuantityButton } from "@/components/QuantityButton"
import { useEditCart } from "@/hooks/useEditCart"
import { formatPrice } from "@/utils/cart"

export const ShoppingCartItem = ({ item }: { item: CartItem }) => {
  const editCart = useEditCart()

  const handleRemove = useCallback(async () => {
    editCart.mutate({ productId: item.productId, quantity: -1 })
  }, [item.productId, editCart])

  const handleSubtract = useCallback(() => {
    editCart.mutate({ productId: item.productId, quantity: -1 })
  }, [item.productId, editCart])

  const handleAdd = useCallback(() => {
    editCart.mutate({ productId: item.productId, quantity: 1 })
  }, [item.productId, editCart])

  return (
    <div className="p-4 border-b bg-zinc-200/50 text-sm">
      {item.product?.url && <Image src={item.product.url} width={100} height={100} alt="" />}
      <div className="">{item.product.name}</div>
      <div>{formatPrice(item.product.price)}</div>
      <QuantityButton quantity={item.quantity} onRemove={handleRemove} onSubtract={handleSubtract} onAdd={handleAdd} />
    </div>
  )
}
