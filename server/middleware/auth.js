var jwt=require('jsonwebtoken')
const secret = 'IAmGeneratingTokenToAuthticateCredintialBelongToUser';

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    // Perform token validation here (e.g., verify with JWT)
    // If token is valid, allow access to the route
    // If token is invalid, return an error response
    // You can use libraries like jsonwebtoken for token verification
    // Example: jwt.verify(token, 'your_secret_key', (err, user) => { ... });
    
    // For demonstration purposes, let's assume the token is valid
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
// const auth = async (req, res, next) => {
//   try {
//     const authenticateToken = (req, res, next) => {
//       const token = req.headers.authorization;
    
//       if (token) {
//         // Perform token validation here (e.g., verify with JWT)
//         // If token is valid, allow access to the route
//         // If token is invalid, return an error response
//         // You can use libraries like jsonwebtoken for token verification
//         // Example: jwt.verify(token, 'your_secret_key', (err, user) => { ... });
        
//         // For demonstration purposes, let's assume the token is valid
//         next();
//       } else {
//         res.status(401).json({ message: 'Unauthorized' });
//       }
//     };

//     let decodedData;
//     if (token ) {      
//       decodedData = jwt.verify(token, secret);

//       // req.userId = decodedData?.id;
//     } else {
//       res.status(422).json({message:"UnAuthorized User No Token"})
//     }    

//     next();
//   } catch (error) {
//   }
// };

module.exports = auth;
