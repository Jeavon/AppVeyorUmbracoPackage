ECHO APPVEYOR_REPO_BRANCH: %APPVEYOR_REPO_BRANCH%
ECHO APPVEYOR_BUILD_NUMBER : %APPVEYOR_BUILD_NUMBER%
ECHO APPVEYOR_BUILD_VERSION : %APPVEYOR_BUILD_VERSION%
cd ..\Angular\
Call npm install
Call grunt --buildversion %APPVEYOR_BUILD_VERSION%
cd ..\BuildPackage\
Call nuget.exe restore ..\AppVeyorUmbracoPackage.sln
Call "C:\Program Files (x86)\MSBuild\12.0\Bin\MsBuild.exe" Package.build.xml