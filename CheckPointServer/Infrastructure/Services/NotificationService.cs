using CheckPoint.Core.NewFolder.YourApp.Infrastructure.Hubs;
using CheckPoint.Core.Services;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CheckPoint.Service.YourApp.Infrastructure.Services
{
    public class NotificationService : INotificationService
    {
        private readonly IHubContext<NotificationHub> _hubContext;
        private readonly INotificationRepository _notificationRepository;

        public NotificationService(IHubContext<NotificationHub> hubContext, INotificationRepository notificationRepository)
        {
            _hubContext = hubContext;
            _notificationRepository = notificationRepository;
        }

        public async Task NotifyAllAsync(string message)
        {
            await _hubContext.Clients.All.SendAsync("ReceiveNotification", message);
        }

        public async Task NotifyUserAsync(string userId, string message)
        {
            await _hubContext.Clients.User(userId).SendAsync("ReceiveNotification", message);
        }

        public async Task<Notification> CreateNotificationAsync(Notification notification)
        {
            var created = await _notificationRepository.AddAsync(notification);
            await _hubContext.Clients.All.SendAsync("ReceiveNotification", created);
            return created;
        }

        public async Task<List<Notification>> GetAllNotificationsAsync()
        {
            return await _notificationRepository.GetAllAsync();
        }
    }
}
