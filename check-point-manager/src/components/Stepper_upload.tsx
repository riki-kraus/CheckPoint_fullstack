

// import  {  useState } from "react";
// import { Stepper, Step, StepLabel, Button, Box } from "@mui/material";
// import UploadTest from "./UploadTest";
// import StudentTests from "./StudentTests";
// import Upload_s3 from "./Upload_s3";
// import ResultTests from "./ResultTests";
// import WordUploader from "./WordUploader ";

// type Props = {
//   srcComponent: string;
// };

// const Stepper_upload = ({ srcComponent }: Props) => {
//   const [activeStep, setActiveStep] = useState(0);


//   // const handleSelectedImages = (images: string[]) => {
//   //   setSelectedImages(images);
//   //   // console.log("קיבלתי images:", images);

//   // };

//   // const handleFiles = (newFiles: File[]) => {
//   //   // console.log("קבצים:", newFiles.length);
//   //   setFiles(newFiles);
//   // };

//   const steps = [
//     {
//       label: "העלאת קובץ",
//       component: (
//         <UploadTest
//           // onSelectedImage={handleSelectedImages}
//           // onChangedFiles={handleFiles}
//         />
//       ),
//     },
//     {
//       label: srcComponent === "students-test" ? "בדיקת המבחן" : "הוספת המבחן",
//       component:
//         srcComponent === "students-test" ? (
//           <StudentTests
//             // selectedImages={selectedImages}
//             // setExams={setExams}
//             // setStudents={setStudents}
//             // setMarks={setMarks}
//             // setAnswers={setAnswers}
//           />
//         ) : (
//           <ResultTests
//             // selectedImages={selectedImages}
//             // setExams={setExams}

//           />
//         ),
//     },
//     ...(srcComponent == "students-test" ? [{
//       label: "צור קובץ פידבק",
//       component: (
//         <WordUploader
//           // exams={exams}
//           // students={students}
//           // marks={marks}
//           // answers={answers}

//         />
//       ),
//     }] : []),
//     {

//       label: "אישור ושליחה",
//       component: (
//         <Upload_s3
//           // files={files}
//           // exams={exams}
//           // students={students}
//         />
//       ),
//     }
//   ];

//   const handleNext = () => {
//     if (activeStep < steps.length - 1) setActiveStep((prev) => prev + 1);
//   };

//   const handleBack = () => {
//     if (activeStep > 0) setActiveStep((prev) => prev - 1);
//   };

//   return (
//     <Box sx={{ width: "100%" }}>
//       <Stepper activeStep={activeStep} alternativeLabel>
//         {steps.map((step, index) => (
//           <Step key={index}>
//             <StepLabel>{step.label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       <Box sx={{ mt: 4 }}>{steps[activeStep].component}</Box>

//       <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
//         <Button disabled={activeStep === 0} onClick={handleBack}>
//           הקודם
//         </Button>
//         <Button
//           onClick={handleNext}
//           disabled={activeStep === steps.length - 1}
//         >
//           הבא
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Stepper_upload;
// if (!selectedImages || selectedImages.length === 0) {
//   setIsAbleNext(false);
//   return;
// }
// setIsAbleNext(false);  // ברגע שהתחלנו, מונעים מעבר לשלב הבא

"use client"
import { useContext, useState } from "react"
import { CheckCircle, ArrowLeft, ArrowRight } from "lucide-react"
import UploadTest from "./UploadTest"
import StudentTests from "./StudentTests"
import Upload_s3 from "./Upload_s3"
import ResultTests from "./ResultTests"
import WordUploader from "./WordUploader ";
import '../styles/stepper.css'
import StepperContext from "./context/StepperContext"
import { useNavigate } from "react-router-dom"
type Props = {
  srcComponent: string
}

const Stepper_upload = ({ srcComponent }: Props) => {
  const [activeStep, setActiveStep] = useState(0)
  const { isAbleNext, setIsAbleNext } = useContext(StepperContext)!;
const nav=useNavigate()
  const steps = [
    {
      label: "Upload File",
      arabicLabel: "העלאת קובץ",
      component: <UploadTest />,
    },
    {
      label: srcComponent === "students-test" ? "Check Exam" : "Add Exam",
      arabicLabel: srcComponent === "students-test" ? "בדיקת המבחן" : "הוספת המבחן",
      component: srcComponent === "students-test" ? <StudentTests /> : <ResultTests />,
    },
    ...(srcComponent === "students-test"
      ? [
        {
          label: "Create Feedback File",
          arabicLabel: "צור קובץ פידבק",
          component: <WordUploader />,
        },
      ]
      : []),
    {
      label: "Confirm and Send",
      arabicLabel: "אישור ושליחה",
      component: <Upload_s3 />,
    },
  ]

  const handleNext = () => {
    if (activeStep < steps.length - 1) { setActiveStep((prev) => prev + 1) }
    else{
      nav("/")
    }
    setIsAbleNext(false)
  }

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1)
  }

  return (
    <div className="stepper-container">
      <div className="stepper-header">
        {/* <h1 className="stepper-title">Student Exam Check</h1> */}
        <button className="back-button">
          <ArrowLeft size={16} />
          Back to Options
        </button>
      </div>

      <div className="stepper-wrapper">
        <div className="stepper-progress">
          {steps.map((step, index) => (
            <div key={index} className={`step-item ${activeStep === index ? 'active' : ''} ${activeStep > index ? 'completed' : ''}`}>
              <div className="step-circle">
                {activeStep > index ? (
                  <CheckCircle size={20} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <div className="step-label">
                <div className="step-label-main">{step.label}</div>
                <div className="step-label-arabic">{step.arabicLabel}</div>
              </div>
              {index < steps.length - 1 && (
                <div className={`step-connector ${activeStep > index ? 'completed' : ''}`} />
              )}
            </div>
          ))}
        </div>

        <div className="step-content">
          {steps[activeStep].component}
        </div>

        <div className="stepper-actions">
          <button
            className={`stepper-btn stepper-btn-secondary ${activeStep === 0 ? 'disabled' : ''}`}
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            <ArrowLeft size={16} />
            Previous
          </button>
          <button
            className={`stepper-btn stepper-btn-primary ${!isAbleNext ? 'disabled' : ''}`}
            disabled={!isAbleNext}
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Stepper_upload