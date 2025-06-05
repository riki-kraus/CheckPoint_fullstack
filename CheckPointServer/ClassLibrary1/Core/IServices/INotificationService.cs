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
        Task<NotificationItem> CreateNotificationAsync(NotificationItem notification);
        Task<List<NotificationItem>> GetAllNotificationsAsync();
    }
}
