export class CreateBlogDto {
  readonly title: string;
  readonly text: string;
  readonly categoryIds?: Array<number>;
}
