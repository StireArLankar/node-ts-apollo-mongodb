import Cat from './models/Cat'
import Owner from './models/Owner'
import bcrypt from 'bcrypt'
import { Resolvers } from './resolvers-types'
import User from './models/User'
import { AuthenticationError } from 'apollo-server-express'

export const resolvers: Resolvers = {
  Owner: {
    id: (args) => args.id,
    name: (args) => args.name,
    cats: async (args) => {
      return await Cat.find({ owner: args.id })
    },
  },
  Cat: {
    id: (args) => args.id,
    name: (args) => args.name,
    owner: async (args) => {
      return await Owner.findById(args.owner)
    },
  },
  Query: {
    hello: () => 'hi',
    cats: async () => Cat.find(),
    owners: async (_, __, ctx) => {
      ctx.req.session!.userId = '123'
      return Owner.find()
    },
  },
  Mutation: {
    _: async (_, __, ctx) => ctx.customField,
    createCat: async (_, { input }) => {
      const kitty = new Cat(input)
      await kitty.save()
      return kitty
    },
    login: async (_, { login, password }, { req }) => {
      if (req.session!.login) {
        return `Already logged in! ${req.session!.login}`
      }

      const existingUser = await User.findOne({ login })

      if (!existingUser) {
        throw new AuthenticationError('No such user!')
      }

      const isPass = await bcrypt.compare(password, existingUser.password)

      if (!isPass) {
        throw new AuthenticationError('Bad pass!')
      }

      req.session!.login = login
      return `Success! ${req.session!.login}`
    },
    register: async (_, { login, password }, { req }) => {
      const existingUser = await User.findOne({ login })

      if (existingUser) {
        throw new AuthenticationError('User already exists!')
      }

      const pass = await bcrypt.hash(password, 10)

      const user = new User({ login, password: pass })

      await user.save()

      req.session!.login = login

      return 'Success!'
    },
    logout: async (_, __, { req }) => {
      if (req.session && req.session.login) {
        await new Promise((resolve) => {
          req.session!.destroy(() => resolve())
        })
        return `Logged out! ${JSON.stringify(req.session)}`
      }

      return `No account! ${JSON.stringify(req.session)}`
    },
    createOwner: async (_, { name }) => {
      const man = new Owner({ name })
      await man.save()
      return man
    },
    deleteCats: async () => {
      await Cat.deleteMany({})
      await Owner.updateMany(
        {},
        {
          $set: {
            cats: [],
          },
        }
      )
      return `Killed cats`
    },
  },
}
