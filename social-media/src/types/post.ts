export interface PostType {
  _id: string;
  authorId: string;
  description: string;
  mediaUrl?: string;
  type: "text" | "photo" | "video" | "poll" | "event";
  poll?: {
    option1: string;
    option2: string;
  };
  event?: {
    title: string;
    date: string;
  };
  createdAt: string;
  updatedAt: string;
}

// for posts coming from backend with extra authorInfo
export interface PostTypeWithAuthor extends PostType {
  authorInfo?: {
    name: string;
    avatar: string;
  };
}
