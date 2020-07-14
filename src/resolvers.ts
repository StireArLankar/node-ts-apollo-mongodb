import Cat from './models/Cat'
import Owner from './models/Owner'

import { Resolvers } from './resolvers-types'

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
    owners: async () => Owner.find(),
  },
  Mutation: {
    _: async (_, __, ctx) => ctx.customField,
    createCat: async (_, { input }) => {
      const kitty = new Cat(input)
      await kitty.save()
      return kitty
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
