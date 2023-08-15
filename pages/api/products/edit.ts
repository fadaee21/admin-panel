import formidable from "formidable";
import FormData from "form-data";
import fs from "fs";
import axios from "axios";
import { handleError } from "@/lib/helper";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.cookies.token) {
    res.status(403).json({ message: "ورود نا موفق یکبار دیگر تلاش کنید" });
    return;
  }

  if (req.method === "PUT") {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      var formData = new FormData();

      if (files.images) {
        for (let i = 0; i < files.images.length; i++) {
          formData.append(
            "images[]",
            fs.createReadStream(files.images[i].filepath)
          );
        }
      }
      if (files.primary_image) {
        formData.append(
          "primary_image",
          fs.createReadStream(files.primary_image[0].filepath)
        );
      }

      formData.append("name", fields.name[0]);
      formData.append("category_id", fields.category_id[0]);
      formData.append("status", fields.status[0]);
      formData.append("price", fields.price[0]);
      formData.append("quantity", fields.quantity[0]);
      formData.append(
        "primary_image_blurDataURL",
        fields.primary_image_blurDataURL[0]
      );
      formData.append("sale_price", fields.sale_price[0]);
      formData.append(
        "date_on_sale_from",
        fields.date_on_sale_from.length > 0 && fields.date_on_sale_from[0]
      );
      formData.append(
        "date_on_sale_to",
        fields.date_on_sale_to.length > 0 && fields.date_on_sale_to[0]
      );
      formData.append("description", fields.description[0]);
      formData.append("_method", "PUT");
      try {
        const resApi = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${req.query.id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${req.cookies.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        res.status(200).json(resApi.data.data);
      } catch (err) {
        res.status(422).json({ message: { err: [handleError(err)] } });
      }

      if (err) {
        res.status(422).json({ err: String(err) });
      }
    });
  } else {
    res.setHeader("Allow", ["[PUT]"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
