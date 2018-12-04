using ChatTutorial.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatTutorial.Services
{
    public interface IChatService
    {
        Task<IEnumerable<ChatMessage>> GetInitial();
        Task<ChatMessage> CreateNewMessage(string senderName, string message);
    }
}
