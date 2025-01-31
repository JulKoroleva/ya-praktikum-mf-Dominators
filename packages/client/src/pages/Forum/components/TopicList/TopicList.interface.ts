export interface TTopicReaction {
  id: number;
  topicId?: number;
  commentId?: number;
  emoji: string;
  creatorId: number;
  createdAt?: Date;
  count: number;
}

export type TTopicComment = {
  id: number;
  message: string;
  creator: string;
  creatorId: number;
  topicId: number;
  updatedAt: string;
  createdAt: string;
  reactions?: TTopicReaction[];
};

export type TTopic = {
  id: number;
  title: string;
  description: string;
  creator: string;
  creatorId: number;
  comments: number;
  updatedAt: string;
  createdAt: string;
  commentsList?: TTopicComment[];
  reactions?: TTopicReaction[];
};

export type TPaginationOptions = {
  page: number;
  total: number;
};

export interface ITopicListProps {
  topicList: TTopic[];
}

export interface ICreateTopicDto {
  creatorId?: number;
  creator?: string;
  title: string;
  description: string;
}
