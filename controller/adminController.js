import pool from '../utils/db.js';

export const addTrain = async (req, res) => {
  try {
    const { name, source, destination, total_seats } = req.body;
    const query = 'INSERT INTO trains (name, source, destination, total_seats, available_seats) VALUES ($1, $2, $3, $4, $4) RETURNING *';
    const values = [name, source, destination, total_seats];
    const result = await pool.query(query, values);

    res.status(201).json({ message: 'Train added successfully', train: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add train', details: error.message });
  }
};
