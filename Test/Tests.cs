using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppVeyourVersions
{
    using System.Runtime.InteropServices;

    using NUnit.Framework;

    [TestFixture]
    public class TestAppVeyourVersioning
    {
        [Test]
        public void TestStdCiBuild()
        {
            AppVeyourVersion.GetProductVersion("1.0.0.14", "", "false");
            Assert.AreEqual("1.0.0-alpha-000014", AppVeyourVersion.ProductVersion);
        }
        [Test]
        public void TestStdCiBeta()
        {
            AppVeyourVersion.GetProductVersion("1.0.0.14", "beta", "false");
            Assert.AreEqual("1.0.0-beta-000014", AppVeyourVersion.ProductVersion);
        }
        [Test]
        public void TestStdRelease()
        {
            AppVeyourVersion.GetProductVersion("1.0.0.14", "", "true");
            Assert.AreEqual("1.0.0", AppVeyourVersion.ProductVersion);
        }
        [Test]
        public void TestStdRtmRelease()
        {
            AppVeyourVersion.GetProductVersion("1.0.0.14", "rtm", "true");
            Assert.AreEqual("1.0.0", AppVeyourVersion.ProductVersion);
        }
        [Test]
        public void TestStdRtmNoRelease()
        {
            AppVeyourVersion.GetProductVersion("1.0.0.14", "rtm", "false");
            Assert.AreEqual("", AppVeyourVersion.ProductVersion);
        }
    }
}