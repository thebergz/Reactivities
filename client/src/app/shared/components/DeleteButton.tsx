import {Box} from "@mui/material";
import {Delete, DeleteOutline} from "@mui/icons-material";

export default function DeleteButton() {
    return (
        <Box
            sx={{
                opacity: 0.8,
                transition: 'opacity 0.3s',
                position: 'relative',
                cursor: 'pointer',
            }}
        >
            <DeleteOutline
                sx={{
                    fontSize: 32,
                    color: 'white',
                    position: 'absolute',
                }}
            />
            <Delete
                sx={{
                    fontSize: 28,
                    color: 'red'
                }}
            />
        </Box>
    )
}
