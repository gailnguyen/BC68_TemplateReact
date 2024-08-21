import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { congViecService } from "../../services/congViec.service";

const ListJobPage = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  console.log(searchParam.get("tenCongViec"));
  const [listJob, setListJob] = useState([]);

  useEffect(() => {
    let tenCongViec = searchParam.get("tenCongViec");
    congViecService
      .layCongViecTheoTen(tenCongViec)
      .then((res) => {
        // console.log(res);
        setListJob(res.data.content);
        console.log(listJob);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const renderListJob = () => {
    return (
      <div className="grid grid-cols-4 gap-5">
        {listJob.map((item, index) => {
          console.log(item);
          return (
            <div className="border border-gray-300">
              {/* hình ảnh */}
              <img src={item.congViec.hinhAnh} alt="" className="w-full" />
              <div className="px-3">
                {/* thông tin tác giả */}
                <div className="flex space-x-3 items-center mt-2">
                  <img
                    src={item.avatar}
                    width={40}
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                  {/* tên tác giả */}
                  <div>
                    <h4>{item.tenNguoiTao}</h4>
                    <p>Level 2</p>
                  </div>
                </div>
                {/* tên CV */}
                <h3>{item.congViec.tenCongViec}</h3>
                {/* đánh giá */}
                <div className="space-x-2">
                  <i className="fa-solid fa-star text-yellow-500"></i>
                  <span className="text-yellow-500">
                    {item.congViec.saoCongViec}
                  </span>
                  <span className="text-gray-400">
                    ({item.congViec.danhGia})
                  </span>
                </div>
                {/* yêu thích và giá tiền */}
                <div className="flex items-center justify-between border-t border-t-gray-300">
                  <i class="fa-solid fa-heart"></i>
                  <div className="space-x-3">
                    <span className="uppercase">Starting at</span>
                    <span>{item.congViec.giaTien}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return <div className="container">{renderListJob()}</div>;
};

export default ListJobPage;
