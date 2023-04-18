const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

const { userQuery, userMutation } = require('../users/resolver')(prisma);
const { postQuery, postMutation } = require('../posts/resolver')(prisma);

const Query = {
   ...userQuery,
   ...postQuery,
}

const Mutation = {
   ...userMutation,
   ...postMutation
}

module.exports = {
   Query,
   Mutation
}