using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core.Services
{
    public interface IS3Service
    {
        string GetPresignedUrl(string fileName, string contentType, bool isDownload = false);
    }
}
