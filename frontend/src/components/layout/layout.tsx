
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";

const Layout = () => {

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />

      <div className="flex flex-col">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}


export default Layout