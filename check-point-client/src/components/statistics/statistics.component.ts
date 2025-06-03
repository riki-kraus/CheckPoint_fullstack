import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Chart, registerables } from 'chart.js';


import { Student } from '../../models/Student';
import { SubmissionService } from '../../services/submission/submission.service';
import { Exam } from '../../models/Exam';
import { StudentService } from '../../services/student/student.service';
import { AuthService } from '../../services/auth/auth-service.service';

Chart.register(...registerables);


@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('0.6s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate('0.8s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('0.5s ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]),
    trigger('pulse', [
      state('active', style({ transform: 'scale(1.05)' })),
      state('inactive', style({ transform: 'scale(1)' })),
      transition('inactive => active', animate('0.3s ease-in')),
      transition('active => inactive', animate('0.3s ease-out'))
    ])
  ]
})
export class StudentDashboardComponent implements OnInit {
  activeTab: string = 'performance';
  student?: Student;
  studentExams: Exam[] = [];

  constructor(private submissionService: SubmissionService,private authService:AuthService,private studentService:StudentService) { }

  subjectPerformance: { subject?: string, score: number }[] = []
  progressData: { dateExam?: string, score: number }[] = [];

  skillBreakdown = [
    { skill: 'Critical Thinking', percentage: 27, color: '#10B981' },
    { skill: 'Problem Solving', percentage: 26, color: '#F59E0B' },
    { skill: 'Application', percentage: 24, color: '#8B5CF6' },
    { skill: 'Memorization', percentage: 23, color: '#3B82F6' }
  ];

  averageGrade = 0;
  bestSubject: { name?: string, grade?: number } = {};
  improvementAreas: string[] = [];

  private subjectChart: any;
  private progressChart: any;
  private skillChart: any;
  ngOnInit() {
      this.studentService.getStudentById(Number(localStorage.getItem("userId"))).subscribe((student: Student | undefined) => {

      this.student = student;
    });

    this.submissionService.LoadSubmmisionById(Number(localStorage.getItem("userId")))

    this.submissionService.submissions$.subscribe((submissions) => {
      if(submissions)
     { this.subjectPerformance = submissions.map(s => ({
        subject: s.exam?.subject,
        score: s.score ?? 0
      }));

      this.progressData = submissions.map(s => ({
        dateExam: s.exam?.dateExam,
        score: s.score ?? 0
      }));

      this.averageGrade = this.calculateAverage(this.subjectPerformance);
      this.bestSubject = this.findBestSubject(this.subjectPerformance.filter(item => item.subject !== undefined) as { subject: string, score: number }[]);
      this.improvementAreas = Array.from(new Set(submissions.filter(s => (s.score ?? 0) < 80).map(s => s.exam?.subject).filter((subject): subject is string => subject !== undefined)));
    }
      setTimeout(() => this.createCharts(), 0);
    });
    setTimeout(() => {
      this.createSubjectChart();
      this.createSkillChart();
      this.createProgressChart();
    }, 500);
  }
  calculateAverage(data: { score: number }[]): number {
    if (data.length === 0) return 0;
    const total = data.reduce((sum, item) => sum + item.score, 0);
    return Math.round(total / data.length);
  }

  findBestSubject(data: { subject: string, score: number }[]) {
    if (!data.length) return { name: '', grade: 0 };
    const best = data.reduce((a, b) => (a.score > b.score ? a : b));
    return { name: best.subject, grade: best.score };
  }

  switchTab(tab: string) {
    this.activeTab = tab;

    setTimeout(() => {
      if (tab === 'progress') {
        this.createProgressChart();
      } else if (tab === 'performance') {
        this.createSubjectChart();
        this.createSkillChart();
      }
    }, 0);
  }

  createCharts() {
    if (this.activeTab === 'performance') {
      this.createSubjectChart();
      this.createSkillChart();
    } else {
      this.createProgressChart();
    }
  }

  createSubjectChart() {
    const ctx = document.getElementById('subjectChart') as HTMLCanvasElement;
    if (this.subjectChart) {
      this.subjectChart.destroy();
    }

    this.subjectChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.subjectPerformance.map(item => item.subject),
        datasets: [{
          data: this.subjectPerformance.map(item => item.score),
          backgroundColor: '#F59E0B',
          borderRadius: 8,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: '#374151'
            },
            border: {
              display: false
            },
            ticks: {
              color: '#9CA3AF'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#9CA3AF'
            }
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeOutBounce'
        }
      }
    });
  }

  createSkillChart() {
    const ctx = document.getElementById('skillChart') as HTMLCanvasElement;
    if (this.skillChart) {
      this.skillChart.destroy();
    }

    this.skillChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.skillBreakdown.map(item => item.skill),
        datasets: [{
          data: this.skillBreakdown.map(item => item.percentage),
          backgroundColor: this.skillBreakdown.map(item => item.color),
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        cutout: '70%',
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        animation: {
          animateRotate: true,
          duration: 2000
        }
      }
    });
  }

  createProgressChart() {
    const ctx = document.getElementById('progressChart') as HTMLCanvasElement;
    if (this.progressChart) {
      this.progressChart.destroy();
    }

    this.progressChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.progressData.map(item => item.dateExam),
        datasets: [{
          data: this.progressData.map(item => item.score),
          borderColor: '#F59E0B',
          backgroundColor: 'transparent',
          borderWidth: 3,
          pointBackgroundColor: '#F59E0B',
          pointBorderColor: '#F59E0B',
          pointRadius: 6,
          pointHoverRadius: 8,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#1F2937',
            titleColor: '#F59E0B',
            bodyColor: '#F3F4F6',
            borderColor: '#F59E0B',
            borderWidth: 1
          }
        },
        scales: {
          y: {
            min: 70,
            max: 100,
            grid: {
              color: '#374151'
            },
            border: {
              display: false
            },
            ticks: {
              color: '#9CA3AF'
            }
          },
          x: {
            grid: {
              color: '#374151'
            },
            border: {
              display: false
            },
            ticks: {
              color: '#9CA3AF'
            }
          }
        },

        animation: {
          duration: 2000,
          easing: 'easeInOutQuart'
        }
      }
    });
  }
}