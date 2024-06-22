function NextButton({ answer, dispatch, index, numQuestions }) {
  if (answer === null) return;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={(e) => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={(e) => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
