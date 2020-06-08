import React from "react"
// Components
import { Link, graphql } from "gatsby"
import { useCourtsMetadata } from '../hooks/courts-metadata'
import shortid from 'shortid';

const ThirdCategories = ({ pageContext, data }) => {
  const edges = data.allMarkdownRemark.edges
  const node = data.allMarkdownRemark.edges[0].node
  const frontmatter = node.frontmatter
  const fields = node.fields
  const prefecturePath = frontmatter.category
  const cityPath = frontmatter.subCategory
  const thirdCategoryPath = frontmatter.thirdCategory

  const couts = useCourtsMetadata()
  const prefectureCourt = couts.filter(court => court.path === prefecturePath)
  const cityCourt = prefectureCourt[0].categories.filter(court => court.path === cityPath)
  const featureCourt = cityCourt[0].subCategories.filter(court => court.path === thirdCategoryPath)

  return (
    <div>
      <h1>{featureCourt[0].title}</h1>
      <ul>
        {
          edges.map(edge => {
            const node = edge.node
            const fields = node.fields
            const frontmatter = node.frontmatter
            console.log(edge)

            return (
              <li key={shortid.generate()}>
                <Link to={fields.slug}>
                  {frontmatter.title}
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

export default ThirdCategories

export const pageQuery = graphql`
  query($thirdCategory: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { thirdCategory: { in: [$thirdCategory] } } }
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
            thirdCategory
          }
        }
      }
    }
  }
`