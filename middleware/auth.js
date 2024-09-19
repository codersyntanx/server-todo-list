const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) throw new Error('Token not provided');
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) throw new Error();
  
      req.user = user;
      next();
    } catch (e) {
      console.error(e.message); 
      res.status(401).send({ error: 'Please authenticate.' });
    }
  };
  
  

module.exports = auth;
