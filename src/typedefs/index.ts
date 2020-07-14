import { gql } from 'apollo-server-express'
import cat from './Cat'
import owner from './Owner'

export const root = gql`
  directive @upper on FIELD_DEFINITION

  type Query {
    hello: String! @upper
  }

  type Mutation {
    _: String!
  }
`

export const typeDefs = [root, cat, owner]
