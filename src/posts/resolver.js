const { GraphqlErrorException, HttpCodes } = require('../utils/helpers');
const { Errors } = require('./constants');

module.exports = (prisma) => {
    const postQuery = {};
    const postMutation = {};
    
    // Post query to get all posts
    postQuery.posts = () => {
        return prisma.post.findMany({
            where: { deletedAt: null }
        });
    }

    // Post query to get post by post id
    postQuery.post = async (_, { id }) => {
        const post = await prisma.post.findUnique({
          where: {
            id: Number(id),
          },
        })
        return post
    }

    // Post mutation to create new user
    postMutation.createPost = async (_, { title, content, published, authorId }) => {
        const newPost = await prisma.post.create({
            data: {
                title, content, published, authorId
            },
          });
        return newPost;
    }

    // post mutation to update post by post id
    postMutation.updatePost = async (_, { id, title, content, published, authorId }) => {
        const postExist = await prisma.post.findUnique({
            where: {
              id: Number(id),
            },
        })
        if (!postExist) {
            throw GraphqlErrorException(HttpCodes.NOT_FOUND, Errors.POST_NOT_FOUND);
        }
        const updatedPost = await prisma.post.update({
            where: { id },
            data: { title, content, published, authorId },
        });
        return updatedPost;
    }

    // Post mutation to delete post by post id
    postMutation.deletePost = async (_, { id }) => {
        const postExist = await prisma.post.findUnique({
            where: {
              id: Number(id),
            },
        })
        if (!postExist) {
            throw GraphqlErrorException(HttpCodes.NOT_FOUND, Errors.POST_NOT_FOUND);
        }
        const deleteUser = await prisma.post.update({
            where: { id },
            data: { deletedAt: now() },
        });
        return deleteUser;
    }
    
    return {
        postQuery,
        postMutation
    }
}
