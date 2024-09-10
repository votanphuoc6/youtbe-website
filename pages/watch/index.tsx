

import { Fragment } from "react";
import styles from './index.module.scss';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from 'axios';
import WatchVideoCard from "@/components/watch-video/watch-video-card/watch-video-card";
import RelatedVideos from "@/components/watch-video/related-videos/related-videos";
interface VideoData {
    link: string;
    title: string;
    description: string;
    statistics?: {
        viewCount?: number;
        likeCount?: number;
    };
    publishedAt?: string; // Ensure this field is defined if you need to use it
}

export default function WatchVideo() {
    const router = useRouter();
    const { v: videoId } = router.query;
    const [videoData, setVideoData] = useState<VideoData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [relatedVideos, setRelatedVideos] = useState<any[]>([]);

        useEffect(() => {
        if (videoId) {
            const fetchVideoData = async () => {
                try {
                    const videoResponse = await axios.get(`https://giataicuachaapi.azurewebsites.net/api/Videos/${videoId}`);
                    setVideoData(videoResponse.data);
    
                    // Lấy categoryId từ video hoặc chọn ngẫu nhiên nếu không có
                    const categoryId = videoResponse.data.categoryId || Math.floor(Math.random() * 17) + 1;
    
                    // Gọi API để lấy video liên quan với categoryId
                    const relatedVideosResponse = await axios.get(`https://giataicuachaapi.azurewebsites.net/api/Videos/filter?categoryId=${categoryId}`);
                    setRelatedVideos(Array.isArray(relatedVideosResponse.data.videos) ? relatedVideosResponse.data.videos : []);
                } catch (error) {
                    console.error("Failed to fetch video or related videos data", error);
                    setIsError(true);
                } finally {
                    setIsLoading(false);
                }
            };
    
            fetchVideoData();
        }
    }, [videoId])

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading video data.</div>;
    }

    return (
        <Fragment>
            <div className={styles.host}>
                <div className={styles.watchVideo}>
                    <div className={styles.videoCardWrapper}>
                        {videoData && <WatchVideoCard videoData={videoData} />}
                    </div>
                    <div className={styles.relatedVideosWrapper}>
                        <RelatedVideos relatedVideos={relatedVideos}   />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

