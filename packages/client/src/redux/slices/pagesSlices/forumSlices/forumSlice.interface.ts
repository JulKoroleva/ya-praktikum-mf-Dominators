import { TModalStatus } from '@/components';
import { TTopic, TPaginationOptions } from '@/pages/Forum/components';

export interface IForumSlice {
  topicList: TTopic[];
  paginationOptions: TPaginationOptions;
  topicListStatus: TModalStatus;
  topicListError: string;
}
