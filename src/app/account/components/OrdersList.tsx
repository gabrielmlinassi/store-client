import { useOrders } from "@/hooks/useOrders"
import { formatPrice, formatQuantity } from "@/utils/cart"
import Image from "next/image"

export const OrdersList = () => {
  const orders = useOrders()

  if (orders.isLoading) {
    return <div>Loading...</div>
  }

  if (!orders.data?.length) {
    return <div>No Orders</div>
  }

  return (
    <div className="flex flex-col gap-8">
      {orders.data.map((order) => (
        <div key={order.id} className="flex flex-col gap-4 shadow-sm p-4 bg-gray-50">
          <div>
            <h3 className="text-lg">Order {order.id}</h3>
            <div>
              Status: <u>{order.status}</u>
            </div>
          </div>
          {order.orderItems.map((orderItem) => (
            <div key={orderItem.id} className="flex gap-4">
              <figure className="w-[50px] h-[50px] bg-gray-50 relative rounded-md overflow-hidden border">
                {orderItem.product.url && <Image fill src={orderItem.product.url} alt={orderItem.product.name} />}
              </figure>
              <div>
                <div className="font-medium">{orderItem.product.name}</div>
                <div className="flex gap-4">
                  <div>{formatPrice(orderItem.price)}</div>
                  <div>x {formatQuantity(orderItem.quantity)}</div>
                  <div className="font-medium">{formatPrice(orderItem.price * orderItem.quantity)}</div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex gap-4">
            Total: <div className="font-medium">{formatPrice(order.totalPrice)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
