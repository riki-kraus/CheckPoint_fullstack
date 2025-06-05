using Microsoft.AspNetCore.SignalR;



namespace CheckPoint.API
{

    public class NotificationHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            await Clients.Caller.SendAsync("ReceiveNotification", "🔔 התחברת בהצלחה להתראות בזמן אמת");
            await base.OnConnectedAsync();
        }
    }

}
