/*
  Warnings:

  - The `surveyVersion` column on the `SurveyResposne` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email]` on the table `Waitlist` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SurveyResposne" DROP COLUMN "surveyVersion",
ADD COLUMN     "surveyVersion" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "Waitlist_email_key" ON "Waitlist"("email");
