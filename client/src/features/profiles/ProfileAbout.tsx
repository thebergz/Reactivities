import {useParams} from "react-router";
import {useProfile} from "../../lib/hooks/useProfile.ts";
import {Box, Button, Divider, Typography} from "@mui/material";

export default function ProfileAbout() {
    const {id} = useParams();
    const {profile} = useProfile(id);

    return (
        <Box>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="h5">About {profile?.displayName}</Typography>
                <Button>
                    Edit profile
                </Button>
            </Box>
            <Divider sx={{my: 2}}/>
            <Box sx={{overflow: 'auto', maxHeight: 350}}>
                <Typography variant="body2" sx={{whitespace: 'pre-wrap'}}>
                    {profile?.bio || "No description added yet"}
                </Typography>
            </Box>
        </Box>
    )
}
