import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "./card";

interface SortableCardProps {
  _id: string;
  title: string;
  type: "youtube" | "twitter" | "notes";
  link?: string;
  content?: string;
  onDelete?: () => void;
  onEdit?: () => void;
}

export function SortableCard(props: SortableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : "auto" as any,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group/sortable relative mb-5 break-inside-avoid"
    >
      <Card
        {...props}
        dragHandleProps={{
          ...attributes,
          ...listeners,
          className: "cursor-grab touch-none active:cursor-grabbing",
          title: "Hold and drag to reorder",
          "aria-label": "Drag card",
        }}
      />
    </div>
  );
}
