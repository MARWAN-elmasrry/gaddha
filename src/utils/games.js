const fillCategory = (questionsByCategory, questionBank) => {
  console.log("Filling category", questionsByCategory, questionBank);
  for (const [categoryKey, difficulties] of Object.entries(questionsByCategory)) {
    questionBank[categoryKey] = [];

    for (const [difficulty, questions] of Object.entries(difficulties)) {
      let points = 0;
      if (difficulty === "easy") points = 200;
      if (difficulty === "medium") points = 400;
      if (difficulty === "hard") points = 600;

      questions.forEach((q) => {
        questionBank[categoryKey].push({
          id: q._id,
          q: q.text,
          a: q.answer,
          points,
          shown: false,
          qImage: q.questionImage,
          aImage: q.answerImage,
        });
      });
    }
  }
};
export const transformQuestions = (session, fieldAccess = "questions") => {
  const questionBank = {};
  let questionsByPlayer1Category, questionsByPlayer2Category;
  if (fieldAccess === "questions") {
    questionsByPlayer1Category = session.player1.questions;
    questionsByPlayer2Category = session.player2.questions;
  } else {
    questionsByPlayer1Category = session.player1.categories;
    questionsByPlayer2Category = session.player2.categories;
  }
  console.log("trans", session, questionsByPlayer1Category, questionsByPlayer2Category);
  fillCategory(questionsByPlayer1Category, questionBank);
  fillCategory(questionsByPlayer2Category, questionBank);
  return questionBank;
};
