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
                                city
                                path
                                subCategories {
                                    title
                                    pageTitle
                                    description
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
