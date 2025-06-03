import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Exam, FileWithProgress, Student } from "../../Types";

import React from "react";

type StepperContextType = {
  files: (FileWithProgress | null)[];
  setFiles: Dispatch<SetStateAction<(FileWithProgress | null)[]>>;
  selectedImages: string[];
  setSelectedImages: Dispatch<SetStateAction<string[]>>;
  exams: Exam[] | null;
  setExams: Dispatch<SetStateAction<Exam[] | null>>;
  students: Student[] | null;
  setStudents: Dispatch<SetStateAction<Student[] | null>>;
  marks: number[];
  setMarks: Dispatch<SetStateAction<number[]>>;
  answers: string[];
  setAnswers: Dispatch<SetStateAction<string[]>>;
  isAbleNext: boolean;
  setIsAbleNext: Dispatch<SetStateAction<boolean>>;
};

const StepperContext = createContext<StepperContextType | undefined>(undefined);

export const StepperProvider = ({ children }: { children: React.ReactNode }) => {
  const [files, setFiles] = useState<(FileWithProgress | null)[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [exams, setExams] = useState<Exam[] | null>(null);
  const [students, setStudents] = useState<Student[] | null>(null);
  const [marks, setMarks] = useState<number[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isAbleNext, setIsAbleNext] = useState<boolean>(false);
  return (
    <StepperContext.Provider
      value={{
        files,
        setFiles,
        selectedImages,
        setSelectedImages,
        exams,
        setExams,
        students,
        setStudents,
        marks,
        setMarks,
        answers,
        setAnswers,
        isAbleNext,
        setIsAbleNext,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

export  default StepperContext
