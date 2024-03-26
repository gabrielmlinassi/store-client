"use client"

import { useCallback } from "react"

import { useEditCart } from "@/hooks/useEditCart"
import { useCart } from "@/hooks/useCart"
import { QuantityButton } from "./QuantityButton"

type BuyButtonProps = {
  productId: number
  quantity?: number
}

export const BuyButton = ({ productId }: BuyButtonProps) => {
  const cartQuery = useCart()
  const editCart = useEditCart()

  const cartItem = cartQuery.items?.find((cartItem) => cartItem.productId === productId)

  const handleAdd = useCallback(() => {
    editCart.mutate({ productId, quantity: 1 })
  }, [editCart, productId])

  const handleRemove = useCallback(() => {
    editCart.mutate({ productId, quantity: -1 })
  }, [editCart, productId])

  const handleIncrement = useCallback(() => {
    editCart.mutate({ productId, quantity: 1 })
  }, [editCart, productId])

  const handleDecrement = useCallback(() => {
    editCart.mutate({ productId, quantity: -1 })
  }, [editCart, productId])

  if (cartItem && cartItem?.quantity > 0) {
    return (
      <QuantityButton
        size="large"
        radius="none"
        onAdd={handleIncrement}
        onRemove={handleRemove}
        onSubtract={handleDecrement}
        quantity={cartItem.quantity}
      />
    )
  }

  return (
    <button onClick={handleAdd} className="bg-green-200 text-sm py-4 w-full">
      Add to Cart
    </button>
  )
}
