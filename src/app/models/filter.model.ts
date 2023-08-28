import { Tag } from './tag.model';

export interface Filter {
  tags: string[];
  title: string;
  isDone?: boolean;
}
