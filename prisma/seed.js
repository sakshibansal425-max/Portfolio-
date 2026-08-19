const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Database Seeding...');

  const adminUsername = process.env.ADMIN_INIT_USERNAME || 'admin';
  const adminEmail = process.env.ADMIN_INIT_EMAIL || 'sakshibansal425@gmail.com';
  const rawPassword = process.env.ADMIN_INIT_PASSWORD || 'sakshi2026';

  const existingAdmin = await prisma.adminUser.findFirst({
    where: {
      OR: [
        { username: adminUsername },
        { email: adminEmail }
      ]
    }
  });

  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(rawPassword, salt);

    const admin = await prisma.adminUser.create({
      data: {
        username: adminUsername,
        email: adminEmail,
        passwordHash: passwordHash,
        role: 'admin'
      }
    });

    console.log(`✅ Default Admin user created successfully: ${admin.username} (${admin.email})`);
  } else {
    console.log(`ℹ️ Admin user already exists: ${existingAdmin.username}`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
