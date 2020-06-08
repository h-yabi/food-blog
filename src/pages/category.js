import React from "react"
// Utilities
import kebabCase from "lodash/kebabCase"
// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
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
    <div>
      <Helmet title={title} />
      <div>
        <h1>カテゴリー一覧</h1>
        <ul>
          {courts.map(value => {
            return (
              <li key={shortid.generate()}>
                <Link to={`/category/${kebabCase(value.path)}/`}>
                  {value.prefecture}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
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