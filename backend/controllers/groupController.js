const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const io = require("../app");

module.exports.creategroup = async function (req, res) {
  console.log(req.body, "bodycreate");
  const { groupname, makerid } = req.body;
  const newgroup = await prisma.group.create({
    data: {
      name: groupname,
    },
  });
  console.log(newgroup);
  const newmember = await prisma.members.create({
    data: {
      groupid: newgroup.id,
      userid: makerid,
      owner: true,
    },
  });
  console.log("new group created:", newgroup);
  const group = await prisma.members.findUnique({
    where: {
      id: newmember.id,
    },
    include: {
      group: true,
    },
  });
  res.status(201).json(group);
};

module.exports.joingroup = async function (req, res) {
  console.log("JOININ G A GROUP");
  console.log(req.body, "body");
  const { groupid, userid, username } = req.body;
  const group = await prisma.group.findUnique({
    where: {
      id: groupid,
    },
  });
  console.log(group, "group");
  if (!group) {
    console.log("wrong code");
    res.status(401).json({ MSG: "WRONG GROUP CODE" });
  } else {
    const joined = await prisma.members.findFirst({
      where: {
        groupid: groupid,
        userid: userid,
      },
      include: {
        user: true,
      },
    });
    if (joined) {
      res.status(401).json({ MSG: "ALREADY JOINED THIS GROUP" });
    } else {
      const newmember = await prisma.members.create({
        data: {
          groupid: groupid,
          userid: userid,
          member: true,
        },
      });
      const newmemberdetails = await prisma.members.findUnique({
        where: {
          id:newmember.id
        },
        include:{
          user:true
        }
      });
      io.to(groupid).emit("newmember", newmemberdetails);
      const joinmessage = await prisma.messages.create({
        data: {
          groupid: groupid,
          message: `${username} has joined the group`,
          serversent: true,
        },
      });
      console.log("joinmessage", joinmessage);
      io.to(groupid).emit("joinmessage", joinmessage);
      const member = await prisma.members.findUnique({
        where: {
          id: newmember.id,
        },
        include: {
          group: true,
        },
      });
      res.status(201).json(member);
    }
  }
};

module.exports.searchprivgroup = async function (req, res) {
  const groups = await prisma.group.findMany({
    where: {
      public:false
    },
  });
  console.log(groups);
  res.status(200).json(groups);
};

module.exports.searchpubgroup = async function (req, res) {
  const groups = await prisma.group.findMany({
    where: {
      public: true,
    },
  });
  console.log(groups);
  res.status(200).json(groups);
};

module.exports.joinedgroups = async function (req, res) {
  const { userid } = req.body;
  const groups = await prisma.members.findMany({
    where: {
      userid: userid,
    },
    include: {
      group: true,
    },
  });
  console.log(groups);
  res.status(200).json(groups);
};

module.exports.prevmessages = async function (req, res) {
  const { groupid } = req.body;
  const messages = await prisma.messages.findMany({
    where: {
      groupid: groupid,
    },
    include: {
      user: true,
    },
  });
  console.log(messages);
  res.status(200).json(messages);
};

module.exports.exitgroup = async function (req, res) {
  const { groupid, userid, username } = req.body;
  // console.log("CALLING EXIT GROUP", id);
  const messages = await prisma.members.deleteMany({
    where: {
      userid,
      groupid,
    },
  });
  console.log("EXITING THE GORUP");
  console.log(messages);
  const joinmessage = await prisma.messages.create({
    data: {
      groupid: groupid,
      message: `${username} has left the group`,
      serversent: true,
    },
  });
  io.to(groupid).emit("joinmessage", joinmessage);
  res.status(200).json({ msg: "exited from group", messages });
};

module.exports.updategroup = async function (req, res) {
  const { groupid, data ,username } = req.body;
  const updateddata = await prisma.group.update({
    where: {
      id: groupid,
    },
    data,
  });
  console.log(updateddata);
  const updatemessage = await prisma.messages.create({
    data: {
      groupid: groupid,
      message: `${username} has updated the group`,
      serversent: true,
    },
  });
  io.to(groupid).emit("joinmessage", updatemessage);
  io.to(groupid).emit("groupdataupdate", updateddata);
  res.status(201).json(updateddata);
};

// module.exports.getmembers = async function (req, res) {
//   const { groupid } = req.body;
//   const members = await prisma.members.findMany({
//     where: {
//       groupid: groupid,
//     },
//     include:{
//       user:true 
//     }
//   });
//   console.log(members);
//   res.status(201).json(members);
// };