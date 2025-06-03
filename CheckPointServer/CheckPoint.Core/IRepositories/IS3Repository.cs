using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core.IRepositories
{
    public interface IS3Repository
    {
        string GeneratePresignedUrl(string fileName, string contentType, bool isDownload = false);
    }
}
