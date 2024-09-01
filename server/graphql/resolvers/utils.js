export const postIncludeOptions = {
    author: true,
    currentVersion: true,
    categories: true,
    likes: true,
    _count: {
        select: {
            likes: true, // Count the number of likes
        },
    },
};

export const postMapLikesCount = (posts, userId) => {
    // Helper function to determine if the current user has liked the post
    const isLikedByCurrentUser = (post, userId) => {
        return post.likes.some((like) => like.id === userId);
    };

    if (Array.isArray(posts)) {
        // Handle array of posts
        return posts.map(post => ({
            ...post,
            likes: post._count.likes, // Map the likes count to the likes field
            likedByCurrentUser: isLikedByCurrentUser(post, userId)
        }));
    } else {
        // Handle single post
        return {
            ...posts,
            likes: posts._count.likes, // Map the likes count to the likes field
            likedByCurrentUser: isLikedByCurrentUser(posts, userId)
        };
    }
}