/**
 *
 */
export type UserDTO = {
  id: number
  name: string
  email: string
}

/**
 *
 */
export type SessionDTO = {
  sessionId: number
  userId: number
  isLoggedIn: boolean
}

export type Session = SessionDTO

/**
 *
 */
export type ShippingAddressDTO = {
  id: number
  name: string
  isDefault: boolean
  address: string
  zip: string
  number: number
  complement: string
}

export type ShippingAddress = ShippingAddressDTO
export type ShippingAddresses = ShippingAddress[]
