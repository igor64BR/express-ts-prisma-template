import type { Post } from "#prisma/generated/prisma/client.js";

export type PostDto = {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  authorId: number;
};

export class PostMapper {
  public static toDto(post: Post): PostDto {
    return {
      id: post.id,
      title: post.title,
      content: post.content,
      published: post.published,
      authorId: post.authorId,
    };
  }
}
