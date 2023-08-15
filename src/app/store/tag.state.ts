import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddTag, DeleteTag } from './tag.actions';
import { Tag } from '../models/tag.model';

interface TagStateModel {
  tags: Tag[];
}

@State<TagStateModel>({
  name: 'tag',
  defaults: { tags: [] },
})
export class TagState {
  @Action(AddTag)
  public addTag({ getState }: StateContext<TagStateModel>, { tag }: AddTag) {
    const { tags } = getState();
    tags.push(tag);
  }

  @Action(DeleteTag)
  public deleteTag(
    { getState, patchState }: StateContext<TagStateModel>,
    { tag }: DeleteTag
  ) {
    const { tags } = getState();
    const updated = tags.filter((_tag) => tag.label !== _tag.label);
    patchState({ tags: updated });
  }

  @Selector()
  static tags({ tags }: TagStateModel) {
    return tags;
  }
}
