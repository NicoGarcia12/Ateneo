-- CreateTable
CREATE TABLE `proffesor` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `contrasena` VARCHAR(191) NOT NULL,
    `recuperar_contrasena` DATETIME(3) NOT NULL,
    `correo_activado` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alumno` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `dni` BIGINT NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clase` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `materiaId` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inasistencia` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `claseId` BIGINT NOT NULL,
    `alumnoId` BIGINT NOT NULL,
    `justificado` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Relacion_Nota` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `peso` DOUBLE NOT NULL,
    `notaDerivadaId` BIGINT NOT NULL,
    `notaBaseId` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materia` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `ciclo_lectivo` INTEGER NOT NULL,
    `institucion` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `proffesorId` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nota` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `tipo` ENUM('Definitiva', 'Ponderada', 'Aritmetica') NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `materiaId` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nota_Alumno` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `valor` DOUBLE NOT NULL,
    `notaId` BIGINT NOT NULL,
    `alumnoId` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Clase` ADD CONSTRAINT `Clase_materiaId_fkey` FOREIGN KEY (`materiaId`) REFERENCES `Materia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inasistencia` ADD CONSTRAINT `Inasistencia_claseId_fkey` FOREIGN KEY (`claseId`) REFERENCES `Clase`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inasistencia` ADD CONSTRAINT `Inasistencia_alumnoId_fkey` FOREIGN KEY (`alumnoId`) REFERENCES `Alumno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relacion_Nota` ADD CONSTRAINT `Relacion_Nota_notaDerivadaId_fkey` FOREIGN KEY (`notaDerivadaId`) REFERENCES `Nota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Relacion_Nota` ADD CONSTRAINT `Relacion_Nota_notaBaseId_fkey` FOREIGN KEY (`notaBaseId`) REFERENCES `Nota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materia` ADD CONSTRAINT `Materia_proffesorId_fkey` FOREIGN KEY (`proffesorId`) REFERENCES `proffesor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nota` ADD CONSTRAINT `Nota_materiaId_fkey` FOREIGN KEY (`materiaId`) REFERENCES `Materia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nota_Alumno` ADD CONSTRAINT `Nota_Alumno_notaId_fkey` FOREIGN KEY (`notaId`) REFERENCES `Nota`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nota_Alumno` ADD CONSTRAINT `Nota_Alumno_alumnoId_fkey` FOREIGN KEY (`alumnoId`) REFERENCES `Alumno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
