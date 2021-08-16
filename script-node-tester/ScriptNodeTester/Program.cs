using CSharpScript;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ScriptNodeTester
{
    class Program
    {
        /* 
         This project will help in debugging the Script Node.
         This example show how to change the format of a number
          
         1. Create properties on in the Properties.cs file for each Custom Property (both input and output) and the type must be 'object'
         2. Assign the properties values in this file
         3. Write the script in the Script.cs
         */

        static void Main(string[] args)
        {
            // Read big files for debugging. More files may be added
            string xml1 = File.ReadAllText("../../XMLFile1.xml");
            string text1 = File.ReadAllText("../../TextFile1.txt");
            string json1 = File.ReadAllText("../../json1.json");

            // Instance a new Script Node instance
            Processor p = new Processor();


            // Assign the custom properties on the Script Node
            p.Number = 123456.789;
            p.Xml = xml1;


            // Invoke the Script Node
            var returnValue = p.Process();
            Console.WriteLine(returnValue);
            Console.ReadKey();

        }
    }
}
