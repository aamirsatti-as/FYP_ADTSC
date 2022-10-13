var jwt=require('jsonwebtoken')
const secret = 'IAmGeneratingTokenToAuthticateCredintialBelongToUser';

const auth = async (req, res, next) => {
  try {
    console.log(req.headers.authorization)
    return
    const token = req.headers.authorization.split(" ")[1];
    // const isCustomAuth = token.length < 500;

    let decodedData;
    console.log('1')
    if (token ) {      
        console.log('2')
      decodedData = jwt.verify(token, secret);

      // req.userId = decodedData?.id;
    } else {
      // decodedData = jwt.decode(token);
      console.log('3')
      // req.userId = decodedData?.sub;
      res.status(422).json({message:"UnAuthorized User No Token"})
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
