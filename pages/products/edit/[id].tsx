import { handleError } from "@/lib/helper";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { toast } from "react-toastify";
import useSWR from "swr";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";
import { Category, Product } from "type";
import { apiAxiosApp } from "service/axios";

const EditProduct = () => {
  const [primaryImage, setPrimaryImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dateOnSale, setDateOnSale] = useState<any>([]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm();

  const { data: product, error: productError } = useSWR<Product>(
    router.query.id && `/global?url=/products/${router.query.id}`
  );
  const { data: categories, error: categoryError } = useSWR<Category[]>(
    "/global?url=/categories-list"
  );

  useEffect(() => {
    if (product) {
      setDateOnSale([product.date_on_sale_from, product.date_on_sale_to]);
    }
  }, [product]);

  if (productError) {
    toast.error(handleError(productError));
  }
  if (categoryError) {
    toast.error(handleError(categoryError));
  }

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    formData.append("primary_image", primaryImage ? data.primary_image[0] : "");
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }
    formData.append("name", data.name);
    formData.append("category_id", data.category_id);
    formData.append("status", data.status);
    formData.append("price", data.price);
    formData.append("quantity", data.quantity);
    formData.append(
      "primary_image_blurDataURL",
      data.primary_image_blurDataURL
    );
    formData.append("sale_price", data.sale_price);
    formData.append("description", data.description);
    // Check if the first element of dateOnSale is an instance of DateObject
    if (dateOnSale[0] instanceof DateObject) {
      // Convert the date to the gregorian calendar and format it as "YYYY-MM-DD HH:mm:ss"
      const formattedDate = dateOnSale[0]
        .convert(gregorian, gregorian_en)
        .format("YYYY-MM-DD HH:mm:ss");

      // Append the formatted date to the formData object
      formData.append("date_on_sale_from", formattedDate);
    } else {
      formData.append("date_on_sale_from", "");
    }

    if (dateOnSale[1] instanceof DateObject) {
      formData.append(
        "date_on_sale_to",
        dateOnSale[1]
          .convert(gregorian, gregorian_en)
          .format("YYYY-MM-DD HH:mm:ss")
      );
    } else {
      formData.append("date_on_sale_to", "");
    }

    try {
      setLoading(true);
      await apiAxiosApp.put(`/products/edit?id=${router.query.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("محصول مورد نظر با موفقیت ویرایش شد");
    } catch (err) {
      toast.error(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  if (watch("primary_image") && watch("primary_image").length > 0) {
    const reader = new FileReader();
    reader.readAsDataURL(watch("primary_image")[0]);
    reader.onloadend = () => {
      reader.result && setPrimaryImage(reader.result.toString());
    };
  }

  if (!product) {
    return <Loading />;
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h4 className="fw-bold">ویرایش محصول</h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="row gy-4">
        <div className="col-md-12 mb-5">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <label className="form-label">تصویر اصلی</label>
              {primaryImage ? (
                <div className="position-relative">
                  <Image
                    className="rounded"
                    src={primaryImage}
                    width={350}
                    height={220}
                    alt="image"
                  />
                  <div
                    className="position-absolute"
                    onClick={() => {
                      resetField("primary_image");
                      setPrimaryImage(null);
                    }}
                    style={{ top: "5px", right: "15px" }}
                  >
                    <i className="bi bi-x text-danger fs-2 cursor-pointer"></i>
                  </div>
                </div>
              ) : (
                <>
                  <Image
                    className="rounded mb-4"
                    src={product.primary_image}
                    width={350}
                    height={220}
                    alt="image"
                  />
                  <input
                    {...register("primary_image")}
                    type="file"
                    className="form-control"
                  />
                  <div className="form-text text-danger">
                    {errors.primary_image?.message as string}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <label className="form-label">تصاویر</label>
          <input
            {...register("images")}
            type="file"
            multiple
            className="form-control"
          />
          <div className="form-text text-danger">
            {errors.images?.message as string}
          </div>
        </div>
        <div className="col-md-3">
          <label className="form-label">نام </label>
          <input
            {...register("name", { required: "فیلد نام الزامی است" })}
            defaultValue={product.name}
            type="text"
            className="form-control"
          />
          <div className="form-text text-danger">
            {errors.name?.message as string}
          </div>
        </div>
        <div className="col-md-3">
          <label className="form-label">دسته بندی </label>
          <select
            {...register("category_id", {
              required: "فیلد دسته بندی الزامی است",
            })}
            defaultValue={product.category_id}
            className="form-control"
          >
            <option value="" disabled>
              انتخاب دسته بندی
            </option>
            {categories &&
              categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
          </select>
          <div className="form-text text-danger">
            {errors.category_id?.message as string}
          </div>
        </div>
        <div className="col-md-3">
          <label className="form-label">وضعیت</label>
          <select
            {...register("status", { required: "فیلد وضعیت الزامی است" })}
            defaultValue={product.status_value}
            className="form-control"
          >
            <option value="1">فعال</option>
            <option value="0">غیر فعال</option>
          </select>
          <div className="form-text text-danger">
            {errors.status?.message as string}
          </div>
        </div>
        <div className="col-md-3">
          <label className="form-label">قیمت</label>
          <input
            {...register("price", { required: "فیلد قیمت الزامی است" })}
            defaultValue={product.price}
            type="text"
            className="form-control"
          />
          <div className="form-text text-danger">
            {errors.price?.message as string}
          </div>
        </div>
        <div className="col-md-3">
          <label className="form-label">تعداد</label>
          <input
            {...register("quantity", { required: "فیلد تعداد الزامی است" })}
            defaultValue={product.quantity}
            type="text"
            className="form-control"
          />
          <div className="form-text text-danger">
            {errors.quantity?.message as string}
          </div>
        </div>
        <div className="col-md-3">
          <label className="form-label">blurDataURL تصویر اصلی</label>
          <input
            {...register("primary_image_blurDataURL", {
              required: "فیلد blurDataURL الزامی است",
            })}
            defaultValue={product.primary_image_blurDataURL}
            type="text"
            className="form-control"
          />
          <div className="form-text text-danger">
            {errors.primary_image_blurDataURL?.message as string}
          </div>
        </div>
        <div className="col-md-3">
          <label className="form-label">قیمت حراجی</label>
          <input
            {...register("sale_price")}
            defaultValue={product.sale_price}
            type="text"
            className="form-control"
          />
          <div className="form-text text-danger">
            {errors.sale_price?.message as string}
          </div>
        </div>
        <div className="col-md-4">
          <label className="form-label">تاریخ شروع و پایان حراجی</label>
          <DatePicker
            inputClass="form-control"
            range
            calendar={persian}
            locale={persian_fa}
            value={dateOnSale}
            onChange={setDateOnSale}
            format="YYYY-MM-DD HH:mm:ss"
            plugins={[
              <TimePicker key="1" position="bottom" />,
              <DatePanel key="2" markFocused />,
            ]}
          />
        </div>
        <div className="col-md-12">
          <label className="form-label">توضیحات</label>
          <textarea
            rows={5}
            {...register("description", {
              required: "فیلد توضیحات الزامی است",
            })}
            defaultValue={product.description}
            className="form-control"
          ></textarea>
          <div className="form-text text-danger">
            {errors.description?.message as string}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-outline-dark mt-3 mb-5"
          >
            ویرایش محصول
            {loading && (
              <div className="spinner-border spinner-border-sm ms-2"></div>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default EditProduct;
