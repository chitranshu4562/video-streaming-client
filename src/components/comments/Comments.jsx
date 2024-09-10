import {useEffect, useState} from "react";
import {getComments} from "../../api/commentApi.js";
import AddComment from "./add-comment/AddComment.jsx";
import {useQuery} from "@tanstack/react-query";

export default function Comments({ videoId }) {
    const { data, isSuccess } = useQuery({
        queryKey: ['comments'],
        queryFn: getComments
    });

    return (
        <>
            <AddComment
                videoId={videoId}
            />
            {isSuccess && (
                <ul>
                    {data.data.comments.map(comment => {
                        return (
                            <li key={comment._id}>{comment.content}</li>
                        )
                    })}
                </ul>
            )}
        </>
    )
}
