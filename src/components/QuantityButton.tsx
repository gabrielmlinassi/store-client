import { useCallback } from "react"
import { VariantProps, tv } from "tailwind-variants"

type QuantityButtonProps = {
  quantity: number
  onRemove: () => void
  onSubtract: () => void
  onAdd: () => void
} & VariantProps<typeof variants>

const variants = tv({
  base: "flex text-center items-center bg-amber-500",
  slots: {
    act: "shrink-0 w-1/3 focus:ring-4",
    qnt: "grow shrink-0 focus:ring-4 font-bold leading-none ",
  },
  variants: {
    size: {
      default: { act: "py-1", base: "text-xs" },
      large: { act: "py-4", base: "text-sm" },
    },
    radius: {
      default: {
        base: "rounded-xl",
        act: "first-of-type:rounded-l-xl last-of-type:rounded-r-xl",
      },
      none: "rounded-none",
    },
  },
  defaultVariants: {
    radius: "default",
    size: "default",
  },
})

export const QuantityButton = (props: QuantityButtonProps) => {
  const { onAdd, onRemove, onSubtract, quantity, size, radius } = props

  const handleSubtract = useCallback(() => {
    if (quantity === 1) onRemove()
    else onSubtract()
  }, [quantity, onRemove, onSubtract])

  const handleAdd = useCallback(() => {
    onAdd()
  }, [onAdd])

  const { base, act, qnt } = variants()

  return (
    <div className={base({ size, radius })}>
      <button onClick={handleSubtract} className={act({ radius, size })}>
        -
      </button>
      <span className={qnt({ radius })}>{quantity}</span>
      <button onClick={handleAdd} className={act({ radius, size })}>
        +
      </button>
    </div>
  )
}
