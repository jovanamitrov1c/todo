import { Tag } from '../models/tag.model';

export class AddTag {
  static readonly type = '[Tag] Add';

  constructor(public tag: Tag) {}
}

export class DeleteTag {
  static readonly type = '[Tag] Delete';

  constructor(public tag: Tag) {}
}
