import classes from "./ContentCard.module.css";
import {useEffect, useState} from "react";
import CustomModal from "../custom-modal/CustomModal.jsx";
import VideoPlayer from "../video-player/VideoPlayer.jsx";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {IconButton, Typography} from "@mui/material";
import {performAction} from "../../api/videosApi.js";
import {useSelector} from "react-redux";
import {useMutation} from "@tanstack/react-query";
import Comments from "../comments/Comments.jsx";

export default function ContentCard({ video, onAction }) {
    const loggedInUser = useSelector(state => state.authData.user);
    const { mutate } = useMutation({
        mutationFn: (data) => performAction(data),
        onSuccess: (response) => {
            console.log(response.data);
            onAction(video._id);
        },
        onError: (err) => {
            console.error(err.response.data);
        }
    });
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

    const handleAction = (type, action) => {
        const data = {
            videoId: video._id,
            isLike: type,
            action: action
        };
        mutate(data);
    };

    useEffect(() => {
        if (video.dislikes.length > 0) {
            for (const ele of video.dislikes) {
                if (ele.toString() === loggedInUser.id) {
                    setIsDisliked(true);
                    break;
                }
            }
        }
        if (video.likes.length > 0) {
            for (const ele of video.likes) {
                if (ele.toString() === loggedInUser.id) {
                    setIsLiked(true);
                    break;
                }
            }
        }
    }, []);

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
                            onClick={() => {
                                const action = isLiked ? 'REMOVE' : 'ADD';
                                handleAction(true, action);
                                setIsLiked(prevState => !prevState);
                            }}
                        >
                            <ThumbUpIcon
                                color={isLiked ? 'success' : ''}
                            /><Typography
                            className="p-2"
                        >{video.likes.length}</Typography>
                        </IconButton>
                        <IconButton
                            disabled={isLiked}
                            onClick={() => {
                                const action = isDisliked ? 'REMOVE' : 'ADD';
                                handleAction(false, action);
                                setIsDisliked(prevState => !prevState)
                            }}
                        >
                            <ThumbDownIcon
                                color={isDisliked ? 'error' : ''}
                            /><Typography
                            className="p-2"
                        >{video.dislikes.length}</Typography>
                        </IconButton>
                    </div>
                </div>
                <div>
                    <Comments
                        videoId={video._id}
                    />
                </div>
            </div>
        </>
    )
}
