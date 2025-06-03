import { Exam } from "./Exam";

export class Submission{
    constructor(
        public score:number,
        public file_Url?: string,
        public file_Url_FeedBack?: string,
        public dateCreated?: Date,
        public	exam? :Exam,
        public id?: number,
        public studentId? : number,
    )
    {}
}
