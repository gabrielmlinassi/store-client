import { SessionDTO, ShippingAddressDTO, UserDTO } from "@/types/User"
import { api } from "./api"
import { HTTPError, Options } from "ky"

export async function login(body: { email: string; password: string }) {
  try {
    const response = await api.post("auth/login", { json: body })
    return await (<Promise<SessionDTO>>response.json())
  } catch (e) {
    if (e instanceof HTTPError) {
      const errorMessage = await (e satisfies HTTPError).response.json()
      throw new Error(errorMessage)
    } else {
      throw e
    }
  }
}

export async function signup(body: { email: string; password: string; name: string }) {
  try {
    const response = await api.post("auth/signup", { json: body })
    return await (<Promise<UserDTO>>response.json())
  } catch (e) {
    if (e instanceof HTTPError) {
      const errorMessage = await (e satisfies HTTPError).response.json()
      throw new Error(errorMessage)
    } else {
      throw e
    }
  }
}

export async function logout() {
  try {
    const response = await api.post("auth/logout")
    return await (<Promise<SessionDTO>>response.json())
  } catch (e) {
    if (e instanceof HTTPError) {
      const errorMessage = await (e as HTTPError).response.json()
      throw new Error(errorMessage)
    } else {
      throw e
    }
  }
}

export async function passwordRecovery(body: { email: string }) {
  try {
    const response = await api.post("auth/password-recovery", { json: body })
    return await (<Promise<string>>response.json())
  } catch (e) {
    if (e instanceof HTTPError) {
      const errorMessage = await (e as HTTPError).response.json()
      throw new Error(errorMessage)
    } else {
      throw e
    }
  }
}

export async function updatePassword(body: {
  flow: "password-recovery" | "default"
  email: string
  password: string
  confirmPassword: string
  recoveryToken?: string
}) {
  try {
    const response = await api.post("auth/change-password", { json: body })
    return await (<Promise<void>>response.json())
  } catch (e) {
    if (e instanceof HTTPError) {
      const errorMessage = await (e as HTTPError).response.json()
      throw new Error(errorMessage)
    } else {
      throw e
    }
  }
}

/**
 *
 */
export async function fetchSession(options?: Omit<Options, "credetilas">) {
  const response = api.get("session", { credentials: "include", ...options })
  return await (<Promise<SessionDTO>>response.json())
}

export async function createShippingAddress(body: { name: string; address: string; zip: string; number: number }) {
  try {
    const response = await api.post("address/shipping", { json: body })
    return await (<Promise<ShippingAddressDTO>>response.json())
  } catch (e) {
    if (e instanceof HTTPError) {
      const errorMessage = await (e satisfies HTTPError).response.json()
      throw new Error(errorMessage)
    } else {
      throw e
    }
  }
}

export async function getShippingAddress() {
  const response = api.get("address/shipping")
  return await (<Promise<ShippingAddressDTO[]>>response.json())
}

export async function editShippingAddress(body: Partial<ShippingAddressDTO> & Pick<ShippingAddressDTO, "id">) {
  try {
    const response = api.patch("address/shipping", { json: body })
    return await (<Promise<ShippingAddressDTO>>response.json())
  } catch (e) {
    if (e instanceof HTTPError) {
      const error = await (e satisfies HTTPError).response.json()
      const errorMessage = (error?.[0] ?? error).message
      throw new Error(errorMessage)
    } else {
      throw e
    }
  }
}

export async function deleteShippingAddress(body: Pick<ShippingAddressDTO, "id">) {
  try {
    const response = api.delete("address/shipping", { json: body })
    return await (<Promise<ShippingAddressDTO>>response.json())
  } catch (e) {
    if (e instanceof HTTPError) {
      const error = await (e satisfies HTTPError).response.json()
      const errorMessage = (error?.[0] ?? error).message
      throw new Error(errorMessage)
    } else {
      throw e
    }
  }
}
