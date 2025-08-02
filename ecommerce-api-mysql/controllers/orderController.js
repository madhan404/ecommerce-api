
const pool = require('../config/db');

exports.placeOrder = async (req, res) => {
  const { buyerId, products, totalPrice, shippingAddress, paymentStatus } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO orders (buyer_id, products_json, total_price, shipping_address, payment_status, order_status) VALUES (?, ?, ?, ?, ?, ?)',
      [buyerId, JSON.stringify(products), totalPrice, shippingAddress, paymentStatus || 'pending', 'confirmed']
    );
    res.status(201).json({ message: 'Order placed', orderId: result.insertId });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listOrders = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM orders');
    res.json(rows);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const id = req.params.id;
  const { orderStatus } = req.body;
  try {
    const [result] = await pool.query('UPDATE orders SET order_status = ? WHERE id = ?', [orderStatus, id]);
    if(result.affectedRows === 0) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order status updated' });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};
