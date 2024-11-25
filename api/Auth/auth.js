const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'NOTESAPI';

const auth = (req, res, next) => {
  try {
    // Check if Authorization header exists
    let token = req.headers.authorization;

    // If token is not present, return unauthorized error
    if (!token || !token.startsWith('Bearer')) {
      return res.status(401).json({ message: 'Unauthorized user, no token provided' });
    }

    // Extract the token from the 'Bearer <token>' format
    token = token.split(' ')[1];

    // Verify the token
    const user = jwt.verify(token, SECRET_KEY);

    // Attach the user ID to the request object
    req.userId = user.id;

    // Pass control to the next middleware
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Unauthorized user, invalid token' });
  }
};

module.exports = auth;
