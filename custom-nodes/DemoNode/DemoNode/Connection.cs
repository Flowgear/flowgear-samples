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

        [Property(ExtendedType.None)]
        public string SomeExampleProperty { get; set; }

        [Property(ExtendedType.Secret)]
        public string SomeExampleSecretProperty { get; set; }

        /// <summary>
        /// Typical property for OAuth2
        /// </summary>
        [Property(ExtendedType.None)]
        public string AccessToken { get; set; }

        /// <summary>
        /// Typical property for OAuth2
        /// </summary>
        [Property(ExtendedType.None)]
        public string RefreshToken { get; set; }
    }

}
