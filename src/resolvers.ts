import Cat, { ICat } from './models/Cat'
import Owner, { IOwner } from './models/Owner'

export const resolvers = {
  Owner: {
    cats: async (args: IOwner) => {
      return await Cat.find({ owner: args.id })
    },
  },
  Cat: {
    owner: async (args: ICat) => {
      return await Owner.findById(args.owner)
    },
  },
  Query: {
    hello: () => 'hi',
    cats: () => Cat.find(),
    owners: () => Owner.find(),
  },
  Mutation: {
    createCat: async (_: any, { name, owner }: ICat) => {
      const kitty = new Cat({ name, owner })
      await kitty.save()
      return kitty
    },
    createOwner: async (_: any, { name }: IOwner) => {
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
