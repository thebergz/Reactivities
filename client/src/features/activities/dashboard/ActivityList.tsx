import {Box, Typography} from "@mui/material";
import ActivityCard from "./ActivityCard.tsx";
import {useActivities} from "../../../lib/hooks/useActivities.ts";

export default function ActivityList() {
    const {activities, isPending} = useActivities()

    if (isPending) return <Typography>Loading...</Typography>;

    if (!activities) return <Typography>No activities found</Typography>;

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
            {activities.map(activity => (
                <ActivityCard
                    key={activity.id}
                    activity={activity}
                />
            ))}
        </Box>
    )
}
