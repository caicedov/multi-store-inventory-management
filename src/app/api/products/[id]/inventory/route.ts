import { ProductService } from "@/services/productService";
import type { RouteParams } from "@/types/common";
import { type NextRequest, NextResponse } from "next/server";

const productService = new ProductService()

export async function GET(
  _request: NextRequest,
  context: RouteParams
) {
  try {
    const { id } = context.params
    const inventory = await productService.getProductInventory(id)
    return NextResponse.json(inventory)
  } catch (error) {
    console.error('Product Inventory GET error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}