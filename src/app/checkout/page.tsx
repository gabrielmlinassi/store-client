"use client"

import Image from "next/image"

import { PaymentForm } from "@/components/PaymentForm"
import { ShippingAddressList } from "@/components/ShippingAddressList"
import { useCurrentOrder } from "@/hooks/useCurrentOrder"
import { formatPrice, formatQuantity } from "@/utils/cart"

export default function CheckoutPage() {
  const order = useCurrentOrder()

  return (
    <div className="container mx-auto my-20">
      <h1>Checkout Page</h1>
      <div className="grid grid-cols-[1fr,2.5fr,2fr] my-20 gap-6 items-start">
        <div className="shadow p-6 rounded bg-gray-50 border py-15">
          <h3 className="capitalize mb-2 font-medium">Address</h3>
          <ShippingAddressList />
        </div>
        <div className="shadow py-6 rounded flex flex-col bg-gray-50 h-[400px] border">
          <h3 className="font-medium px-6">Order Summary</h3>
          <ul className="flex flex-col px-6 gap-4 mt-4 grow">
            {order.data?.orderItems.map((orderItem) => (
              <li key={orderItem.id}>
                <div className="flex gap-3 items-center">
                  <figure className="w-[60px] h-[60px] overflow-hidden bg-gray-50 relative rounded-md">
                    {orderItem.product.url && <Image src={orderItem.product.url} fill alt={orderItem.product.name} />}
                  </figure>
                  <div className="grow flex items-end">
                    <div className="grow">
                      <div>{orderItem.product.name}</div>
                      <div className="flex gap-4">
                        <div>{formatPrice(orderItem.product.price)}</div>
                        <div>
                          <span className="text-xs">x </span>
                          {formatQuantity(orderItem.quantity)}
                        </div>
                      </div>
                    </div>
                    <div>{formatPrice(orderItem.product.price * orderItem.quantity)}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex px-6 text-2xl justify-between border-t pt-5 items-end">
            <div>Total</div>
            <div className="font-bold text-orange-500">{formatPrice(order.data?.totalPrice ?? 0)}</div>
          </div>
        </div>
        <div className="shadow p-6 rounded bg-gray-50 border flex flex-col gap-6">
          <h3 className="font-medium">Payment</h3>
          <PaymentForm />
        </div>
      </div>
    </div>
  )
}
