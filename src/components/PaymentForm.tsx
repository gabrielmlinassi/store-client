import { FormEvent, useState } from "react"
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { StripeElementsOptions, StripeError, loadStripe } from "@stripe/stripe-js"

import { Button } from "@/components/ui/Button"
import { useCurrentOrder } from "@/hooks/useCurrentOrder"
import { useConfirmOrder } from "@/hooks/useConfirmOrder"
import { Order } from "@/types/Order"

const PaymentForm1 = ({ order }: { order: Order }) => {
  const confirmOrder = useConfirmOrder()

  const stripe = useStripe()
  const elements = useElements()

  const [errorMessage, setErrorMessage] = useState<string>()
  const [loading, setLoading] = useState(false)

  const handleError = (error: StripeError) => {
    setLoading(false)
    setErrorMessage(error.message)
  }

  const onSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()

      if (!stripe || !elements) {
        return
      }

      setLoading(true)

      const { error: submitError } = await elements.submit()
      if (submitError) {
        handleError(submitError)
        return
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({ elements: elements })
      if (error) {
        handleError(error)
        return
      }

      confirmOrder.mutate({
        orderId: order.id,
        paymentMethodId: paymentMethod.id,
      })
    } catch (error) {
      console.log(error)
      alert("Some error happened")
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <PaymentElement />
      <Button disabled={!stripe || loading}>Submit</Button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
}

const stripePromise = loadStripe(
  "pk_test_51OvsQB07CKcUMeFtpD5SB1K9RdIjDqsMxh13Czo7YA9USmYoLK4qw90KLX0pGg9TSGl7OZYVrMVO6nAcw7YVVcvM00fjgLShIF"
)

export const PaymentForm = () => {
  const order = useCurrentOrder()

  if (order.isLoading) return <div>Loading form...</div>
  if (!order.data) return <div>Order not found...</div>

  const options: StripeElementsOptions = {
    mode: "payment",
    amount: order.data.totalPrice,
    currency: "usd",
    paymentMethodCreation: "manual",
    appearance: {},
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm1 order={order.data} />
    </Elements>
  )
}
