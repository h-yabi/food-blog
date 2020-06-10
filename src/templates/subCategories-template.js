import React from "react"
// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { useCourtsMetadata } from '../hooks/courts-metadata'
import shortid from 'shortid';

const SubCategories = ({ pageContext, data }) => {
  // const { subCategory } = pageContext
  const pathArray = window.location.pathname.split('/')
  const prefecturePath = pathArray[pathArray.length - 2]
  const cityPath = pathArray[pathArray.length - 1]

  const couts = useCourtsMetadata()
  const prefectureCourt = couts.filter(court => court.path === prefecturePath)
  const cityCourt = prefectureCourt[0].categories.filter(court => court.path === cityPath)

  return (
    <Layout>
      <SEO
        title={cityCourt[0].pageTitle}
        description={cityCourt[0].description}
      />
      <div>
        <h1>{cityCourt[0].pageTitle}</h1>
        <p>{cityCourt[0].description}</p>
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
      <Footer/>
    </Layout>
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