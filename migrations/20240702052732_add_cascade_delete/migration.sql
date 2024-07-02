-- DropForeignKey
ALTER TABLE `Step` DROP FOREIGN KEY `Step_recipeId_fkey`;

-- AddForeignKey
ALTER TABLE `Step` ADD CONSTRAINT `Step_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
