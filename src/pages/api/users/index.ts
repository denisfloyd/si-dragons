// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

interface User {
  email: string;
  password: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = req.body as User;

  if (user.email === "admin" && user.password === "admin") {
    res.status(200).json({
      token: jwt.sign(user, "super-secret", {
        subject: user.email,
        expiresIn: "24h",
      }),
    });
  }

  res.status(401).json({ message: "Credenciais inválidas!!" });
}
