import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Prop, modelOptions, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { SubTaskEntity } from '../sub-task/sub-task.entity';
import { TagEntity } from '../tag/tag.entity';

@modelOptions({
  schemaOptions: {
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
    collection: 'todo-items',
    toObject: { virtuals: true },
  },
})
export class TodoItemEntity implements Base {
  @Prop({ required: true })
  title!: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  completed!: boolean;

  @Prop({ default: Date.now })
  created!: Date;

  @Prop({ default: Date.now })
  updated!: Date;
}
