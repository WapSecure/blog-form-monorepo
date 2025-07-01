import { Post } from "@assessment/services";
import { Button } from "@assessment/ui";
import Link from "next/link";

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>
        <div className="flex space-x-2">
          <Link href={`/blog/edit/${post.id}`}>
            <Button variant="secondary" size="sm">
              Edit
            </Button>
          </Link>
          <Link href={`/blog/${post.id}`} passHref legacyBehavior>
            <Button size="sm">View</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
