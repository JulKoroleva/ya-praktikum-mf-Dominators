export type TTopicComment = {
  id: number;
  message: string;
  creator: string;
  creatorId: number;
  topicId: number;
  updatedAt: string;
  createdAt: string;
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
};

export type TPaginationOptions = {
  page: number;
  total: number;
};

export interface ITopicListProps {
  topicList: TTopic[];
}

export interface ICreateTopicDto {
  title: string;
  description: string;
}
