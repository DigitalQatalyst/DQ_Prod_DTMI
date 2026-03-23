import React from 'react';
import { Category } from '../../shared/utils/supabase';
import { AlertCircle } from 'lucide-react';
import Modal from '../../shared/components/Modal';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    category: Category | null;
    selectedCount: number;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    category,
    selectedCount
}) => {
    const isMultiple = selectedCount > 1;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Confirm Deletion"
            footer={(
                <>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-xs font-medium text-gray-400 hover:text-black"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white text-xs font-medium rounded-lg hover:bg-red-700 shadow-lg shadow-red-100"
                    >
                        Remove {isMultiple ? 'Categories' : 'Category'}
                    </button>
                </>
            )}
        >
            <div className="flex items-center gap-3 text-red-600 mb-4 bg-red-50 p-3 rounded-lg border border-red-100">
                <AlertCircle size={20} />
                <p className="text-xs font-medium">Warning: Structural Change</p>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed italic">
                {isMultiple
                    ? `Are you certain you wish to dissolve ${selectedCount} categories? Any linked publications will become uncategorized.`
                    : `Are you sure you want to delete the "${category?.name}" classification? This action cannot be reversed.`
                }
            </p>
        </Modal>
    );
};

export default DeleteConfirmModal;