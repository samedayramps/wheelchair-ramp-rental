/*
  Warnings:

  - You are about to drop the column `price` on the `Job` table. All the data in the column will be lost.
  - Added the required column `deliveryFee` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `installFee` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthlyRentalRate` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "PricingVariables" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "trailerRentalCost" REAL NOT NULL,
    "perMileCost" REAL NOT NULL,
    "rentalRatePerFoot" REAL NOT NULL,
    "installRatePerSection" REAL NOT NULL,
    "installRatePerLanding" REAL NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Component" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "location" TEXT NOT NULL DEFAULT 'Warehouse'
);
INSERT INTO "new_Component" ("id", "size", "status", "type") SELECT "id", "size", "status", "type" FROM "Component";
DROP TABLE "Component";
ALTER TABLE "new_Component" RENAME TO "Component";
CREATE TABLE "new_Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "scheduledAt" DATETIME NOT NULL,
    "address" TEXT NOT NULL,
    "deliveryFee" REAL NOT NULL,
    "installFee" REAL NOT NULL,
    "monthlyRentalRate" REAL NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Job_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("address", "createdAt", "customerId", "id", "notes", "scheduledAt", "status", "updatedAt") SELECT "address", "createdAt", "customerId", "id", "notes", "scheduledAt", "status", "updatedAt" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
