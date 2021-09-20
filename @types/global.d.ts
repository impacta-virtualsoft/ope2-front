declare type GenericObject<T> = { [key: string]: T }

declare type ChildrenType = { children: React.ReactNode }

declare type DecodedTokenType = {
  user_id: number
  username: string
  exp: number
  email: string
  orig_iat: number
}

declare type UserType = {
  id: number
  email: string
  password: string
  groups: number[]
}
