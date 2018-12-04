using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatTutorial.Domain
{
    public class UserDetails
    {
        public virtual int Id { get; internal set; }
        public virtual string Name { get; internal set; }
    }
}
