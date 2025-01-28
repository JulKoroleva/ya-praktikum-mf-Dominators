export type TTopicComment = {
  id: number;
  topicId: number;
  author: string;
  createdAt: string;
  message: string;
  reactions: any
};

export type TTopic = {
  id: number;
  creator: string;
  comments: number;
  title: string;
  createdAt: string;
  description: string;
  messages: TTopicComment[];
  [key: string]: any;
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
