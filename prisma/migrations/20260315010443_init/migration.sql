-- CreateEnum
CREATE TYPE "BlossomStatus" AS ENUM ('active', 'completed');

-- CreateTable
CREATE TABLE "Seed" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "energyLevel" INTEGER,
    "tendingToday" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "release" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "assumptions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "bodyCheckIn" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "notes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Seed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Week" (
    "id" TEXT NOT NULL,
    "weekStart" DATE NOT NULL,
    "strengthenedMe" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "drainedMe" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "patternsNoticed" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "reflections" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Week_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blossom" (
    "id" TEXT NOT NULL,
    "weekId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" BOOLEAN NOT NULL DEFAULT false,
    "status" "BlossomStatus" NOT NULL DEFAULT 'active',
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blossom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Seed_date_idx" ON "Seed"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Seed_date_key" ON "Seed"("date");

-- CreateIndex
CREATE INDEX "Week_weekStart_idx" ON "Week"("weekStart");

-- CreateIndex
CREATE UNIQUE INDEX "Week_weekStart_key" ON "Week"("weekStart");

-- CreateIndex
CREATE INDEX "Blossom_weekId_idx" ON "Blossom"("weekId");

-- CreateIndex
CREATE INDEX "Blossom_status_idx" ON "Blossom"("status");

-- AddForeignKey
ALTER TABLE "Blossom" ADD CONSTRAINT "Blossom_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week"("id") ON DELETE CASCADE ON UPDATE CASCADE;
