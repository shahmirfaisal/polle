import { createContext, useState } from "react";

export const PollContext = createContext();

export const PollContextProvider = ({ children }) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([{ id: 1, value: "" }]);

  const changeQuestionHandler = (e) => setQuestion(e.target.value);
  const changeAnswerHandler = (id, newValue) => {
    const newAnswers = [...answers];
    newAnswers.map((answer) => {
      if (answer.id === id) answer.value = newValue;
    });
    setAnswers(newAnswers);
  };

  const addAnswer = () => {
    setAnswers([...answers, { id: answers.length + 1, value: "" }]);
  };
  const removeAnswer = (id) => {
    setAnswers(answers.filter((answer) => answer.id !== id));
  };

  const state = {
    question,
    changeQuestionHandler,
    answers,
    changeAnswerHandler,
    addAnswer,
    removeAnswer,
  };

  return <PollContext.Provider value={state}>{children}</PollContext.Provider>;
};
