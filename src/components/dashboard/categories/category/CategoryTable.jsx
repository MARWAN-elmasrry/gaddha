import React, { useEffect, useState } from "react";
import QuestionForm from "../../dreport/ReportForm";

const CategoryTable = ({ questions, mode }) => {
  const difficultyLevels = { easy: "سهل", medium: "متوسط", hard: "صعب" };
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  console.log("Questions in CategoryTable:", editingQuestion);
  return (
    <div className="table-wrapper">
      <QuestionForm
        question={editingQuestion}
        open={showQuestionForm}
        setOpen={setShowQuestionForm}
      />
      <div className="category-table">
        {/* Header */}
        <div className="table-row table-header">
          <div className="table-cell">#</div>
          <div className="table-cell">السؤال</div>
          <div className="table-cell">الإجابة</div>
          <div className="table-cell">المستوى</div>
          <div className="table-cell">صورة السؤال</div>
          <div className="table-cell">صورة الإجابة</div>
          <div className="table-cell">الإجراء</div>
        </div>

        {/* Body */}
        {questions?.map((row, index) => (
          <div className="table-row" key={row.id}>
            <div className="table-cell">{index + 1}</div>
            <div className="table-cell">{row.text}</div>
            <div className="table-cell">{row.answer}</div>
            <div className="table-cell">{difficultyLevels[row.difficulty]}</div>
            <div className="table-cell">
              <a href={row.questionImage} target="_blank" rel="noreferrer">
                عرض
              </a>
            </div>
            <div className="table-cell">
              <a href={row.answerImage} target="_blank" rel="noreferrer">
                عرض
              </a>
            </div>
            <div className="table-cell">
              {mode === "edit" && (
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditingQuestion(row);
                    setShowQuestionForm(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffd28a"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="edit-icon"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTable;
