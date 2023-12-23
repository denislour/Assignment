import { Request, Response } from "express";
import * as userService from "./user.service";
import { User } from "@prisma/client";

export async function createUserController(
  req: Request,
  res: Response
): Promise<void> {
  const { name, email } = req.body;

  try {
    const newUser = await userService.createUser({ name, email });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getUsersController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const users = await userService.getUsers();
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
    const user = await userService.getUserById(userId);

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
    const updatedUser = await userService.updateUser(userId, { name, email });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteUserController(
  req: Request,
  res: Response
): Promise<void> {
  const userId = parseInt(req.params.id);

  try {
    const deletedUser = await userService.deleteUser(userId);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
