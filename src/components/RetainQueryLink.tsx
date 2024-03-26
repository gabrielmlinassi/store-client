"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ComponentProps } from "react"

export const RetainQueryLink = ({ href, ...props }: ComponentProps<typeof Link>) => {
  const params = useSearchParams()

  const pathname = typeof href === "object" ? href.pathname : href
  const query = typeof href === "object" && typeof href.query === "object" ? href.query : {}

  return (
    <Link
      {...props}
      href={{
        pathname: pathname,
        query: params.toString(),
      }}
    />
  )
}
