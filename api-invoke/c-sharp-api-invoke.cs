using System;

namespace ConsoleApplication1
{

    //This class represents the inputs to the workflow. Don't forget to make it and and its properties public
    public class ExampleRequestObject
    {
        //an example Variable Bar input property
        public string name { get; set; }

        //another example Variable Bar input property
        public int IntValueExample { get; set; }
    }

    //This class represents the outputs to the workflow. Don't forget to make it and and its properties public
    public class ExampleResponseObject
    {
        //an example Variable Bar output property
        public string helloText { get; set; }

        //another example Variable Bar output property
        public string AnotherStringExample { get; set; }

        //standard Flowgear property - true if successful
        public bool status { get; set; }

        //standard Flowgear property - contains an error message if there was a failure
        public string statusMessage { get; set; }

    }

    class Program
    {

        static T invokeFlowgear<T>(string url, string username, string password, int timeout, object requestPayload = null)
        {

            var request = System.Net.HttpWebRequest.Create(url) as System.Net.HttpWebRequest;
            string authValue = "Basic " + Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(string.Format("{0}:{1}", username, password)));
            request.ContentType = "application/json";

            request.Headers.Add("Authorization", authValue);

            if (requestPayload != null)
            {
                //this sample only supports GET and POST. POST is used when requestPayload is supplied. The HTTP Method must match the
                //one specified in the Workflow
                request.Method = "POST";

                //requires a reference to Json.NET (json.codeplex.com)
                var jsonRequest = Newtonsoft.Json.JsonConvert.SerializeObject(requestPayload);

                var buffer = System.Text.Encoding.UTF8.GetBytes(jsonRequest);

                request.GetRequestStream().Write(buffer, 0, buffer.Length);
            }

            try
            {
                var response = request.GetResponse() as System.Net.HttpWebResponse;

                if (!response.ContentType.StartsWith("application/json"))
                    throw new Exception(string.Format("The request succeeded but an unsupported ContentType of {0} was returned", response.ContentType));

                var jsonResponse = new System.IO.StreamReader(response.GetResponseStream(), System.Text.Encoding.UTF8).ReadToEnd();

                try
                {
                    return Newtonsoft.Json.JsonConvert.DeserializeObject<T>(jsonResponse);
                }
                catch (Exception ex)
                {
                    throw new Exception(string.Format("The request was successful but the response could not be deserialised: {0}", ex.Message), ex);
                }
            }
            catch (System.Net.WebException wex)
            {
                var response = wex.Response as System.Net.HttpWebResponse;

                if (!response.ContentType.StartsWith("application/json"))
                    throw new Exception(string.Format("The server returned HTTP Response Code {0}", response.StatusCode));

                var jsonResponse = new System.IO.StreamReader(response.GetResponseStream(), System.Text.Encoding.UTF8).ReadToEnd();

                //do a quick inspection of the object by converting it to an XDocument (this means we don't have to create an interface for purposes
                //of inspecting for errors). We then throw the most appropriate exception we can
                var messageElement = Newtonsoft.Json.JsonConvert.DeserializeXNode(jsonResponse).Element("Message");
                if (messageElement != null)
                    throw new Exception(messageElement.Value);
                else
                    throw new Exception(string.Format("The server returned HTTP Response Code {0}", response.StatusCode));
            }
        }

        static void Main(string args)
        {
            var ret = invokeFlowgear<ExampleResponseObject>(
            "https://yourvanitydomain.flowgear.io/yourrestfulpath/",
            "flowgearuser@domain.com",
            "password",
            30,
            new ExampleRequestObject()
            {
                name = "sdgdhf"
            });
        }
    }
}