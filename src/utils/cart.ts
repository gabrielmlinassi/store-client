export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    compactDisplay: "short",
  }).format(price / 100)
}

export const formatQuantity = (quantity: number) => {
  return new Intl.NumberFormat("en-US", {
    unit: "liter",
    unitDisplay: "long",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    compactDisplay: "short",
  }).format(quantity)
}
