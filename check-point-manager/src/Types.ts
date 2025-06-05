
export type Student = {
    id?: number,
    userName?: string,
    password?:string,
    firstName: string,
    lastName: string,
    email?:string,
    class: string
}

export type Submission = {
    // date: any;
    id?: number;
    studentId: number;
    student?: Student|null;
    examId: number;
    exam?: Exam;
    score: number;
    fileUrl: string;
    fileUrlFeedback: string;
    // dateCreated: string;
  };
  
  export type Answer = {
    id?: number;
    section: string;
    correctAnswer: number;
    examId: number;
    // exam?: Exam|null;
  };
export type Exam ={
  id?: number;
  dateExam: string ;
  subject: string ;
  file_Url_Exam:string
   dateCreated?: string|null;
  // submissions?: Submission[] | null;
  // answers?: Answer[]|null;
}

export interface FileWithProgress {
  file: File;
  progress: number;
  uploading: boolean;
}
 export type NotificationType = 'success' | 'warning' | 'error' | 'info';
export type NotificationAdmin = {
  id?: number;
  title: string;
  message: string;
  type: NotificationType;
  priority: 'low' | 'medium' | 'high';
  read?: boolean;
  timestamp: Date;
};
