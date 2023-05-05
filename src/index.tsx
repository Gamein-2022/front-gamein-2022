import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import AppRouter from "./AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/main.scss";
import { RecoilRoot } from "recoil";
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'

//@ts-ignore
import { messages as enMessages } from './locales/en/messages'
//@ts-ignore
import { messages as faMessages } from './locales/fa/messages'
i18n.load({
  en: enMessages,
  fa: faMessages,
})
i18n.activate('en')

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <I18nProvider i18n={i18n}>
    <AppRouter />
    <ToastContainer theme="dark" position="top-center" />
  </I18nProvider>
  </RecoilRoot>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
