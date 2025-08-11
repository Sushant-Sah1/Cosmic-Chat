const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports.login = async function (req, res) {
    console.log(req.body,'body')
  const { email, password } = req.body;
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  console.log(user);
  if (user.password == password) {
    res.status(200).json(user);
  } else {
    res.status(400).json({ MSG: "WRONG CREDENTIALS" });
  }
};

module.exports.signup = async function (req, res) {
//   console.log(req.body);
   console.log(req.body, "body");
  const { email, username, password } = req.body;
  const newuser = await prisma.users.create({
    data: {
      email,
      username,
      password,
    },
  });
  res.status(200).json(newuser);
};
