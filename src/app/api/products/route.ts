import { ProductService } from "@/services/productService";
import type { ProductCreateInput } from "@/types/product";
import { type NextRequest, NextResponse } from "next/server";

const productService = new ProductService()

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const skip = Number.parseInt(searchParams.get('skip') ?? '0')
    const take = Number.parseInt(searchParams.get('take') ?? '10')
    const search = searchParams.get('search') ?? undefined
    const brandId = searchParams.get('brandId') ?? undefined
    const categoryId = searchParams.get('categoryId') ?? undefined
    const status = searchParams.get('status') as any ?? undefined

    const result = await productService.getProducts({
      skip,
      take,
      search,
      brandId,
      categoryId,
      status
    });

    return NextResponse.json(result)

  } catch (error) {
    console.error('Products GET error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: ProductCreateInput = await request.json()
    const product = await productService.createProduct(data)
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Products POST error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}