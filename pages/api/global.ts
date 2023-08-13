import { handleError } from "@/lib/helper";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import apiAxiosDataBase from "service/axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.cookies.token) {
    res.status(403).json({ message: "ورود نا موفق یکبار دیگر تلاش کنید" });
    return;
  } else if (req.method === "GET") {
    let page = req.query.hasOwnProperty("page")
      ? `?page=${req.query.page}`
      : "";

    try {
      const resApi = await apiAxiosDataBase.get(`${req.query.url}${page}`, {
        // `${req.query.url}${page}`,
        // {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      });

      res.status(200).json(resApi.data.data || resApi.data);
    } catch (err) {
      res.status(422).json({ message: { err: [handleError(err)] } });
    }
  } else if (req.method === "POST") {
    console.log("post");
    try {
      const resApi = await apiAxiosDataBase.post(
        `${req.query.url}`,
        {
          ...req.body,
        },
        {
          headers: {
            Authorization: `Bearer ${req.cookies.token}`,
          },
        }
      );
      console.log(resApi);
      res.status(200).json(resApi.data.data);
    } catch (err) {
      res.status(422).json({ message: { err: [handleError(err)] } });
    }
  } else if (req.method === "DELETE") {
    try {
      const resApi = await apiAxiosDataBase.delete(`${req.query.url}`, {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
        },
      });

      res.status(200).json(resApi.data.data);
    } catch (err) {
      res.status(422).json({ message: { err: [handleError(err)] } });
    }
  } else if (req.method === "PUT") {
    try {
      const resApi = await apiAxiosDataBase.put(
        `${req.query.url}`,
        {
          ...req.body,
        },
        {
          headers: {
            Authorization: `Bearer ${req.cookies.token}`,
          },
        }
      );

      res.status(200).json(resApi.data.data);
    } catch (err) {
      res.status(422).json({ message: { err: [handleError(err)] } });
    }
  }
}
