-- DropForeignKey
ALTER TABLE "public"."Reminder" DROP CONSTRAINT "Reminder_noteId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Reminder" ADD CONSTRAINT "Reminder_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "public"."Notes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
