import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { prisma } from "./prisma";

export const getUser = async (req, res) => {
  const token = getCookie("token", { req, res });

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    let user = await prisma.user.findUnique({ where: { id: data.userId } });
    user = JSON.parse(JSON.stringify(user));
    if (!user) throw "No user found!";
    return user;
  } catch (error) {
    return null;
  }
};
