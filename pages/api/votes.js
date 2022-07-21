import { setCookie } from "cookies-next";
import { prisma } from "../../lib/prisma";

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

    setCookie(`poll-${pollId}`, true, {
      req,
      res,
      maxAge: 60 * 60 * 24 * 365 * 10, // a large value for never expiring cookies (10 years)
      path: "/",
    });

    res.status(201).json(answer);
  } else {
    res.status(424).json({ message: "Invalid method!" });
  }
};
