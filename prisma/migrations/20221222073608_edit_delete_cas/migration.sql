-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_pilotsId_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_planetId_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_spaceshipId_fkey";

-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_passengerId_fkey";

-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_scheduleId_fkey";

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_planetId_fkey" FOREIGN KEY ("planetId") REFERENCES "planet"("id_planet") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_pilotsId_fkey" FOREIGN KEY ("pilotsId") REFERENCES "pilots"("id_pilot") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_spaceshipId_fkey" FOREIGN KEY ("spaceshipId") REFERENCES "spaceship"("id_spaceship") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id_schedule") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "passenger"("id_passenger") ON DELETE CASCADE ON UPDATE CASCADE;
