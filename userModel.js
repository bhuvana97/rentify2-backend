const mysql = require('mysql2');
const config = require('./config.js');

const db = mysql.createConnection(config.db);

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});

const createUser = (firstname, lastname, email, phone, user, callback) => {
    const query = 'INSERT INTO users (firstname, lastname, email, phone, user_type) VALUES (?, ?, ?, ?, ?)';
   console.log('entered');
    db.query(query, [firstname, lastname, email, phone, user], callback);
  
};
const saveSellerUserDetails = (place,area,bedrooms,bathrooms,  callback) => {
  const query = 'INSERT INTO sellers (place,area,bedrooms,bathrooms) VALUES (?, ?, ?, ?, ?)';
db.query(query, [place,area,bedrooms,bathrooms, callback], callback);
};





const saveUserDetails = (firstname, lastname, email, phone, user_type,  callback) => {
    const query = 'INSERT INTO users (firstname, lastname, email, phone, user_type) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [firstname, lastname, email, phone, user_type, callback], callback);
};
const findUserByemail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], callback);
};

const getusers =(callback)=>{
  const query = 'SELECT * FROM sellers';
  db.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
}




const updateuser =(userId, user1, callback)=>{
  const query = 'UPDATE sellers SET place = ?, area = ?, bedrooms = ?, bathrooms = ? WHERE id = ?';
  db.query(query, [user1.place, user1.area, user1.bedrooms, user1.bathrooms, userId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
}

const deleteuser =(userId,callback)=>{
  const query = 'DELETE FROM sellers WHERE id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result);
  });
}

// const getusertype=(email,callback)=>{
//   const query = 'SELECT user_type from users WHERE email= ?';
// db.query(query,[email],callback)

// }
const getusertype = (email, callback) => {
  const query = 'SELECT user_type FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return callback(err);
    }
    if (results.length === 0) {
      return callback(null, null);
    }
    callback(null, results[0].user_type);
  });
};

const findUserById = (id, callback) => {
  const query = 'SELECT id, firstname, lastname, email, phone, user_type FROM users WHERE id = ?';
  db.query(query, [id], callback);
};

module.exports = {
  createUser,
  findUserByemail,
  findUserById,
  saveUserDetails,
  getusers,
  updateuser,
  deleteuser,
  saveSellerUserDetails,getusertype
};