Call ..\.nuget\nuget.exe sources add -Name https://www.myget.org/F/umbraco7nightly -Source https://www.myget.org/F/umbraco7nightly -NonInteractive
Call ..\.nuget\nuget.exe restore ..\AppVeyorUmbracoPackage.sln -source "https://www.nuget.org/api/v2;https://www.myget.org/F/umbraco7nightly"
Call C:\WINDOWS\Microsoft.NET\Framework\v4.0.30319\msbuild.exe ..\AppVeyorUmbracoPackage.sln