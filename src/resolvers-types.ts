import { GraphQLResolveInfo } from 'graphql';
import { ICat } from './models/Cat';
import { IOwner } from './models/Owner';
import { IContext } from './context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};


export type Cat = {
  __typename?: 'Cat';
  /**
   * Description for field
   * Supports **multi-line** description for your [API](http://example.com)!
   */
  id: Scalars['ID'];
  name: Scalars['String'];
  owner: Maybe<Owner>;
};

/** Description for the input */
export type CreateCatInput = {
  name: Scalars['String'];
  owner: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _: Scalars['String'];
  createCat: Cat;
  createOwner: Owner;
  deleteCats: Scalars['String'];
  login: Scalars['String'];
  logout: Scalars['String'];
  register: Scalars['String'];
};


export type MutationCreateCatArgs = {
  input: CreateCatInput;
};


export type MutationCreateOwnerArgs = {
  name: Scalars['String'];
};


export type MutationLoginArgs = {
  login: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  login: Scalars['String'];
  password: Scalars['String'];
};

export type Owner = {
  __typename?: 'Owner';
  id: Scalars['ID'];
  name: Scalars['String'];
  cats: Array<Cat>;
};

export type Query = {
  __typename?: 'Query';
  cats: Array<Cat>;
  hello: Scalars['String'];
  owners: Array<Owner>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Cat: ResolverTypeWrapper<ICat>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Owner: ResolverTypeWrapper<IOwner>;
  Mutation: ResolverTypeWrapper<{}>;
  CreateCatInput: CreateCatInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Cat: ICat;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Owner: IOwner;
  Mutation: {};
  CreateCatInput: CreateCatInput;
  Boolean: Scalars['Boolean'];
}>;

export type UpperDirectiveArgs = {  };

export type UpperDirectiveResolver<Result, Parent, ContextType = IContext, Args = UpperDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CatResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Cat'] = ResolversParentTypes['Cat']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner: Resolver<Maybe<ResolversTypes['Owner']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MutationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createCat: Resolver<ResolversTypes['Cat'], ParentType, ContextType, RequireFields<MutationCreateCatArgs, 'input'>>;
  createOwner: Resolver<ResolversTypes['Owner'], ParentType, ContextType, RequireFields<MutationCreateOwnerArgs, 'name'>>;
  deleteCats: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  login: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'login' | 'password'>>;
  logout: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  register: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'login' | 'password'>>;
}>;

export type OwnerResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Owner'] = ResolversParentTypes['Owner']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cats: Resolver<Array<ResolversTypes['Cat']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type QueryResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  cats: Resolver<Array<ResolversTypes['Cat']>, ParentType, ContextType>;
  hello: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owners: Resolver<Array<ResolversTypes['Owner']>, ParentType, ContextType>;
}>;

export type Resolvers<ContextType = IContext> = ResolversObject<{
  Cat: CatResolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
  Owner: OwnerResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = IContext> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = IContext> = ResolversObject<{
  upper: UpperDirectiveResolver<any, any, ContextType>;
}>;


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = IContext> = DirectiveResolvers<ContextType>;