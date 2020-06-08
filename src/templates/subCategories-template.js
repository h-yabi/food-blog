import React from "react"
// Components
import { Link, graphql } from "gatsby"
import { useCourtsMetadata } from '../hooks/courts-metadata'
import shortid from 'shortid';

const SubCategories = ({ pageContext, data }) => {
  // const { subCategory } = pageContext
  const frontmatter = data.allMarkdownRemark.edges[0].node.frontmatter
  const prefecturePath = frontmatter.category
  const cityPath = frontmatter.subCategory

  const couts = useCourtsMetadata()
  const prefectureCourt = couts.filter(court => court.path === prefecturePath)
  const cityCourt = prefectureCourt[0].categories.filter(court => court.path === cityPath)

  return (
    <div>
      <h1>{cityCourt[0].city}</h1>
      <ul>
        {
          cityCourt[0].subCategories.map(subCategory => {
            return (
              <li key={shortid.generate()}>
                <Link to={`category/${prefecturePath}/${cityPath}/${subCategory.path}`}>
                  {subCategory.title}
                </Link>
              </li>
            )
          })
        }
      </ul>
      <Link to={`category/${prefecturePath}`}>戻る</Link>
    </div>
  )
}

export default SubCategories

export const pageQuery = graphql`
  query($subCategory: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { subCategory: { in: [$subCategory] } } }
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