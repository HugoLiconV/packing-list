import { useState } from "react";
import { AddItemForm } from "./AddItemForm";
import { PackingItem } from "components/constants/items";

interface CollapsibleAddFormProps {
  existingCategories: string[];
  onAddItem: (item: Omit<PackingItem, "id">) => void;
}

export function CollapsibleAddForm({
  existingCategories,
  onAddItem
}: CollapsibleAddFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-100">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-4 px-4 flex items-center justify-center gap-2 text-blue-600 font-medium"
        >
          {isOpen ? (
            <>
              <span>Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          ) : (
            <>
              <span>Add New Item</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </>
          )}
        </button>

        {isOpen && (
          <div className="p-4 border-t border-gray-100">
            <AddItemForm
              existingCategories={existingCategories}
              onAddItem={item => {
                onAddItem(item);
                setIsOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
