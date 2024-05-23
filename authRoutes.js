const express = require('express');
// const { signup, login ,submitdetails,getusersdata,updateusersdata,deleteusersdata} = require('../controllers/authController');
const authMiddleware = require('./authMiddleware');
const { createUser, findUserByemail,saveSellerUserDetails,getusers,updateuser,deleteuser,getusertype } = require('./userModel');
const generateToken = require('./generateToken');


// const  signup  =  require('../controllers/authController');
// const  login  =  require('../controllers/authController');

// const submitdetails  =  require('../controllers/authController');

// const  getusersdata =  require('../controllers/authController');

// const  updateusersdata =  require('../controllers/authController');

// const  deleteusersdata =  require('../controllers/authController');

const router = express.Router();

router.post('/signup',function(req, res){
  const {firstname, lastname, email, phone, user } = req.body;
  console.log('Signup request received:', { firstname, lastname, email, phone, user });

  // Check if the username already exists
  findUserByemail(email, (err, results) => {
    if (err) {
      return res.status(500).send('Error on the server');
    }
    if (results.length > 0) {
      return res.status(400).send('Username already exists');
    }

    createUser(firstname, lastname, email, phone, user, (err, result) => {
      console.log('entered create user:', { firstname, lastname, email, phone, user });

      if (err) {
        return res.status(500).send('Error registering the user');
      }
      res.status(201).send({ message: 'User registered successfully' });
    });
  });
});

// router.post('/login', function(req, res){
//  console.log("thiis is inside login")
//   const { email } = req.body;
// const usertype = getusertype(email);
// console.log(usertype)
//   findUserByemail(email, (err, results) => {
//     if (err) {
//       return res.status(500).send('Error on the server');
//     }
//     if (results.length === 0) {
//       return res.status(404).send('User not found');
//     }

//     const user= results[0];
// console.log("this is usertype"+usertype);
//     const token = generateToken(user.id);
//     console.log('Generated JWT token:', token);

//     res.status(200).send({ auth: true, token,usertype });

//   });

// });
router.post('/login', function(req, res) {
  console.log("This is inside login");
  const { email } = req.body;

  findUserByemail(email, (err, results) => {
    if (err) {
      return res.status(500).send('Error on the server');
    }
    if (results.length === 0) {
      return res.status(404).send('User not found');
    }

    const user = results[0];

    getusertype(email, (err, usertype) => {
      if (err) {
        return res.status(500).send('Error fetching user type');
      }
      if (!usertype) {
        return res.status(404).send('User type not found');
      }

      console.log("This is usertype: " + usertype);
      const token = generateToken(user.id);
      console.log('Generated JWT token:', token);

      res.status(200).send({ auth: true, token, usertype });
    });
  });
});

router.post('/seller',function(req, res){
  const {place,area,bedrooms,bathrooms } = req.body;
 
  if (!place || !area || !bedrooms || !bathrooms) {
    return res.status(400).json({ message: 'All fields are required' });
  }


  saveSellerUserDetails(place,area,bedrooms,bathrooms, (err) => {
    if (err) {
      return res.status(500).send('Error saving user details');
    }
    res.status(201).send({ message: 'Form submitted successfully'});
  });
});
router.get('/getdata',function(req, res){
  getusers((err, users) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
    res.json(users);
  });
});
 router.put('/update/:id', function(req, res){
  const userId = req.params.id;
  const user = req.body;
  updateuser(userId, user, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update user' });
    }
    res.json(result);
  });
});
 router.delete('/delete/:id',function(req, res){
  const userId = req.params.id;
  const user = req.body;
deleteuser(userId, (err) => {
  if (err) {
    return res.status(500).json({ error: 'Failed to delete user' });
  }
  res.status(204).send();
});
});
router.get('/me', authMiddleware, (req, res) => {
  res.status(200).send(req.user);
});

module.exports = router;