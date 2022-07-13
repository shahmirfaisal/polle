import {} from "../../../lib/prisma";
import { getUser } from "../../../lib/getUser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req, res) => {
  let { question, showResults, thanksMessage, themeColor, answers } = req.body;

  const user = await getUser(req, res);

  // prisma.poll.findMany({
  //   include: {
  //     answers: {
  //       include: {
  //         votes: true,
  //       },
  //     },
  //   },
  // });

  if (req.method === "POST") {
    if (!user) return res.status(401).json({ message: "Unauthenticated" });

    question = question.trim();

    if (!question.length)
      return res.status(422).json({ message: "Add a question!" });

    if (!answers.length)
      return res.status(422).json({ message: "Add an answer!" });

    const poll = await prisma.poll.create({
      data: {
        question,
        thanksMessage,
        showResults,
        themeColor,
        answers: {
          create: answers,
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    res.status(201).json(poll);
  } else {
    res.status(424).json({ message: "Invalid method!" });
  }
};
