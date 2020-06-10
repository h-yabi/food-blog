import React from "react"
// Utilities
import kebabCase from "lodash/kebabCase"
// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { useCourtsMetadata } from '../hooks/courts-metadata'
import shortid from 'shortid';

const CategoryPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => {
  const courts = useCourtsMetadata()

  return (
    <Layout>
      <SEO
        title="地域・ジャンルから探す"
        description="テスト"
      />
      <div>
        <div>
          <h1>地域・ジャンルから探す</h1>
          <ul>
            {courts.map(value => {
              return (
                <li key={shortid.generate()}>
                  <Link to={`/category/${kebabCase(value.path)}`}>
                    {value.prefecture}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <Footer/>
    </Layout>
  )
}

export default CategoryPage
export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`