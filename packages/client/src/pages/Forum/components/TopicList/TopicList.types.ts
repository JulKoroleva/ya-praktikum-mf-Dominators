export type TTopicComment = {
  id: number;
  topicId: number;
  author: string;
  createdAt: string;
  message: string;
};

export type TTopic = {
  id: number;
  creator: string;
  comments: number;
  title: string;
  createdAt: string;
  description: string;
  messages: TTopicComment[];
};

export type TPaginationOptions = {
  page: number;
  total: number;
};

export type TTopicListProps = {
  topicList: TTopic[];
};
