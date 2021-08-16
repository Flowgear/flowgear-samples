using System;
using System.IO;
using System.Collections.Generic;
using System.Xml;
using System.Linq;
using System.Xml.Linq;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using System.Globalization;


namespace CSharpScript
{
    public partial class Processor
    {
        public object Process()
        {
             return FormatNumber(double.Parse(Number.ToString()), "en-US");
        }

        private string FormatNumber(double number, string format)
        {
            CultureInfo culture = CultureInfo.CreateSpecificCulture(format);
            return (String.Format(number.ToString("N", culture)));
        }
    }
}