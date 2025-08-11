-- AlterTable
ALTER TABLE "public"."Members" ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "member" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "owner" BOOLEAN NOT NULL DEFAULT false;
