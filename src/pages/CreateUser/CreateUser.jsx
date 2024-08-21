import React, { useContext, useEffect, useState } from "react";
import InputCustom from "../../components/Input/InputCustom";
import { Select, Space } from "antd";
import { skillService } from "../../services/skill.service";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { NotificationContext } from "../../App";

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const CreateUser = () => {
  const { handleNotification } = useContext(NotificationContext);
  // cập nhật list skill
  const [listSkill, setListSkill] = useState([]);

  // các bước tạo user mới
  const [step, setStep] = useState(0);

  const [isActive, setIsActive] = useState(true);

  // state quản lý value của 1 object
  const [userValue, setUserValue] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    gender: true,
    role: "",
    skill: [],
    certification: [],
  });

  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setUserValue({ ...userValue, [name]: value });
    // console.log(userValue);
  };

  const handleSubmitFormCreateUser = (event) => {
    event.preventDefault();
    console.log(userValue);

    nguoiDungService
      .addUser(userValue)
      .then((res) => {
        console.log(res);
        // setStep(step + 1);
        setIsActive(false);
        handleNotification("Tạo tài khoản thành công", "success");
      })
      .catch((err) => {
        console.log(err);
        handleNotification(err.response.data.content, "error");
      });
  };

  useEffect(() => {
    skillService
      .getAllSkill()
      .then((res) => {
        // console.log(res);
        const newListSkill = res.data.content.map((item, index) => {
          return { label: item.tenSkill, value: item.tenSkill };
        });
        // console.log(newListSkill);
        setListSkill(newListSkill);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // hàm render layout
  const renderLayoutForm = () => {
    switch (step) {
      case 0:
        return (
          <form className="space-y-3" onSubmit={handleSubmitFormCreateUser}>
            <InputCustom
              contentLabel="Name"
              onChange={handleChangeValue}
              name="name"
            />
            <InputCustom
              contentLabel="Email"
              onChange={handleChangeValue}
              name="email"
            />
            <InputCustom
              contentLabel="Phone"
              onChange={handleChangeValue}
              name="phone"
            />
            <InputCustom
              contentLabel="Password"
              type="password"
              onChange={handleChangeValue}
              name="password"
            />
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Ngày sinh
              </label>
              <input
                type="date"
                value={userValue.birthday.split("-").reverse().join("-")}
                onChange={(event) => {
                  console.log(event.target.value);
                  // const arrDate = event.target.value.split("-").reverse().join("-");
                  // console.log(arrDate);
                  const [year, month, day] = event.target.value.split("-");
                  let valueDate = `${day}-${month}-${year}`;
                  console.log(valueDate);
                  setUserValue({ ...userValue, birthday: valueDate });
                }}
                name="birthday"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Giới tính
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={handleChangeValue}
                name="gender"
              >
                <option value={true}>Nam</option>
                <option value={false}>Nữ</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Role
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={handleChangeValue}
                name="role"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Chọn chuyên môn
              </label>
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Please select"
                // defaultValue={["a10", "c12"]}
                onChange={(value, option) => {
                  setUserValue({ ...userValue, skill: value });
                }}
                options={listSkill}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Certifications
              </label>
              <Select
                mode="tags"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Please select"
                tokenSeparators={[","]}
                options={options}
                onChange={(value, option) => {
                  setUserValue({ ...userValue, certification: value });
                }}
              />
            </div>
            <div>
              <button
                type="submit"
                className="px-5 py-2 rounded-md bg-black text-white"
              >
                Tạo người dùng
              </button>
            </div>
          </form>
        );
      case 1:
        return <div>Tôi là layout 2</div>;
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-3xl mb-5">
        Form tạo người dùng trong hệ thống
      </h2>
      {renderLayoutForm()}
      <button
        disabled={isActive}
        onClick={() => {
          setStep(step + 1);
        }}
        className={`py-2 px-5 bg-blue-700 text-white mt-5 rounded-md ${
          isActive ? "cursor-not-allowed bg-black" : ""
        }`}
      >
        Next step
      </button>
    </div>
  );
};

export default CreateUser;
