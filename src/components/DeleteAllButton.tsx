import { useState, useEffect, useCallback, useRef } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { PackingItem } from "../constants/items";

interface DeleteAllButtonProps {
  items: PackingItem[];
  setItems: (items: PackingItem[]) => void;
}

export function DeleteAllButton({ items, setItems }: DeleteAllButtonProps) {
  const [showLabel, setShowLabel] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const resetLabel = useCallback(() => {
    setShowLabel(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, []);

  const handleClick = () => {
    if (!showLabel) {
      setShowLabel(true);
      timeoutId.current = setTimeout(resetLabel, 3000);
    } else {
      if (
        window.confirm(
          "Are you sure you want to delete all items? This cannot be undone."
        )
      ) {
        const oldItems = [...items];
        setItems([]);

        toast(
          t => (
            <div className="flex items-center gap-4">
              <span>Deleted all items</span>
              <button
                onClick={() => {
                  setItems(oldItems);
                  toast.dismiss(t.id);
                }}
                className="px-4 py-2 text-base font-medium text-blue-600 hover:text-blue-700 bg-blue-50 rounded-lg active:bg-blue-100 transition-colors"
              >
                Undo
              </button>
            </div>
          ),
          {
            duration: 4000,
            position: "bottom-center",
            className: "bg-white text-gray-900 px-4 py-3",
            icon: "🗑️"
          }
        );
      }
      resetLabel();
    }
  };

  if (items.length === 0) return null;

  return (
    <button
      onClick={handleClick}
      className="flex items-center transition-colors text-red-600"
    >
      <div
        className={`px-2 py-2 flex items-center gap-2 ${
          showLabel ? "pr-0" : ""
        }`}
      >
        <Trash2 size={20} />
      </div>
      <div
        className={`overflow-hidden transition-all duration-200 ease-out ${
          showLabel ? "w-[108px] pr-3" : "w-0 pr-0"
        }`}
      >
        <span className="text-sm font-medium whitespace-nowrap">
          Remove all items
        </span>
      </div>
    </button>
  );
}
