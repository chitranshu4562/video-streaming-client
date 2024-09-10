import classes from "./ContentCard.module.css";
import {useState} from "react";
import CustomModal from "../custom-modal/CustomModal.jsx";
import VideoPlayer from "../video-player/VideoPlayer.jsx";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {IconButton} from "@mui/material";
import {useMutation} from "@tanstack/react-query";

export default function ContentCard({ video }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleClickCard = () => {
        handleOpen();
    }

    return (
        <>
            <CustomModal
                open={isOpen}
                classNames="p-0"
                onClickOutside={handleClose}
            >

                <VideoPlayer
                    url={video.fileUrl}
                />
            </CustomModal>
            <div>
                <div
                    className={classes.cardContainer}
                    onClick={handleClickCard}
                >
                    <img src={video.thumbnail}/>
                    <span>{video.description}</span>
                </div>
                <div>
                    <div className={`d-flex gap-2 mt-2`}>
                        <IconButton
                            disabled={isDisliked}
                            onClick={() => setIsLiked(prevState => !prevState)}
                        >
                            <ThumbUpIcon
                                color={isLiked ? 'success' : ''}
                            />
                        </IconButton>
                        <IconButton
                            disabled={isLiked}
                            onClick={() => setIsDisliked(prevState => !prevState)}
                        >
                            <ThumbDownIcon
                                color={isDisliked ? 'error' : ''}
                            />
                        </IconButton>
                    </div>
                </div>
            </div>
        </>
    )
}
