import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import UserTemplate from "../templates/UserTemplate/UserTemplate";
import { pathDefault } from "../common/path";
import RegisterPage from "../pages/Register/RegisterPage";
import LoginPage from "../pages/Login/LoginPage";
import Banner from "../components/Banner/Banner";
import ListJobPage from "../pages/ListJobPage/ListJobPage";
import AdminTemplate from "../templates/AdminTemplate/AdminTemplate";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
// import ManagerUser from "../pages/MangerUser/ManagerUser";
import CreateUser from "../pages/CreateUser/CreateUser";
import { Skeleton } from "antd";

//cách 1 để tối ưu hiệu suất trang web, chỉ tải cpn khi cpn được xuất hiện trên giao diện
const ManagerUser = React.lazy(() => import("../pages/MangerUser/ManagerUser"));

const useRoutesCustom = () => {
  const routes = useRoutes([
    {
      path: pathDefault.homePage,
      element: <UserTemplate />,
      children: [
        {
          path: pathDefault.homePage,
          element: <Banner />,
        },
        {
          path: pathDefault.listJob,
          element: <ListJobPage />,
        },
      ],
    },

    {
      path: pathDefault.register,
      element: <RegisterPage />,
    },
    {
      path: pathDefault.login,
      element: <LoginPage />,
    },
    {
      path: pathDefault.admin,
      element: <AdminTemplate />,
      children: [
        {
          // index: true,
          path: "manager-user",
          element: (
            <Suspense fallback={<Skeleton />}>
              <ManagerUser />
            </Suspense>
          ),
        },
        {
          path: "create-user",
          element: <CreateUser />,
        },
      ],
    },
    {
      path: "/admin-login",
      element: <AdminLogin />,
    },
  ]);
  return routes;
};

export default useRoutesCustom;
