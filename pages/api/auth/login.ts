import { handleError } from "@/lib/helper";
import axios from "axios";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { UserRoot } from "type";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    try {
      const resApi = await axios.post<UserRoot>(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
        {
          email: req.body.email,
          password: req.body.password,
        }
      );

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", resApi.data.data.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: "/",
        })
      );

      res.status(200).json({ data: resApi.data.data });
    } catch (err: any) {
      console.log(err.message);
      res.status(422).json({ message: { err: [handleError(err)] } });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
