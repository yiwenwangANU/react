function NextButton({ answer, dispatch }) {
  if (answer === null) return;
  return (
    <button
      className="btn btn-ui"
      onClick={(e) => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}

export default NextButton;
