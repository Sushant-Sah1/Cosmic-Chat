/*
  Warnings:

  - Made the column `groupdesciption` on table `Group` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Group" ALTER COLUMN "groupdesciption" SET NOT NULL,
ALTER COLUMN "groupdesciption" SET DEFAULT '';
