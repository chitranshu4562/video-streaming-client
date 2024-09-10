import {Button} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {useState} from "react";
import CustomModal from "../custom-modal/CustomModal.jsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {uploadVideo} from "../../api/videosApi.js";
import UploadFileInput from "../upload-file-input/UploadFileInput.jsx";
import LinearBackdropLoader from "../linear-backdrop/LinearBackdropLoader.jsx";

export default function UploadVideo() {
    const queryClient = useQueryClient();
    const { mutate, isPending} = useMutation({
        mutationFn: (data) => uploadVideo(data),
        onSuccess: (result) => {
            console.log(result.data);
            queryClient.invalidateQueries({ queryKey: ['feed']});
            handleClose();
        },
        onError: (error) => {
            console.error(error);
        }
    })
    const [isOpen, setIsOpen] = useState(false);
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        handleReset();
        setIsOpen(false);
    }

    const handleVideoInputChange = (e) => {
        setVideoFile(e.target.files[0]);
    }

    const handleThumbnailChange = (e) => {
        setThumbnail(e.target.files[0])
    }

    const handleUploadVideo = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('description', description);
        formData.append('video', videoFile);
        formData.append('thumbnail', thumbnail);
        mutate(formData);
    }
null
    const handleReset = () => {
        setVideoFile(null);
        setThumbnail(null);
        setDescription('');
    }

    return (
        <>
            {isPending && <LinearBackdropLoader/>}
            <CustomModal
                open={isOpen}
                onClickOutside={handleClose}
            >
                <form onSubmit={handleUploadVideo}>
                    <div className={`form-group my-2`}>
                        <label htmlFor="description">Description</label>
                        <input
                            id="description"
                            type="text"
                            value={description}
                            className={`form-control`}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>

                    <UploadFileInput
                        label="Upload Thumbnail"
                        file={thumbnail}
                        onChange={handleThumbnailChange}
                        onRemove={() => setThumbnail(null)}
                    />

                    <UploadFileInput
                        label="Upload Video"
                        file={videoFile}
                        onChange={handleVideoInputChange}
                        onRemove={() => setVideoFile(null)}
                    />

                    <div className={`d-flex justify-content-center gap-2 my-2`}>
                        <Button onClick={handleClose} type="button" variant="contained">Cancel</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={!videoFile || !thumbnail || !description}
                        >Submit</Button>
                    </div>
                </form>
            </CustomModal>
            <div className={`d-flex justify-content-end px-4 py-2`}>
                <Button
                    variant="contained"
                    onClick={handleOpen}
                >
                    <FileUploadIcon/>
                    Upload Video
                </Button>
            </div>
        </>
    )
}
