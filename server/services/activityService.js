import prisma from '../prisma/db.js';
// eslint-disable-next-line no-unused-vars
import { ActivityAction } from '@prisma/client';

/**
 * Logs an activity in the ActivityLog table.
 * @param {ActivityAction} actionType - The type of activity (POST, LIKE, COMMENT).
 * @param {number} userId - The ID of the user performing the action.
 * @param {number} postId - The ID of the post being acted upon.
 */
export async function logActivity(actionType, userId, postId) {
    try {
        await prisma.activityLog.create({
            data: {
                actionType: actionType,
                userId: userId,
                postId: postId
            }
        });
    } catch (error) {
        console.error('Error logging activity:', error);
        throw new Error('Failed to log activity');
    }
}