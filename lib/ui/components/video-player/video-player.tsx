
import { Fragment, useCallback, useRef } from "react";
import styles from './video-player.module.scss';

interface Props {
    videoUrl?: string;  // Thay videoId bằng videoUrl
    width?: number;
    height?: number;
    onReady?: (playerRef: HTMLVideoElement) => void
    onStateChange?: (event: React.SyntheticEvent<HTMLVideoElement>) => void
}

export default function VideoPlayer(props: Props) {
    const { videoUrl, onReady, onStateChange } = props;
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const width = props.width || 640;
    const height = props.height || 360;

    const onLoadedMetadataHandler = useCallback(() => {
        if (videoRef.current && onReady) {
            onReady(videoRef.current);
        }
    }, [onReady]);

    const onPlayHandler = useCallback((event: React.SyntheticEvent<HTMLVideoElement>) => {
        if (onStateChange) {
            onStateChange(event);
        }
    }, [onStateChange]);

    return (
        <Fragment>
            <video
                ref={videoRef}
                className={styles.videoPlayer}
                width={width}
                height={height}
                controls
                onLoadedMetadata={onLoadedMetadataHandler}
                onPlay={onPlayHandler}
                src={videoUrl}
                autoPlay
            >
                Your browser does not support the video tag.
            </video>
        </Fragment>
    );
}
