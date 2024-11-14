import db from "@/lib/db"
import { hashPassword } from "@/lib/utils"
import type { UserCreateInput, UserFilterParams, UserUpdateInput } from "@/types/user"
import { type Prisma, Role, type User } from "@prisma/client"

class UserService {
  // Crear un nuevo usuario
  async createUser(data: UserCreateInput): Promise<User> {
    try {
      // Hash the password before storing
      const hashedPassword = await hashPassword(data.password)
      return await db.user.create({
        data: {
          name: data.name,
          username: data.username,
          password: hashedPassword,
          role: Role.SELLER
        }
      })
    } catch (_error) {
      // TODO: this.logError('Error creating user', error)
      throw new Error("Error creating user")
    }
  }

  // Obtener todos los usuarios
  async getUsers(params: UserFilterParams): Promise<{ users: User[]; total: number; hasMore: boolean }> {
    const { skip = 0, take = 10, search, role, isActive } = params

    const where: Prisma.UserWhereInput = {
      AND: [
        search ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { username: { contains: search, mode: 'insensitive' } },
          ],
        } : {},
        role ? { role } : {},
        isActive !== undefined ? { isActive } : {}
      ],
    }

    try {
      const [users, total] = await Promise.all([
        db.user.findMany({
          where,
          skip,
          take,
          orderBy: { createdAt: 'desc' },
        }),
        db.user.count({ where })
      ])

      return {
        users,
        total,
        hasMore: skip + take < total
      }
    } catch (_error) {
      // TODO: this.logError('Error fetching users', error);
      throw new Error('Error fetching users');
    }
  }

  // Obtener un usuario por ID
  async getUserById(id: string): Promise<User | null> {
    try {
      return await db.user.findUnique({
        where: { id },
      });
    } catch (_error) {
      //this.logError(`Error fetching user with ID: ${id}`, error);
      throw new Error('Error fetching user');
    }
  }

  // Obtener un usuario por nombre de usuario
  async getUserByUsername(username: string): Promise<User | null> {
    try {
      return await db.user.findUnique({
        where: { username },
      })
    } catch (_error) {
      throw new Error('Error fetching user');
    }
  }

  // Actualizar un usuario
  async updateUser(id: string, data: UserUpdateInput): Promise<User> {
    try {
      return await db.user.update({
        where: { id },
        data: {
          name: data.name,
          username: data.username,
          role: data.role,
          isActive: data.isActive,
          password: data.password ? await hashPassword(data.password) : undefined
        },
      });
    } catch (_error) {
      //this.logError(`Error updating user with ID: ${id}`, error);
      throw new Error('Error updating user');
    }
  }

  // Eliminar un usuario
  async deleteUser(id: string): Promise<void> {
    try {
      await db.user.delete({
        where: { id },
      });
    } catch (_error) {
      //this.logError(`Error deleting user with ID: ${id}`, error);
      throw new Error('Error deleting user');
    }
  }

  // Metodo para loggear errores
  private logError(message: string, error: any) {
    console.error(message, error)
  }
}

// Singleton
const userService = new UserService()

export default userService