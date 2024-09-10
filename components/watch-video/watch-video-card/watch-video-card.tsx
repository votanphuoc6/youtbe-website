


// import { Fragment, useEffect, useState } from "react";
// import styles from './watch-video-card.module.scss';
// import { useRouter } from "next/router";
// import axios from 'axios';
// import VideoThumbnailLoader from "@/lib/ui/components/video-thumbnail-loader/video-thumbnail-loader";
// import { Button } from "@mui/material";
// import { Share, ThumbDown } from "@mui/icons-material";
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
// import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
// import ShareVideoDialog from "./share-video-dialog/share-video-dialog";
// import { ytdAbbreviateNumber } from "@/lib/ui/pipes/abbreviate-number/abbreviate-number.pipe";

// interface VideoData {
//     link: string;
//     title: string;
//     description: string;
//     statistics?: {
//         viewCount?: number;
//         likeCount?: number;
//     };
//     publishedAt?: string; // Ensure this field is defined if you need to use it
// }

// export default function WatchVideoCard() {
//     const router = useRouter();
//     const { v: videoId } = router.query; // Extract video ID from the URL query parameters
//     const [videoData, setVideoData] = useState<VideoData | null>(null);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const [isError, setIsError] = useState<boolean>(false);
//     const [isShareDialogOpen, setIsShareDialogOpen] = useState<boolean>(false);
//     const [isLiked, setIsLiked] = useState<boolean>(false);
//     const [isDisliked, setIsDisliked] = useState<boolean>(false);
//     const [videoUrl, setVideoUrl] = useState<string>('');

//     // Fetch the video data based on the video ID
//     useEffect(() => {
//         if (videoId) {
//             setIsLoading(true);
//             axios.get(`https://giataicuachaapi.azurewebsites.net/api/Videos/${videoId}`)
//                 .then(response => {
//                     const videoData = response.data;
//                     setVideoData({
//                         link: videoData.link,
//                         title: videoData.title,
//                         description: videoData.description,
//                         statistics: videoData.statistics,
//                         publishedAt: videoData.publishedAt // Ensure this is correctly set if you use it
//                     });
//                     setVideoUrl(window.location.href);
//                     setIsLoading(false);
//                 })
//                 .catch(error => {
//                     console.error("Error fetching video data: ", error);
//                     setIsError(true);
//                     setIsLoading(false);
//                 });
//         }
//     }, [videoId]);

//     if (isLoading) {
//         return (
//             <div className={styles.videoCardLoader}>
//                 <VideoThumbnailLoader direction="horizontal" />
//             </div>
//         );
//     }

//     if (isError || !videoData) {
//         return <div>Failed to load the video. Please try again later.</div>;
//     }

//     return (
//         <Fragment>
//             <div className={styles.videoCard}>
//                 {/* Video element to display video from the API link */}
//                 <video controls width="100%" height="auto">
//                     <source src={videoData.link} type="video/mp4" />
//                     Your browser does not support the video tag.
//                 </video>
//                 <h1>{videoData.title}</h1>
//                 <p>{videoData.description}</p>
//             </div>

//             <div className={styles.videoDetails__footer}>
//                 <div className={`${styles.videoDetails__footer__views} mat-h3`}>
//                     <span>{videoData.statistics?.viewCount} views </span>
//                     <span> • {videoData.publishedAt ? new Date(videoData.publishedAt).toDateString() : ''} </span>
//                 </div>

//                 <div className={styles.videoDetailsActions}>
//                     <Button sx={{ color: 'var(--yt-spec-text-primary)' }} className={styles.videoDetailsActions__item} onClick={() => setIsLiked(!isLiked)}>
//                         {isLiked ? <ThumbUpIcon className={styles.videoDetailsActions__item__icon} /> : <ThumbUpOffAltIcon className={styles.videoDetailsActions__item__icon} />}
//                         <p className={`${styles.videoDetailsActions__item__text} mat-h3`}>
//                             {ytdAbbreviateNumber(Number(videoData.statistics?.likeCount), 0)} LIKES
//                         </p>
//                     </Button>

//                     <Button sx={{ color: 'var(--yt-spec-text-primary)' }} className={styles.videoDetailsActions__item} onClick={() => setIsShareDialogOpen(true)}>
//                         <Share className={styles.videoDetailsActions__item__icon} />
//                         <p className={`${styles.videoDetailsActions__item__text} mat-h3`}>
//                             SHARE
//                         </p>
//                     </Button>

//                     {/* <ShareVideoDialog
//                         open={isShareDialogOpen}
//                         handleClose={() => setIsShareDialogOpen(false)}
//                         currentVideoTime={0}
//                         videoUrl={videoUrl}
//                     /> */}
//                 </div>
//             </div>
//         </Fragment>
//     );
// }


import { Fragment, useState } from "react";
import styles from './watch-video-card.module.scss';
import { Button } from "@mui/material";
import { Share, SyncTwoTone, ThumbDown } from "@mui/icons-material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ShareVideoDialog from "./share-video-dialog/share-video-dialog";
import { ytdAbbreviateNumber } from "@/lib/ui/pipes/abbreviate-number/abbreviate-number.pipe";

interface VideoData {
    link: string;
    title: string;
    description: string;
    statistics?: {
        viewCount?: number;
        likeCount?: number;
    };
    publishedAt?: string;
}

interface WatchVideoCardProps {
    videoData: VideoData;
}

export default function WatchVideoCard({ videoData }: WatchVideoCardProps) {
    const [isShareDialogOpen, setIsShareDialogOpen] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isDisliked, setIsDisliked] = useState<boolean>(false);

    return (
        <Fragment>
            <div className={styles.videoCard}>
                <div className={styles.videoCard}>
                    <video controls autoPlay width="100%" height="auto">
                        <source src={videoData.link} type="video/mp4" />  Your browser does not support the video tag.
                    </video>
                    <p>{videoData.description}</p>
                </div>
                <div className={styles.videoDetailsActions}>
                    <h1>{videoData.title}</h1>
<div className={styles.videoDetailsActionsButton}>
                    <Button sx={{ color: 'var(--yt-spec-text-primary)' }} className={styles.videoDetailsActions__item} onClick={() => setIsLiked(!isLiked)}>
                        {isLiked ? <ThumbUpIcon className={styles.videoDetailsActions__item__icon} /> : <ThumbUpOffAltIcon className={styles.videoDetailsActions__item__icon} />}
                        <p className={`${styles.videoDetailsActions__item__text} mat-h3`}>
                            {ytdAbbreviateNumber(Number(videoData.statistics?.likeCount), 0)} LIKES
                        </p>
                    </Button>

                    <Button sx={{ color: 'var(--yt-spec-text-primary)' }} className={styles.videoDetailsActions__item} onClick={() => setIsShareDialogOpen(true)}>
                        <Share className={styles.videoDetailsActions__item__icon} />
                        <p className={`${styles.videoDetailsActions__item__text} mat-h3`}>
                            SHARE
                        </p>
                    </Button></div>
                </div>
            </div>
        </Fragment>
    );
}