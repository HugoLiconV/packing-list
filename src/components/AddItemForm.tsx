import { useState } from "react";
import { PackingItem } from "../constants/items";

interface AddItemFormProps {
  existingCategories: string[];
  onAddItem: (item: Omit<PackingItem, "id">) => void;
}

export function AddItemForm({
  existingCategories,
  onAddItem
}: AddItemFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState(existingCategories[0] || "");
  const [newCategory, setNewCategory] = useState("");
  const [isNewCategory, setIsNewCategory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCategory = isNewCategory ? newCategory : category;
    if (name && finalCategory) {
      onAddItem({
        name,
        category: finalCategory,
        checked: false
      });
      setName("");
      setNewCategory("");
      setIsNewCategory(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4"
    >
      <div className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Add new item..."
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-500"
        />

        {!isNewCategory ? (
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          >
            {existingCategories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            placeholder="New category name..."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-500"
          />
        )}

        <button
          type="button"
          onClick={() => setIsNewCategory(!isNewCategory)}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          {isNewCategory ? "Select existing category" : "Create new category"}
        </button>

        <button
          type="submit"
          disabled={!name || (!category && !newCategory)}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add Item
        </button>
      </div>
    </form>
  );
}
