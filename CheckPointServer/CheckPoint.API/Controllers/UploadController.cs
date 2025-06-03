

using Amazon.S3.Model;
using Amazon.S3;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/upload")]
public class UploadController : ControllerBase
{
    private readonly IAmazonS3 _s3Client;
    private readonly string _bucketName;

    public UploadController(IAmazonS3 s3Client, IConfiguration configuration)
    {
        _s3Client = s3Client;
        _bucketName = configuration["AWS:BucketName"];
    }
    //[Authorize(Policy = "AdminOnly")]
    [HttpGet("presigned-url")]
    public IActionResult GetPresignedUrl(
        string fileName,
        string type, // "results" או "student"
        string subjectName,
        string contentType = null, // סוג הקובץ (למשל, "application/pdf")
        bool isDownload = false, // דגל להורדה או העלאה
        string className = null,
        string studentName = null)
    {
        if (string.IsNullOrWhiteSpace(fileName) ||
            string.IsNullOrWhiteSpace(type) ||
            string.IsNullOrWhiteSpace(subjectName) ||
            string.IsNullOrWhiteSpace(contentType))
        {
            return BadRequest("פרמטרים חסרים או לא תקינים.");
        }

        string key;
        if (type.Equals("results", StringComparison.OrdinalIgnoreCase))
        {
            key = $"exams/results/{subjectName}/{fileName}";
        }
        else if (type.Equals("student", StringComparison.OrdinalIgnoreCase))
        {
            if (string.IsNullOrWhiteSpace(studentName))
                return BadRequest("יש לספק את שם התלמיד עבור מבחן תלמיד.");
            if (string.IsNullOrWhiteSpace(className))
                return BadRequest("יש לספק את שם הכיתה עבור מבחן תלמיד.");

            key = $"exams/student/{className}/{studentName}/{subjectName}/{fileName}";
        }
        else
        {
            return BadRequest("סוג המבחן לא תקין. יש להשתמש ב-'results' או 'student'.");
        }

        var request = new GetPreSignedUrlRequest
        {
            BucketName = _bucketName,
            Key = key,
            Verb = isDownload ? HttpVerb.GET : HttpVerb.PUT, // אם דגל ההורדה פעיל, נבחר GET להורדה
            Expires = DateTime.UtcNow.AddMinutes(100), // תוקף URL ל-10 דקות
            ContentType = contentType
        };

        // ACL: מאפשר שליטה מלאה בבקשה
      // request.Headers["x-amz-acl"] = "bucket-owner-full-control";

        try
        {
            string url = _s3Client.GetPreSignedURL(request);
            return Ok(new { url });
        }
        catch (AmazonS3Exception ex)
        {
            return StatusCode(500, $"שגיאה ביצירת URL עם הרשאות: {ex.Message}");
        }
    }
    [HttpGet("download-url")]
    //[Authorize(Policy = "Admin&Student")]

    public async Task<IActionResult> GetDownloadPresignedUrl(string Url)
    {

        Console.WriteLine(Url);
        var decodedUrl = Uri.UnescapeDataString(Url);
        Console.WriteLine(decodedUrl);
        var request = new GetPreSignedUrlRequest
        {
            BucketName = _bucketName,
            //Key = Url,
            Key = decodedUrl,
            Verb = HttpVerb.GET,
            Expires = DateTime.UtcNow.AddMinutes(20),
            ResponseHeaderOverrides = new ResponseHeaderOverrides
            {
                ContentDisposition = "attachment"
            }
        };

        try
        {
            string url = _s3Client.GetPreSignedURL(request);
            return Ok(new { url });
        }
        catch (AmazonS3Exception ex)
        {
            return StatusCode(500, $"Error generating download URL: {ex.Message}");
        }
    }

}
