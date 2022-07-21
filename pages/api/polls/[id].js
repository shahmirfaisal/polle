import { getUser } from "../../../lib/getUser";
import { prisma } from "../../../lib/prisma";

export default async (req, res) => {
  const { id } = req.query;
  let { question, showResults, thanksMessage, themeColor, answers, enable } =
    req.body;

  const user = await getUser(req, res);

  if (req.method === "DELETE") {
    if (!user) return res.status(401).json({ message: "Unauthenticated" });

    await prisma.poll.delete({
      where: {
        id: +id,
      },
    });

    res.status(200).json({ message: "Poll Deleted" });
  } else if (req.method === "PUT") {
    if (!user) return res.status(401).json({ message: "Unauthenticated" });

    question = question.trim();

    if (!question.length)
      return res.status(422).json({ message: "Add a question!" });

    if (!answers.length)
      return res.status(422).json({ message: "Add an answer!" });

    const poll = await prisma.poll.update({
      where: {
        id: +id,
      },

      data: {
        question,
        thanksMessage,
        showResults,
        themeColor,
        enable,

        answers: {
          // Delete previous answers
          deleteMany: {
            pollId: +id,
          },
          // Add new ones
          create: answers,
        },
      },
    });

    res.json(poll);
  } else {
    res.status(424).json({ message: "Invalid method!" });
  }
};
