using flowgear.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DemoNode
{
    // Connections are defined in their own class
    public class Connection
    {
        // Connection properties must also be decorated with the Property attribute
        [Property(ExtendedType.None)]
        public string Username { get; set; }
        // Hide sensitive information by marking a property as a Password
        [Property(ExtendedType.Secret)]
        public string Password { get; set; }

        [Property(ExtendedType.None)]
        // these props are used to illustrate OAuth2
        public string AccessToken { get; set; }

        [Property(ExtendedType.None)]
        public string RefreshToken { get; set; }
    }

}
