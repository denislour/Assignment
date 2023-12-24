import { PrismaClient, User } from "@prisma/client";
import { validateUser } from "./user.validator";

const prisma = new PrismaClient();

export async function createUser(userData: Omit<User, "id">): Promise<User> {
  try {
    const validationResult = validateUser(userData);
    if (!validationResult.success) {
      throw new Error("Validation error: " + validationResult.error);
    }
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email as string },
    });
    if (existingUser) {
      throw new Error("User with this email already exists.");
    }
    return prisma.user.create({
      data: userData as User,
    });
  } catch (error) {
    throw new Error("Validation error: " + error);
  }
}

export async function updateUser(
  userId: number,
  userData: Omit<User, "id">
): Promise<User | null> {
  try {
    validateUser(userData);
    const validationResult = validateUser(userData);
    if (!validationResult.success) {
      throw new Error("Validation error: " + validationResult.error);
    }
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      throw new Error("User not found.");
    }
    return prisma.user.update({
      where: { id: userId },
      data: userData as User,
    });
  } catch (error) {
    throw new Error("Validation error: " + error);
  }
}

export function getUserById(userId: number): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id: userId },
  });
}

export async function deleteUser(userId: number): Promise<User | null> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error("User not found.");
    }
    return prisma.user.delete({
      where: { id: userId },
    });
  } catch (error) {
    throw new Error("Deletion error: " + error);
  }
}

export function getUsers(): Promise<User[]> {
  return prisma.user.findMany();
}
