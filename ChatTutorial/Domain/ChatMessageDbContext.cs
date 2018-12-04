using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatTutorial.Domain;
using Microsoft.EntityFrameworkCore;

namespace ChatTutorial.Domain
{
    public class ChatMessageDbContext : DbContext
    {
        public ChatMessageDbContext() { }

        public ChatMessageDbContext(DbContextOptions<ChatMessageDbContext> options) : base(options) { }

        public virtual DbSet<ChatMessage> ChatMessage {get; set;}
        public virtual DbSet<UserDetails> UserDetails { get; set; }
    }
}
