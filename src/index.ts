import { ApolloServer, SchemaDirectiveVisitor } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import { resolvers } from './resolvers'
import { typeDefs } from './typeDefs'
import {
  GraphQLField,
  GraphQLObjectType,
  GraphQLInterfaceType,
  defaultFieldResolver,
} from 'graphql'
import { IContext } from './context'

import session from 'express-session'
import ConnectMongo from 'connect-mongo'

const MongoStore = ConnectMongo(session)

class UpperCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(
    field: GraphQLField<any, any>,
    details: {
      objectType: GraphQLObjectType | GraphQLInterfaceType
    }
  ): GraphQLField<any, any> | void | null {
    const { resolve = defaultFieldResolver } = field

    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args)

      if (typeof result === 'string') {
        return result.toUpperCase()
      }

      return result
    }
  }
}

const startServer = async () => {
  const app = express()

  await mongoose
    .connect('mongodb://mongo:27017/node-ta-apollo-mongodb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB is running'))
    .catch((err: Error) => console.log(err))

  app.use(
    session({
      name: 'qid',
      secret: 'secret',
      saveUninitialized: false, // don't create session until something stored
      resave: false, //don't save session if unmodified
      store: new MongoStore({ mongooseConnection: mongoose.connection, touchAfter: 24 * 3600 }),
    })
  )

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
      upper: UpperCaseDirective,
    },
    context: ({ req, res }): IContext => {
      // const token = req.headers.authorization || '';

      // const user = getUser(token);

      return { customField: 'hello world', req, res }
    },
  })

  server.applyMiddleware({ app })

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  )
}

startServer()
