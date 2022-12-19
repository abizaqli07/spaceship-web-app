-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('ACTIVE', 'WAITING', 'CANCELLED');

-- CreateTable
CREATE TABLE "ticket" (
    "id_ticket" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "passengerId" TEXT NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id_ticket")
);

-- CreateTable
CREATE TABLE "ticket_has_status" (
    "id_ticket_has_status" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "status" "STATUS" NOT NULL,

    CONSTRAINT "ticket_has_status_pkey" PRIMARY KEY ("id_ticket_has_status")
);

-- CreateIndex
CREATE UNIQUE INDEX "ticket_has_status_ticketId_key" ON "ticket_has_status"("ticketId");

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id_schedule") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "passenger"("id_passenger") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_has_status" ADD CONSTRAINT "ticket_has_status_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "ticket"("id_ticket") ON DELETE RESTRICT ON UPDATE CASCADE;
