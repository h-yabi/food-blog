import React from "react"
// Components
import { Link, graphql } from "gatsby"
import { useCourtsMetadata } from '../hooks/courts-metadata'
import shortid from 'shortid';

const ThirdCategories = ({ pageContext, data }) => {
  const edges = data.allMarkdownRemark.edges
  const pathArray = window.location.pathname.split('/')
  const prefecturePath = pathArray[pathArray.length - 3]
  const cityPath = pathArray[pathArray.length - 2]
  const thirdCategoryPath =pathArray[pathArray.length - 1]

  const couts = useCourtsMetadata()
  const prefectureCourt = couts.filter(court => court.path === prefecturePath)
  const cityCourt = prefectureCourt[0].categories.filter(court => court.path === cityPath)
  const featureCourt = cityCourt[0].subCategories.filter(court => court.path === thirdCategoryPath)
  console.log(couts)

  return (
    <div>
      <h1>{featureCourt[0].pageTitle}</h1>
      <ul>
        {
          edges.map(edge => {
            const node = edge.node
            const fields = node.fields
            const frontmatter = node.frontmatter

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
      <Link to={`category/${prefecturePath}/${cityPath}`}>戻る</Link>
    </div>
  )
}

export default ThirdCategories

export const pageQuery = graphql`
  query($thirdCategory: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { thirdCategories: { in: [$thirdCategory] } } }
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
            thirdCategories
          }
        }
      }
    }
  }
`