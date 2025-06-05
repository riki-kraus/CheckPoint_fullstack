using CheckPoint.Core.Entities;
using CheckPoint.Service.YourApp.Infrastructure.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CheckPoint.Core.Services
{
    public interface INotificationService
    {
        Task NotifyAllAsync(string message);
        Task NotifyUserAsync(string userId, string message);
        Task<Notification> CreateNotificationAsync(Notification notification);
        Task<List<Notification>> GetAllNotificationsAsync();
    }
}
