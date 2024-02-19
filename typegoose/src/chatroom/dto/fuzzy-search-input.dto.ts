import { InputType, Field } from '@nestjs/graphql';

@InputType('FuzzySearchInput')
export class FuzzySearchInput {
  @Field()
  searchTerm!: string;

  // 可选：其他搜索条件
  @Field({ nullable: true })
  anotherField?: string;
}
