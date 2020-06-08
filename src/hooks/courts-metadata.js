import { useStaticQuery, graphql } from "gatsby"

export const useCourtsMetadata = () => {
  const { allCourtsJson } = useStaticQuery(
      graphql`
          query CourtsMetaData {
              allCourtsJson {
                  edges {
                      node {
                          courtsMetadata {
                              id
                              prefecture
                              path
                              categories {
                                id
                                city
                                path
                                subCategories {
                                  id
                                  title
                                  path
                                }
                              }
                          }
                      }
                  }
              }
          }
      `
  )
  return allCourtsJson.edges[0].node.courtsMetadata;
}
