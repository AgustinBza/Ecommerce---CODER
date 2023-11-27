import pkg from 'jsonwebtoken';
const { verify } = pkg;
import { userDao } from "../persistence/daos/factory.js";
import { config }  from "../config.js";


export const checkAdmin = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) return res.status(401).json({ msg: "Unauthorized" });
    const token = authHeader.split(" ")[1];
    const decode = verify(token,config.SECRET_KEY);
    const user = await userDao.getById(decode.userId);
    if (!user) return res.status(400).json({ msg: "Unauthorized" });
    const userRole = user.role;
    console.log(userRole);
    if(userRole == 'user') return res.status(403).json({ msg: 'No user admin'});
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ msg: "Unauthorized" });
  }
};

