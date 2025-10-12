import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Not Authorized, Login again!"
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.userId = tokenDecode.id;   
    } else {
      return res.status(403).json({
        success: false,
        message: "Not Authorized, Login again!"
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
