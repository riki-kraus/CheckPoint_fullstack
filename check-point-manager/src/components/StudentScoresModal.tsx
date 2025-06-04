




// // "use client"


// import {
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     Table,
//     TableHead,
//     TableRow,
//     TableCell,
//     TableBody,
//     Button,
//     TextField,
//     Box,
//     IconButton,
//     DialogActions,
//     Typography,
// } from "@mui/material"
// import { useEffect, useState } from "react"
// import { Visibility, Close, Download, Save, Cancel } from "@mui/icons-material"
// import axios from "axios"
// import "../styles/student-scores-modal.css"
// import { StudentService } from "../services/studentService"
// import { ExamService } from "../services/examService"
// import { Exam, Student } from "../Types"
// import { SubmissionService } from "../services/SubmissionService"
// import { useParams } from "react-router-dom"



// const StudentScoresModal = (async ({ open, onClose }: any) => {
//     const [scores, setscores] = useState<Map<number, Map<number, number>>>(new Map())
//     const [previewUrl, setPreviewUrl] = useState<string | null>(null)
//     const { id } = useParams();
//     const [student, setStudent] = useState<Student | null>(null);

//     if (!student) return null
//     useEffect(() => {
//         const fetchStudent = async () => {
//             if (!id) return;
//              setStudent(await StudentService.getById(Number(id)));
//         };
//         fetchStudent();
//     }, [id]);

//    useEffect(() => { console.log("ccc")  },[])
    

  
//     const openPreview = async (url: string) => {
//         console.log(url)
//         setPreviewUrl(url)
        


//         // try {
//         //     const response = await axios.get(`${apiUrl}/ExamUpload/download-url`, {
//         //         params: {
//         //             Url: encodeURIComponent(url),
//         //             IsStudentTest: true,
//         //         },
//         //     })
//         //     const presignedUrl = response.data.url
//         //     setPreviewUrl(presignedUrl)
//         // } catch (error) {
//         //     console.error("שגיאה בקבלת הקישור:", error)
//         //     alert("אירעה שגיאה בעת ניסיון לפתוח את הקובץ.")
//         // }
//         // const rowsData = await Promise.all( const data = await SubmissionService.getByStudentId(Number(id));
//         const data = await SubmissionService.getByStudentId(Number(id));
//         const submissions = Array.isArray(data) ? data : [data];
//         submissions.map(async (submission, index) => {
//             let examFileUrl = "";
//             try {
//                 // const examParams = extractParamsFromS3Url(submission.file_Url);
//                 const response = await axios.get(
//                     "https://localhost:50397/api/upload/download-url",
//                     {
//                         params: { url: encodeURIComponent(submission.file_Url) },
//                     }
//                 );
//                 examFileUrl = response.data.url;
//             } catch (error) {
//                 console.error("שגיאה בקבלת קובץ מבחן:", error);
//             }

//             return {
//                 id: submission.id || index + 1,
//                 date: submission.exam?.dateExam || "-",
//                 subject: submission.exam?.subject || "-",
//                 score: submission.score,
//                 exam_file: examFileUrl,
//                 feedback_file: "-", // בהמשך תחליפי ל-URL תקני
//             };
//         })
//         //   );
//     }

//     const closePreview = () => {
//         setPreviewUrl(null)
//     }

//     return (
//         <>
//             <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth classes={{ paper: "scores-modal-paper" }}>
//                 <div className="modal-header">
//                     <DialogTitle className="modal-title">
//                         <Typography variant="h5" className="student-name">
//                             Student grades - {student.firstName} {student.lastName}
//                         </Typography>
//                     </DialogTitle>
//                     <IconButton onClick={onClose} className="close-button">
//                         <Close />
//                     </IconButton>
//                 </div>

//                 <DialogContent className="modal-content">
//                     <div className="table-container">
//                         <Table className="scores-table">
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell className="table-header">View</TableCell>
//                                     <TableCell className="table-header">Score</TableCell>
//                                     <TableCell className="table-header">Date Exam</TableCell>
//                                     <TableCell className="table-header">Subject</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {(await ExamService.getAll()).map(async (exam: Exam) => {
//                                     const submission = await SubmissionService.GetByExamIdAndStudentId(exam.id!, student.id!)

//                                     const scoreValue =
//                                         scores.get(Number(id))?.get(exam.id!)?.toString() ?? submission?.score?.toString() ?? ""
//                                     return (
//                                         <TableRow key={exam.id} className="table-row">
//                                             <TableCell className="view-cell">
//                                                 {submission?.fileUrl ? (
//                                                     <IconButton onClick={() => openPreview(submission.fileUrl)} className="view-button">
//                                                         <Visibility />
//                                                     </IconButton>
//                                                 ) : (
//                                                     <span className="no-file">-</span>
//                                                 )}
//                                             </TableCell>
//                                             <TableCell className="score-cell">
//                                                 <TextField
//                                                     size="small"
//                                                     type="number"
//                                                     value={scoreValue}
//                                                     // onChange={(e) => handleScoreChange(student.id!, exam.id!, e.target.value)}
//                                                     className="score-input"
//                                                     InputProps={{
//                                                         classes: {
//                                                             root: "score-input-root",
//                                                         },
//                                                     }}
//                                                 />
//                                             </TableCell>
//                                             <TableCell className="date-cell">{exam.dateExam}</TableCell>
//                                             <TableCell className="subject-cell">{exam.subject}</TableCell>
//                                         </TableRow>
//                                     )
//                                 })}
//                             </TableBody>
//                         </Table>
//                     </div>
//                 </DialogContent>

//                 <DialogActions className="modal-actions">
//                     <Button onClick={onClose} className="cancel-button" startIcon={<Cancel />}>
//                         Cancel
//                     </Button>
//                     {/* <Button onClick={handleSave} variant="contained" className="save-button" startIcon={<Save />}>
//                         Save Changes
//                     </Button> */}
//                 </DialogActions>
//             </Dialog>

//             {/* תצוגת קובץ בגודל מלא */}
//             <Dialog
//                 open={!!previewUrl}
//                 onClose={closePreview}
//                 maxWidth="lg"
//                 fullWidth
//                 classes={{ paper: "preview-modal-paper" }}
//             >
//                 <div className="preview-header">
//                     <DialogTitle className="preview-title">
//                         <Typography variant="h5">View test file</Typography>
//                     </DialogTitle>
//                     <IconButton onClick={closePreview} className="close-button">
//                         <Close />
//                     </IconButton>
//                 </div>

//                 <DialogContent className="preview-content">
//                     {previewUrl && (
//                         <Box className="preview-container">
//                             <img src={previewUrl || "/placeholder.svg"} alt="preview" className="preview-image" />
//                         </Box>
//                     )}
//                 </DialogContent>

//                 <DialogActions className="preview-actions">
//                     <Button onClick={closePreview} className="close-preview-button">
//                         Close
//                     </Button>
//                     {previewUrl && (
//                         <a href={previewUrl} download style={{ textDecoration: "none" }}>
//                             <Button variant="outlined" className="download-button" startIcon={<Download />}>
//                                 Upload File
//                             </Button>
//                         </a>
//                     )}
//                 </DialogActions>
//             </Dialog>
//         </>
//     )
// })

// export default StudentScoresModal




import {Dialog,DialogTitle, DialogContent, Table,TableHead, TableRow, TableCell,TableBody,Button,
    Box,IconButton,DialogActions,Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Visibility, Close, Download, Cancel } from "@mui/icons-material";
import "../styles/student-scores-modal.css";

import {  Student } from "../Types";
import { SubmissionService } from "../services/SubmissionService";
import axiosInstance from "../utils/axiosInstance";
const StudentScoresModal = ({ open, onClose ,currentStudent}: any) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [student, setStudent] = useState<Student | null>(null);
    const [submissions, setSubmissions] = useState<any[]>([]);
    // const { id } = useParams();

    // useEffect(() => {
    //     const fetchStudent = async () => {
    //         if (id) {
    //             const data = await StudentService.getById(Number(id));
    //             setStudent(data);
    //             setStudent(currentStudent);

    //         }
    //     };
    //     fetchStudent();
    // }, [id]);

    useEffect(() => {
        console.log(open)
        const fetchData = async () => {
            setStudent(currentStudent);

            // if (!id) return;

            // const examsData = await ExamService.getAll();
            // setExams(examsData);

            const submissionData = await SubmissionService.getByStudentId(Number(currentStudent.id));
            console.log(submissionData)
            const formatted = Array.isArray(submissionData) ? submissionData : [submissionData];
            setSubmissions(formatted);
        };
        fetchData();
    }, []);

    const openPreview = async (url: string) => {
        try {
            const response = await axiosInstance.get("/upload/download-url", {
                params: { url: encodeURIComponent(url) },
            });
            setPreviewUrl(response.data.url);
        } catch (error) {
            console.error("שגיאה בקבלת הקישור:", error);
            alert("אירעה שגיאה בעת ניסיון לפתוח את הקובץ.");
        }
    };

    const closePreview = () => {
        setPreviewUrl(null);
    };

    if (!student) return null

    
    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth classes={{ paper: "scores-modal-paper" }}>
                <div className="modal-header">
                    <DialogTitle className="modal-title">
                        <Typography variant="h5" className="student-name">
                            Student grades - {student.firstName} {student.lastName}
                        </Typography>
                    </DialogTitle>
                    <IconButton onClick={onClose} className="close-button">
                        <Close />
                    </IconButton>
                </div>

                <DialogContent className="modal-content">
                    <div className="table-container">
                        <Table className="scores-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="table-header">View</TableCell>
                                    <TableCell className="table-header">Score</TableCell>
                                    <TableCell className="table-header">Date Exam</TableCell>
                                    <TableCell className="table-header">Subject</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {submissions.map((submission) => {
                                    // const submission = submissions.find(
                                    //     (sub) => sub.exam?.id === exam.id
                                    // );

                                    // const scoreValue = submission?.score?.toString() 

                                        // scores.get(Number(currentStudent.id))?.get(exam.id!)?.toString() ??
                                        // submission?.score?.toString() ??
                                        // "";

                                    return (
                                        <TableRow key={submission.id} className="table-row">
                                            <TableCell className="view-cell">
                                                {submission?.file_Url ? (
                                                    <IconButton
                                                        onClick={() => openPreview(submission.file_Url)}
                                                        className="view-button"
                                                    >
                                                        <Visibility />
                                                    </IconButton>
                                                ) : (
                                                    <span className="no-file">-</span>
                                                )}
                                            </TableCell>
                                            {/* <TableCell className="score-cell">
                                                <TextField
                                                    size="small"
                                                    // type="number"
                                                    value={scoreValue}
                                                    // className="score-input"
                                                
                                                />
                                            </TableCell> */}
                                            <TableCell className="score-cell">{submission.score}</TableCell>

                                            <TableCell className="date-cell">{submission.exam.dateExam}</TableCell>
                                            <TableCell className="subject-cell">{submission.exam.subject}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </DialogContent>

                <DialogActions className="modal-actions">
                    <Button onClick={onClose} className="cancel-button" startIcon={<Cancel />}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={!!previewUrl}
                onClose={closePreview}
                maxWidth="lg"
                fullWidth
                classes={{ paper: "preview-modal-paper" }}
            >
                <div className="preview-header">
                    <DialogTitle className="preview-title">
                        <Typography variant="h5">View test file</Typography>
                    </DialogTitle>
                    <IconButton onClick={closePreview} className="close-button">
                        <Close />
                    </IconButton>
                </div>

                <DialogContent className="preview-content">
                    {previewUrl && (
                        <Box className="preview-container">
                            <img src={previewUrl} alt="preview" className="preview-image" />
                        </Box>
                    )}
                </DialogContent>

                <DialogActions className="preview-actions">
                    <Button onClick={closePreview} className="close-preview-button">
                        Close
                    </Button>
                    {previewUrl && (
                        <a href={previewUrl} download style={{ textDecoration: "none" }}>
                            <Button variant="outlined" className="download-button" startIcon={<Download />}>
                                Upload File
                            </Button>
                        </a>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default StudentScoresModal;



