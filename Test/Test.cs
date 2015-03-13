using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test
{
    using System.Runtime.InteropServices;

    using NUnit.Framework;

    [TestFixture]
    public class Test
    {
        [Test]
        public void AppVeyor()
        {
            Class1.TestAppVeyor();
            Assert.AreEqual("1.0.0-alpha-000014", Class1.ProductVersion);
        }
    }
}
