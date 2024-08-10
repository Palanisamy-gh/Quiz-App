import { useEffect, useState } from "react";
import "./App.css";
import questions from "./questions/questions.json";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval;
    if (timer > 0 && !showScore) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setShowScore(true);
    }
    return () => clearInterval(interval);
  }, [timer, showScore]);

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].correctOption) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setTimer(100);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(100);
  };
  return (
    <>
      <div className="bg-white w-[600px] p-4 shadow-lg rounded-lg ">
        {showScore ? (
          <div className="score-section text-center p-10">
            <div>
              <h2 className="text-xl font-bold">Your score</h2>
              <span className="text-xl font-bold text-blue-600">
                {score}/{questions.length}
              </span>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded-3xl font-semibold"
              onClick={handleRestart}
            >
              Restart
            </button>
            <p className="text-xl font-bold text-green-600 mt-2">
              Well done👍 Keep Learning!
            </p>
          </div>
        ) : (
          <div className=" text-center  space-y-4">
            <h1 className="text-xl font-bold text-blue-700">
              Questions No : {currentQuestion + 1}
            </h1>
            <p className="text-xl font-semibold">
              {questions[currentQuestion].question}
            </p>
            <div className="mt-2 flex flex-col">
              {questions[currentQuestion].options.map((options, index) => (
                <button
                  key={index}
                  className="border border-black   px-3 py-1.5 m-2 rounded font-semibold cursor-pointer hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                  onClick={() => {
                    handleAnswerClick(options);
                  }}
                >
                  {options}
                </button>
              ))}
            </div>
            <div className="text-slate-800 font-bold">
              Time Left :{" "}
              <span className="text-red-600 font-bold">{timer}s</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
