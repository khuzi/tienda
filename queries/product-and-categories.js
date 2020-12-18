import gql from "graphql-tag";

/**
 * GraphQL categories and products query.
 */
const PRODUCTS_AND_CATEGORIES_QUERY = gql`
  query {
    productCategories(first: 30) {
      nodes {
        id
        name
        slug
        image {
          id
          sourceUrl
          srcSet
        }
        products(last: 1000) {
          edges {
            node {
              ... on SimpleProduct {
                price
                id
                productId
                slug
                description
                name
                type
                price
                image {
                  id
                  uri
                  title
                  srcSet
                  sourceUrl
                }
                attributes {
                  nodes {
                    attributeId
                    id
                    name
                    position
                    options
                    scope
                    variation
                    visible
                  }
                }
              }
              ... on VariableProduct {
                productId
                slug
                description
                name
                type
                price
                image {
                  id
                  uri
                  title
                  srcSet
                  sourceUrl
                }
                attributes {
                  nodes {
                    attributeId
                    id
                    name
                    position
                    options
                    scope
                    variation
                    visible
                  }
                }
                variations {
                  nodes {
                    variationId
                    name
                    id
                    price
                    attributes {
                      nodes {
                        name
                        value
                        id
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    products(last: 1000) {
      edges {
        node {
          ... on VariableProduct {
            productId
            slug
            description
            name
            type
            attributes {
              nodes {
                attributeId
                id
                name
                position
                options
                scope
                variation
                visible
              }
            }
            variations {
              nodes {
                variationId
                name
                id
                price
                attributes {
                  nodes {
                    name
                    value
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default PRODUCTS_AND_CATEGORIES_QUERY;
