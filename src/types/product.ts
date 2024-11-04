import type { ProductStatus } from "@prisma/client"

export interface ProductCreateInput {
  name: string
  description: string
  price: number
  minimumStock: number
  brandId: string
  categoryId: string
}

export interface ProductUpdateInput {
  name?: string
  description?: string
  price?: number
  minimumStock?: number
  brandId?: string
  categoryId?: string
  status?: ProductStatus
}

export interface ProductFilterParams {
  skip?: number
  take?: number
  search?: string
  categoryId?: string
  brandId?: string
  status?: ProductStatus
}