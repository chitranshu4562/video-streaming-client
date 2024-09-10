import {Button, styled} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function UploadFileInput({ label, onChange, file, onRemove

}) {
    const handleFileInputChange = (event) => {
        onChange(event)
    }

    const fileDisplayStyle = {
        width: '5em',
        height: '5em'
    }

    let content;
    if (file) {
        if (file.type.startsWith('video')) {
            content = <video src={URL.createObjectURL(file)} style={fileDisplayStyle}/>
        } else {
            content = <img src={URL.createObjectURL(file)} style={fileDisplayStyle}/>
        }
    }

    return (
        <>
            <Button
                component="label"
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon/>}
                className={`my-2`}
            >
                {label}
                <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileInputChange}
                />
            </Button>
            {content && (
                <div>
                    {content}
                    <Button
                        variant="outlined"
                        onClick={() => onRemove()}
                    >Remove</Button>
                </div>
            )}
        </>
    )
}
