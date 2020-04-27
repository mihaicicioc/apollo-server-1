/* eslint-disable no-unused-vars */

const { gql, UserInputError, ForbiddenError } = require('apollo-server');
const uuid = require('uuid');

const { users, posts } = require('./data');

const typeDefs = gql`
    # One line comment.

    """
    Documentation for a type.
    """
    type User {
        id: ID!
        name: String!
        age: Int
        """
        Documentation for a property.
        """
        address: Address
        posts: [Post]
        followers: [User]
    }

    type Address {
        city: String
        country: String
    }

    type Post {
        id: ID!
        userId: ID!
        title: String!
        content: String
    }
    
    input CreatePostInput {
        userId: ID!
        title: String!
        content: String
    }

    type Query {
        user(id: ID!): User
        users: [User]
        post(id: ID!): Post
    }

    type Mutation {
        createPost(input: CreatePostInput!): Post
        deletePost(id: ID!): Post
    }
`;

const resolvers = {
    Query: {
        async user(parentResult, args, context) {
            return users.find((user) => {
                return user.id === args.id;
            });
        },

        async users(parentResult, args, context) {
            return users;
        },

        async post(parentResult, args, context) {
            return posts.find((post) => {
                return post.id === args.id;
            });
        },
    },
    Mutation: {
        async createPost(parentResult, args, context) {
            // check if user exists.
            const user = users.find((u) => {
                return u.id === args.input.userId;
            });
            if (!user) {
                throw new UserInputError('The user does not exist.');
            }

            const post = {
                id: uuid.v4(),
                userId: args.input.userId,
                title: args.input.title,
                content: args.input.content,
            };

            posts.push(post);

            return post;
        },

        async deletePost(parentResult, args, context) {
            if (!context.isAdmin) {
                throw new ForbiddenError('Not allowed to perform this action.');
            }

            const idx = posts.findIndex((p) => {
                return p.id === args.id;
            });

            if (idx === -1) {
                return null;
            }

            return posts.splice(idx, 1)[0];
        },
    },
    User: {
        async posts(user, args, context) {
            return posts.filter((post) => {
                return post.userId === user.id;
            });
        },

        async followers(user, args, context) {
            // the "user" param here is the one that is
            // returned by resolvers.Query.user()
            return user.followerIds.map((fId) => {
                return users.find((u) => {
                    return u.id === fId;
                });
            });
        },
    },

    // notice that we don't define a resolver for the type Address.
    // GraphQL knows how to map the data object properties (i.e. users[0].address.city)
    // to the Address type properties from the schema def (i.e. Address.city).

    // also, GraphQL only returns the properties defined in the schema def.
    // so even though we have the object property users[0].address.countryCode,
    // that property does not exist on type Address, so GraphQL will ignore it.
};

module.exports = {
    typeDefs,
    resolvers,
};
