-- CreateEnum
CREATE TYPE "QuestionName" AS ENUM ('trip_types', 'planning_pain_points', 'current_organization_method', 'desired_solution', 'willingness_to_pay');

-- CreateTable
CREATE TABLE "Waitlist" (
    "id" TEXT NOT NULL,
    "userId" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Waitlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveyResposne" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "questionId" "QuestionName" NOT NULL,
    "answerText" TEXT,
    "answerOptions" TEXT[],
    "surveyVersion" TEXT NOT NULL DEFAULT 'v1',
    "waitlistId" TEXT NOT NULL,

    CONSTRAINT "SurveyResposne_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SurveyResposne" ADD CONSTRAINT "SurveyResposne_waitlistId_fkey" FOREIGN KEY ("waitlistId") REFERENCES "Waitlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
