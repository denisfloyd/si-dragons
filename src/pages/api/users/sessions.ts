// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Cors from 'cors';
import jwt from "jsonwebtoken";

import initMiddleware from '@/utils/initMiddlewareApiRoutes';

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)

interface User {
  username: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run cors
  await cors(req, res)

  const user = req.body as User;

  if (user.username === "admin" && user.password === "admin") {
    res.status(200).json({
      token: jwt.sign(user, "super-secret", {
        subject: user.username,
        expiresIn: "24h",
      }),
    });

    return;
  }

  res.status(401).json({ message: "Credenciais inválidas!!" });
}
