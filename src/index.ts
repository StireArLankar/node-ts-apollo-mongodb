import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import { resolvers } from './resolvers'
import { typeDefs } from './typeDefs'

const startServer = async () => {
  const app = express()

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  server.applyMiddleware({ app })

  await mongoose
    .connect('mongodb://mongo:27017/node-ta-apollo-mongodb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB is running'))
    .catch((err: Error) => console.log(err))

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  )
}

startServer()
