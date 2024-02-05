import Jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  const secretKey = process.env.JWT_SECRET;

  if (!token) {
    return res.redirect("/login");
  }

  Jwt.verify(token, secretKey, (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      return res.redirect("/login");
    }

    console.log(decodedToken);
    next();
  });
};
export async function verifyOwner(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  let token_split = token.split(" ");
  console.log(token_split);
  jwt.verify(token_split[1], process.env.SECRET_STRING, (err, decoded) => {
    req.role = decoded.role;
    console.log(decoded);
    if (
      err ||
      (req.role.toLowerCase() != "Store Owner" &&
        req.role.toLowerCase() != "registred")
    ) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.userId = decoded.id;

    next();
  });
}
export async function verifyRegister(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  let token_split = token.split(" ");
  console.log(token_split);
  jwt.verify(token_split[1], process.env.SECRET_STRING, (err, decoded) => {
    req.role = decoded.role;
    console.log(decoded);
    if (
      err ||
      (
        req.role.toLowerCase() != "registred" )
    ) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.userId = decoded.id;

    next();
  });
}
