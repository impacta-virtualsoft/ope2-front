import { makeUrl, trailSlasher } from '~/helpers/constants'
import {
  PRODUCT_DETAIL_PATH,
  PRODUCT_PATH,
  PRODUCT_TYPE_PATH,
  UNIT_MEASURE_PATH,
} from '~/helpers/envs'
import { service } from '~/service'

const productDetailUrl = makeUrl(PRODUCT_DETAIL_PATH) + '?page_size=1000'
const productUnitMeasureUrl = makeUrl(UNIT_MEASURE_PATH) + '?page_size=1000'
const productTypeUrl = makeUrl(PRODUCT_TYPE_PATH) + '?page_size=1000'
const productUrl = makeUrl(PRODUCT_PATH)

export type GetProductDetailsType = {
  page?: number
}
// export async function getProductDetails({ page = 1 }: GetProductDetailsType) {
export async function getProductDetails() {
  try {
    // const res = await service(`${productDetailUrl}&page=${page}`)
    const res = await service(`${productDetailUrl}`)
    return res.data as PaginatedResult<ProductDetailType>
  } catch (err) {
    console.error('Erro em getProductDetails')
    throw new Error(JSON.stringify(err))
  }
}

export async function getUnitMeasures() {
  try {
    const res = await service(`${productUnitMeasureUrl}`)
    return res.data as PaginatedResult<ProductUnitType>
  } catch (err) {
    console.error('Erro em getUnitMeasures')
    throw new Error(JSON.stringify(err))
  }
}

export async function getProductTypes() {
  try {
    const res = await service(`${productTypeUrl}`)
    return res.data as PaginatedResult<ProductTypeType>
  } catch (err) {
    console.error('Erro em getProductTypes')
    throw new Error(JSON.stringify(err))
  }
}

export async function getProducts() {
  try {
    const res = await service(`${productUrl}?page_size=1000`)
    return res.data as PaginatedResult<ProductType>
  } catch (err) {
    console.error('Erro em getProducts')
    throw new Error(JSON.stringify(err))
  }
}

export async function getProduct(productId: ProductType['id']) {
  try {
    if (!productId) throw new Error('No userId')
    const res = await service(`${productUrl}/${productId}`)
    return res.data as ProductType
  } catch (err) {
    console.error('Erro em getProduct')
    throw new Error(JSON.stringify(err))
  }
}

export async function createProduct(payload: FormNewProductType) {
  try {
    const res = await service.post(trailSlasher(productUrl), payload)
    console.log({ res })
    return res.status
  } catch (error: any) {
    console.error('Erro em createProduct', JSON.stringify(error))
    if (error.response) {
      console.error({ response: error.response })
    }
    throw new Error(JSON.stringify(error))
  }
}

export async function deleteProduct(id: ProductType['id']) {
  try {
    const res = await service.delete(productUrl + '/' + id)
    return res.status
  } catch (err) {
    console.error('Erro em deleteProduct')
    throw new Error(JSON.stringify(err))
  }
}

export async function deleteMultipleProducts(ids: ProductType['id'][]) {
  try {
    await Promise.all(ids.map(async (userId) => await deleteProduct(userId)))
  } catch (err) {
    console.error('Erro em deleteMultipleProducts')
    throw new Error(JSON.stringify(err))
  }
}

export async function editProduct(productData: Partial<ProductType>) {
  try {
    const res = await service.patch(
      `${productUrl}/${productData.id}/`,
      productData
    )
    return res.status
  } catch (err) {
    console.error('Erro em editProduct')
    throw new Error(JSON.stringify(err))
  }
}
