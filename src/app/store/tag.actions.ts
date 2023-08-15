import { Tag } from '../models/tag.model';

export class AddTag {
  static readonly type = '[Tag] Add';

  constructor(public tag: Tag) {}
}
