using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatTutorial.Domain;
using ChatTutorial.Repositories;
using ChatTutorial.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChatTutorial.Controllers
{
    [Route("api/[controller]")]
    public class ChatController : Controller
    {

        private readonly IChatService _chatService;
        private readonly IChatMessageRepository _chatMessageRepository;

        //public ChatController(IChatService chatService)
        //{
        //    _chatService = chatService;
        //}
        public ChatController(IChatMessageRepository chatMessageRepository)
        {
            _chatMessageRepository = chatMessageRepository;
        }

        // GET: api/<controller>
        [HttpGet("[action]")]
        public async Task<IActionResult> LoggedOnUsers()
        {
            var users = new[]
            {
                new UserDetails {Id = 1, Name = "Pepe" },
                new UserDetails {Id = 2, Name = "Mary" },
                new UserDetails {Id = 3, Name = "Pete" },
                new UserDetails {Id = 4, Name = "Mo" },
            };

            return Ok(users);

        }

        [HttpGet("[action]")]
        public async Task<IActionResult> InitialMessages()
        {
            var messages = await _chatMessageRepository.GetTopMessages();

            return Ok(messages);

        }

    }
}