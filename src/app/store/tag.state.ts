import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddTag } from './tag.actions';
import { Tag } from '../models/tag.model';

@State<Tag[]>({
  name: 'tag',
  defaults: [],
})
export class TagState {
  @Action(AddTag)
  public addTag({ getState }: StateContext<Tag[]>, { tag }: AddTag) {
    const currentTags = getState();
    currentTags.push(tag);
  }

  @Selector()
  static tags(tags: Tag[]) {
    return tags;
  }
}
