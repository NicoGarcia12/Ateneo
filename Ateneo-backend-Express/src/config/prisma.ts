import { PrismaClient } from '@prisma/client';
import config from '../../prisma/prisma.config';

export const prisma = new PrismaClient({
	datasourceUrl: config.datasource.url,
});
