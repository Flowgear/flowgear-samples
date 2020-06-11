using flowgear.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DemoNode
{
   
    // Enums are presented as Dropdowns in the UI
    public enum Actions
    {
        ThisAction,
        ThatAction
    }

    // The Node property is what defines a Node. Your class should be public
    // as should any Properties and Methods that Flowgear will need to interact with
    [Node("DemoNode", "Demo Node", NodeType.Connector, "demonode.png", RunFrom.Anywhere)]
    public class DemoNode
    {

        // Properties on the Node should have a FlowDirection and optionally an extended type
        // All properties MUST have getters and setters
        [Property(FlowDirection.Input, ExtendedType.ConnectionProfile)]
        public Connection Connection { get; set; }

        /// <summary>
        /// Use a triple slash comment on your properties to document them. This comment
        /// will be surfaced in the Design Canvas
        /// </summary>
        [Property(FlowDirection.Input)]
        public Actions Action { get; set; }

        // You can specify a default value for a Property with the DefaultValue attribute
        [DefaultValue("{ \"hello\" : \"world\" }")]
        [Property(FlowDirection.Input, ExtendedType.MultilineText)]
        public string Request { get; set; }
        [Property(FlowDirection.Output, ExtendedType.MultilineText)]
        public string Response { get; set; }

        // You can opt in to supporting custom properties with the CustomProperties attribute
        [CustomProperties(true, true)]
        public Dictionary<string, object> Properties { get; set; }
        // You can opt into receiving configuration data with the Configuration attribute

        [Configuration]
        public Dictionary<string, object> Configuration { get; set; }

        /// <summary>
        /// To support OAuth2, declare the Interact method
        /// </summary>
        /// <param name="action"></param>
        /// <param name="properties"></param>
        /// <returns></returns>
        [Interact(InteractFlags.GetOAuthUri | InteractFlags.GetOAuthConnectionProperties)]
        public Dictionary<string, object> Interact(string action, Dictionary<string, object> properties)
        {
            
            const string OAUTH2_REQUEST_URL= "";

            const string OAUTH2_CLIENT_ID = ""; // this would normally be stored as part of a configuration

            switch (action)
            {
                // returns a URI for OAuth hand off to allow the user to authorize access
                case "getOAuthUri":
                    {
                        // here's an example of how to build a request URL.
                        // the user will be redirected here and when they've authorized, will be redirected
                        // back to the Connection in the Console
                        var uri = string.Format(
                            "{0}?" +
                            "client_id={1}&" +
                            "scope=somescoperequired&" +
                            "redirect_uri={2}&" +
                            "response_type=code&" +
                            "state=hello",
                            OAUTH2_REQUEST_URL,
                            Uri.EscapeDataString(OAUTH2_CLIENT_ID),
                            // Flowgear will supply this URL and it should be passed along to the platform
                            // that you are requesting auth from. This URL usually needs to be added to a whitelist
                            // in that platform too.
                            Uri.EscapeDataString((string)properties["callbackUri"])
                            );

                        return new Dictionary<string, object>()
                        {
                            { "uri", uri }
                        };
                    }

                // provides the redirected URI following successful authorization.
                // returns a set of properties to save on the conncetion
                case "getOAuthConnectionProperties":
                    {

                        // here we use the auth code we received to execute an exchange where the platform
                        // returns a refresh token and and an access token.
                        // we return those tokens for our connection

                        return new Dictionary<string, object>()
                                {
                                    {  "RefreshToken", "here be the refresh token" },
                                    {  "AccessToken", "here be the access token" }
                                };
                    }

                default:
                    throw new NotImplementedException();
            }

        }


        // You must have a public method marked with the Invoke attribute. This is where your Node will do its processing
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

        /// <summary>
        /// Implement this if you want to be able to pass dynamic samples back to the user. Dynamic samples
        /// have access to the Connection and are therefore able to construct samples that are specific
        /// to the data source
        /// </summary>
        /// <param name="sampleId">If null, a list of samples should be returned. If not null, the specific sample should be returned</param>
        /// <returns></returns>
        [ListSamples]
        public NodeSample[] ListSamples(Guid? sampleId)
        {

            var sample1 = new NodeSample()
            {
                NodeSampleId = new Guid("a444ce5d-ca8a-4116-9626-3e7f07aa28e8"),
                Name = "the first sample",
                Properties = new NodePropertySample[] {
                    new NodePropertySample() { 
                        Name = "Action", 
                        Value = "First Sample Action" 
                    }
                }
            };

            var sample2 = new NodeSample()
            {
                NodeSampleId = new Guid("ddd87c4e-738d-4dc7-94c7-58469d9eefc0"),
                Name = "the first sample",
                Properties = new NodePropertySample[] {
                    new NodePropertySample() {
                        Name = "Action", 
                        Value = "Second Sample Action" 
                    }
                }
            };

            var samples = new List<NodeSample>();
            samples.Add(sample1);
            samples.Add(sample2);

            if (sampleId == null)
            {
                // return a list of all samples. In this case, the properties shoud be cleared out
                return samples.Select(s => { s.Properties = null; return s; }).ToArray();
            }
            else
            {
                // find the specifc sample
                return samples.Where(s => s.NodeSampleId == sampleId).ToArray();
            }

        }

        // You can opt into supporting Connection testing with the Test Attribute. If the test
        // is successful, simply return. If a problem occurs, throw an exception
        [Test]
        public void Test()
        {
        }

        // You can opt into receiving exit requests with the ShouldExit notification. If your
        // Node is a trigger or may run for a long time and has the ability to execute gracefully
        // you can monitor the value of ShouldExit from within your Invoke method.

        [ShouldExit]
        public bool ShouldExit { get; set; }

        // If your Node needs to do cleanup like freeing objects or closing off sessions, implement it here
        [Terminate]
        public void Terminate()
        {
        }
    }
}