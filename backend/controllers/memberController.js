const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
// const  io  = require("../app");

module.exports.getmembers = async function (req, res) {
  const { groupid } = req.body;
  const members = await prisma.members.findMany({
    where: {
      groupid: groupid,
    },
    include: {
      user: true,
    },
  });
  console.log(members);
  res.status(201).json(members);
};

module.exports.setonline = async function (userid, groupid, io) {
  console.log("SETTING ON ONLINE THIS GUY HELP");
  const member = await prisma.members.findFirst({
    where: {
      groupid: groupid,
      userid: userid,
    },
  });
  const updateonline = await prisma.members.update({
    where: {
      id: member.id,
    },
    data: { online: true },
  });
  io.to(groupid).emit("setonline", userid);
};

module.exports.setoffline = async function (userid, groupid, io) {
  console.log("MAKING A USER OFFLINE ");
  const member = await prisma.members.findFirst({
    where: {
      groupid: groupid,
      userid: userid,
    },
  });
  const updateonline = await prisma.members.update({
    where: {
      id: member.id,
    },
    data: { online: false },
  });
  io.to(groupid).emit("setoffline", userid);
};

module.exports.kickmember = async function (data, io) {
  const { groupid, kickedmemberid, kickedusername, kickeduserid, username } =
    data;
  const messages = await prisma.members.delete({
    where: {
      id: kickedmemberid,
    },
  });
  console.log("Kicked from group");
  console.log(messages);
  const joinmessage = await prisma.messages.create({
    data: {
      groupid: groupid,
      message: `${kickedusername} was kicked from the group by ${username}`,
      serversent: true,
    },
  });
  io.to(groupid).emit("joinmessage", joinmessage);
  io.to(groupid).emit("kicked", kickeduserid);
};

module.exports.checkmember = async function (req, res) {
  const { groupid, userid } = req.body;
  const members = await prisma.members.findFirst({
    where: {
      groupid: groupid,
      userid: userid,
    },
  });
  console.log(members);
  console.log('MEMBERS ARE HERE')
  console.log(members)
  if (members!=null) {
    console.log("ALLOWED I AM");
    res.status(201).json(true);
  } else {
    console.log("NOT ALLOWED I AM");
    res.status(201).json(false);
  }
  // res.status(201).json(members);
};

module.exports.makemember = async function (data, io) {
  console.log('MAKING MEMBER')
  const { groupid, kickedmemberid, kickedusername, kickeduserid, username } =
    data;
  const change = await prisma.members.update({
    where: {
      id: kickedmemberid,
    },
    data:{
      admin:false,
      member:true
    }
  });
  console.log("made into a member");
  console.log(change);
  const joinmessage = await prisma.messages.create({
    data: {
      groupid: groupid,
      message: `${kickedusername} was made a member by ${username}`,
      serversent: true,
    },
  });
  io.to(groupid).emit("joinmessage", joinmessage);
  io.to(groupid).emit("mademember", kickeduserid);
};

module.exports.makeadmin = async function (data, io) {
  console.log("MAKING admin");
  const { groupid, kickedmemberid, kickedusername, kickeduserid, username } =
    data;
  const change = await prisma.members.update({
    where: {
      id: kickedmemberid,
    },
    data: {
      admin: true,
      member: false,
    },
  });
  console.log("made into a admin");
  console.log(change);
  const joinmessage = await prisma.messages.create({
    data: {
      groupid: groupid,
      message: `${kickedusername} was made a admin by ${username}`,
      serversent: true,
    },
  });
  io.to(groupid).emit("joinmessage", joinmessage);
  io.to(groupid).emit("madeadmin", kickeduserid);
};

module.exports.makeowner = async function (data, io) {
  console.log("MAKING owner");
  const { groupid, kickedmemberid, kickedusername, kickeduserid, username } =
    data;
  const change = await prisma.members.update({
    where: {
      id: kickedmemberid,
    },
    data: {
      admin: false,
      owner: true,
    },
  });
  console.log("made into a owner");
  console.log(change);
  const joinmessage = await prisma.messages.create({
    data: {
      groupid: groupid,
      message: `${kickedusername} was made a owner by ${username}`,
      serversent: true,
    },
  });
  io.to(groupid).emit("joinmessage", joinmessage);
  io.to(groupid).emit("madeowner", kickeduserid);
};