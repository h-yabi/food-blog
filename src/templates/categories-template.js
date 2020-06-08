import React from "react"
// Components
import { Link, graphql } from "gatsby"
import { useCourtsMetadata } from '../hooks/courts-metadata'
import shortid from 'shortid';

const Categories = ({ pageContext, data }) => {
  const { category } = pageContext
  // const { edges } = data.allMarkdownRemark
  const couts = useCourtsMetadata()
  const court = couts.filter(court => court.path === category)
  const courtPth = court[0].path

  return (
    <div>
      <h1>{court[0].prefecture}</h1>
      <ul>
        {
          court[0].categories.map(category => {
            return (
              <li key={shortid.generate()}>
                <Link to={`category/${courtPth}/${category.path}`}>
                  {category.city}
                </Link>
              </li>
            )
          })
        }
      </ul>
      <Link to="/category">戻る</Link>
    </div>
  )
}

export default Categories

export const pageQuery = graphql`
  query($category: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          category: { in: [$category] },
        }
      }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            category
            subCategory
          }
        }
      }
    }
  }
`