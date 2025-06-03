
using CheckPoint.Core.IRepositories;
using Microsoft.Extensions.Configuration;
using System;

namespace CheckPoint.Core.Services
{
    public class S3Service : IS3Service
    {
        private readonly IS3Repository _s3Repository;
        private readonly string _bucketName;

        public S3Service(IS3Repository s3Repository, IConfiguration configuration)
        {
            _s3Repository = s3Repository;
            _bucketName = configuration["AWS:BucketName"];
        }

        // עדכון המתודה כך שתומך בהורדה
        public string GetPresignedUrl(string fileName, string contentType, bool isDownload = false)
        {
            return _s3Repository.GeneratePresignedUrl(fileName, contentType, isDownload);
        }
    }
}
