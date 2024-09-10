
import { Fragment } from "react";
import styles from './video-thumbnail-loader.module.scss';
import classNames from "classnames";
import Image from "next/image";

interface Props {
    video?: any; // Đảm bảo nhận dữ liệu video
    direction?: 'vertical' | 'horizontal';
}

export default function VideoThumbnailLoader({ video, direction = 'horizontal' }: Props) {
    // Lấy các lớp CSS theo hướng được truyền (horizontal hoặc vertical)
    const thumbnailClasses = classNames(`${styles.thumbnail}`, {
        [styles['thumbnail--vertical']]: direction === 'vertical',
        [styles['thumbnail--horizontal']]: direction === 'horizontal'
    });

    // Sử dụng hình ảnh mặc định nếu không có thumbnail
    const thumbnailUrl = video?.thumbnail || '/images/default-thumbnail.jpeg';
    const title = video?.title || "Untitled";
    const channelTitle = video?.channel || "Pháp Quang Sen Hồng";
    const publishedAt = video?.publishedAt || "";

    return (
        <Fragment>
            <div className={styles.host}>
                <a className={thumbnailClasses}>
                    <div className={styles.thumbnail__image}>
                        <Image
                            src={thumbnailUrl}
                            alt={title}
                            width={120}
                            height={90}
                            objectFit="cover"
                        />
                    </div>

                    <div className={styles.thumbnailDetails}>
                        <div className={styles.thumbnailDetails__icon}></div>
                        <div className={styles.thumbnailDetailsContent}>
                            <h3 className={styles.thumbnailDetailsContent__title}>
                                {title}
                            </h3>
                            <h4 className={styles.thumbnailDetailsContent__channelTitle}>
                                {channelTitle}
                            </h4>
                            <p className={styles.thumbnailDetailsContent__footer}>
                                {publishedAt}
                            </p>
                        </div>
                    </div>
                </a>
            </div>
        </Fragment>
    );
}
