using ChatTutorial.Domain;
using ChatTutorial.Repositories;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatTutorial.Hubs
{
    public class ChatHub : Hub
    {

        private readonly IChatMessageRepository _chatMessageRepository;

        public ChatHub(IChatMessageRepository chatMessageRepository)
        {
            _chatMessageRepository = chatMessageRepository;
        }

        public async void AddMessage(string message)
        {
            var chatMessage = new ChatMessage(Guid.NewGuid())
            {
                Sender = "Pepe",
                Message = message
            };

            await _chatMessageRepository.InsertAsync(chatMessage);

            // Call the MesssageAdded method to update clients.
            await Clients.All.SendAsync("MessageAdded", chatMessage);

        }

    }
}
