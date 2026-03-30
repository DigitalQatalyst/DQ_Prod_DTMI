import ContentEditorPage from "./ContentEditorPage";
import {
  createAdminArticle,
  fetchAdminArticleById,
  updateAdminArticle,
} from "./api/blogCms";

export default function ArticleEditorPage() {
  return (
    <ContentEditorPage
      contentType="article"
      contentLabel="Article"
      fetchById={fetchAdminArticleById}
      createItem={createAdminArticle}
      updateItem={updateAdminArticle}
    />
  );
}
