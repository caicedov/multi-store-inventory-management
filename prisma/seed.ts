
import { DocumentType, MoveStatus, MoveType, Prisma, PrismaClient, ProductStatus, Role } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clean up existing data
  await prisma.$transaction([
    prisma.document.deleteMany(),
    prisma.inventoryMove.deleteMany(),
    prisma.storeInventory.deleteMany(),
    prisma.product.deleteMany(),
    prisma.brand.deleteMany(),
    prisma.category.deleteMany(),
    prisma.store.deleteMany(),
    prisma.user.deleteMany(),
  ])

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Tech Admin',
        username: 'tech',
        password: await bcrypt.hash('tech123', 10),
        role: Role.TECH,
      },
    }),
    prisma.user.create({
      data: {
        name: 'Store Admin',
        username: 'admin',
        password: await bcrypt.hash('admin123', 10),
        role: Role.ADMIN,
      },
    }),
    prisma.user.create({
      data: {
        name: 'John Seller',
        username: 'seller',
        password: await bcrypt.hash('seller123', 10),
        role: Role.SELLER,
      },
    }),
  ])

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: { name: 'Electronics' },
    }),
    prisma.category.create({
      data: { name: 'Smartphones' },
    }),
    prisma.category.create({
      data: { name: 'Accessories' },
    }),
  ])

  // Create brands
  const brands = await Promise.all([
    prisma.brand.create({
      data: { name: 'Apple' },
    }),
    prisma.brand.create({
      data: { name: 'Samsung' },
    }),
    prisma.brand.create({
      data: { name: 'Sony' },
    }),
  ])

  // Create stores
  const stores = await Promise.all([
    prisma.store.create({
      data: { name: 'Main Store' },
    }),
    prisma.store.create({
      data: { name: 'Downtown Branch' },
    }),
    prisma.store.create({
      data: { name: 'Airport Store' },
    }),
  ])

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'MacBook Pro 16"',
        description: 'Latest MacBook Pro with M2 chip',
        price: 2499.99,
        categoryId: categories[0].id,
        brandId: brands[0].id,
        minimumStock: 10,
        status: ProductStatus.ACTIVE
      },
    }),
    prisma.product.create({
      data: {
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone model',
        price: 999.99,
        categoryId: categories[1].id,
        brandId: brands[0].id,
        minimumStock: 10,
        status: ProductStatus.ACTIVE
      },
    }),
    prisma.product.create({
      data: {
        name: 'Samsung Galaxy S24',
        description: 'Latest Samsung flagship',
        price: 899.99,
        categoryId: categories[1].id,
        brandId: brands[1].id,
        minimumStock: 10,
        status: ProductStatus.ACTIVE
      },
    }),
    prisma.product.create({
      data: {
        name: 'Dell XPS 15',
        description: 'Premium Windows laptop',
        price: 1799.99,
        categoryId: categories[0].id,
        brandId: brands[2].id,
        minimumStock: 10,
        status: ProductStatus.ACTIVE
      },
    }),
    prisma.product.create({
      data: {
        name: 'AirPods Pro',
        description: 'Wireless earbuds with noise cancellation',
        price: 249.99,
        categoryId: categories[2].id,
        brandId: brands[0].id,
        minimumStock: 10,
        status: ProductStatus.ACTIVE
      }
    }),
  ])

  // Create initial inventory for each store
  const storeInventories = await Promise.all(
    products.flatMap(product =>
      stores.map(store =>
        prisma.storeInventory.create({
          data: {
            productId: product.id,
            storeId: store.id,
            quantity: Math.floor(Math.random() * 50) + 10, // Random quantity between 10-60
            lastCount: new Date()
          },
        })
      )
    )
  )

  // Create some sample inventory movements
  const movements = await Promise.all([
    // Inbound movement
    prisma.inventoryMove.create({
      data: {
        moveType: MoveType.INBOUND,
        status: MoveStatus.APPROVED,
        quantity: 50,
        productId: products[0].id,
        toStoreId: stores[0].id,
        createdById: users[1].id,
        approvedById: users[1].id,
        approvedAt: new Date(),
        notes: 'Initial stock receipt',
        costBasis: new Prisma.Decimal(899.99),
        documents: {
          create: {
            type: DocumentType.INVOICE,
            url: 'https://example.com/docs/invoice123.pdf',
            filename: 'invoice123.pdf',
          }
        }
      },
    }),
    // Transfer movement (pending approval)
    prisma.inventoryMove.create({
      data: {
        moveType: MoveType.TRANSFER,
        status: MoveStatus.PENDING,
        quantity: 10,
        productId: products[1].id,
        fromStoreId: stores[0].id,
        toStoreId: stores[1].id,
        createdById: users[2].id,
        notes: 'Stock rebalancing between stores',
      },
    }),
    // Loss report (approved)
    prisma.inventoryMove.create({
      data: {
        moveType: MoveType.LOSS,
        status: MoveStatus.APPROVED,
        quantity: 3,
        productId: products[2].id,
        fromStoreId: stores[0].id,
        createdById: users[2].id,
        approvedById: users[1].id,
        approvedAt: new Date(),
        notes: 'Inventory loss during annual count',
        costBasis: new Prisma.Decimal(1799.98),
        documents: {
          create: {
            type: DocumentType.REPORT,
            url: 'https://example.com/docs/loss-report.pdf',
            filename: 'loss-report.pdf',
          },
        },
      },
    }),
  ])

  console.log({
    usersCreated: users.length,
    categoriesCreated: categories.length,
    brandsCreated: brands.length,
    storesCreated: stores.length,
    productsCreated: products.length,
    inventoriesCreated: storeInventories.length,
    movementsCreated: movements.length,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })