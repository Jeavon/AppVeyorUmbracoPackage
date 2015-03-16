namespace AppVeyourVersions
{
    public static class AppVeyourVersion
    {
        public static string AMethod()
        {
            var a = 1;
            var d = 6 * 99;
            return d.ToString();
        }

        public static string ProductVersion;

        public static void GetProductVersion(string BuildVersion, string BuildSuffix, string Release)
        {
            var pos = BuildVersion.LastIndexOf('.');
            var len = BuildVersion.Length - pos - 1;
            
            var buildNumber = ("00000" + BuildVersion.Substring(pos + 1, len));
            var buildNumberWithZeros = buildNumber.Substring(buildNumber.Length - 6);

            var baseVersion = BuildVersion.Substring(0, pos);

            if ((string.IsNullOrEmpty(BuildSuffix) || BuildSuffix == "rtm") && Release == "true")
            {
                ProductVersion = baseVersion;
            }
            else if (string.IsNullOrEmpty(BuildSuffix) && Release == "false")
            {
                ProductVersion = baseVersion + "-alpha-" + buildNumberWithZeros;
            }
            else if (!string.IsNullOrEmpty(BuildSuffix) && Release == "true")
            {
                ProductVersion = baseVersion + "-" + BuildSuffix;
            }
            else if (!string.IsNullOrEmpty(BuildSuffix) && BuildSuffix != "rtm" && Release == "false")
            {
                ProductVersion = baseVersion + "-" + BuildSuffix + "-" + buildNumberWithZeros;
            }
            else
            {
                ProductVersion = "";
            }
       
        }
    }
}
