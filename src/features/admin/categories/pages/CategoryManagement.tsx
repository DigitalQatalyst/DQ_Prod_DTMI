import React, { useState } from "react";
import { Plus } from "lucide-react";
import AppLayout from "../../shared/components/AppLayout";
import { Toast, ToastType } from "../../shared/components/Toast";

// Hooks
import { useCategoryData } from "../hooks/useCategoryData";
import { useCategoryActions } from "../hooks/useCategoryActions";
import { useCategoryModals } from "../hooks/useCategoryModals";

// Components
import CategoryTabs from "../components/CategoryTabs";
import CategoryActions from "../components/CategoryActions";
import CategoryTable from "../components/CategoryTable";
import CategoryModal from "../components/CategoryModal";
import CategoryDetailsModal from "../components/CategoryDetailsModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

const CategoryManagement: React.FC = () => {
  const [activeFilterGroup, setActiveFilterGroup] =
    useState<string>("content-types");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  // Custom hooks
  const { data, filterGroups, loading, refetch } =
    useCategoryData(activeFilterGroup);
  const modals = useCategoryModals();

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
  };

  const { createCategory, updateCategory, deleteCategories, isSubmitting } =
    useCategoryActions(() => {
      refetch();
      modals.closeModals();
      setSelectedIds([]);
    }, showToast);

  // Event handlers
  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allItems = data.isHierarchical
        ? data.items.flatMap((p) => [p, ...(p.subcategories || [])])
        : data.items;
      setSelectedIds(allItems.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modals.currentCategory) return;

    const success = modals.currentCategory.id
      ? await updateCategory(modals.currentCategory.id, modals.currentCategory)
      : await createCategory(modals.currentCategory);

    if (success) {
      modals.closeModals();
    }
  };

  const handleDelete = async () => {
    const idsToDelete =
      selectedIds.length > 0
        ? selectedIds
        : modals.currentCategory?.id
          ? [modals.currentCategory.id]
          : [];
    if (idsToDelete.length === 0) return;

    const success = await deleteCategories(idsToDelete);
    if (success) {
      modals.closeModals();
      setSelectedIds([]);
    }
  };

  return (
    <AppLayout title="Categories">
      <div className="space-y-6">
        {/* Header with New Filter Group Button */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Category & Filter Management
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage all content categories and marketplace filters
              </p>
            </div>
            <button
              onClick={() => modals.openUpsertModal(null, null, "__new__")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus size={16} /> New Filter Group
            </button>
          </div>

          {/* Filter Group Tabs */}
          <CategoryTabs
            filterGroups={filterGroups}
            activeFilterGroup={activeFilterGroup}
            onFilterGroupChange={setActiveFilterGroup}
          />
        </div>

        {/* Actions Bar */}
        <CategoryActions
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedIds={selectedIds}
          onDeleteSelected={() => modals.openDeleteModal()}
          onNewFilterGroup={() => modals.openUpsertModal(null, null, "__new__")}
          onAddCategory={() =>
            modals.openUpsertModal(null, null, activeFilterGroup)
          }
          isHierarchical={data.isHierarchical}
        />

        {/* Toast */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        {/* Category Table */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 text-gray-400">
            <div className="animate-spin mb-4 w-8 h-8 border-2 border-gray-300 border-t-black rounded-full"></div>
            <p className="text-sm">Loading categories...</p>
          </div>
        ) : (
          <CategoryTable
            data={data.items}
            isHierarchical={data.isHierarchical}
            searchTerm={searchTerm}
            selectedIds={selectedIds}
            onSelectOne={handleSelectOne}
            onSelectAll={handleSelectAll}
            onEdit={(category) => modals.openUpsertModal(category)}
            onDelete={(category) => modals.openDeleteModal(category)}
            onAddSubcategory={(parentId) =>
              modals.openUpsertModal(null, parentId, activeFilterGroup)
            }
            onViewDetails={modals.openDetailsModal}
          />
        )}
      </div>

      {/* Modals */}
      <CategoryModal
        isOpen={modals.isUpsertModalOpen}
        onClose={modals.closeModals}
        category={modals.currentCategory}
        onCategoryChange={modals.setCurrentCategory}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        filterGroups={filterGroups}
        parentCategories={data.isHierarchical ? data.items : []}
        activeFilterGroup={activeFilterGroup}
      />

      <CategoryDetailsModal
        isOpen={modals.isDetailsModalOpen}
        onClose={modals.closeModals}
        category={modals.currentCategory as any}
        posts={modals.categoryPosts}
        loadingPosts={modals.loadingPosts}
      />

      <DeleteConfirmModal
        isOpen={modals.isDeleteModalOpen}
        onClose={modals.closeModals}
        onConfirm={handleDelete}
        category={modals.currentCategory as any}
        selectedCount={selectedIds.length}
      />
    </AppLayout>
  );
};

export default CategoryManagement;
