@echo off
echo "restoring database"
mongorestore ./dump
echo "database restored"


del /f startup.bat 

(echo cd %cd% 
echo npm start
) > startup.bat


xcopy /y .\startup.bat "C:\Users\%USERNAME%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup"

xcopy /y .\start.vbs "C:\Users\%USERNAME%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup"
