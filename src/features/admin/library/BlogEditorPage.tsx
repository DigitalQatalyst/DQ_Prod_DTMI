import ContentEditorPage from "./ContentEditorPage";
import {
  createAdminBlog,
  fetchAdminBlogById,
  updateAdminBlog,
} from "./api/blogCms";

export default function BlogEditorPage() {
  return (
    <ContentEditorPage
      contentType="blog"
      contentLabel="Blog"
      fetchById={fetchAdminBlogById}
      createItem={createAdminBlog}
      updateItem={updateAdminBlog}
    />
  );
}
