import prisma from "@/prisma/prisma";
import { registerSchema } from "../schema";
import { z } from "zod";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const createUser = async (payload: z.infer<typeof registerSchema>) => {
  try {
    return await prisma.user.create({
      data: payload,
    });
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};
