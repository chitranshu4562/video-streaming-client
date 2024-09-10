import {Backdrop, Box, LinearProgress} from "@mui/material";

export default function LinearBackdropLoader() {
    return (
        <>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={true}
                className={`d-flex align-items-baseline`}
            >
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            </Backdrop>
        </>
    )
}
