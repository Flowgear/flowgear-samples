using System.Net;
using System.Security.Cryptography.X509Certificates;

namespace ConsoleApplication1
{
    
    class Program
    {

        static void Main(string[] args)
        {

            MakeRequest();

        }

        public static void MakeRequest()
        {

            var request = HttpWebRequest.Create("https://yourcompany.flowgear.net/path/to/endpoint") as HttpWebRequest;
            request.Headers["X-Provide-Client-Certificate"] = "Yes";

            var cert = GetCertificateFromStoreByThumbprint(
                          "8F29584C18A1D3C0A847413D3EBB7A67978E9DE2",
                          StoreName.My,
                          StoreLocation.LocalMachine);
            X509Certificate2Collection certificates = new X509Certificate2Collection();
            certificates.Add(cert);
            request.ClientCertificates = certificates;

            request.GetResponse();
        }


        public static X509Certificate2 GetCertificateFromStoreByThumbprint(string thumbprint, StoreName storeName, StoreLocation storeLocation)
        {

            // attempt to locate the cert in the personal, machine store
            using (X509Store store = new X509Store(storeName, storeLocation))
            {

                store.Open(OpenFlags.ReadOnly);

                // note we allow invalid certs because we don't care about root cert trust for client side certs
                var match = store.Certificates.Find(X509FindType.FindByThumbprint, thumbprint, false);

                if (match.Count > 0)
                {
                    return match[0];
                }
            }

            return null;

        }
	}
}	