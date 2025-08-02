const pool = require('../config/db');

async function createTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      buyer_id INT NOT NULL,
      products_json JSON NOT NULL,
      total_price DECIMAL(12,2) NOT NULL,
      shipping_address VARCHAR(500),
      payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
      order_status ENUM('confirmed', 'packed', 'shipped', 'delivered', 'cancelled') DEFAULT 'confirmed',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (buyer_id) REFERENCES users(id) ON DELETE SET NULL
    );
  `;
  await pool.query(sql);
  // console.log('Table orders checked/created');
}

module.exports = { createTable };
