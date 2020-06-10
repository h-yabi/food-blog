import React from "react"
import styles from "./Footer.module.sass"

const Footer = () => {
  return (
    <div className={styles.footerWrap}>
      <footer className={styles.footer}>
        Copyright © {new Date().getFullYear()}. めし屋ブログ
      </footer>
    </div>
  )
}

export default Footer
