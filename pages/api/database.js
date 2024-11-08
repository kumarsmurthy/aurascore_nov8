const { Client } = require('pg');

export default async function handler(req, res) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false // Adjust this for your specific security needs
    }
  });

  try {
    await client.connect();
    const result = await client.query('SELECT NOW()');
    res.status(200).json({ message: 'Connected to Postgres', time: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await client.end();
  }
}
