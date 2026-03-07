import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./Sidebar";

const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ReminderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const formatReminder = (dateTimeStr) => {
  if (!dateTimeStr) return "";
  const d = new Date(dateTimeStr);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const TaskList = ({ notes, onToggle }) => {
  if (notes.length === 0) return null;

  // Import CATEGORY_COLORS from Sidebar
  const CATEGORY_COLORS = {
    Personal: "bg-sky-100 text-sky-700",
    Work: "bg-amber-100 text-amber-700",
    Shopping: "bg-pink-100 text-pink-700",
    Health: "bg-emerald-100 text-emerald-700",
    Study: "bg-violet-100 text-violet-700",
  };

  // Determine category name and color for heading
  let categoryName = 'Tasks';
  let categoryColor = 'text-violet-600';
  if (notes.length > 0) {
    const uniqueCategories = Array.from(new Set(notes.map(n => n.category)));
    if (uniqueCategories.length === 1 && uniqueCategories[0]) {
      categoryName = uniqueCategories[0] + ' Tasks';
      categoryColor = CATEGORY_COLORS[uniqueCategories[0]] || 'text-violet-600';
    } else {
      categoryName = 'All Tasks';
      categoryColor = 'text-violet-600';
    }
  }

  const remainingCount = notes.filter((n) => !n.completed).length;

  return (
    <div className="mt-5">
      <h3 className="flex items-center gap-1.5 text-sm font-semibold mb-3" >
        {categoryName}
        <span className="text-xs font-normal ml-1">
          ({remainingCount} remaining)
        </span>
      </h3>
      <div className="grid grid-cols-2 gap-2.5">
        <AnimatePresence initial={false}>
          {notes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0, transition: { delay: index * 0.03 } }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
              className={`group rounded-lg p-3 border transition-all duration-200 ${
                note.completed
                  ? "bg-gray-50 border-gray-100 opacity-50"
                  : CATEGORY_COLORS[note.category] || "bg-violet-50/60 border-violet-200/50 hover:border-violet-300/70 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start gap-2">
                <button
                  onClick={() => onToggle(note.id)}
                  className={`mt-0.5 flex items-center justify-center w-4 h-4 rounded-full border-2 shrink-0 transition-all duration-200 cursor-pointer ${
                    note.completed
                      ? "bg-violet-500 border-violet-500 text-white"
                      : "border-violet-300 hover:border-violet-500 text-transparent hover:text-violet-300"
                  }`}
                >
                  <CheckIcon />
                </button>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-xs font-medium leading-snug truncate ${
                      note.completed
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}
                  >
                    {note.title}
                  </p>
                  {(note.dueDate || note.reminder) && (
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1.5">
                      {note.dueDate && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-blue-500">
                          <CalendarIcon />
                          {formatDate(note.dueDate)}
                        </span>
                      )}
                      {note.reminder && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] text-green-500">
                          <ReminderIcon />
                          {formatReminder(note.reminder)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TaskList;
