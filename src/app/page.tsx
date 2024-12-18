"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { PackingItem } from "../constants/items";
import { PackingSection } from "../components/PackingSection";
import { Toaster, toast } from "react-hot-toast";
import { CollapsibleAddForm } from "../components/CollapsibleAddForm";
import { DeleteAllButton } from "components/components/DeleteAllButton";
import { generateId } from "components/utils/generateId";
import { SearchInput } from "../components/SearchInput";
import { ToggleAllButton } from "../components/ToggleAllButton";

export default function Home() {
  const [items, setItems] = useState<PackingItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const lastAddedCategoryRef = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const savedItems = localStorage.getItem("packingListItems");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      setItems([]);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("packingListItems", JSON.stringify(items));
    } else {
      localStorage.removeItem("packingListItems");
    }
  }, [items]);

  const toggleItem = (itemId: string) => {
    setItems(
      items.map(item =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const toggleSection = (category: string) => {
    const categoryItems = items.filter(item => item.category === category);
    const areAllSectionChecked = categoryItems.every(item => item.checked);

    setItems(
      items.map(item =>
        item.category === category
          ? { ...item, checked: !areAllSectionChecked }
          : item
      )
    );
  };

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;

    const query = searchQuery.toLowerCase();
    return items.filter(
      item =>
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
  }, [items, searchQuery]);

  const groupedItems = useMemo(() => {
    return filteredItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, PackingItem[]>);
  }, [filteredItems]);

  const addItem = (newItem: Omit<PackingItem, "id">) => {
    const item: PackingItem = {
      ...newItem,
      id: generateId()
    };
    setItems([...items, item]);
    lastAddedCategoryRef.current = item.category;
  };

  useEffect(() => {
    if (lastAddedCategoryRef.current) {
      const element = document.getElementById(
        `category-${lastAddedCategoryRef.current}`
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        lastAddedCategoryRef.current = null;
      }
    }
  }, [items]);

  const deleteCategory = (categoryToDelete: string) => {
    const itemsToDelete = items.filter(
      item => item.category === categoryToDelete
    );
    const itemIndices = itemsToDelete.map(item => ({
      item,
      index: items.findIndex(i => i.id === item.id)
    }));

    setItems(items.filter(item => item.category !== categoryToDelete));

    toast(
      t => (
        <div className="flex items-center gap-4">
          <span>Deleted category &quot;{categoryToDelete}&quot;</span>
          <button
            onClick={() => {
              setItems(prev => {
                const newItems = [...prev];
                // Insert items back in their original positions
                itemIndices
                  .sort((a, b) => a.index - b.index)
                  .forEach(({ item, index }) => {
                    newItems.splice(index, 0, item);
                  });
                return newItems;
              });
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
  };

  const deleteItem = (itemId: string) => {
    const itemIndex = items.findIndex(item => item.id === itemId);
    const itemToDelete = items[itemIndex];
    setItems(items.filter(item => item.id !== itemId));

    toast(
      t => (
        <div className="flex items-center gap-4">
          <span>Deleted &quot;{itemToDelete?.name}&quot;</span>
          <button
            onClick={() => {
              if (itemToDelete) {
                setItems(prev => {
                  const newItems = [...prev];
                  newItems.splice(itemIndex, 0, itemToDelete);
                  return newItems;
                });
                toast.dismiss(t.id);
              }
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
  };

  const handleToggleAll = () => {
    const areAllChecked = items.every(item => item.checked);
    const oldItems = [...items];

    setItems(items.map(item => ({ ...item, checked: !areAllChecked })));

    toast(
      t => (
        <div className="flex items-center gap-4">
          <span>
            {areAllChecked ? "Unchecked all items" : "Checked all items"}
          </span>
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
        icon: areAllChecked ? "❌" : "✅"
      }
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-4xl mb-3">🔍</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 overflow-auto">
        <div
          className="max-w-md mx-auto p-4"
          style={{
            paddingBottom: "calc(20px + env(safe-area-inset-bottom, 0px))"
          }}
        >
          <header className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-semibold text-gray-900">
                Packing List
              </h1>
              <DeleteAllButton items={items} setItems={setItems} />
            </div>
            <p className="text-gray-500 text-sm mt-1 mb-4">
              Keep track of your travel essentials
            </p>
            <SearchInput value={searchQuery} onChange={setSearchQuery} />

            {items.length > 0 && (
              <div className="mt-4">
                <ToggleAllButton items={items} onToggleAll={handleToggleAll} />
              </div>
            )}
          </header>

          <main className="space-y-4 mb-16">
            {filteredItems.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No results found
                </h3>
                <p className="text-gray-500 text-sm">
                  Try searching with different keywords
                </p>
              </div>
            )}

            {filteredItems.length === 0 && !searchQuery ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">📝</div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Your list is empty
                </h3>
                <p className="text-gray-500 text-sm">
                  Click the button below to start adding items
                </p>
              </div>
            ) : (
              Object.entries(groupedItems).map(([category, categoryItems]) => (
                <PackingSection
                  key={category}
                  category={category}
                  items={categoryItems}
                  onToggleItem={toggleItem}
                  onToggleSection={toggleSection}
                  onDeleteCategory={deleteCategory}
                  onDeleteItem={deleteItem}
                />
              ))
            )}
          </main>
        </div>
      </div>

      <div className="sticky bottom-0 w-full">
        <CollapsibleAddForm
          existingCategories={Array.from(
            new Set(items.map(item => item.category))
          )}
          onAddItem={addItem}
          isOpen={false}
        />
      </div>

      <Toaster />
    </div>
  );
}
