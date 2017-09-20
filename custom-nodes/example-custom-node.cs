using flowgear.Sdk;
using System.Collections.Generic;
​
namespace DemoNode
{
    // Connections are defined in their own class
    public class Connection
    {
        // Connection properties must also be decorated with the Property attribute
        [Property(ExtendedType.None)]
        public string Username { get; set; }
        // Hide sensitive information by marking a property as a Password
        [Property(ExtendedType.Password)]
        public string Password { get; set; }
    }
​
    // Enums are presented as Dropdowns in the UI
    public enum Actions
    {
        ThisAction,
        ThatAction
    }
​
    // The Node property is what defines a Node. Your class should be public
    // as should any Properties and Methods that Flowgear will need to interact with
    [Node("DemoNode", "Demo Node", NodeType.Connector, "icon.png", RunFrom.Anywhere)]
    public class DemoNode
    {
​
        // Properties on the Node should have a FlowDirection and optionally an extended type
        // All properties MUST have getters and setters
        [Property(FlowDirection.Input, ExtendedType.ConnectionProfile)]
        public Connection Connection { get; set; }
​
        /// <summary>
        /// Use a triple slash comment on your properties to document them. This comment
        /// will be surfaced in the Design Canvas
        /// </summary>
        [Property(FlowDirection.Input)]
        public Actions Action { get; set; }
​
        // You can specify a default value for a Property with the DefaultValue attribute
        [DefaultValue("<thexml />")]
        [Property(FlowDirection.Input, ExtendedType.Xml)]
        public string InputXml { get; set; }
        [Property(FlowDirection.Output, ExtendedType.Xml)]
        public string OutputXml { get; set; }
​
        // You can opt in to supporting custom properties with the CustomProperties attribute
        [CustomProperties(true, true)]
        public Dictionary<string, object> Properties { get; set; }
        // You can opt into receiving configuration data with the Configuration attribute
​
        [Configuration]
        public Dictionary<string, object> Configuration { get; set; }
        // You must have a public method marked with the Invoke attribute. This is where your Node will do its processing
​
        [Invoke]
        // If you want to add multiple execution outputs, you can define them with the InvokeResult attribue
        [InvokeResult("Iterating", true, false)]
        [InvokeResult("Finished", true, false)]
        public InvokeResult Invoke()
        {
            // In the Invoke method, you can read all of your properties and configuration
            // You should return an InvokeResult (with no params) or an InvokeResult with the 
            // name of the label you want to fire
            // It's important to note that the a single instance of a Node on a Workflow is 
            // instanced once for the lifetime of the Workflow. This means that if your workflow
            // calls the Node multiple times (eg. downstream from a trigger or a looped Node like
            // Splitter or Loop, your Node Invoke method will be called multiple times
            // Don't catch exceptions - letting them bubble out to the consumer
            // enables Flowgear to present them to the user.
            // Flowgear will also record all inner exceptions internally for you
            return new InvokeResult("Finished");
        }
​
        // You can opt into supporting Connection testing with the Test Attribute. If the test
        // is successful, simply return. If a problem occurs, throw an exception
​
        [Test]
        public void Test()
        {
        }
​
        // You can opt into receiving exit requests with the ShouldExit notification. If your
        // Node is a trigger or may run for a long time and has the ability to execute gracefully
        // you can monitor the value of ShouldExit from within your Invoke method.
​
        [ShouldExit]
        public bool ShouldExit { get; set; }
​
        // If your Node needs to do cleanup like freeing objects or closing off sessions, implement it here
        [Terminate]
        public void Terminate()
        {
        }
    }
}