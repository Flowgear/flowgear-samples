using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestHarness
{
    class Program
    {
        static void Main(string[] args)
        {

            Flowgear.Nodes.TestHarness.NodesTestHarness.AttachNode(typeof(DemoNode.DemoNode), null, null);

            Console.ReadKey();
        }

     
    }
}
