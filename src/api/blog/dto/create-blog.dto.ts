export class CreateBlogDto {
  readonly title: string;
  readonly text: string;
  readonly image: Express.Multer.File;
}
