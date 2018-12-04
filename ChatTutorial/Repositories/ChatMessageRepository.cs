using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatTutorial.Domain;
using ChatTutorial.Domain;
using Microsoft.EntityFrameworkCore;

namespace ChatTutorial.Repositories
{
    public class ChatMessageRepository : GenericRepository<ChatMessage>, IChatMessageRepository
    {

        public ChatMessageRepository(ChatMessageDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public Task<List<ChatMessage>> GetTopMessages(int number = 100)
        {
            var chatMesssages = _dbContext.ChatMessage.OrderByDescending(x => x.Date).Take(number).ToListAsync();
            return chatMesssages;            
        }
    }
}
