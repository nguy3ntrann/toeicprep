import React from "react";

function Instructions({ examData, setView }) {
  return (
    <div className="flex flex-col item-center gap-5">
      <h1 className="text-2xl underline">Instructions</h1>
      <ul className="flex flex-col gap-1">
        <li>Exam must be completed in {examData.duration} minutes</li>
        <li>Exam will be submitted automatically in {examData.duration}</li>
        <li>Once submitted, you cannot changed the answer</li>
        <li>Do not refresh the page. It will lose your progress</li>
        <li>
          There are {examData.totalMarks} points, passing mark is{" "}
          {examData.passingMarks}
        </li>
      </ul>
      <button
        className="primary-outlined-btn"
        onClick={() => setView("questions")}
      >
        Start exam
      </button>
    </div>
  );
}

export default Instructions;
