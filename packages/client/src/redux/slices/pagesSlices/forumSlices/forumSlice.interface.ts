import { TModalStatus } from '@/components';
import { TTopic, TPaginationOptions } from '@/pages/Forum/components';

export interface IForumSlice {
  topicList: TTopic[];
  paginationOptions: TPaginationOptions;
  topicListStatus: TModalStatus;
  topicListError: string;
  createTopicStatus: TModalStatus;
  createTopicError: string;
  addTopicCommentStatus: TModalStatus;
  addTopicCommentError: string;
  topicById: TTopic | null;
  getTopicByIdStatus: TModalStatus;
  getTopicByIdError: string;
}
