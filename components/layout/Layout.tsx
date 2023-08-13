import React from "react";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";
import { apiAxiosApp } from "service/axios";
import Header from "./Header";
import Sidebar from "./Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  if (router.pathname === "/auth/login") {
    return <div>{children}</div>;
  }
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => apiAxiosApp.get(url).then((res) => res.data),
      }}
    >
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {children}
          </main>
        </div>
      </div>
    </SWRConfig>
  );
};
export default Layout;
