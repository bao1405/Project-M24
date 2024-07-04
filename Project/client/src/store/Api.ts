// api.ts
export const fetchPosts = async (): Promise<Post[]> => {
    // Example implementation: Fetching posts from an API
    const response = await fetch('https://api.example.com/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return data.posts; // Assuming the API returns an array of posts
  };
  
  export interface Post {
    id: number;
    user: {
      username: string;
      avatar: string;
    };
    imageUrl: string;
    comments: {
      user: string;
      text: string;
    }[];
  }
  