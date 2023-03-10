export interface Content {
  createdAt: string;
  id: number;
  writerId: number;
  title: string;
  likeCount: number;
  gameCategory: string;
  user: [Object];
}

export interface CommunityProps {
  data: {
    success: boolean;
    result: Content[];
  };
}
