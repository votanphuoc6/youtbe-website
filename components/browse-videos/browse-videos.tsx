
// import { Fragment, useEffect, useState } from 'react';
// import styles from './browse-videos.module.scss';
// import MiniSidebar from '../mini-sidebar/mini-sidebar';
// import axios from 'axios';
// import Link from 'next/link';
// import BrowserVideosLoader from './browse-videos-loader/browse-videos-loader';
// import BrowseVideosEmpty from './browse-videos-empty/browse-videos-empty';
// import BrowseVideosError from './browse-videos-error/browse-videos-error';
// import VideoThumbnail from '@/lib/ui/components/video-thumbnail/video-thumbnail'; // Import VideoThumbnail component

// interface Video {
//     id: string;
//     categoryId: string;
//     title: string;
//     link: string;
//     description?: string;
//     thumbnailUrl?: string;
//     viewCount?: string;
//     publishedAt?: string;
//     channel?: string;
//     duration?: string;
// }
// const getRandomCategoryId = () => Math.floor(Math.random() * 10) + 1;

// export default function BrowserVideos() {
//     const [videoItems, setVideoItems] = useState<Video[]>([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<Error | null>(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);

//     useEffect(() => {
//         const fetchVideoItems = async () => {
//             setIsLoading(true);
//             try {
//                 // Replace with the correct API URL and adjust according to your API response
//                 const response = await axios.get(`https://giataicuachaapi.azurewebsites.net/api/Videos?pageNumber=${currentPage}&pageSize=20`);
//                 setVideoItems(response.data.videos);
//                 setTotalPages(response.data.totalPages); // Adjust based on actual API response
//             } catch (err) {
//                 setError(err as Error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchVideoItems();
//     }, [currentPage]);

//     if (error) {
//         return <BrowseVideosError />;
//     }

//     if (isLoading) {
//         return <BrowserVideosLoader />;
//     }

//     if (videoItems.length === 0) {
//         return <BrowseVideosEmpty />;
//     }

//     return (
//         <Fragment>
//             <div className={styles.browseVideos}>
//                 <div className={styles.browseVideos__sidenav}>
//                     <MiniSidebar className={styles.miniSidebarWrapper} />
//                 </div>

//                 <div className={styles.browseVideosList}>
//                     {videoItems.map((video, index) => (
                        
//                         <div className={styles.videoPlayer} key={index}>
//                             {/* Wrap the thumbnail and link */}
//                             <Link href={`/watch?v=${video.id}`} passHref>
//                              <VideoThumbnail
//                                     searchItem={{
//                                         snippet: {
//                                             title: video.title,
//                                             channelTitle: video.channel || "Pháp Quang Sen Hồng",
//                                             publishedAt: video.publishedAt || new Date().toISOString(),
//                                             description: video.description || "No Description Available",
//                                             thumbnails: {
//                                                 default: {
//                                                     url: video.thumbnailUrl || '/default-thumbnail.jpeg',
//                                                     width: 120,
//                                                     height: 90
//                                                 },
//                                                 medium: {
//                                                     url: video.thumbnailUrl || '/default-thumbnail.jpeg',
//                                                     width: 320,
//                                                     height: 180
//                                                 },
//                                                 high: {
//                                                     url: video.thumbnailUrl || '/default-thumbnail.jpeg',
//                                                     width: 480,
//                                                     height: 360
//                                                 }
//                                             }
//                                         }
//                                     }}
//                                     direction="horizontal"
//                                     isNowPlaying={false}
//                                 />
//                             </Link>
//                         </div>
//                     ))}

              

//                 </div></div>
                
//                 <div className={styles.pagination}>
//                     {currentPage > 1 && (
//                         <button
//                             className={styles.pageButton}
//                             onClick={() => setCurrentPage(currentPage - 1)}
//                         >
//                             Previous
//                         </button>
//                     )}
//                     <span className={styles.pageInfo}>
//                         Page {currentPage} of {totalPages}
//                     </span>
//                     {currentPage < totalPages && (
//                         <button
//                             className={styles.pageButton}
//                             onClick={() => setCurrentPage(currentPage + 1)}
//                         >
//                             Next
//                         </button>
//                     )}
//                 </div>
//         </Fragment>
//     );
// }



import { Fragment, useEffect, useState } from 'react';
import styles from './browse-videos.module.scss';
import MiniSidebar from '../mini-sidebar/mini-sidebar';
import axios from 'axios';
import Link from 'next/link';
import BrowserVideosLoader from './browse-videos-loader/browse-videos-loader';
import BrowseVideosEmpty from './browse-videos-empty/browse-videos-empty';
import BrowseVideosError from './browse-videos-error/browse-videos-error';
import VideoThumbnail from '@/lib/ui/components/video-thumbnail/video-thumbnail'; // Import VideoThumbnail component

interface Video {
    id: string;
    categoryId: string;
    title: string;
    link: string;
    description?: string;
    thumbnailUrl?: string;
    viewCount?: string;
    publishedAt?: string;
    channel?: string;
    duration?: string;
}

const getRandomCategoryId = () => Math.floor(Math.random() * 10) + 1;

export default function BrowserVideos() {
    const [videoItems, setVideoItems] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState(Math.floor(Math.random() * 70) + 1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchVideoItems = async () => {
            setIsLoading(true);
            try {
                // Replace with the correct API URL and adjust according to your API response
                const response = await axios.get(`https://giataicuachaapi.azurewebsites.net/api/Videos?pageNumber=${currentPage}&pageSize=40`);
                setVideoItems(response.data.videos);
                setTotalPages(response.data.totalPages); 
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVideoItems();
    }, [currentPage]);

    if (error) {
        return <BrowseVideosError />;
    }

    if (isLoading) {
        return <BrowserVideosLoader />;
    }

    if (videoItems.length === 0) {
        return <BrowseVideosEmpty />;
    }

    return (
        <Fragment>
            <div className={styles.browseVideos}>
                <div className={styles.browseVideos__sidenav}>
                    <MiniSidebar className={styles.miniSidebarWrapper} />
                </div>

                <div className={styles.browseVideosList}>
                    {videoItems.map((video, index) => (
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
            
            {/* Hiển thị phân trang chỉ khi tổng số trang lớn hơn 1 */}
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    {currentPage > 1 && (
                        <button
                            className={styles.pageButton}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>
                    )}
                    <span className={styles.pageInfo}>
                        Page {currentPage} of {totalPages}
                    </span>
                    {currentPage < totalPages && (
                        <button
                            className={styles.pageButton}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    )}
                </div>
            )}
        </Fragment>
    );
}
