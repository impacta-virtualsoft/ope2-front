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

type PaginatedResult<T> = {
  count: number
  next: string | null
  prev: string | null
  results: T[]
}

type groupOptions = {
  label: string
  value: number
}
type FormUserType = Omit<UserType, 'groups'> & {
  confirm_password: string
  // groups: groupOptions[]
  groups: groupOptions | string
}

type PermissionAction = 'add' | 'change' | 'delete' | 'view'
type PermissionKey =
  | 'emailaddress'
  | 'emailconfirmation'
  | 'logentry'
  | 'group'
  | 'permission'
  | 'token'
  | 'tokenproxy'
  | 'contenttype'
  | 'client'
  | 'provider'
  | 'menu'
  | 'productmenu'
  | 'recipemenu'
  | 'typeproductmenu'
  | 'typerecipemenu'
  | 'salesorder'
  | 'product'
  | 'recipe'
  | 'session'
  | 'site'
  | 'socialaccount'
  | 'socialapp'
  | 'socialtoken'
  | 'user'
type PermissionsType = {
  user_email: string
  permissions: {
    [key: PermissionKey]: PermissionAction
  }[]
}

// Products
type ProductTypeType = {
  id: number
  name: string
}
type ProductUnitType = {
  id: number
  name: string
  short_name: string
}
type ProductDetailType = {
  id: number
  name: string
  description: string
  type: ProductTypeType
  unit_measure: ProductUnitType
}
type ProductType = {
  id: number
  created_in: string
  modified_in: string
  name: string
  description: string
  type: ProductTypeType['id']
  unit_measure: ProductUnitType['id']
}
type FormNewProductType = {
  name: ProductType['name']
  description: ProductType['description']
  type: ProductTypeType['id']
  unit_measure: ProductUnitType['id']
}
