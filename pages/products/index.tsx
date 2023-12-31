import Loading from "@/components/Loading";
import ProductList from "@/components/product/List";
import { handleError } from "@/lib/helper";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";
import { ProductRoot } from "type";

const ProductsPage = () => {
  const [pageIndex, setPageIndex] = useState(1);

  const { data, error } = useSWR<ProductRoot>(
    `/global?url=/products&page=${pageIndex}`
  );

  if (error) {
    toast.error(handleError(error));
  }

  if (!data) {
    return <Loading />;
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h4 className="fw-bold">محصولات</h4>
        <Link href="/products/create" className="btn btn-sm btn-outline-dark">
          ایجاد محصول
        </Link>
      </div>

      <ProductList products={data.products} />

      <div className="d-flex justify-content-center">
        <nav aria-label="navigation">
          <ul className="pagination">
            {data.meta.links.slice(1, -1).map((link, index: number) => (
              <li
                key={index}
                className={link.active ? "page-item active" : "page-item"}
              >
                <button
                  onClick={() => setPageIndex(+link.label)}
                  className="page-link"
                  disabled={link.active ? true : false}
                >
                  <span>{link.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default ProductsPage;
