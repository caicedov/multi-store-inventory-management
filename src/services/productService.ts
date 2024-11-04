import db from "@/lib/db"
import type { ProductCreateInput, ProductUpdateInput } from "@/types/product";
import { type Prisma, type Product, ProductStatus } from "@prisma/client";

export class ProductService {
  // Create a new product
  async createProduct(data: ProductCreateInput): Promise<Product> {
    return db.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        minimumStock: data.minimumStock,
        brandId: data.brandId,
        categoryId: data.categoryId,
        status: ProductStatus.ACTIVE
      },
      include: {
        brand: true,
        category: true
      }
    })
  }

  async getProducts(params: {
    skip?: number
    take?: number
    search?: string
    brandId?: string
    categoryId?: string
    status?: ProductStatus
  }) {
    const {
      skip = 0,
      take = 10,
      search,
      brandId,
      categoryId,
      status
    } = params

    const where: Prisma.ProductWhereInput = {
      AND: [
        search ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }

          ],
        } : {},
        brandId ? { brandId } : {},
        categoryId ? { categoryId } : {},
        status ? { status } : {}
      ],
    };

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        skip,
        take,
        include: {
          brand: true,
          category: true,
          storeInventory: {
            include: {
              store: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      db.product.count({ where }),
    ]);

    return {
      products,
      total,
      hasMore: skip + take < total
    };
  }

  // Get a single product by ID
  async getProductById(id: string) {
    return db.product.findUnique({
      where: { id },
      include: {
        brand: true,
        category: true,
        storeInventory: {
          include: {
            store: true,
          },
        },
      },
    });
  }

  // Update a product
  async updateProduct(id: string, data: ProductUpdateInput): Promise<Product> {
    return db.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price ? data.price : undefined,
        minimumStock: data.minimumStock,
        brandId: data.brandId,
        categoryId: data.categoryId,
        status: data.status,
      },
      include: {
        brand: true,
        category: true
      },
    });
  }

  // Get low stock products
  async getLowStockProducts() {
    const products = await db.product.findMany({
      include: {
        brand: true,
        category: true,
        storeInventory: {
          include: {
            store: true
          }
        }
      }
    })

    return products.filter(product =>
      product.storeInventory.some(inventory =>
        inventory.quantity <= product.minimumStock))
  }

  // Get product inventory across all stores
  async getProductInventory(productId: string) {
    return db.storeInventory.findMany({
      where: {
        productId
      },
      include: {
        store: true,
        product: true
      }
    })
  }

  // Get product movement history
  async getProductMovementHistory(productId: string, params: {
    skip?: number
    take?: number
    startDate?: Date
    endDate?: Date
  }) {
    const {
      skip = 0,
      take = 10,
      startDate,
      endDate
    } = params

    const where: Prisma.InventoryMoveWhereInput = {
      productId,
      ...(startDate && endDate ? {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      } : {}),
    }

    const [movements, total] = await Promise.all([
      db.inventoryMove.findMany({
        where,
        skip,
        take,
        include: {
          product: true,
          fromStore: true,
          toStore: true,
          createdBy: true,
          approvedBy: true,
          documents: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      db.inventoryMove.count({ where }),
    ]);

    return {
      movements,
      total,
      hasMore: skip + take < total
    };
  }
}