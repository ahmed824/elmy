"use client";
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";

export default function LessonsForm() {
  const [lessons, setLessons] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newLesson, setNewLesson] = useState({
    id: crypto.randomUUID(),
    subject: "",
    lessonName: "",
    lessonDesc: "",
    video: null,
  });

  // Handle input change
  const handleChange = (e) => {
    setNewLesson((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 50 * 1024 * 1024) {
      setNewLesson((prev) => ({ ...prev, video: file }));
    } else {
      alert("File size must be under 50MB.");
    }
  };

  // Add a new lesson
  const handleAddLesson = () => {
    setLessons([...lessons, newLesson]);
    setNewLesson({ id: crypto.randomUUID(), subject: "", lessonName: "", lessonDesc: "", video: null });
    setShowForm(false);
  };

  // Drag and drop sorting
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = lessons.findIndex((lesson) => lesson.id === active.id);
      const newIndex = lessons.findIndex((lesson) => lesson.id === over.id);
      setLessons(arrayMove(lessons, oldIndex, newIndex));
    }
  };

  // Remove a lesson
  const handleRemoveLesson = (id) => {
    setLessons(lessons.filter((lesson) => lesson.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg">
      <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-blue-500 text-white rounded-md">+ Add Lesson</button>

      {showForm && (
        <div className="mt-4 p-4 bg-white shadow-md rounded-lg border">
          <input type="text" name="subject" placeholder="Subject" value={newLesson.subject} onChange={handleChange} className="w-full p-2 border rounded-md" />
          <input type="text" name="lessonName" placeholder="Lesson Name" value={newLesson.lessonName} onChange={handleChange} className="w-full p-2 border rounded-md mt-2" />
          <textarea name="lessonDesc" placeholder="Lesson Description" value={newLesson.lessonDesc} onChange={handleChange} className="w-full p-2 border rounded-md mt-2"></textarea>
          <input type="file" accept="video/*" onChange={handleFileUpload} className="mt-2" />
          <div className="mt-3 flex gap-2">
            <button onClick={handleAddLesson} className="px-4 py-2 bg-green-500 text-white rounded-md">Save</button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
          </div>
        </div>
      )}

      {/* Lessons List */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={lessons.map((lesson) => lesson.id)}>
          <div className="mt-4 space-y-2">
            {lessons.map((lesson) => (
              <SortableLesson key={lesson.id} lesson={lesson} onRemove={handleRemoveLesson} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

// Sortable Lesson Component
function SortableLesson({ lesson, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: lesson.id });

  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} {...attributes} {...listeners}
      className="p-4 bg-white shadow-md rounded-md border flex justify-between items-center cursor-move">
      <div>
        <h3 className="font-bold">{lesson.lessonName}</h3>
        <p className="text-sm text-gray-500">{lesson.subject}</p>
      </div>
      <button onClick={() => onRemove(lesson.id)} className="text-red-500"><Trash2 size={20} /></button>
    </div>
  );
}