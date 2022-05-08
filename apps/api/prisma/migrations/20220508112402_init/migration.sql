-- CreateEnum
CREATE TYPE "WeightUnit" AS ENUM ('kg', 'lbs');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "userId" TEXT NOT NULL,
    "localeCode" CHAR(5) NOT NULL,
    "unit" "WeightUnit" NOT NULL,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "ExerciseType" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "translationCode" TEXT NOT NULL,

    CONSTRAINT "ExerciseType_pkey" PRIMARY KEY ("userId","id")
);

-- CreateTable
CREATE TABLE "PersonalBest" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "eserciseId" TEXT NOT NULL,
    "starting" TIMESTAMP(3) NOT NULL,
    "weight" SMALLINT NOT NULL,

    CONSTRAINT "PersonalBest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Locale" (
    "code" CHAR(5) NOT NULL,

    CONSTRAINT "Locale_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Translation" (
    "localeCode" CHAR(5) NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("userId","code")
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "comment" TEXT,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkItem" (
    "id" SERIAL NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "order" SMALLINT NOT NULL,
    "sets" SMALLINT NOT NULL DEFAULT 1,
    "reps" SMALLINT NOT NULL,
    "weight" SMALLINT NOT NULL,
    "comment" TEXT,

    CONSTRAINT "WorkItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_localeCode_fkey" FOREIGN KEY ("localeCode") REFERENCES "Locale"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseType" ADD CONSTRAINT "ExerciseType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExerciseType" ADD CONSTRAINT "ExerciseType_userId_translationCode_fkey" FOREIGN KEY ("userId", "translationCode") REFERENCES "Translation"("userId", "code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalBest" ADD CONSTRAINT "PersonalBest_userId_eserciseId_fkey" FOREIGN KEY ("userId", "eserciseId") REFERENCES "ExerciseType"("userId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_localeCode_fkey" FOREIGN KEY ("localeCode") REFERENCES "Locale"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkItem" ADD CONSTRAINT "WorkItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkItem" ADD CONSTRAINT "WorkItem_userId_exerciseId_fkey" FOREIGN KEY ("userId", "exerciseId") REFERENCES "ExerciseType"("userId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkItem" ADD CONSTRAINT "WorkItem_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
