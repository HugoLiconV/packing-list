import { AddItemForm } from "./AddItemForm";
import { PackingItem } from "components/constants/items";
import { useState, useEffect } from "react";

interface CollapsibleAddFormProps {
  isOpen: boolean;
  existingCategories: string[];
  onAddItem: (item: Omit<PackingItem, "id">) => void;
}

export function CollapsibleAddForm({
  isOpen,
  existingCategories,
  onAddItem
}: CollapsibleAddFormProps) {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  // Sync with parent's isOpen prop
  useEffect(() => {
    setIsExpanded(isOpen);
  }, [isOpen]);

  return (
    <div
      className="bg-white/80 backdrop-blur-sm border-t border-gray-200"
      style={{
        paddingBottom: "calc(20px + env(safe-area-inset-bottom, 0px))"
      }}
    >
      <div className="max-w-md mx-auto">
        {/* Toggle Button - Always Visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-4 px-4 flex items-center justify-center gap-2 text-blue-600 font-medium"
        >
          {isExpanded ? (
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

        {/* Expandable Form Section */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4">
            <AddItemForm
              existingCategories={existingCategories}
              onAddItem={onAddItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
