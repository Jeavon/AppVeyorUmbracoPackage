ECHO APPVEYOR_REPO_BRANCH: %APPVEYOR_REPO_BRANCH%
Call nuget.exe restore ..\AppVeyorUmbracoPackage.sln
Call "C:\Program Files (x86)\MSBuild\12.0\Bin\MsBuild.exe" Package.build.xml