/*
  Warnings:

  - You are about to drop the column `createdat` on the `Group` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Group" DROP COLUMN "createdat",
ADD COLUMN     "createdate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
