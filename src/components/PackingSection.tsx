import { useState } from "react";
import { PackingItem as PackingItemType } from "components/constants/items";
import { PackingItem } from "./PackingItem";

interface PackingSectionProps {
  category: string;
  items: PackingItemType[];
  onToggleItem: (itemId: string) => void;
  onToggleSection: (category: string) => void;
  onDeleteCategory: (category: string) => void;
  onDeleteItem: (itemId: string) => void;
}

export function PackingSection({
  category,
  items,
  onToggleItem,
  onToggleSection,
  onDeleteCategory,
  onDeleteItem
}: PackingSectionProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  return (
    <section
      id={`category-${category}`}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 relative"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">{category}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleSection(category)}
            className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            {items.every(item => item.checked) ? "Uncheck All" : "Check All"}
          </button>
          <button
            onClick={() => setShowConfirmDelete(true)}
            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 shadow-xl">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Delete Category
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete &quot;{category}&quot; and all its
              items? This cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteCategory(category);
                  setShowConfirmDelete(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map(item => (
          <PackingItem
            key={item.id}
            item={item}
            onToggle={onToggleItem}
            onDelete={onDeleteItem}
          />
        ))}
      </div>
    </section>
  );
}
