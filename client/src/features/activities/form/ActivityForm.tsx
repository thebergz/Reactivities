import {Box, Button, Paper, Typography} from "@mui/material";
import {useActivities} from "../../../lib/hooks/useActivities.ts";
import {useNavigate, useParams} from "react-router";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {activitySchema, type ActivitySchema} from "../../../lib/schemas/activitySchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import TextInput from "../../../app/shared/components/TextInput.tsx";
import {categoryOptions} from "./categoryOptions.ts";
import SelectInput from "../../../app/shared/components/SelectInput.tsx";
import DateTimeInput from "../../../app/shared/components/DateTimeInput.tsx";
import LocationInput from "../../../app/shared/components/LocationInput.tsx";
import {toast} from "react-toastify";

export default function ActivityForm() {
    const {  control, reset, handleSubmit } = useForm<ActivitySchema>({
        mode: 'onTouched',
        resolver: zodResolver(activitySchema)
    });
    const navigate = useNavigate();
    const { id } = useParams();
    const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);

    useEffect(() => {
        if (activity) reset({
                ...activity,
            location: {
                city: activity.city,
                venue: activity.venue,
                latitude: activity.latitude,
                longitude: activity.longitude
            }
        });
    }, [activity, reset]);

    const onSubmit = async (data: ActivitySchema) => {
        const {location, ...rest} = data;
        const flattenedData = {...rest, ...location};
        try {
            console.log(`Current activity: ${activity}`);
            if (activity) {
                updateActivity.mutate({...activity, ...flattenedData}, {
                    onSuccess: () => navigate(`/activities/${activity.id}`),
                    onError: () => toast.error( `${updateActivity.error}`),
                })
            } else {
                // @ts-ignore
                createActivity.mutate(flattenedData, {
                    onSuccess: (id) => navigate(`/activities/${id}`),
                    onError: () => toast.error( `${createActivity.error}`),
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (isLoadingActivity) return <Typography>Loading activity...</Typography>;

    return (
        <Paper sx={{borderRadius: 3, padding: 3}}>
            <Typography variant="h5" gutterBottom color="primary">
                {activity ? 'Edit Activity' : 'Create Activity'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={3}>
                <TextInput label='Title' control={control} name='title'/>
                <TextInput label='Description' control={control} name='description' multiline rows={3}/>
                <Box display="flex" gap={3}>
                    <SelectInput items={categoryOptions}
                                 label='Category'
                                 control={control}
                                 name='category'
                    />
                    <DateTimeInput label='Date' control={control} name='date'/>
                </Box>
                <LocationInput label='Enter the location' control={control} name='location'/>

                <Box display="flex" justifyContent="end" gap={3}>
                    <Button color="inherit">Cancel</Button>
                    <Button
                        type="submit"
                        color="success"
                        variant="contained"
                        disabled={updateActivity.isPending || createActivity.isPending}
                    >Submit</Button>
                </Box>
            </Box>
        </Paper>
    )
}
