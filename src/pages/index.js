// Gatsby supports TypeScript natively!
import React from "react"
import { Link, graphql } from "gatsby"

// FontAwesome
/* eslint-disable import/first */
import { library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { far } from "@fortawesome/free-regular-svg-icons"
library.add(fab, fas, far)

import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from "../components/common/layout.module.sass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useCourtsMetadata } from '../hooks/courts-metadata'
import shortid from 'shortid';

const BlogIndex = ({ path, data }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const courts = useCourtsMetadata()

  const categories = courts.map((court, index) => {
    return court.categories.map(value => value)
  })

  return (
    <Layout title={siteTitle}>
      <SEO
        title="めし屋ブログ"
      />
      <Header overview={data.site.siteMetadata} path={path} />
      <main className={styles.contents}>
        <div className={styles.article}>
          <div className={styles.articleInner}>
            {posts.map(({ node }) => {
              const frontmatter = node.frontmatter
              const fields = node.fields
              const title = frontmatter.title || fields.slug
              return (
                <article className={styles.article_list} key={fields.slug}>
                  <div className={styles.article_list_date}>
                    <span className={styles.icon_calendar}>
                      <FontAwesomeIcon icon={["far", "calendar-alt"]} />
                    </span>
                    <span>{frontmatter.date}</span>
                  </div>
                  <div className={styles.category}>
                    {
                      categories &&
                      categories.map(category => {
                        return category.map(value => {
                          // value.path = ueno　、　frontmatter.subCategory = ueno
                          return value.path === frontmatter.subCategory &&
                            <Link key={shortid.generate()} className={styles.categoryLink} to={`category/${frontmatter.category}/${frontmatter.subCategory}`}>{value.city}</Link>
                        })
                      })
                    }
                    {
                      frontmatter.thirdCategoriesName.map(sample => {
                        return <Link key={shortid.generate()} className={styles.categoryLink} to={`category/${frontmatter.category}/${frontmatter.subCategory}/${sample.path}`}>{sample.name}</Link>
                      })
                    }
                  </div>
                  <h2 className={styles.article_title}>{title}</h2>
                  <div className={styles.article_list_imgTextWrap}>
                    <div className={styles.article_list_text}>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: frontmatter.description || node.excerpt,
                        }}
                        className={styles.article_description}
                      />
                    </div>
                    <div className={styles.article_list_img}>
                      <img src={`/images/${frontmatter.mainImg}`} alt=""/>
                    </div>
                  </div>
                  <Link to={frontmatter.path} className={styles.button}>
                    続きを読む
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
        <div className={styles.sideNav}>
          test
        </div>
      </main>
      <Footer/>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            path
            date(formatString: "YYYY/MM/DD")
            title
            description
            mainImg
            category
            subCategory
            thirdCategoriesName {
              path
              name
            }
          }
        }
      }
    }
  }
`
