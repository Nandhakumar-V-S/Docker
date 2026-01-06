import React, { useState } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GoDotFill } from "react-icons/go";
import { BiCheck } from "react-icons/bi";

const MultiStepProgressBar = ({ currentStep, setCurrentStep }) => {
  const StatusValues = [
    { id: 1, value: "Configure" },
    { id: 2, value: "Preview" },
    { id: 3, value: "Summary" },
  ];
  //   const [currentStep, setCurrentStep] = useState(1);
  var stepPercentage = 0;
  var DefaultPercentage = 50;
  if (currentStep === 1) {
    stepPercentage = 0;
  } else if (currentStep === 2) {
    stepPercentage = DefaultPercentage * 1;
  } else if (currentStep === 3) {
    stepPercentage = DefaultPercentage * 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <>
      <section className="dataimport-progress">
        <ProgressBar percent={stepPercentage} direction="vertical">
          {StatusValues.map((data) => (
            <Step key={data.id}>
              {({ accomplished, index }) => (
                <div
                  className={`indexedStep ${
                    accomplished ? "accomplished" : null
                  } ${currentStep === data.id ? "animation" : null}`}
                >
                  {accomplished && currentStep > index ? (
                    <i className="icon active">
                      <BiCheck />
                    </i>
                  ) : (
                    <i className="icon">
                      <GoDotFill />
                    </i>
                  )}
                  <span>{data.value}</span>
                </div>
              )}
            </Step>
          ))}
        </ProgressBar>
      </section>
    </>
  );
};

export default MultiStepProgressBar;
