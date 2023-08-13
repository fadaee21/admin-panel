import { handleError } from "@/lib/helper";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiAxiosApp } from "service/axios";

const DeleteUser: React.FC<{ id: number }> = ({ id }): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleDelete = async (): Promise<void> => {
    try {
      setLoading(true);
      await apiAxiosApp.delete(`/global?url=/users/${id}`);
      toast.success("کاربر مورد نظر با موفقیت حذف شد");
      router.push("/users");
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

export default DeleteUser;
