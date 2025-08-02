const pool = require('../config/db');

exports.createProduct = async (req, res) => {
  const { farmerId, name, category, price, quantity, location, imageUrl } = req.body;
  try {
    await pool.query(
      'INSERT INTO products (farmer_id, name, category, price, quantity, location, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [farmerId, name, category, price, quantity, location, imageUrl]
    );
    res.status(201).json({ message: 'Product added' });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products');
    res.json(rows);
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, category, price, quantity, location, imageUrl } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE products SET name=?, category=?, price=?, quantity=?, location=?, image_url=? WHERE id=?',
      [name, category, price, quantity, location, imageUrl, id]
    );
    if(result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated' });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM products WHERE id=?', [id]);
    if(result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};
