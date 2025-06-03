import { useContext, useState, useEffect } from "react";
import { uploadAllWordFiles } from "../utils/wordUploaderUtils";
import StepperContext from "./context/StepperContext";
import Signature from "./Signature";
import "../styles/WordUploader.css";

const WordUploader = () => {
  const { exams, students, marks, answers, setIsAbleNext } = useContext(StepperContext)!;
  const [signature, setSignature] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleUploadAll = async () => {
    setIsAbleNext(false);

    setIsGenerating(true);
    setIsSuccess(false);
    
    try {
      await uploadAllWordFiles({ exams, students, marks, answers, signature });

      setIsSuccess(true);
      setIsAbleNext(true);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Reset success message after 5 seconds
  useEffect(() => {
    let timer: number;
    if (isSuccess) {
      timer = window.setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isSuccess]);

  // Group students by class for display
  const studentCards = students && students.length > 0 ? (
    <div className="students-grid">
      {students.map((student, index) => (
        <div key={index} className="student-card">
          <div className="card-glow"></div>
          <div className="student-avatar">
            <svg className="user-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <h3 className="student-name">{`${student.firstName} ${student.lastName}`}</h3>
          <div className="student-details">
            <div className="detail-item">
              <div className="detail-icon subject-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </div>
              <div className="detail-content">
                <span className="detail-label">Subject</span>
                <span className="detail-value">{exams?.[index]?.subject || "N/A"}</span>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon date-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <div className="detail-content">
                <span className="detail-label">Date</span>
                <span className="detail-value">{exams?.[index]?.dateExam || "N/A"}</span>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon score-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
              <div className="detail-content">
                <span className="detail-label">Score</span>
                <span className="detail-value score">{marks[index]}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : null;

  return (
    <div className="word-uploader-container">
      <div className="background-particles"></div>
      
      <div className="word-uploader-header">
        <div className="header-badge">
          <div className="badge-glow"></div>
          <svg className="sparkle-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z"></path>
          </svg>
          <span>Create Feedback Files</span>
        </div>
        <h1 className="main-title">Generate Word Documents</h1>
        <p className="subtitle">Create comprehensive feedback files with detailed analysis for each student's performance</p>
      </div>
      
      <div className="content-section">
        {studentCards}
        
        <div className="actions-container">
          <button 
            className={`create-button ${isGenerating ? 'generating' : ''} ${isSuccess ? 'success' : ''}`}
            onClick={handleUploadAll}
            disabled={isGenerating}
          >
            <div className="button-background"></div>
            <div className="button-content">
              {isGenerating ? (
                <>
                  <div className="spinner-container">
                    <div className="spinner"></div>
                    <div className="spinner-ring"></div>
                  </div>
                  <span className="button-text">Generating Files...</span>
                </>
              ) : (
                <>
                  <div className="upload-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                  <span className="button-text">Create Feedback Files</span>
                </>
              )}
            </div>
            <div className="button-shine"></div>
          </button>
          
          <div className="signature-container">
            <Signature onSignature={setSignature} />
          </div>
        </div>
      </div>
      
      {isSuccess && (
        <div className="success-message">
          <div className="success-background"></div>
          <div className="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div className="success-content">
            <span className="success-title">Success!</span>
            <span className="success-text">Feedback files created successfully</span>
          </div>
          <div className="success-particles"></div>
        </div>
      )}
    </div>
  );
};

export default WordUploader;