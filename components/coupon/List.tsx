import Link from "next/link";
import { Coupon } from "type";
interface Prop {
  coupons: Coupon[];
}
const CouponList = ({ coupons }: Prop) => {
  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>کد</th>
            <th>درصد</th>
            <th>تاریخ انقضا</th>
            <th>تاریخ ایجاد</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td>{coupon.code}</td>
              <td>{coupon.percentage}</td>
              <td>{coupon.expired_at}</td>
              <td>{coupon.created_at}</td>
              <td>
                <div className="d-flex">
                  <Link
                    href={`coupons/${coupon.id}`}
                    className="btn btn-sm btn-outline-dark me-2"
                  >
                    نمایش
                  </Link>
                  <Link
                    href={`/coupons/edit/${coupon.id}`}
                    className="btn btn-sm btn-dark"
                  >
                    ویرایش
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CouponList;
