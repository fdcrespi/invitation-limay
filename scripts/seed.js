const { db } = require('@vercel/postgres');

async function seedGuests(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "customers" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS guests (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        cantidad INTEGER DEFAULT 1,
        phone VARCHAR(255) DEFAULT NULL,
        created_at DATE DEFAULT CURRENT_DATE
      );
    `;

    console.log(`Created "guests" table`);

    return {
      createTable
    };
  } catch (error) {
    console.error('Error seeding guests:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();
  await seedGuests(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
