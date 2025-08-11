-- CreateTable
CREATE TABLE "public"."Messages" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Members" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "groupid" TEXT NOT NULL,

    CONSTRAINT "Members_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Messages" ADD CONSTRAINT "Messages_userid_fkey" FOREIGN KEY ("userid") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Members" ADD CONSTRAINT "Members_userid_fkey" FOREIGN KEY ("userid") REFERENCES "public"."Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Members" ADD CONSTRAINT "Members_groupid_fkey" FOREIGN KEY ("groupid") REFERENCES "public"."Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
