const pool = require('../config/db');

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;  // role: farmer, buyer, admin
  try {
    // Basic email uniqueness check
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if(existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    await pool.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', 
      [name, email, password, role]);
    res.status(201).json({ success: true, message: 'User created' });
  } catch(err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }
    const user = users[0];

    if (user.password !== password) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    return res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


exports.listUsers = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, role FROM users');
    res.json(users);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};
