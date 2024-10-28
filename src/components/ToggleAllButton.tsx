import { PackingItem } from "components/constants/items";

interface ToggleAllButtonProps {
  items: PackingItem[];
  onToggleAll: () => void;
}

export function ToggleAllButton({ items, onToggleAll }: ToggleAllButtonProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-sm border-t border-gray-100">
      <div className="max-w-md mx-auto">
        <button
          onClick={onToggleAll}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors shadow-sm"
        >
          {items.every(item => item.checked)
            ? "Uncheck All Items"
            : "Check All Items"}
        </button>
      </div>
    </div>
  );
}
