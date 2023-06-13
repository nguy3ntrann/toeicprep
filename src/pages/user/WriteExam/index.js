import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { getExamById } from "../../../apicalls/exams";
import Instructions from "./instructions";

function WriteExam() {
  const [examData, setExamData] = useState(null);
  const [questions = [], setQuestions] = useState([]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOptions = [], setSelectedOptions] = useState({});
  const [result = [], setResult ] = useState({}) 
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [view, setView] = useState("instructions");

  const getExamData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getExamById({
        examId: params.id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setQuestions(response.data.questions);
        setExamData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const calculateResult = () => {
    let correctAnswers = [];
    let wrongAnswers = [];
    
    questions.forEach((question, index) => {
      if(question.correctOption === selectedOptions[index]){
        correctAnswers.push(question);
      }
      else wrongAnswers.push(question);
    });

    let result = "Pass";
    if(correctAnswers.length < examData.passingMarks){
      result = "Fail";
    }
    setResult({
      correctAnswers,
      wrongAnswers,
      result,
    });

    setView("result");
  }
  useEffect(() => {
    if (params.id) {
      getExamData();
    }
  }, []);
  return (
    examData && (
      <div className="mt-2">
        <div className="divider"></div>

        <h1 className="text-center">{examData.name}</h1>

        <div className="divider"></div>
        {view === "instructions" && (
          <Instructions examData={examData} setView={setView} />
        )}

        {view === "questions" && (
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">
              {selectedQuestionIndex + 1} :{" "}
              {questions[selectedQuestionIndex].name}
            </h1>

            <div className="flex flex-col gap-2">
              {Object.keys(questions[selectedQuestionIndex].options).map(
                (option, index) => {
                  return (
                    <div
                      className={`flex gap-2 flex-col ${
                        selectedOptions[selectedQuestionIndex] === option
                          ? "selected-option"
                          : "option"
                      }`}
                      key={index}
                      onClick={() => {
                        setSelectedOptions({
                          ...selectedOptions,
                          [selectedQuestionIndex]: option,
                        });
                      }}
                    >
                      <h1 className="text-xl">
                        {option}:
                        {questions[selectedQuestionIndex].options[option]}
                      </h1>
                    </div>
                  );
                }
              )}
            </div>

            <div className="flex justify-between">
              {selectedQuestionIndex > 0 && (
                <button
                  className="primary-outlined-btn"
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex - 1);
                  }}
                >
                  Previous
                </button>
              )}
              {selectedQuestionIndex < questions.length - 1 && (
                <button
                  className="primary-contained-btn"
                  onClick={() => {
                    setSelectedQuestionIndex(selectedQuestionIndex + 1);
                  }}
                >
                  Next
                </button>
              )}

              {selectedQuestionIndex === questions.length - 1 && (
                <button
                  className="primary-contained-btn"
                  onClick={() => {
                    calculateResult();

                  }}
                >
                  Submit
                </button>
              )} 
            </div>
          </div>
        )}

        {view === "result" && (
          <div>
            <h1 className="text-2xl">RESULT</h1>

            <div className="marks">
              <h1 className="text-md">Total Marks: {examData.totalMarks}</h1>

              <h1 className="text-md">Obtained Marks: {result.correctAnswers.length}</h1>
              <h1 className = "text-md">Wrong Answers: {result.wrongAnswers.length}</h1>
              <h1 className="text-md">Passing Marks: {examData.passingMarks}</h1>
              <h1 className="text-md">RESULT: {result.result}</h1>
            </div>
          </div>
        )}
      </div>
    )
  );
}

export default WriteExam;
