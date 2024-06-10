import React, { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  function handlePrevious() {
    if (step > 1) {
      setStep((curStep) => curStep - 1);
    }
  }
  function handleNext() {
    if (step < messages.length) {
      setStep((s) => s + 1);
    }
  }
  function handleClose() {
    setIsOpen((is) => !is);
  }
  return (
    <>
      <button className="close" onClick={handleClose}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step === 3 ? "active" : ""}>3</div>
          </div>
          {/* <h3 className="message">
            Step {step}: {messages[step - 1]}
          </h3> */}
          <StepMessage step={step}>{messages[step - 1]}</StepMessage>
          <div className="buttons">
            <Button
              textColor="#fff"
              backgroundColor="#7950f2"
              onClick={handlePrevious}
            >
              <span>👈</span>Previous
            </Button>
            <Button
              textColor="#fff"
              backgroundColor="#7950f2"
              onClick={handleNext}
            >
              Next<span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function Button({ textColor, backgroundColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: backgroundColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function StepMessage({ step, children }) {
  return (
    <>
      <p className="message">
        <h3>Step {step}</h3> {children}
      </p>
    </>
  );
}
