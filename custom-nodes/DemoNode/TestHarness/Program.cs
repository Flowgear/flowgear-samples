using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Flowgear.Nodes.TestHarness
{
    class Program
    {
        static void Main(string[] args)
        {

            var node = new Flowgear.Nodes.DemoNode.DemoNode();
            node.Connection = new DemoNode.Connection()
            {
                AccessToken = "123"
            };
            node.Action = DemoNode.Actions.ThisAction;
            node.Properties = new Dictionary<string, object>(){
                {  "CustomProp1","value" }
            };

            node.Invoke();
        }


    }
}
