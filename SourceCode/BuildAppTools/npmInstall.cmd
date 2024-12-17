@echo off
set projectName=XPlor

cd ../BuiltApp/%projectName%/package.nw
echo %cd%

call npm install