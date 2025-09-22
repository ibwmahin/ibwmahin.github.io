export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover?: string;
  content: string;
  featured?: boolean;
};

const modules = import.meta.glob("./blog/*.ts", { eager: true });

export const posts: Post[] = Object.values(modules).map(
  (module: any) => module.post,
);
