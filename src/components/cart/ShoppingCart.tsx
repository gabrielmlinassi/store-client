"use client"

import Link from "next/link"

import { useCart } from "@/hooks/useCart"
import { ShoppingCartItem } from "./ShoppingCartItem"
import { formatPrice } from "@/utils/cart"

export const ShoppingCart = () => {
  const cart = useCart()

  return (
    <aside>
      <div className="md:flex hidden flex-col gap-2 fixed bg-white border-l border-zinc-300 top-0 bottom-0 right-0 w-[150px]">
        <div className="px-2 border-b flex flex-col items-center gap-2 py-4">
          <div className="flex flex-col items-center">
            <span className="text-xs font-normal">Subtotal</span>
            <span className="text-sm text-red-700 font-bold">{formatPrice(cart.data?.totalPrice ?? 0)}</span>
          </div>
          <Link href="/cart" className="w-full">
            <span className="text-xs inline-block bg-white px-3 py-0.5 rounded-lg w-full border border-zinc-300 shadow-sm text-center">
              Go to Cart
            </span>
          </Link>
        </div>
        <ul className="grow flex flex-col gap-1 overflow-y-auto px-1">
          {cart.data?.cartItems?.map((item) => (
            <li key={item.id}>
              <ShoppingCartItem item={item} />
            </li>
          ))}
          {!cart.data && (
            <div className="flex items-center justify-center mt-20">
              <div className="text-gray-500 w-full text-sm text-center">
                Your cart <br />
                is empty
              </div>
            </div>
          )}
        </ul>
      </div>
    </aside>
  )
}
