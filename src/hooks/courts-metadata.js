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
                            pageTitle
                            description
                            path
                            categories {
                                city
                                pageTitle
                                description
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
