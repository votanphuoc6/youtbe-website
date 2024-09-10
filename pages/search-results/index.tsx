import { Fragment } from 'react';
import styles from './search-results.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import VideoThumbnail from '@/lib/ui/components/video-thumbnail/video-thumbnail';

export default function SearchResults() {
    const router = useRouter();
    const { videos } = router.query;

    // Kiểm tra nếu không có dữ liệu
    if (!videos) {
        return <div>No search results found</div>;
    }

    // Parse dữ liệu video từ query
    const videoItems = JSON.parse(videos as string);

    return (
        <Fragment>
            <div className={styles.browseVideos}>
                <div className={styles.browseVideosList}>
                    {videoItems.map((video: any, index: number) => (
                        <div className={styles.videoPlayer} key={index}>
                            {/* Wrap the thumbnail and link */}
                            <Link href={`/watch?v=${video.id}`} passHref>
                                <VideoThumbnail
                                    searchItem={{
                                        snippet: {
                                            title: video.title,
                                            channelTitle: video.channel || "Pháp Quang Sen Hồng",
                                            publishedAt: video.publishedAt || new Date().toISOString(),
                                            description: video.description || "No Description Available",
                                            thumbnails: {
                                                default: {
                                                    url: video.thumbnailUrl || '/default-thumbnail.jpeg',
                                                    width: 120,
                                                    height: 90
                                                },
                                                medium: {
                                                    url: video.thumbnailUrl || '/default-thumbnail.jpeg',
                                                    width: 320,
                                                    height: 180
                                                },
                                                high: {
                                                    url: video.thumbnailUrl || '/default-thumbnail.jpeg',
                                                    width: 480,
                                                    height: 360
                                                }
                                            }
                                        }
                                    }}
                                    direction="horizontal"
                                    isNowPlaying={false}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
}
