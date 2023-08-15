import Link from "next/link";
import { useRouter } from "next/router";

const navigation = [
  {
    name: "داشبورد",
    href: "/",
  },
  {
    name: "کاربران",
    href: "/users",
  },
  {
    name: "محصولات",
    href: "/products",
  },
  {
    name: "دسته بندی",
    href: "/categories",
  },
  {
    name: "سفارشات",
    href: "/orders",
  },
  {
    name: "تراکنش ها",
    href: "/transactions",
  },
  {
    name: "تخفیف ها",
    href: "/coupons",
  },
];

const Sidebar = () => {
  const router = useRouter();

  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          {navigation.map((item) => (
            <li className="nav-item" key={item.href}>
              <Link
                href={item.href}
                className={
                  router.pathname == item.href ? "nav-link active" : "nav-link"
                }
              >
                <i className="bi bi-grid me-2"></i>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
