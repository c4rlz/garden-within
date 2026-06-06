-- CreateTable
CREATE TABLE "CycleSettings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "lastPeriodStart" DATE NOT NULL,
    "defaultCycleLength" INTEGER NOT NULL DEFAULT 28,
    "defaultPeriodLength" INTEGER NOT NULL DEFAULT 5,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CycleSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeriodStart" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PeriodStart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PeriodStart_date_idx" ON "PeriodStart"("date");

-- CreateIndex
CREATE UNIQUE INDEX "PeriodStart_date_key" ON "PeriodStart"("date");
