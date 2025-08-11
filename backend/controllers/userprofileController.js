const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

module.exports.updateprofile = async function (req, res) {
  const { userid, data } = req.body;
  const updateddata = await prisma.users.update({
    where: {
      id: userid,
    },
    data
  });
  console.log(updateddata);
  res.status(201).json(updateddata);
};