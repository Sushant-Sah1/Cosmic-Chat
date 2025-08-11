-- DropForeignKey
ALTER TABLE "public"."Messages" DROP CONSTRAINT "Messages_userid_fkey";

-- AlterTable
ALTER TABLE "public"."Messages" ALTER COLUMN "userid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Messages" ADD CONSTRAINT "Messages_userid_fkey" FOREIGN KEY ("userid") REFERENCES "public"."Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
