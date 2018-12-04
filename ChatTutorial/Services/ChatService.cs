using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatTutorial.Domain;

namespace ChatTutorial.Services
{
    public class ChatService : IChatService
    {
        public Task<ChatMessage> CreateNewMessage(string senderName, string message)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ChatMessage>> GetInitial()
        {
            throw new NotImplementedException();
        }
    }
}
