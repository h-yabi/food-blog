import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styles from "./Header.module.sass"

const Header = () => {
  return (
    <header className={`${styles.header}`}>
      <div className={styles.headerInner}>
        <h1 className={styles.logo}>
          <Link to="/">
            <img src="/images/logo.png" alt="" />
          </Link>
        </h1>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

export default Header
