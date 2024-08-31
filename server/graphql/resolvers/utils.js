export const postIncludeOptions = {
    author: true,
    currentVersion: true,
    categories: true,
    _count: {
        select: {
            likes: true, // Count the number of likes
        },
    },
};

export const postMapLikesCount = (posts) => {
    if (Array.isArray(posts)) {
        // Handle array of posts
        return posts.map(post => ({
            ...post,
            likes: post._count.likes, // Map the likes count to the likes field
        }));
    } else {
        // Handle single post
        return {
            ...posts,
            likes: posts._count.likes, // Map the likes count to the likes field
        };
    }
}