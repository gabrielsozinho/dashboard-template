import { PrismaClient } from '@prisma/client';

let prisma = new PrismaClient();

if (process.env.DEV_MODE) {

    const chalk = require('chalk');
    
    const prisma_dev = new PrismaClient({
        log: [
            {
                emit: "event",
                level: "query",
            },
        ],
    });

    prisma_dev.$on("query", async (e) => {
        console.debug('\n', chalk.blue(e.query.replace(/\?/g, chalk.yellow('?'))), ' - ',  chalk.yellow(e.params), '\n');
    });

    prisma = prisma_dev;
}

export default prisma;