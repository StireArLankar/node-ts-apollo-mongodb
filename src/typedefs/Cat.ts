import { gql } from 'apollo-server-express'

export default gql`
  # Cat description
  type Cat {
    """
    Description for field
    Supports **multi-line** description for your [API](http://example.com)!
    """
    id: ID!
    name: String!
    owner: Owner
  }

  extend type Query {
    cats: [Cat!]!
  }

  extend type Mutation {
    createCat(input: CreateCatInput!): Cat!
    deleteCats: String!
  }

  "Description for the input"
  input CreateCatInput {
    name: String!
    owner: ID!
  }
`
