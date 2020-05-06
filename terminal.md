Cài đặt Windows Terminal từ Windows Store
https://www.microsoft.com/en-us/p/windows-terminal-preview/9n0dx20hk701?cid=msft_web_chart&activetab=pivot:overviewtab

Cài đặt Chocolatey

Mở CMD

@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command " [System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"

Cài đặt ConEmu
choco install ConEmu

Cài đặt PowerShell Core
https://github.com/PowerShell/PowerShell/releases

Bật Windows Terminal và chuyển qua PowerShell Core

Cài đặt posh-git, oh-my-posh, PSReadline từ PowerShell

Install-Module posh-git -Scope CurrentUser -Force
Install-Module oh-my-posh -Scope CurrentUser -Force
Install-Module -Name PSReadLine -Scope CurrentUser -Force -SkipPublisherCheck

Trong trường hợp đã cài và muốn cập nhật
Update-Module posh-git -Scope CurrentUser -Force
Update-Module oh-my-posh -Scope CurrentUser -Force
Update-Module -Name PSReadLine -Scope CurrentUser -Force -SkipPublisherCheck

Cài đặt theme
if (!(Test-Path -Path $PROFILE )) { New-Item -Type File -Path $PROFILE -Force }
notepad \$PROFILE

Import-Module posh-git
Import-Module oh-my-posh
Set-Theme Paradox
Clear

Một số themes phổ biến
Robbyrussell
Agnoster
Paradox
Sorin
Darkblood
Avit
Honukai
Fish

Trường hợp bị lỗi fonts hiển thị

Tải về Powerline Fonts ở đường link dưới đây
https://github.com/powerline/fonts

Mở PowerShell ở chế độ Admin và đi đến đường dẫn thư mực font tải về
Bypass Policy

Set-ExecutionPolicy Bypass

Cài đặt fonts

.\install.ps1

Trả Policy về mặc định
Set-ExecutionPolicy Default

Tải về Delugia Nerd Font và copy vào thư mục Fonts trong máy tính
https://github.com/adam7/delugia-code/releases

Cấu hình lại Windows Terminal
Ctrl + ,

Thêm vào thuộc tính dưới đây ở profile PowerShell Core
"colorScheme" : "One Half Dark",
"fontFace": "Delugia Nerd Font"
