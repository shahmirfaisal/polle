const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

prisma.vote.delete({ where: { id: 21 } }).then(() => console.log("DELETED"));
// prisma.vote
//   .findMany({ select: { id: true } })
//   .then((votes) => console.log(votes));
