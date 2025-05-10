// import { createRoot } from "react-dom/client";
// import { Provider } from "react-redux";
// import { RouterProvider } from "react-router-dom";
// import { store } from "./app/store";
// import router from "./Routers";
// import { ConfigProvider, message } from "antd";
// import { MessageContext } from "./utils/MessageContext"; // new
// import "./index.css";

// const container = document.getElementById("root");

// if (container) {
//   const root = createRoot(container);
//   const [messageApi, contextHolder] = message.useMessage();

//   root.render(
//     <>
//       {contextHolder}
//       <ConfigProvider>
//         <Provider store={store}>
//           <MessageContext.Provider value={messageApi}>
//             <RouterProvider router={router} />
//           </MessageContext.Provider>
//         </Provider>
//       </ConfigProvider>
//     </>
//   );
// }

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import router from "./Routers";
import { ConfigProvider, message } from "antd";
import { MessageContext } from "./utils/MessageContext";
import "./index.css";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  const App = () => {
    const [messageApi, contextHolder] = message.useMessage();

    return (
      <ConfigProvider>
        <Provider store={store}>
          <MessageContext.Provider value={messageApi}>
            <div style={{ position: 'fixed', top: 200, left: 0, width: '100%', zIndex: 9999 }}>
              {contextHolder}
            </div>
            <RouterProvider router={router} />
          </MessageContext.Provider>
        </Provider>
      </ConfigProvider>
    );
  };

  root.render(<App />);
}