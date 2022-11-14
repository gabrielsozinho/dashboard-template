const { PrismaClient, UserType, DeployGroupType, DeployStatus } = require('@prisma/client');
const prisma = new PrismaClient();

const userData = require('./seeds/user.json');
const userOrgData = require('./seeds/userOrg.json');
const deployData = require('./seeds/deploy.json');
const siteData = require('./seeds/site.json');

async function main() {
  populateTable(userData, prisma.user);
  populateTable(userOrgData, prisma.userOrg);
  populateTable(deployData, prisma.deploy);
  populateTable(siteData, prisma.site);
  console.log(JSON.stringify({success: true}));
}

async function populateTable(data, table) {
  const tableData = await table.findMany();
  if (tableData.length <= 0) {
    for (const d of data) {
      await table.create({
        data: d,
      });
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});