import React from "react";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Stepper, Step, StepLabel } from "@mui/material";
import Box from "@mui/material/Box";
import StepButton from "@mui/material/StepButton";
import PersonaDetailsForm from "./PersonaDetailsForm";
import SportInterests from "./SportInterests";

const steps = ["Personal Details", "Sport Interests"];

export default function Registration() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: "100%" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Typography variant="h2" component={"h2"} className="title">
            Join Us
          </Typography>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          {allStepsCompleted() ? (
            ""
          ) : (
            <div
              className="userRegistrationForm"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                padding: "4%",
              }}
            >
              {activeStep === 0 ? (
                <PersonaDetailsForm
                  handleNext={handleNext}
                ></PersonaDetailsForm>
              ) : (
                ""
              )}
              {activeStep === 1 ? <SportInterests></SportInterests> : ""}
              <div
                className="fifthRow"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  padding: "10%",
                }}
              >
                {activeStep === 0 ? (
                  // <Button
                  //   variant="contained"
                  //   color="primary"
                  //   style={{ width: "30%" }}
                  //   onClick={handleNext}
                  // >
                  //   Next
                  // </Button>
                  ""
                ) : (
                  <React.Fragment>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ width: "30%" }}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ width: "30%" }}
                      onClick={handleNext}
                    >
                      Register
                    </Button>
                  </React.Fragment>
                )}
              </div>
            </div>
          )}
        </div>
      </LocalizationProvider>
    </Box>
  );
}
