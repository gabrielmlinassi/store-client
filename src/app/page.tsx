import { ProductsList } from "@/components/ProductsList"
import { Filters } from "@/components/Filters"
import { ShoppingCart } from "@/components/cart"
import { LoginForm } from "@/components/LoginForm"

export default function HomePage() {
  return (
    <div className="md:grid md:grid-cols-[250px,1fr,150px]">
      <Filters />
      <ProductsList />
      <ShoppingCart />
      <LoginForm />
    </div>
  )
}
