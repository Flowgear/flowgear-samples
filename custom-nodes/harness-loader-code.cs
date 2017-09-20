string path = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);
​
var samplePath = Path.Combine(path, "..\\..\\samples");
​
var configPath = Path.Combine(path, "..\\..\\configuration.xml");
​
Flowgear.Nodes.TestHarness.NodesTestHarness.AttachNode(
typeof(DemoNode.DemoNode), // provides the Type for the Node being debugged
File.ReadAllText( configPath), // provides user-defined config data that the Node can use. This data is never shown to end-users
samplePath); // provides the path to sample files
​
Console.ReadKey();