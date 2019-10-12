import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    hello: String!
    cats: [Cat!]!
    owners: [Owner!]!
  }

  type Owner {
    id: ID!
    name: String!
    cats: [Cat!]!
  }

  type Cat {
    id: ID!
    name: String!
    owner: Owner!
  }

  type Mutation {
    createCat(name: String!, owner: ID!): Cat!
    createOwner(name: String!): Owner!
    deleteCats: String!
  }
`
