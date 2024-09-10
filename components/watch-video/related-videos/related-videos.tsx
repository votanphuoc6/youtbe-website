
import { Fragment } from "react";
import styles from './related-videos.module.scss';
import VideoThumbnail from "@/lib/ui/components/video-thumbnail/video-thumbnail";
import VideoThumbnailLoader from "@/lib/ui/components/video-thumbnail-loader/video-thumbnail-loader";
import Link from "next/link";

interface Props {
    relatedVideos: any[]; // Nhận dữ liệu video từ props
}

export default function RelatedVideos({ relatedVideos }: Props) {
    // Nếu không có video liên quan hoặc đang tải
    if (!relatedVideos || relatedVideos.length === 0) {
        return (
            <div className={styles.videoList}>
                {new Array(10).fill('item').map((_, loaderIndex) => (
                    <div className={styles.thumbnailLoaderTemplate} key={loaderIndex}>
                        <VideoThumbnailLoader direction="vertical" />
                    </div>
                ))}
            </div>
        );
    }

    // Hiển thị danh sách video liên quan
    return (
        <Fragment>
            <div className={styles.host}>
                <div className={styles.videoList}>
                    {relatedVideos.map((video, videoIndex) => (
                        <a href={`/watch?v=${video.id}`}  key={videoIndex}>
                                   <div className={styles.thumbnailLoaderTemplate} key={videoIndex}>
                        <VideoThumbnailLoader video={video} direction="vertical"  />
                    </div> 
                        </a>
                    ))}
                </div>
            </div>
        </Fragment>
    );
}