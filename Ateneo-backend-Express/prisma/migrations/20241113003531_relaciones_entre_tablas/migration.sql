-- CreateTable
CREATE TABLE `_SubjectsStudents` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_SubjectsStudents_AB_unique`(`A`, `B`),
    INDEX `_SubjectsStudents_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_SubjectsStudents` ADD CONSTRAINT `_SubjectsStudents_A_fkey` FOREIGN KEY (`A`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SubjectsStudents` ADD CONSTRAINT `_SubjectsStudents_B_fkey` FOREIGN KEY (`B`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
