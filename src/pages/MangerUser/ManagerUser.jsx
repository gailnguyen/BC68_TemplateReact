import React, { useContext, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getValueUserApi } from "../../redux/nguoiDungSlice";
import { nguoiDungService } from "../../services/nguoiDung.service";
import { NotificationContext } from "../../App";

// thực hiện tạo 1 service dùng quản lý các api về ng dùng
// cấu hình phương thức xóa người dùng (khi gọi tới phương thức cần truyền id ng dùng)
// sau khi cấu hình phương thức, quay lại ManagerUser tạo sự kiện click tương tác vs nút xóa dùng để xóa ng dùng

const ManagerUser = () => {
  const { handleNotification } = useContext(NotificationContext);
  const dispatch = useDispatch();
  const { listUsers } = useSelector((state) => state.nguoiDungSlice);
  console.log(listUsers);
  useEffect(() => {
    dispatch(getValueUserApi());
  }, []);
  console.log(listUsers);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => {
        return <img width={50} height={50} src={text} />;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      render: (text) => {
        // console.log(text);
        return <Tag color={text ? "blue" : "cyan"}>{text ? "Nam" : "Nữ"}</Tag>;
      },
    },
    // USER ADMIN
    {
      title: "ROLE",
      dataIndex: "role",
      render: (text) => (
        <Tag color={text == "ADMIN" ? "geekblue-inverse" : "lime-inverse"}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle" className="px-3">
          <button
            onClick={() => {
              nguoiDungService
                .deleteUser(record.id)
                .then((res) => {
                  console.log(res);
                  handleNotification(res.data.message, "success");
                  dispatch(getValueUserApi());
                })
                .catch((err) => {
                  console.log(err);
                  handleNotification(
                    err.response.data.message || err.response.data.content,
                    "error"
                  );
                  dispatch(getValueUserApi());
                });
            }}
            className="bg-red-500 text-white py-2 px-5 rounded-md hover:bg-red-500/90 duration-300"
          >
            Xóa
          </button>
          <button className="bg-yellow-300 text-black py-2 px-5 rounded-md hover:bg-yellow-300/90 duration-300">
            Sửa
          </button>
        </Space>
      ),
    },
  ];
  return <Table columns={columns} dataSource={listUsers} />;
};
export default ManagerUser;
