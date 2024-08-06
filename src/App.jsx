import React from "react";
import useRoutesCustom from "./hooks/useRoutesCustom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotificationContext = React.createContext();

function App() {
  const handleNotification = (content, type) => {
    toast[type](content, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };
  const routes = useRoutesCustom();
  return (
    <NotificationContext.Provider value={{ handleNotification }}>
      {routes}
      <ToastContainer />
    </NotificationContext.Provider>
  );
}

export default App;
