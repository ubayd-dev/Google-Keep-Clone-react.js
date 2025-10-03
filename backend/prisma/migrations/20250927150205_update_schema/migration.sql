/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Notes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "public"."Reminder" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "remindAt" TIMESTAMP(3) NOT NULL,
    "isSent" BOOLEAN NOT NULL DEFAULT false,
    "noteId" TEXT NOT NULL,
    "taskId" TEXT,

    CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reminder_noteId_key" ON "public"."Reminder"("noteId");

-- CreateIndex
CREATE UNIQUE INDEX "Reminder_taskId_key" ON "public"."Reminder"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "Notes_userId_key" ON "public"."Notes"("userId");

-- AddForeignKey
ALTER TABLE "public"."Reminder" ADD CONSTRAINT "Reminder_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "public"."Notes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reminder" ADD CONSTRAINT "Reminder_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."Tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
