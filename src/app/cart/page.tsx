"use client"

import { CheckoutButton } from "@/components/cart/CheckoutButton"
import { useCart } from "@/hooks/useCart"
import { formatPrice, formatQuantity } from "@/utils/cart"
import Image from "next/image"

export default function CartPage() {
  const cart = useCart()

  return (
    <div className="bg-zinc-50 md:py-20">
      <div className="container mx-auto shadow py-14 bg-white px-4 md:px-10">
        <h1 className="text-2xl">Shopping Cart</h1>
        <div className="mt-10">
          <ul className="flex flex-col border">
            {!!cart.data ? (
              cart.data?.cartItems?.map((cartItem) => (
                <li key={cartItem?.id} className="border-b last-of-type:border-none py-6 px-4">
                  <div className="flex gap-5 items-center col-span-2">
                    <figure className="rounded h-[70px] w-[70px] shrink-0 bg-gray-50 relative overflow-hidden">
                      {cartItem?.product?.url && (
                        <Image
                          src={cartItem.product.url}
                          fill
                          sizes="70px"
                          className="object-cover"
                          alt={cartItem.product.name}
                        />
                      )}
                    </figure>
                    <h4 className="text-lg">{cartItem?.product?.name}</h4>
                    <div className="flex items-end flex-col ml-auto">
                      <div>{formatQuantity(cartItem?.quantity)}</div>
                      <div className="text-lg text-orange-600 font-medium">{formatPrice(cartItem?.product?.price)}</div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="py-[100px] flex items-center justify-center text-2xl text-gray-500">
                <span>Your Cart is empty</span>
              </div>
            )}
          </ul>
        </div>
        <div className="flex justify-end mt-10 flex-col items-end gap-4">
          <span className="flex gap-5 font-bold text-2xl text-orange-600">
            {formatPrice(cart.data?.totalPrice ?? 0)}
          </span>
          <CheckoutButton />
        </div>
      </div>
    </div>
  )
}
