const jwt = require("jsonwebtoken");
let isAdmin = false;
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
     isAdmin = decodedToken.isAdmin;
    //console.log(isAdmin);
    req.auth = {
      userId: userId,
      isAdmin: isAdmin,
    };
    
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
