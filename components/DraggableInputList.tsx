"use client";
import { v4 as uuidv4 } from "uuid";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  TouchSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import { GripVertical, X } from "lucide-react";

type DraggableInputListProps<T> = {
  items: T[];
  onChange: (items: T[]) => void;
  renderInput: (item: T, onItemChange: (newItem: T) => void) => React.ReactNode;
  onAdd?: () => T; // 추가될때의 포맷 (선택적임)
};

function SortableItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 h-12 border rounded-lg bg-white shadow-sm select-none touch-none"
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing touch-action-none p-1"
      >
        <GripVertical className="w-5 h-5 text-gray-500" />
      </button>
      <div className="flex flex-1 h-full">{children}</div>
    </div>
  );
}

export default function DraggableInputList<T extends { id: string }>({
  items,
  onChange,
  renderInput,
  onAdd,
}: DraggableInputListProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150, // 길게 눌러야 드래그 시작
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      onChange(arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleItemChange = (index: number, newItem: T) => {
    const updated = [...items];
    updated[index] = newItem;
    onChange(updated);
  };

  const handleRemove = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    onChange(updated);
  };

  const handleAdd = () => {
    if (onAdd) {
      onChange([...items, onAdd()]);
    } else {
      onChange([...items, { id: uuidv4() } as T]);
    }
  };

  return (
    <div className="space-y-3">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item, index) => (
            <SortableItem key={item.id} id={item.id}>
              <div className="flex items-center gap-2 w-full ">
                <div className="flex-1 h-full">
                  {renderInput(item, (newItem) =>
                    handleItemChange(index, newItem)
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-gray-400 hover:text-red-700 mx-2"
                >
                  <X size={18} />
                </button>
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={handleAdd}
          className="px-2 py-1 bg-slate-200 text-white rounded-lg shadow hover:bg-blue-600 "
        >
          <span className="text-slate-500 text-sm">+ 추가</span>
        </button>
      </div>
    </div>
  );
}
