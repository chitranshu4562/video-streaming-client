import {Box, Modal} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
};

export default function CustomModal({ children, open, classNames, onClickOutside }) {
    return (
        <Modal
            open={open}
            onClose={onClickOutside}
        >
            <Box
                sx={style}
                className={classNames}
            >
                { children }
            </Box>
        </Modal>
    )
}
