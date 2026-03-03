import {Box, Typography} from "@mui/material";
import ActivityCard from "./ActivityCard.tsx";
import {useActivities} from "../../../lib/hooks/useActivities.ts";
import {useEffect} from "react";
import {useInView} from "react-intersection-observer";
import {observer} from "mobx-react-lite";

const ActivityList = observer(function ActivityList() {
    const {activitiesGroup, isPending, hasNextPage, fetchNextPage} = useActivities()
    const {ref, inView} = useInView({
        threshold: 0.5,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (isPending) return <Typography>Loading...</Typography>;

    if (!activitiesGroup) return <Typography>No activities found</Typography>;

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
            {activitiesGroup.pages.map((activities, index) => (
                <Box
                    key={index}
                    ref={index === activitiesGroup.pages.length - 1 ? ref : null} //Only appy the ref tpo the last element in the list
                    display='flex'
                    flexDirection='column'
                    gap={3}
                >
                    {activities.items.map(activity => (
                        <ActivityCard
                            key={activity.id}
                            activity={activity}
                        />
                    ))}

                </Box>
            ))}
        </Box>
    )
});

export default ActivityList;