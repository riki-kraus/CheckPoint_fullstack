import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Submission } from '../../models/Submission';


@Injectable({
  providedIn: 'root'
})
export class DownloadFromS3Service {

  constructor(private http: HttpClient) { }

  getUrlFile(exam: Submission, IsFeedback: boolean, IsDownload: boolean): Observable<{ url: string }> {
    const url = IsFeedback ? exam.file_Url_FeedBack! : exam.file_Url!
    const params = {

      Url: encodeURIComponent(url),
      IsStudentTest: true,
      IsDownload: IsDownload,
    };
    return this.http.get<{ url: string }>(`/upload/download-url`, { params });
  }

}
