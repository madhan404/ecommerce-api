const pool = require('../config/db');

exports.listAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role FROM users');
    res.json(rows);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    if(result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};
