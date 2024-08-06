import React, { useContext } from "react";
import signinAnimation from "./../../assets/animation/signinAnimation.json";
import InputCustom from "../../components/Input/InputCustom";
import { useLottie } from "lottie-react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { notiValidation } from "../../common/notiValidation";
import { authService } from "../../services/auth.service";
import { NotificationContext } from "../../App";
import { setLocalStorage } from "../../utils/utils";
import { setValueUser } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { handleNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const options = {
    animationData: signinAnimation,
    loop: true,
  };
  const { View } = useLottie(options);
  // NV1: thực hiện khai báo formik trong loginpage và thực hiện xử lý lấy dữ liệu ngdung khi bấm đăng nhập
  // NV2: thực hiện validation dữ liệu 2 input thông qua:
  // a. 2 input đều phải nhập dữ liệu
  // b. kiểm tra email đúng định dạng và mật khẩu 6-10 ký tự
  // NV3: tạo 1 phương thức trong auth.service quản lý đăng nhập
  // NV4: thực hiện sử dụng phương thức vừa tạo kết hợp dữ liệu ng dùng để gửi cho backend kiểm tra và nhận kết quả

  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      onSubmit: async (values) => {
        console.log(values);
        //
        try {
          const result = await authService.signIn(values);
          console.log(result);
          // B1: lưu dữ liệu xuống local
          setLocalStorage("user", result.data.content);
          dispatch(setValueUser(result.data.content));
          // B2: chuyển hướng người dùng
          handleNotification("Đăng nhập thành công", "success");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } catch (error) {
          console.log(error);
          handleNotification(error.response.data.content, "error");
        }
      },
      validationSchema: yup.object({
        email: yup
          .string()
          .required(notiValidation.empty)
          .email("Vui lòng nhập đúng định dạng email"),
        password: yup
          .string()
          .required(notiValidation.empty)
          .min(6, "Mật khấu có tối thiểu 6 ký tự")
          .max(10, "Mật khẩu tối đa 10 ký tự"),
      }),
    });
  return (
    <div>
      <div className="container">
        <div className="LoginPage_content flex items-center h-screen">
          <div className="LoginPage_img w-1/2">{View}</div>
          <div className="LoginPage_form w-1/2 px-5">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <h1 className="uppercase font-bold text-center">
                Giao diện đăng nhập
              </h1>
              <InputCustom
                contentLabel={"Email"}
                placeHolder="Vui lòng nhập email"
                name="email"
                onChange={handleChange}
                value={values.email}
                error={errors.email}
                onBlur={handleBlur}
                touched={touched.email}
              />
              <InputCustom
                contentLabel={"Password"}
                type="password"
                placeHolder="Vui lòng"
                name="password"
                onChange={handleChange}
                value={values.password}
                error={errors.password}
                onBlur={handleBlur}
                touched={touched.password}
              />
              <div>
                <button
                  type="submit"
                  className="inline-block w-full py-3 px-5 text-white rounded-lg bg-black"
                >
                  Đăng nhập
                </button>
                <Link
                  className="text-blue-600 mt-5 hover:underline inline-block"
                  to="/dang-ky"
                >
                  Bấm vào đây để đăng ký nếu chưa có tài khoản
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
