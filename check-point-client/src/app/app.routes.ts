import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { MainLayoutComponent } from '../components/layouts/main-layout/main-layout.component';
import { AuthComponent } from '../components/register/auth.component';
import { StudentDashboardComponent } from '../components/statistics/statistics.component';
import { ExamResultsComponent } from '../components/exam-results/exam-results.component';
import { ExamsComponent } from '../components/exams/exams.component';
import { GoogleSigninComponent } from '../components/google-signin/google-signin.component';
import { GradeAppealComponent } from '../components/grade-appeal/grade-appeal.component';
import { authGuard } from '../guards/auth.guard';


export const routes: Routes = [
        {
                path: '',
             component: MainLayoutComponent,
                   

                children: [
                        { path: '', redirectTo: 'home', pathMatch: 'full' },
                       { path: 'home', component: HomeComponent },
                        {path:'getStarted',component:AuthComponent},
                        {path:'dashboard', component:StudentDashboardComponent,canActivate:[authGuard]},
                        {path:'exams', component:ExamsComponent,canActivate:[authGuard]},
                ]
        }
];
