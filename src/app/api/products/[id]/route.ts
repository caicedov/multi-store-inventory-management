import { ProductService } from "@/services/productService";
import type { RouteParams } from "@/types/common";
import type { ProductUpdateInput } from "@/types/product";
import { type NextRequest, NextResponse } from "next/server";

const productService = new ProductService()

export async function GET(
  _request: NextRequest,
  context: RouteParams
) {
  try {
    const { id } = (await context.params)
    const product = await productService.getProductById(id)

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Product GET error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const { id } = await context.params
    const data: ProductUpdateInput = await request.json()
    const product = await productService.updateProduct(id, data)
    return NextResponse.json(product)
  } catch (error) {
    console.error('Product PUT error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}