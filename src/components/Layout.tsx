import React from "react";
import { Helmet } from "react-helmet";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import styles from "../App.module.css";
import { ToastContainer } from "react-toastify";
import HexDisplay from "./HexDisplay/Hex";

interface LayoutProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, description, children }) => {
  return (
    <div className={styles.App}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Helmet>
        <title>{title || "The Pledge"}</title>
        <meta name="description" content={description || "Make your Pledge!"} />
      </Helmet>
      <HexDisplay />
      <Header />
      <main className={styles.containerHome}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
