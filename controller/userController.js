import pool from '../utils/db.js';

export const getSeatAvailability = async (req, res) => {
  try {
    const { source, destination } = req.query;
    const query = 'SELECT * FROM trains WHERE source = $1 AND destination = $2';
    const result = await pool.query(query, [source, destination]);

    res.json({ trains: result.rows });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trains', details: error.message });
  }
};

export const bookSeat = async (req, res) => {
  try {
    const { train_id, seats } = req.body;
    const userId = req.user.id;

    await pool.query('BEGIN');

    const trainQuery = 'SELECT * FROM trains WHERE id = $1 FOR UPDATE';
    const trainResult = await pool.query(trainQuery, [train_id]);

    if (!trainResult.rows.length) return res.status(404).json({ error: 'Train not found' });

    const train = trainResult.rows[0];
    if (train.available_seats < seats) {
      await pool.query('ROLLBACK');
      return res.status(400).json({ error: 'Insufficient seats' });
    }

    const updateSeatsQuery = 'UPDATE trains SET available_seats = available_seats - $1 WHERE id = $2';
    await pool.query(updateSeatsQuery, [seats, train_id]);

    const bookingQuery = 'INSERT INTO bookings (user_id, train_id, seats_booked) VALUES ($1, $2, $3) RETURNING *';
    const bookingResult = await pool.query(bookingQuery, [userId, train_id, seats]);

    await pool.query('COMMIT');
    res.json({ message: 'Seat booked successfully', booking: bookingResult.rows[0] });
  } catch (error) {
    await pool.query('ROLLBACK');
    res.status(500).json({ error: 'Failed to book seat', details: error.message });
  }
};

export const getBookingDetails = async (req, res) => {
  try {
    const userId = req.user.id;  
    const { booking_id } = req.params;  

    const query = `
      SELECT * FROM bookings 
      WHERE id = $1 AND user_id = $2
    `;
    const result = await pool.query(query, [booking_id, userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Booking not found for this user' });
    }

    res.json({ booking: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch booking details', details: error.message });
  }
};
