const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                description
                path
                category
                thirdCategories
              }
            }
          }
        }
        categoriesGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___category) {
            fieldValue
          }
        }
        subCategoriesGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___subCategory) {
            fieldValue
          }
        }
        thirdCategoriesGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___thirdCategories) {
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.frontmatter.path,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // Create categories pages.
  const categories = result.data.categoriesGroup.group
  const categoriesList = path.resolve(`./src/templates/categories-template.js`)

  const subCategories = result.data.subCategoriesGroup.group
  const subCategoriesList = path.resolve(`./src/templates/subCategories-template.js`)

  const thirdCategories = result.data.thirdCategoriesGroup.group
  const thirdCategoriesList = path.resolve(`./src/templates/thirdCategories-template.js`)


  categories.forEach(category => {
    createPage({
      path: `/category/${_.kebabCase(category.fieldValue)}/`,
      component: categoriesList,
      context: {
        category: category.fieldValue,
      },
    })
    subCategories.forEach(subCategory => {
      createPage({
        path: `/category/${_.kebabCase(category.fieldValue)}/${_.kebabCase(subCategory.fieldValue)}/`,
        component: subCategoriesList,
        context: {
          subCategory: subCategory.fieldValue,
        },
      })
      thirdCategories.forEach(thirdCategory => {
        createPage({
          path: `/category/${_.kebabCase(category.fieldValue)}/${_.kebabCase(subCategory.fieldValue)}/${_.kebabCase(thirdCategory.fieldValue)}`,
          component: thirdCategoriesList,
          context: {
            thirdCategory: thirdCategory.fieldValue,
          },
        })
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
