import { ProductService } from "@/services/productService";
import type { RouteParams } from "@/types/common";
import { type NextRequest, NextResponse } from "next/server";

const productService = new ProductService()

export async function GET(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const { id } = context.params
    const searchParams = request.nextUrl.searchParams
    const skip = Number.parseInt(searchParams.get('skip') ?? '0')
    const take = Number.parseInt(searchParams.get('take') ?? '10')
    const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate') as string) : undefined;
    const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate') as string) : undefined;

    const movements = await productService.getProductMovementHistory(id, {
      skip,
      take,
      startDate,
      endDate
    })

    return NextResponse.json(movements)
  } catch (error) {
    console.error('Product Movements GET error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}