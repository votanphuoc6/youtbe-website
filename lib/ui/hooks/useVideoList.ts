



import { useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '@/app.constants';
import { IYoutubeVideoResult } from '../models/youtube-video-list.model';
import { IYoutubeVideoListParams } from '../models/youtube-video-list-params';

export const useVideoList = () => {
    const [videoItems, setVideoItems] = useState<IYoutubeVideoResult[] | null>(null);
    const [relatedVideos, setRelatedVideos] = useState<IYoutubeVideoResult[] | null>(null);
    const [isVideoItemsLoading, setIsVideoItemsLoading] = useState(false);
    const [isRelatedVideosLoading, setIsRelatedVideosLoading] = useState(false);
    const [videoItemsError, setVideoItemsError] = useState<AxiosError | null>(null);
    const [relatedVideosError, setRelatedVideosError] = useState<AxiosError | null>(null);

    const fetchVideoItem = useCallback(async (params: any) => {
        const { id } = params;
        if (!id || id === 'undefined') {
            return;
        }

        setIsVideoItemsLoading(true);
        setVideoItemsError(null);

        try {
            const response = await axios.get(`${API_BASE_URL}/Videos/${id}`);
            setVideoItems(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setVideoItemsError(error);
            } else {
                throw (error);
            }
        }

        setIsVideoItemsLoading(false);
    }, []);

    const fetchRelatedVideos = useCallback(async (params: { categoryId: string }) => {
        const { categoryId } = params;
        if (!categoryId) {
            return;
        }

        setIsRelatedVideosLoading(true);
        setRelatedVideosError(null);

        try {
            // Example API endpoint for fetching related videos by category
            const response = await axios.get(`${API_BASE_URL}/Videos/filter?categoryId=${categoryId}`, {
                params: { categoryId }
            });
            setRelatedVideos(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setRelatedVideosError(error);
            } else {
                throw (error);
            }
        }

        setIsRelatedVideosLoading(false);
    }, []);

    return { 
        fetchVideoItem, 
        fetchRelatedVideos,
        videoItems, 
        isVideoItemsLoading, 
        videoItemsError,
        relatedVideos,
        isRelatedVideosLoading,
        relatedVideosError 
    };
};
