// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

interface User {
  username: string;
  password: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = req.body as User;

  if (user.username === "admin" && user.password === "admin") {
    res.status(200).json({
      token: jwt.sign(user, "super-secret", {
        subject: user.username,
        expiresIn: "24h",
      }),
    });
  }

  res.status(401).json({ message: "Credenciais inválidas!!" });
}
