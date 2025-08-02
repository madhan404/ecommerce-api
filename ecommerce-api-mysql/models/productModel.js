const pool = require('../config/db');

async function createTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      farmer_id INT NOT NULL,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(50),
      price DECIMAL(10,2) NOT NULL,
      quantity INT NOT NULL,
      location VARCHAR(255),
      image_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (farmer_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;
  await pool.query(sql);
  // console.log('Table products checked/created');
}

module.exports = { createTable };
