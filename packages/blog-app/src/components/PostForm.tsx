import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, Input, MarkdownEditor } from "@assessment/ui";
import { Post } from "@assessment/services";

const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  body: z.string().min(1, "Content is required"),
  userId: z.number().default(1),
});

type PostFormValues = z.infer<typeof postSchema>;

interface PostFormProps {
  defaultValues?: Partial<Post>;
  onSubmit: (
    values: Omit<PostFormValues, "userId"> & { userId?: number }
  ) => void;
  isSubmitting?: boolean;
}

export const PostForm: React.FC<PostFormProps> = ({
  defaultValues,
  onSubmit,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues,
  });

  const bodyValue = watch("body", defaultValues?.body || "");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Title"
        {...register("title")}
        error={errors.title?.message}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <MarkdownEditor
          value={bodyValue}
          onChange={(value) => setValue("body", value)}
          className="min-h-[300px]"
        />
        {errors.body?.message && (
          <p className="mt-1 text-sm text-red-600">{errors.body.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Post"}
      </Button>
    </form>
  );
};
