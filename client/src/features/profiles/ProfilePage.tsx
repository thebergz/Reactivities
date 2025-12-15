import {Divider, Grid2, Typography} from "@mui/material";
import ProfileContent from "./ProfileContent.tsx";
import ProfileHeader from "./ProfileHeader.tsx";
import {useParams} from "react-router";
import {useProfile} from "../../lib/hooks/useProfile.ts";

export default function ProfilePage() {
    const {id} = useParams();
    const {profile, loadingProfile} = useProfile(id);

    if (loadingProfile) return <Typography>Loading profile...</Typography>

    if (!profile) return <Typography>Profile not found</Typography>

    return (
        <Grid2 container>
            <Grid2 size={12}>
                <ProfileHeader profile={profile} />
                <ProfileContent/>
            </Grid2>
        </Grid2>
    )
}
