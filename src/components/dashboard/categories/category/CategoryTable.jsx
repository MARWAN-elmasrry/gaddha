import React from "react";

import { useState } from "react";
// import { Edit } from "lucide-react";

const CategoryTable = () => {
  // Dummy Data
  const [rows] = useState([
    {
      id: 1,
      question: "من هو آخر نبي؟",
      answer: "محمد",
      level: "سهل",
      questionImage: "https://via.placeholder.com/100x60?text=Q1",
      answerImage: "https://via.placeholder.com/100x60?text=A1",
      canEdit: true,
    },
    {
      id: 2,
      question: "ما هي عاصمة مصر؟",
      answer: "القاهرة",
      level: "سهل",
      questionImage: "https://via.placeholder.com/100x60?text=Q2",
      answerImage: "https://via.placeholder.com/100x60?text=A2",
      canEdit: false,
    },
  ]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-2 py-1">#</th>
            <th className="border border-gray-300 px-2 py-1">السؤال</th>
            <th className="border border-gray-300 px-2 py-1">الإجابة</th>
            <th className="border border-gray-300 px-2 py-1">المستوى</th>
            <th className="border border-gray-300 px-2 py-1">صورة السؤال</th>
            <th className="border border-gray-300 px-2 py-1">صورة الإجابة</th>
            <th className="border border-gray-300 px-2 py-1">الإجراء</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td className="border border-gray-300 px-2 py-1">{index + 1}</td>
              <td className="border border-gray-300 px-2 py-1">{row.question}</td>
              <td className="border border-gray-300 px-2 py-1">{row.answer}</td>
              <td className="border border-gray-300 px-2 py-1">{row.level}</td>
              <td className="border border-gray-300 px-2 py-1">
                <a
                  href={row.questionImage}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  عرض
                </a>
              </td>
              <td className="border border-gray-300 px-2 py-1">
                <a
                  href={row.answerImage}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  عرض
                </a>
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {row.canEdit && (
                  <button className="text-blue-600 hover:text-blue-800">
                    {/* <Edit size={18} /> */}
                    edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
