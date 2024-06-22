function FinishScreen({ points, maxPossiblePoints, highscore }) {
  const percentage = (points / maxPossiblePoints) * 100;
  return (
    <>
      <div className="result">
        You Scored <strong>{points}</strong> out of {maxPossiblePoints}(
        {Math.ceil(percentage)}%)
      </div>
      <p className="highscore">(Highscore: {highscore} points)</p>
    </>
  );
}

export default FinishScreen;
