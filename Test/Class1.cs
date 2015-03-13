namespace Test
{
    using System.Globalization;

    public static class Class1
    {
        public static string AMethod()
        {
            var a = 1;
            var d = 6 * 99;
            return d.ToString();
        }

        public static string BuildVersion = "1.0.0.14";
        public static string BuildSuffix = "beta";
        public static string Release = "false";
        public static string ProductVersion;

        public static void TestAppVeyor()
        {
            var pos = BuildVersion.LastIndexOf('.');
            var len = BuildVersion.Length - pos - 1;
            
            var buildNumber = ("000" + BuildVersion.Substring(pos + 1, len));
            var buildNumberWithZeros = buildNumber.Substring(buildNumber.Length - 4);

            var baseVersion = BuildVersion.Substring(0, pos);

            if (string.IsNullOrEmpty(BuildSuffix) && Release == "true")
            {
                ProductVersion = baseVersion;
            }
            else if (string.IsNullOrEmpty(BuildSuffix) && Release == "false")
            {
                ProductVersion = baseVersion + "-build-" + buildNumberWithZeros;
            }
            else if (!string.IsNullOrEmpty(BuildSuffix) && Release == "true")
            {
                ProductVersion = baseVersion + "-" + BuildSuffix;
            }
            else if (!string.IsNullOrEmpty(BuildSuffix) && Release == "false"){
                ProductVersion = baseVersion + "-" + BuildSuffix + "-" + buildNumberWithZeros;
            }            
        }
    }
}
