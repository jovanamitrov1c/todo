import { Tag } from './tag.model';

export interface Todo {
  id: string;
  title: string;
  isDone: boolean;
  description?: string;
  tags: Tag[];
}
