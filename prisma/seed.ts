
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const saltRounds = 10

  // Hash passwords
  const adminPassword = await bcrypt.hash('adminPassword123', saltRounds)
  const sellerPassword = await bcrypt.hash('sellerPassword123', saltRounds)
  const techPassword = await bcrypt.hash('techPassword123', saltRounds)

  // Create users
  const adminUser = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      name: 'Admin user',
      username: 'admin',
      password: adminPassword,
      role: 'ADMIN',
      active: true,
    },
  });

  const sellerUser = await prisma.user.upsert({
    where: { username: 'seller' },
    update: {},
    create: {
      name: 'Seller User',
      username: 'seller',
      password: sellerPassword,
      role: 'SELLER',
      active: true,
    },
  });

  const techUser = await prisma.user.upsert({
    where: { username: 'tech' },
    update: {},
    create: {
      name: 'Tech User',
      username: 'tech',
      password: techPassword,
      role: 'TECH',
      active: true,
    },
  });

  console.log('Usuarios creados:', { adminUser, sellerUser, techUser })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })