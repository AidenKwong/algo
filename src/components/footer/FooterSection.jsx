import React from "react";
import styles from "./FooterSection.module.scss";

const FooterSection = () => {
  return (
    <div className={styles.footer}>
      <div>About</div>
      <div>Categories</div>
      <div>Contact</div>
    </div>
  );
};

export default FooterSection;
