export interface Comment {
    id: string;
    author: string;
    content: string;
    timestamp: string;
}

export interface Post {
    id: string;
    content: string;
    author: string;
    likes: number;
    comments: Comment[];
    reposts: number;
    timestamp: string;
    youtubeUrl?: string;
    isLiked?: boolean;
    isReposted?: boolean;
} 