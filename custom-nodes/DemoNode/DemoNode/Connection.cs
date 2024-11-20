using flowgear.Sdk;

namespace Flowgear.Nodes.DemoNode
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
