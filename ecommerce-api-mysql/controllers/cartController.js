const pool = require('../config/db');

exports.addToCart = async (req, res) => {
  const { buyerId, productId, quantity } = req.body;
  try {
    await pool.query(
      'INSERT INTO cart (buyer_id, product_id, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + ?',
      [buyerId, productId, quantity, quantity]
    );
    res.json({ message: 'Added to cart' });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.viewCart = async (req, res) => {
  const { buyerId } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM cart WHERE buyer_id = ?', [buyerId]);
    res.json(rows);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { buyerId, productId } = req.body;
  try {
    await pool.query('DELETE FROM cart WHERE buyer_id = ? AND product_id = ?', [buyerId, productId]);
    res.json({ message: 'Removed from cart' });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};
