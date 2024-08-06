import React, { useContext } from "react";
import InputCustom from "../Input/InputCustom";
import { DatePicker } from "antd";
import { useFormik } from "formik";
import * as yup from "yup";
import { notiValidation } from "../../common/notiValidation";
import { authService } from "../../services/auth.service";
import { NotificationContext } from "../../App";
import { useNavigate } from "react-router-dom";

const FormRegister = () => {
  const { handleNotification } = useContext(NotificationContext);
  const navigate = useNavigate();
  // NV1, thực hiện bóc tách ra các thuộc tính values, errors, handleChange, handleBlur, handleSubmit, touched để setup vào các field của form
  // NV2, thực hiện khai báo các initialValues sẽ có cho formik và thực hiện kiểm tra nhập dữ liệu vào xem onsubmit có lấy được dữ liệu tất cả form hay không
  // NV3, thực hiện xử lí validation cho các field của form đang có (validation tuỳ ý)
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
    },
    onSubmit: (values) => {
      console.log(values);
      authService
        .signUp({
          ...values,
          gender: values.gender == "Nam" ? true : false,
        })
        .then((res) => {
          console.log(res);
          // B1: Thực hiện thông báo cho ng dùng
          handleNotification(
            "Chúc mừng bạn đã tạo tài khoản thành công, bạn sẽ được chuyển hướng về trang đăng nhập",
            "success"
          );
          setTimeout(() => {
            navigate("/dang-nhap");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          handleNotification(err.response.data.content, "error");
        });
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required(notiValidation.empty)
        .matches(/^[A-Za-zÀ-ỹà-ỹ\s]+$/, "Vui lòng nhập tên không chứa số"),
      email: yup
        .string()
        .required(notiValidation.empty)
        .email("Vui lòng nhập đúng định dạng email"),
      password: yup
        .string()
        .required(notiValidation.empty)
        .matches(
          /^(?=.*[A-Z])(?=.*\d).+$/,
          "Vui lòng nhập ít nhất 1 chữ cái viết hoa và phải có số"
        ),
      phone: yup
        .string()
        .required(notiValidation.empty)
        .matches(
          /^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
          "Vui lòng nhập đúng SĐT Việt Nam"
        ),
      birthday: yup.string().required(notiValidation.empty),
      gender: yup.string().required(notiValidation.empty),
    }),
  });
  return (
    <div className="flex items-center justify-center flex-col h-full">
      <h1 className="uppercase font-bold">Form đăng ký</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap">
          <InputCustom
            onChange={handleChange}
            value={values.name}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
            contentLabel={"Họ tên"}
            name="name"
            placeHolder="Vui lòng nhập tên"
            classWrapper="w-1/2 p-3"
          />
          <InputCustom
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
            contentLabel={"Email"}
            name="email"
            placeHolder="Vui lòng nhập email"
            classWrapper="w-1/2 p-3"
          />
          <InputCustom
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
            contentLabel={"Mật khẩu"}
            name="password"
            placeHolder="Vui lòng nhập mật khẩu"
            classWrapper="w-full p-3"
            type="password"
          />
          <InputCustom
            onChange={handleChange}
            value={values.phone}
            onBlur={handleBlur}
            error={errors.phone}
            touched={touched.phone}
            contentLabel={"Số điện thoại"}
            name="phone"
            placeHolder="Vui lòng nhập SĐT"
            classWrapper="w-1/3 p-3"
          />
          <div className="w-1/3 p-3">
            <label className="block mb-2 text-sm font-medium text-grey-900">
              Ngày sinh
            </label>
            <DatePicker
              className="w-full"
              format="DD-MM-YYYY"
              onChange={(dayjs, dateString) => {
                setFieldValue("birthday", dateString);
              }}
            />
            {errors.birthday && touched.birthday ? (
              <p className="text-red-500">{errors.birthday}</p>
            ) : null}
          </div>
          <div className="w-1/3 p-3">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Giới tính
            </label>
            <select
              name="gender"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={values.gender}
              onChange={handleChange}
            >
              <option value="nam">Nam</option>
              <option value="nu">Nữ</option>
              <option value="khac">Khác</option>
            </select>
            {errors.gender && touched.gender ? (
              <p className="text-red-500">{errors.gender}</p>
            ) : null}
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="py-3 px-6 bg-black text-white rounded-md w-full"
            >
              Đăng ký
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
