import type { Post, User } from "#prisma/generated/prisma/client.js";
import { PostMapper, type PostDto } from "./postDto.js";

export type UserDto = {
  id: number;
  email: string;
  name: string | null;
  posts: PostDto[] | null;
};

export class UserMapper {
  public static toDto(user: User, posts: Post[] | undefined = undefined): UserDto {
    let postDtos: PostDto[] | null = null;

    if (posts) {
      postDtos = posts.map((post) => PostMapper.toDto(post));
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      posts: postDtos,
    };
  }
}
