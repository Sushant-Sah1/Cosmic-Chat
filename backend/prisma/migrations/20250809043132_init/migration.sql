-- AlterTable
ALTER TABLE "public"."Group" ADD COLUMN     "groupdesciption" TEXT,
ADD COLUMN     "grouppicture" TEXT,
ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT false;
