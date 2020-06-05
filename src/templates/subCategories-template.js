import React from "react"
// Components
import { Link, graphql } from "gatsby"
const Categories = ({ pageContext, data }) => {
  const { subCategory } = pageContext
  const { edges } = data.allMarkdownRemark
  console.log(pageContext)

  return (
    <div>
      <h1>{subCategory}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          )
        })}
      </ul>
      <Link to="/category">全てのカテゴリー</Link>
    </div>
  )
}

export default Categories

export const pageQuery = graphql`
  query($subCategory: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { subCategories: { in: [$subCategory] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`