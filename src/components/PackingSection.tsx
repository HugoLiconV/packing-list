import { PackingItem } from "components/constants/items";

interface PackingSectionProps {
  category: string;
  items: PackingItem[];
  onToggleItem: (itemId: string) => void;
  onToggleSection: (category: string) => void;
}

export function PackingSection({
  category,
  items,
  onToggleItem,
  onToggleSection
}: PackingSectionProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900">{category}</h2>
        <button
          onClick={() => onToggleSection(category)}
          className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
        >
          {items.every(item => item.checked) ? "Uncheck All" : "Check All"}
        </button>
      </div>
      <div className="space-y-3">
        {items.map(item => (
          <label
            key={item.id}
            className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => onToggleItem(item.id)}
              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span
              className={`text-gray-700 ${
                item.checked ? "line-through text-gray-400" : ""
              }`}
            >
              {item.name}
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}
