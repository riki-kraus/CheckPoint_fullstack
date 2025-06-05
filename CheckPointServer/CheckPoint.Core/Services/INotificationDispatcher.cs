using CheckPoint.Core.DTOs;
using CheckPoint.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheckPoint.Core.Services
{
    public interface INotificationDispatcher
    {
        Task DispatchToAllAsync(Notification message);
        public Task DispatchToUserAsync(string userId, Notification notification);
    }
 
}
