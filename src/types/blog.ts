/**
 * BlogPost interface - Type definition for blog post data
 * Defines the structure of a blog post object
 */
export interface BlogPost {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  author: string;
  date: string;
  likes: number;
  content: string;
}

