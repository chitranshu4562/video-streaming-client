import {useQuery} from "@tanstack/react-query";
import {getFeed} from "../../../api/feedApi.js";
import CircularBackdrop from "../../../components/circular-backdrop/CircularBackdrop.jsx";
import ContentCard from "../../../components/content-card/ContentCard.jsx";
import classes from "./FeedPage.module.css";

export default function FeedPage() {
    const { isPending, isError, data: videos, error, isSuccess } = useQuery({
        queryKey: ['feed'],
        queryFn: getFeed
    })
    return (
        <>
            {isPending && <CircularBackdrop/>}
            {isSuccess && (
                <div className={`my-auto ${classes.feedContainer}`}>
                    {videos.data.data.map((video) => {
                        return (
                            <ContentCard video={video} key={video._id}/>
                        )
                    })}
                </div>
            )}
        </>
    )
}
