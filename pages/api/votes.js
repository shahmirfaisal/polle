import {} from "../../lib/prisma";
import { getUser } from "../../lib/getUser";
import { PrismaClient } from "@prisma/client";
import { getCookie, setCookie } from "cookies-next";

const prisma = new PrismaClient();

export default async (req, res) => {
  let { pollId, answerId, device } = req.body;

  if (req.method === "POST") {
    if (!answerId) return res.status(422).json({ message: "Pick an answer!" });

    const answer = await prisma.answer.update({
      where: { id: answerId },
      data: {
        votes: {
          create: {
            device,
          },
        },
      },
    });

    setCookie(`poll-${pollId}`, true, { req, res });

    res.status(201).json(answer);
  } else {
    res.status(424).json({ message: "Invalid method!" });
  }
};
