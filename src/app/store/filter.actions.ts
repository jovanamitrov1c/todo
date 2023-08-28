import { Tag } from '../models/tag.model';

export class AddTagsFilter {
  static readonly type = '[Filter] Add tags';

  constructor(public tags: string[]) {}
}

export class AddTitleFilter {
  static readonly type = '[Filter] Add title';

  constructor(public title: string) {}
}

export class AddIsDoneFilter {
  static readonly type = '[Filter] Add is done';

  constructor(public done: boolean) {}
}

export class ResetFilters {
  static readonly type = '[Filter] Reset';
}
