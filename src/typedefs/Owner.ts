import { gql } from 'apollo-server-express'

export default gql`
  # Owner description
  type Owner {
    id: ID!
    name: String! @upper
    cats: [Cat!]!
  }

  extend type Query {
    owners: [Owner!]!
  }

  extend type Mutation {
    createOwner(name: String!): Owner!
  }
`
