//using Amazon.S3;
//using Amazon.S3.Model;
//using Amazon.Runtime;
//using CheckPoint.Core.IRepositories;
//using Microsoft.Extensions.Configuration;

//namespace CheckPoint.Data.Repositories
//{
//    public class S3Repository : IS3Repository
//    {
//        private readonly IAmazonS3 _s3Client;
//        private readonly string _bucketName;

//        public S3Repository(IAmazonS3 s3Client, IConfiguration configuration)
//        {
//            _s3Client = s3Client;
//            _bucketName = configuration["AWS:BucketName"]; // קריאה מה-Settings
//        }

//        public string GeneratePresignedUrl(string fileName, string contentType)
//        {
//            var request = new GetPreSignedUrlRequest
//            {
//                BucketName = _bucketName,
//                Key = fileName,
//                Verb = HttpVerb.PUT,
//                Expires = DateTime.UtcNow.AddMinutes(5),
//                ContentType = contentType
//            };

//            return _s3Client.GetPreSignedURL(request);
//        }
//    }
//}
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.Runtime;
using CheckPoint.Core.IRepositories;
using Microsoft.Extensions.Configuration;

namespace CheckPoint.Data.Repositories
{
    public class S3Repository : IS3Repository
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        public S3Repository(IAmazonS3 s3Client, IConfiguration configuration)
        {
            _s3Client = s3Client;
            _bucketName = configuration["AWS:BucketName"]; // קריאה מה-Settings
        }

        // עדכון המתודה כך שהיא תומכת גם בהורדה וגם בהעלאה
        public string GeneratePresignedUrl(string fileName, string contentType, bool isDownload = false)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = fileName,
                Verb = isDownload ? HttpVerb.GET : HttpVerb.PUT, // אם isDownload=true, אז GET (הורדה)
                Expires = DateTime.UtcNow.AddMinutes(5),
                ContentType = contentType
            };

            return _s3Client.GetPreSignedURL(request);
        }
    }
}
