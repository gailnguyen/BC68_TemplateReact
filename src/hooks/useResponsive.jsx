import React, { useEffect, useState } from "react";

const useResponsive = (breakpoints) => {
  const [isResponsive, setIsResponsive] = useState({});

  breakpoints = {
    mobile: 576,
    tablet: 1024,
  };

  useEffect(() => {
    const handleResize = () => {
      const newIsResponsive = {};
      for (const key in breakpoints) {
        if (Object.hasOwnProperty.call(breakpoints, key)) {
          newIsResponsive[key] = window.innerWidth <= breakpoints[key];
        }
      }
      setIsResponsive(newIsResponsive);
    };

    handleResize(); // Gọi ngay lập tức để kiểm tra kích thước ban đầu
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isResponsive;
};

export default useResponsive;
