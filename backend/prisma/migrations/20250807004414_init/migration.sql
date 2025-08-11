/*
  Warnings:

  - Added the required column `groupid` to the `Messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Messages" ADD COLUMN     "groupid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Messages" ADD CONSTRAINT "Messages_groupid_fkey" FOREIGN KEY ("groupid") REFERENCES "public"."Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
