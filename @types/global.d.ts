declare type GenericObject<T> = { [key: string]: T }

declare type ChildrenType = { children: React.ReactNode }

type CredentialRequestType = {
  email: string
  password: string
}

declare type TokenType = {
  access: string
  refresh: string
}

declare type DecodedTokenType = {
  user_id: number
  username: string
  exp: number
  email: string
  orig_iat: number
}

declare type UserType = {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
  groups: number[]
}

type groupOptions = {
  label: string
  value: number
}
type FormUserType = Omit<UserType, 'groups'> & {
  confirm_password: string
  // groups: groupOptions[]
  groups: groupOptions
}

type ProductType = {
  id: number
  created_in: string
  modified_in: string
  name: string
  description: string
  type: number
  unit_measure: number
}

type PaginatedResult<T> = {
  count: number
  next: string | null
  prev: string | null
  results: T[]
}
