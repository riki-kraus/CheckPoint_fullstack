using CheckPoint.Core.Entities;
using CheckPoint.Core.Services;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace CheckPoint.API.Dispatchers
{
    public class SignalRNotificationDispatcher : INotificationDispatcher
    {
        private readonly IHubContext<NotificationHub> _hubContext;

        public SignalRNotificationDispatcher(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public Task DispatchToAllAsync(Notification notification)
        {
            return _hubContext.Clients.All.SendAsync("ReceiveNotification", notification);
        }


        public Task DispatchToUserAsync(string userId, Notification notification)
        {
            return _hubContext.Clients.User(userId).SendAsync("ReceiveNotification", notification);
        }

    }

    // הגדרת המודל Notification

}
