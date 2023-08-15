import { handleError } from "@/lib/helper";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiAxiosApp } from "service/axios";

const DeleteCategory = ({ id }: { id: number }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await apiAxiosApp.delete(`/global?url=/categories/${id}`);

      toast.success("دسته بندی مورد نظر با موفقیت حذف شد");
      router.push("/categories");
    } catch (err) {
      toast.error(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="btn btn-dark mt-5"
    >
      حذف
      {loading && <div className="spinner-border spinner-border-sm ms-2"></div>}
    </button>
  );
};

export default DeleteCategory;