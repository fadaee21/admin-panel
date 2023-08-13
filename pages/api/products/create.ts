import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.cookies.token) {
    res.status(403).json({ message: "ورود نا موفق یکبار دیگر تلاش کنید" });
    return;
  }

  if (req.method === "POST") {
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
