@echo off
title Installazione dipendenze Node.js

echo.
echo ==============================
echo INSTALLAZIONE GATEWAY
echo ==============================
cd backend\gateway
call npm install

echo.
echo ==============================
echo INSTALLAZIONE AUTH-SERVICE
echo ==============================
cd ..\auth-service
call npm install

echo.
echo ==============================
echo INSTALLAZIONE SERVICE
echo ==============================
cd ..\service
call npm install

echo.
echo ==============================
echo INSTALLAZIONE FBI-SERVICE
echo ==============================
cd ..\fbi-service
echo Python dependencies use the standard library only; no extra install required.
echo Python 3.8+ is required to run the FBI service.
echo If the machine does not have Python installed, install it from https://www.python.org/downloads/windows/

echo.
echo ==============================
echo INSTALLAZIONE COMPLETATA
echo ==============================
echo.

pause