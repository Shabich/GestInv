import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  port: 3307,
  password: 'admin',
  database: 'db_slam_ap'
});

export default db;
