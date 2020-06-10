import React from "react"
// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { useCourtsMetadata } from '../hooks/courts-metadata'
import shortid from 'shortid';

const Categories = ({ pageContext, data }) => {
  const { category } = pageContext
  const couts = useCourtsMetadata()
  const court = couts.filter(court => court.path === category)
  const courtPth = court[0].path
  const pathArray = window.location.pathname.split('/')
  const prefecturePath = pathArray[pathArray.length - 1]
  const prefectureCourt = couts.filter(court => court.path === prefecturePath)

  return (
    <Layout>
      <SEO
        title={prefectureCourt[0].pageTitle}
        description={prefectureCourt[0].description}
      />
      <div>
        <h1>{prefectureCourt[0].pageTitle}</h1>
        <p>{prefectureCourt[0].description}</p>
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
      <Footer/>
    </Layout>
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