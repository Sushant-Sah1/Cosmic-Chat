const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();


module.exports.savemessage = async function ({ message, userid, groupid }) {
  const messages = await prisma.messages.create({
    data: { message, groupid ,userid},
  });
  console.log(messages);
  const newmessage = await prisma.messages.findUnique({
    where:{
        id:messages.id,
        userid
    },
    include:{
        user:true
    }
  });
  return newmessage
};
