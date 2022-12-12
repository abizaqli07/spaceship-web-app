-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('MALE', 'FEMALE');

-- CreateTable
CREATE TABLE "passenger" (
    "id_passenger" TEXT NOT NULL,
    "userId" CHAR(30),
    "fullname" TEXT NOT NULL,
    "datebirth" TEXT NOT NULL,
    "gender" "GENDER" NOT NULL,
    "no_tlp" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "passenger_pkey" PRIMARY KEY ("id_passenger")
);

-- CreateTable
CREATE TABLE "pilots" (
    "id_pilot" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "datebirth" TIMESTAMP(3) NOT NULL,
    "gender" "GENDER" NOT NULL,
    "no_tlp" TEXT NOT NULL,
    "legal" TEXT,
    "is_verified" BOOLEAN NOT NULL,
    "userId" CHAR(30),

    CONSTRAINT "pilots_pkey" PRIMARY KEY ("id_pilot")
);

-- CreateTable
CREATE TABLE "spaceship" (
    "id_spaceship" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "spaceship_pkey" PRIMARY KEY ("id_spaceship")
);

-- CreateTable
CREATE TABLE "planet" (
    "id_planet" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "distance" BIGINT NOT NULL,
    "is_explored" BOOLEAN NOT NULL,
    "is_populated" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "planet_pkey" PRIMARY KEY ("id_planet")
);

-- CreateTable
CREATE TABLE "schedule" (
    "id_schedule" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "planetId" TEXT NOT NULL,
    "pilotsId" TEXT NOT NULL,
    "spaceshipId" TEXT NOT NULL,
    "time_depart" TIMESTAMP(3) NOT NULL,
    "time_land" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id_schedule")
);

-- CreateIndex
CREATE UNIQUE INDEX "passenger_userId_key" ON "passenger"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "pilots_userId_key" ON "pilots"("userId");

-- AddForeignKey
ALTER TABLE "passenger" ADD CONSTRAINT "passenger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pilots" ADD CONSTRAINT "pilots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_planetId_fkey" FOREIGN KEY ("planetId") REFERENCES "planet"("id_planet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_pilotsId_fkey" FOREIGN KEY ("pilotsId") REFERENCES "pilots"("id_pilot") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_spaceshipId_fkey" FOREIGN KEY ("spaceshipId") REFERENCES "spaceship"("id_spaceship") ON DELETE RESTRICT ON UPDATE CASCADE;
