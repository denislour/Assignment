import { Request, Response } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "./user.service";
import { User } from "@prisma/client";

export async function createUserController(
  req: Request,
  res: Response
): Promise<void> {
  const { name, email } = req.body;

  try {
    const newUser = await createUser({ name, email });
    res.json(newUser);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.startsWith("Validation error")) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

export async function getUsersController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getUserByIdController(
  req: Request,
  res: Response
): Promise<void> {
  const userId = parseInt(req.params.id);

  try {
    const user = await getUserById(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateUserController(
  req: Request,
  res: Response
): Promise<void> {
  const userId = parseInt(req.params.id);
  const { name, email }: User = req.body;

  try {
    const updatedUser = await updateUser(userId, { name, email });
    res.json(updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.startsWith("Validation error")) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

export async function deleteUserController(
  req: Request,
  res: Response
): Promise<void> {
  const userId = parseInt(req.params.id);

  try {
    const deletedUser = await deleteUser(userId);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
