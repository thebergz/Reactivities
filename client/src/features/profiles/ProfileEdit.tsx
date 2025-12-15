import {Box, Button, Paper} from "@mui/material";
import TextInput from "../../app/shared/components/TextInput.tsx";
import {StandardSchemaV1} from "zod/lib/standard-schema";
import {useAccount} from "../../lib/hooks/useAccount.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {EditProfileSchema, editProfileSchema} from "../../lib/schemas/editProfileSchema.ts";
import {useProfile} from "../../lib/hooks/useProfile.ts";
import Props = StandardSchemaV1.Props;
import {useEffect} from "react";
import {useParams} from "react-router";

type Props = {
    setEditMode: (editMode: boolean) => void;
}

export default function ProfileEdit({setEditMode}: Props) {
    const { id } = useParams();
    const { updateProfile, profile } = useProfile(id);
    const { control, handleSubmit, reset, formState: { isDirty, isValid } }  = useForm<EditProfileSchema>({
        mode: 'onTouched',
        resolver: zodResolver(editProfileSchema)
    });

    const onSubmit = async (data: EditProfileSchema) => {
        await updateProfile.mutate(data, {
            onSuccess: () => setEditMode(false)
        });
    }

    useEffect(() => {
        reset({
            displayName: profile?.displayName,
            bio: profile?.bio || ''
        });
    }, [profile, reset]);

    return (
        <Box component='form'
             onSubmit={handleSubmit(onSubmit)}
             display='flex'
             flexDirection='column'
             alignContent='center'
             gap={3}
             mt={3}
        >
            <TextInput label='Display Name' name='displayName' control={control} />
            <TextInput
                label='Add your bio'
                name='bio'
                control={control}
                multiline
                rows={4}
            />
            <Button
                type='submit'
                variant='contained'
                disabled={!isValid || !isDirty || updateProfile.isPending}
            >
                Update profile
            </Button>
        </Box>
    )
}
