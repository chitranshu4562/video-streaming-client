import {useFormik} from "formik";
import {addComment} from "../../../api/commentApi.js";
import {useQueryClient} from "@tanstack/react-query";

export default function AddComment({ videoId }) {
    const queryClient = useQueryClient();
    const handleAddComment = (values) => {
        const data = {...values, videoId}
        addComment(data).then(response => {
            comment.handleReset();
            queryClient.invalidateQueries(['comments']);
        }).catch(error => {
            console.error(error.response.data);
        });
    };

    const comment = useFormik({
        initialValues: {
            content: ''
        },
        onSubmit: handleAddComment
    });

    return (
        <>
            <form
                onSubmit={comment.handleSubmit}
            >
                <input
                    className={`form-control`}
                    name="content"
                    value={comment.values.content}
                    onChange={comment.handleChange}
                    placeholder="Add a comment..."
                />
            </form>
        </>
    )
}
