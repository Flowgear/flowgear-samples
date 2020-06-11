/// <summary>
        /// Provides a simple implementation enabling a workflow to be invoked with a single string
        /// </summary>
        /// <param name="url">The URL to the endpoint you've defined eg. https://yourcompanyname.flowgear.io/yourtransactiontype/</param>
        /// <param name="apiKey">The API key that will be used to authenticate the request</param>
        /// <param name="payload">The raw string payload to be sent</param>
        /// <param name="contentType">The content type of the payload</param>
        /// <returns>The raw string response returned</returns>
        static string InvokeFlowgearUsingPostedString(string url, string apiKey, string payload, string contentType)
        {
            try
            {
                HttpWebRequest request = HttpWebRequest.Create(url) as HttpWebRequest;

                request.Method = "POST";

                // provide authorisation data
                request.Headers.Add("Authorization", "Key="+apiKey);

                request.ContentType = contentType;

                var requestBuffer = System.Text.Encoding.UTF8.GetBytes(payload);

                // set the payload as the request
                request.GetRequestStream().Write(requestBuffer, 0, requestBuffer.Length);

                var response = request.GetResponse();

                // convert the response back to a string and return it
                using (var reader = new System.IO.StreamReader(response.GetResponseStream(), Encoding.UTF8))
                {
                    return reader.ReadToEnd();
                }
            }
            catch (WebException wex)
            {
                if (wex.Response != null)
                {
                    var responseStream = wex.Response.GetResponseStream();

                    if (responseStream != null)
                    {
                        using (var reader = new System.IO.StreamReader(responseStream, Encoding.UTF8))
                        {
                            // this will contain the raw response body if one is available. In Flowgear, this is typically JSON. Use
                            // the Newtonsoft.Json nuget package to work with this
                            var response = reader.ReadToEnd();
                        }
                    }
                }

                throw;
            }

        }