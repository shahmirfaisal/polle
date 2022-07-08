const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

prisma.user
  .create({
    data: { name: "shahmir", email: "shahmir@gmail.com", password: "1234" },
  })
  .then((res) => console.log(res));
