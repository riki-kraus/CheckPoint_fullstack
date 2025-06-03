// // uploadService.ts
// import axios from "axios";

// // פונקציה להעלאת קובץ ל-S3 עם החזרת אחוזים
// export const uploadFileToS3 = async (
//   file: File,
//   exam: any,
//   student: any,
//   onProgress: (percent: number) => void // מקבלים פונקציה לעדכון התקדמות
// ) => {
//   const fileExtension = file.name.split(".").pop();
//   const finalFileName = `${exam?.dateExam || `file_${Math.random()}`}.${fileExtension}`;

//   const params: any = {
//     fileName: finalFileName,
//     type: student ? "student" : "results",
//     subjectName: exam?.subject || "",
//     contentType: file.type, // ✅ חובה!
//   };

//   if (student) {
//     params.studentName = `${student.FirstName} ${student.LastName}`;
//     params.className = student.Class || "";
//   }

//   try {
//     const response = await axios.get("https://localhost:50397/api/upload/presigned-url", {
//       params,
//     });

//     const presignedUrl = response.data.url;

//     await axios.put(presignedUrl, file, {
//       headers: {
//         "Content-Type": file.type,
//         "x-amz-acl": "bucket-owner-full-control",
//       },
//       onUploadProgress: (event) => {
//         const percent = Math.round((event.loaded * 100) / (event.total || 1));
//         onProgress(percent); // עדכון אחוז ההתקדמות
//       },
//     });

//     return true; // מחזיר שההעלאה הצליחה
//   } catch (error) {
//     console.error("❌ שגיאה בהעלאה:", error);
//     throw new Error("אירעה שגיאה במהלך ההעלאה.");
//   }
// };
// s3Service.ts

import axios from "axios";

// עוזר לבניית הפרמטרים
const buildParams = (
  fileName: string,
  exam: any,
  student: any,
  contentType: string,
  isDownload: boolean
) => {
  const params: any = {
    fileName,
    type: student ? "student" : "results",
    subjectName: exam?.subject || "",
    contentType,
    isDownload,
  };

  if (student) {
    params.studentName = `${student.firstName} ${student.lastName}`;
    params.className = student.class || "";
  }

  return params;
};

// 📤 העלאת קובץ ל-S3
export const uploadFileToS3 = async (

  file?: File,
  exam?: any,
  student?: any,
  onProgress?: (percent: number) => void
): Promise<{ success: boolean; fileName: string }> => {
  console.log(file)
  console.log(exam)

  console.log(student)

  const fileExtension = file?.name.split(".").pop();
  const finalFileName = `${exam?.dateExam || `file_${Math.random()}`}.${fileExtension}`;


  if (!file) {
    throw new Error("File is required for upload.");
  }
  const params = buildParams(finalFileName, exam, student, file.type, false);

  try {
    const response = await axios.get("https://localhost:50397/api/upload/presigned-url", {
      params,
    });

    const presignedUrl = response.data.url;

    await axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": file.type,
        "x-amz-acl": "bucket-owner-full-control",
      },
      onUploadProgress: (event) => {
        const percent = Math.round((event.loaded * 100) / (event.total || 1));
        if (onProgress) {
          onProgress(percent);
        }
      },
    });

    return { success: true, fileName: finalFileName };
  } catch (error) {
    console.error("❌ שגיאה בהעלאה:", error);
    throw new Error("אירעה שגיאה במהלך ההעלאה.");
  }
};
// const url=`exams/student/${student.Class}/${fullName}/${exam.subject}`
// const fileExamUrl=`${url}/${fileExamName}`
// const filFeedbackUrl=`${url}/${fileFeedbackName}`
//-----------


// 📥 הורדת קובץ מ-S3
export const downloadFileFromS3 = async (
  fileName: string,
  exam: any,
  student: any
) => {
  const params = buildParams(fileName, exam, student, "application/octet-stream", true);

  try {
    const response = await axios.get("https://localhost:50397/api/upload/presigned-url", {
      params,
    });

    const presignedUrl = response.data.url;

    // פתיחה בטאב חדש
    window.open(presignedUrl, "_blank");
  } catch (error) {
    console.error("❌ שגיאה בהורדה:", error);
    throw new Error("אירעה שגיאה במהלך ההורדה.");
  }
};
