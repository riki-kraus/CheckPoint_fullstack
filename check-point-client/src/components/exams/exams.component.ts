
import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Submission } from '../../models/Submission';
import { SubmissionService } from '../../services/submission/submission.service';
import { GradeAppealComponent } from "../grade-appeal/grade-appeal.component";
import { EmailRequest } from '../../models/EmailRequest';
import { EmailService } from '../../services/email/email.service';
import { DownloadFromS3Service } from '../../services/DownloadFromS3/download-from-s3.service';
import { FeedbackModalComponent } from "../feedback-modal/feedback-modal.component";



@Component({
  selector: 'app-exams',
  standalone: true,
  imports: [CommonModule, FormsModule, GradeAppealComponent, FeedbackModalComponent],
  templateUrl: './exams.component.html',
  styleUrls: ['./exams1.component.css', './exams2.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate('0.6s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-50px)', opacity: 0 }),
        animate('0.5s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
    trigger('cardAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.9) translateY(20px)', opacity: 0 }),
        animate('0.4s ease-out', style({ transform: 'scale(1) translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ transform: 'translateY(20px)', opacity: 0 }),
          stagger(100, [
            animate('0.5s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('buttonHover', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.05)' })),
      transition('normal <=> hovered', animate('0.2s ease-in-out'))
    ]),
    trigger('scoreAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0)', opacity: 0 }),
        animate('0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class ExamsComponent implements OnInit {
  isAppealDialogOpen = false;
  selectedSubmission?: Submission;
  constructor(
    private submissionService: SubmissionService,
    private emailService: EmailService,
    private downloadFromS3Service:DownloadFromS3Service
  ) {
    this.allServices$ = this.submissionService.submissions$;
  }
  submitAppeal(submission: Submission) {
    this.selectedSubmission = submission;
    this.isAppealDialogOpen = true;
  }

  handleAppealSubmission(text: string) {

    this.isAppealDialogOpen = false;
  const name= JSON.parse(localStorage.getItem('profile') || '{}').name

    const emailRequest: EmailRequest = {
      name: `${name} | ${this.selectedSubmission?.exam?.subject} | ${this.selectedSubmission?.exam?.dateExam} `,
      email: 'maof5728@gmail.com',
      message: `${text}`
    };
    this.emailService.sendEmail(emailRequest).subscribe(response => {
    }
    , error => {  
      console.error('Error sending email:', error);
    });
 
  }
showAllSubjects() {
throw new Error('Method not implemented.');
}
  searchTerm: string = '';
  selectedSubject: string = 'All Subjects';

  subjects: string[] = ['All Subjects'];
  filteredExams: Submission[] = [];
  allExams: Submission[] = [];
 
  loading = true;

  status = 'fail'
  allServices$: Observable<Submission[] | undefined>;

  
  ngOnInit(): void {
    this.submissionService.LoadSubmmisionById(Number(localStorage.getItem("userId")) )

    this.allServices$ = this.submissionService.submissions$;
    this.allServices$.subscribe(submmisions => {
      this.allExams = submmisions || [];
      this.filteredExams = submmisions || [];
      this.loading = false;
      submmisions?.forEach(submmision => {
        const subject = submmision.exam?.subject;
        if (subject && !this.subjects.includes(subject)) {
          this.subjects.push(subject);
        }
      });
    });
  }

  filterExams() {
    const term = this.searchTerm.toLowerCase();
    this.filteredExams = this.allExams.filter(submission => {
      const matchesSubjectText = submission.exam?.subject.toLowerCase().includes(term);
      const matchesDate = submission.exam?.dateExam?.toString().toLowerCase().includes(term);
      const matchesScore = submission.score?.toString().includes(term);
      const matchesSearch =
        matchesSubjectText || matchesDate || matchesScore;
      const matchesSubject =
        this.selectedSubject === 'All Subjects' || submission.exam?.subject === this.selectedSubject;
      return matchesSearch && matchesSubject;
    });
  }

  onSearchChange() {
    this.filterExams();
  }

  onSubjectChange() {
    this.filterExams();
  }

  getScoreColor(score?: number): string {
    if (!score) return '#6b7280';
    if (score >= 90) return '#10b981';
    if (score >= 80) return '#f59e0b';
    if (score >= 70) return '#f97316';
    return '#ef4444';
  }

  getStatusColor(score: number): string {

    if (score > 60) {
      this.status = 'succecs'
      return '#f59e0b'
    }
    this.status = 'fail';
    return '#6b7280';
  }

  downloadExam(exam: Submission) {
  }

  downloadFile(exam: Submission, IsFeedback: boolean) {
    this.downloadFromS3Service.getUrlFile(exam, IsFeedback, true).subscribe({
      next: (response: { url: string; }) => {
        if (!response?.url) {
          console.error('No URL returned from server.');
          return;
        }
        const link = document.createElement('a');
        link.href = response.url;
        const nameFile = IsFeedback ? `${exam.exam?.subject}_Exam.docs` : `${exam.exam?.subject}_Exam.jpg`;
        link.download = nameFile;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      error: (error) => {
        console.error('Error downloading feedback:', error);
      }
    });
  }

  // ....................................
  showFeedbackModal = false;
  selectedExam: Submission | null = null;

  

  viewScannedExam(exam: Submission) {
    if (!exam.file_Url) {
      console.error("No feedback file URL available");
      return;
    }
    this.selectedExam = exam;
    this.showFeedbackModal = true;
  }

  closeFeedbackModal() {
    this.showFeedbackModal = false;
    this.selectedExam = null;
  }

}


