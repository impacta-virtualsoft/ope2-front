import { makeUrl, trailSlasher } from '~/helpers/constants'
import { RECIPE_DETAIL_PATH, RECIPE_PATH } from '~/helpers/envs'
import { service } from '~/service'

const recipeDetailUrl = makeUrl(RECIPE_DETAIL_PATH) + '?page_size=1000'
const recipeUrl = makeUrl(RECIPE_PATH)

export async function getRecipeDetails() {
  try {
    const res = await service(`${recipeDetailUrl}`)
    return res.data as PaginatedResult<RecipeDetailType>
  } catch (err) {
    console.error('Erro em getRecipeDetails')
    throw new Error(JSON.stringify(err))
  }
}

export async function getRecipes() {
  try {
    const res = await service(`${recipeUrl}?page_size=1000`)
    return res.data as PaginatedResult<RecipeType>
  } catch (err) {
    console.error('Erro em getRecipes')
    throw new Error(JSON.stringify(err))
  }
}

export async function getRecipeDetail(productId: RecipeDetailType['id']) {
  try {
    if (!productId) throw new Error('No userId')
    const res = await service(`${recipeDetailUrl}/${productId}`)
    return res.data as RecipeDetailType
  } catch (err) {
    console.error('Erro em getRecipeDetail')
    throw new Error(JSON.stringify(err))
  }
}

export async function getRecipe(productId: RecipeType['id']) {
  try {
    if (!productId) throw new Error('No userId')
    const res = await service(`${recipeUrl}/${productId}`)
    return res.data as RecipeType
  } catch (err) {
    console.error('Erro em getRecipe')
    throw new Error(JSON.stringify(err))
  }
}

export async function createRecipe(payload: FormNewRecipeType) {
  try {
    const res = await service.post(trailSlasher(recipeUrl), payload)
    return res.status
  } catch (error: any) {
    console.error('Erro em createRecipe', JSON.stringify(error))
    if (error.response) {
      console.error({ response: error.response })
    }
    throw new Error(JSON.stringify(error))
  }
}

export async function deleteRecipe(id: RecipeType['id']) {
  try {
    const res = await service.delete(recipeUrl + '/' + id)
    return res.status
  } catch (err) {
    console.error('Erro em deleteRecipe')
    throw new Error(JSON.stringify(err))
  }
}

export async function deleteMultipleRecipes(ids: RecipeType['id'][]) {
  try {
    await Promise.all(ids.map(async (userId) => await deleteRecipe(userId)))
  } catch (err) {
    console.error('Erro em deleteMultipleRecipes')
    throw new Error(JSON.stringify(err))
  }
}

export async function editRecipe(recipeData: Partial<RecipeType>) {
  try {
    const res = await service.patch(
      `${recipeUrl}/${recipeData.id}/`,
      recipeData
    )
    return res.status
  } catch (err) {
    console.error('Erro em editRecipe')
    throw new Error(JSON.stringify(err))
  }
}
