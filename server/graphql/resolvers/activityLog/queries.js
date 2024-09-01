import { postMapLikesCount, postIncludeOptions } from "../utils.js";

const activityLogQueries = {
    getActivityLogs: async (_, args, { user, prisma }) => {
        if (!user) {
            throw new Error('Not Authenticated');
        }
        const userId = user.userId;
        try {
            const activities = await prisma.activityLog.findMany({
                where: { userId },
                include: {
                    user: true,
                    post: {
                        include: postIncludeOptions
                    }
                },
                orderBy: { createdAt: 'asc' }
            });

            // Map the posts with like counts and user-specific data
            const updatedActivities = activities.map(activity => ({
                ...activity,
                post: postMapLikesCount(activity.post, userId)
            }));

            return updatedActivities;
        } catch (error) {
            console.error('Error fetching activity logs:', error);
            throw new Error('Failed to fetch activity logs');
        }
    }
};

export default activityLogQueries;