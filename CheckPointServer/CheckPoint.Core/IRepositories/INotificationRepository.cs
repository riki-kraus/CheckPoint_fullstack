using CheckPoint.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CheckPoint.Core.Repositories
{
    public interface INotificationRepository
    {
        Task<Notification> AddAsync(Notification notification);
        Task<List<Notification>> GetAllAsync();
        //Task DeleteNotification(int id);

    }
}
