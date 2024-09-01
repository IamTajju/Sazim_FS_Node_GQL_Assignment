// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Typography, RadioGroup, FormControlLabel, Radio, Stack, Box, CircularProgress } from '@mui/material';
import PostCard from '../components/posts/postCard';
import { GET_ACTIVITY_LOGS } from '../graphql/queries';

const ActivityLogPage = () => {
    const [filter, setFilter] = useState('All');
    const [activityLogs, setActivityLogs] = useState([]);

    const { loading, error } = useQuery(GET_ACTIVITY_LOGS, {
        onCompleted: (data) => {
            if (data && data.getActivityLogs) {
                setActivityLogs(data.getActivityLogs);
            }
        }
    });


    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredActivities = activityLogs.filter(log => {
        if (filter === 'All') return true;
        return log.actionType === filter;
    });

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Error fetching activity logs!</Typography>;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <Typography variant="h4" gutterBottom>Activity Log</Typography>

            <RadioGroup
                row
                aria-label="activity-filter"
                name="activity-filter"
                value={filter}
                onChange={handleFilterChange}
                sx={{ mb: 2 }}
            >
                <FormControlLabel value="All" control={<Radio />} label="All" />
                <FormControlLabel value="POST" control={<Radio />} label="Posts" />
                <FormControlLabel value="LIKE" control={<Radio />} label="Likes" />
                <FormControlLabel value="COMMENT" control={<Radio />} label="Comments" />
            </RadioGroup>

            <Stack spacing={2} sx={{ width: '100%', maxWidth: 800 }}>
                {filteredActivities.map((activity) => (
                    <Box key={activity.id} sx={{ p: 2 }}>
                        <Typography variant="body1" gutterBottom>
                            {(() => {
                                switch (activity.actionType) {
                                    case 'LIKE':
                                        return `You liked this post on ${new Date(activity.createdAt).toLocaleDateString()}`;
                                    case 'COMMENT':
                                        return `You commented on this post on ${new Date(activity.createdAt).toLocaleDateString()}`;
                                    case 'POST':
                                        return `You made this post on ${new Date(activity.createdAt).toLocaleDateString()}`;
                                    default:
                                        return `You performed an action on ${new Date(activity.createdAt).toLocaleDateString()}`;
                                }
                            })()}

                        </Typography>
                        <PostCard
                            post={activity.post}
                        />
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};

export default ActivityLogPage;
