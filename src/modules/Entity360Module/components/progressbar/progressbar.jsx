import { useState, useContext } from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import "./css/progress.scss";
// import { Container, Row, Col, Button } from "react-bootstrap";
import { GoDotFill } from "react-icons/go";
import { BiCheck } from "react-icons/bi";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Detail360Context } from "../../index";
const MultiStepProgressBar = () => {
  const { StatusValues, progressStatus } = useContext(Detail360Context);

  const { currentStep } = progressStatus;
  var stepPercentage = 0;
  var DefaultPercentage = 16.7;
  if (currentStep === 1) {
    stepPercentage = 0;
  } else if (currentStep === 2) {
    stepPercentage = DefaultPercentage * 1;
  } else if (currentStep === 3) {
    stepPercentage = DefaultPercentage * 2;
  } else if (currentStep === 4) {
    stepPercentage = DefaultPercentage * 3;
  } else if (currentStep === 5) {
    stepPercentage = DefaultPercentage * 4;
  } else if (currentStep === 6) {
    stepPercentage = DefaultPercentage * 5;
  } else if (currentStep === 7) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <section className="detail-statusbar">
      <ProgressBar percent={stepPercentage} direction="vertical">
        {StatusValues.map((data) => (
          <Step key={data.id}>
            {({ accomplished, index }) => (
              <div
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                } ${currentStep === data.id ? "animation" : null}`}
              >
                {accomplished && currentStep > index + 1 ? (
                  <span>
                    <BiCheck />
                  </span>
                ) : (
                  <>
                    <span>
                      <GoDotFill />
                    </span>
                    {accomplished && <StatusDropdown />}
                  </>
                )}
                <p>{data.value}</p>
              </div>
            )}
          </Step>
        ))}
      </ProgressBar>
    </section>
  );
};

export default MultiStepProgressBar;

export const StatusDropdown = () => {
  const { StatusValues, progressStatus, setProgressStatus } =
    useContext(Detail360Context);

  const handleSelect = (eventKey) => {
    const selectedStatus = StatusValues.find((data) => data.value === eventKey);
    if (selectedStatus) {
      setProgressStatus({
        ...progressStatus,
        selectedValue: selectedStatus.value,
        currentStep: selectedStatus.id,
      });
    }
  };

  return (
    <>
      <DropdownButton
        id="dropdown-item-button"
        title={progressStatus.selectedValue}
        onSelect={handleSelect}
      >
        <div className="item-div">
          {StatusValues.map((data, index) => (
            <Dropdown.Item
              onClick={() =>
                setProgressStatus({
                  ...progressStatus,
                  selectedValue: data.value,
                  currentStep: data.id,
                })
              }
              eventKey={data.value}
              as="button"
              key={index}
            >
              {data.value}
            </Dropdown.Item>
          ))}
        </div>
      </DropdownButton>
    </>
  );
};
