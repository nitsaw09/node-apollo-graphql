const { GraphqlErrorException, HttpCodes } = require('../utils/helpers');
const { Errors } = require('./constants');

module.exports = (prisma) => {
    const userQuery = {};
    const userMutation = {};
    
    // User query to get all users
    userQuery.users = () => {
        return prisma.user.findMany({
            where: { deletedAt: null }
        });
    }

    // User query to get user by user id
    userQuery.user = async (_, { id }) => {
        const user = await prisma.user.findUnique({
          where: {
            id: Number(id),
          },
        })
        return user
    }

    // User mutation to create new user
    userMutation.createUser = async (_, { name, email }) => {
        const userExist = await prisma.user.findUnique({
            where: {
              email: email.toLowerCase().trim(),
            },
        });
        if (userExist) {
            throw GraphqlErrorException(HttpCodes.CONFLICT, Errors.USER_EMAIL_ALREADY_EXISTS);
        }
        const newUser = await prisma.user.create({
            data: {
              name: name,
              email: email.toLowerCase(),
            },
        });
        return newUser;
    }

    // User mutation to update user by user id
    userMutation.updateUser = async (_, { id, name, email }) => {
        const userExist = await prisma.user.findUnique({
            where: { id },
        });
        if (!userExist) {
            throw GraphqlErrorException(HttpCodes.NOT_FOUND, Errors.USER_NOT_FOUND);
        }
        const updatedUser = await prisma.user.update({
            where: { id },
            data: { name, email },
        });
        return updatedUser;
    }

    // User mutation to delete user by user id
    userMutation.deleteUser = async (_, { id }) => {
        const userExist = await prisma.user.findUnique({
            where: { id },
        });
        if (!userExist) {
            throw GraphqlErrorException(HttpCodes.NOT_FOUND, Errors.USER_NOT_FOUND);
        }
        const deleteUser = await prisma.user.update({
            where: { id },
            data: { deletedAt: now() },
        });
        return deleteUser;
    }

    return {
        userQuery,
        userMutation
    }
}
