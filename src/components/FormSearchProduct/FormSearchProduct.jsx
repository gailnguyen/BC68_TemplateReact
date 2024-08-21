import React, { useEffect, useState } from "react";
import useResponsive from "../../hooks/useResponsive";
import Banner from "../Banner/Banner";
import InputCustom from "../Input/InputCustom";
import IconSearch from "../Icon/IconSearch";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { congViecService } from "../../services/congViec.service";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import useDebounce from "../../hooks/useDebounce";

const FormSearchProduct = () => {
  const isResponsive = useResponsive({
    mobile: 576,
    tablet: 992,
  });
  //   console.log(isResponsive);
  const navigate = useNavigate();

  const [valueSearch, setValueSearch] = useState("");
  //   console.log(valueSearch);
  const [checkDropdown, setCheckDropdown] = useState(false);
  const [listRecommendedJob, setRecommendedJob] = useState([
    {
      key: 1,
      label: "hello",
    },
  ]);

  const debounceValue = useDebounce(valueSearch, 500);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(valueSearch);
    navigate(`${pathDefault.listJob}?tenCongViec=${valueSearch}`);
  };

  useEffect(() => {
    if (valueSearch) {
      // gọi api lấy dữ liệu sản phẩm để gợi ý người dùng
      congViecService
        .layCongViecTheoTen(valueSearch)
        .then((res) => {
          console.log(res);
          const newListRecommendedJob = res.data.content
            .slice(0, 4)
            .map((item, index) => {
              return {
                key: index,
                label: (
                  <Link
                    to={`/chi-tiet-cong-viec`}
                    className="flex items-center space-x-4"
                  >
                    <img src={item.congViec.hinhAnh} className="h-20" alt="" />
                    <div>
                      <h4>{item.congViec.tenCongViec}</h4>
                      <p>{item.congViec.giaTien}</p>
                    </div>
                  </Link>
                ),
              };
            });
          setCheckDropdown(true);
          setRecommendedJob(newListRecommendedJob);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [debounceValue]);

  const handleChange = (event) => {
    setValueSearch(event.target.value);
    console.log(debounceValue);
    if (!event.target.value) {
      setCheckDropdown(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Dropdown
          menu={{
            items: listRecommendedJob,
          }}
          open={checkDropdown}
        >
          <div className="pl-4 rounded-md border border-gray-400 flex items-center justify-between min-w-[400px]">
            <input
              type="text"
              placeholder="Nhập công việc cần kiếm"
              className="flex-1 focus:border-none focus:outline-none"
              onChange={handleChange}
              value={valueSearch}
            />
            <button type="submit" className="p-2">
              <IconSearch size={25} color="rgb(156 163 175)" />
            </button>
          </div>
        </Dropdown>
      </form>
    </div>
  );
};

export default FormSearchProduct;
