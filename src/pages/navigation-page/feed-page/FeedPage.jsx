import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getFeed} from "../../../api/feedApi.js";
import CircularBackdrop from "../../../components/circular-backdrop/CircularBackdrop.jsx";
import ContentCard from "../../../components/content-card/ContentCard.jsx";
import classes from "./FeedPage.module.css";
import {fetchVideoById} from "../../../api/videosApi.js";

export default function FeedPage() {
    const queryClient = useQueryClient();
    const { isPending, isError, data: videos, error, isSuccess } = useQuery({
        queryKey: ['feed'],
        queryFn: getFeed,
        select: (response) => {
            return response.data.data
        }
    });

    const handleFetchVideoById = (id) => {
        queryClient.invalidateQueries(['feed'])
        // fetchVideoById(id).then(response => {
        //     const temp = videos.map(video => {
        //         if (response.data.data._id.toString() === video._id.toString()) {
        //             return response.data.data;
        //         }
        //     })
        //     queryClient.setQueryData(['feed'], temp);
        // }).catch(err => {
        //     console.error(err.response.data);
        // });
    };

    return (
        <>
            {isPending && <CircularBackdrop/>}
            {isSuccess && (
                <div className={`my-auto ${classes.feedContainer}`}>
                    {videos.map((video) => {
                        return (
                            <ContentCard
                                video={video}
                                key={video._id}
                                onAction={handleFetchVideoById}
                            />
                        )
                    })}
                </div>
            )}
        </>
    )
}
