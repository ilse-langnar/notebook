# ScreenShot Desktop using PowerShell (PS)
# Version v1
# Written by: Othmane Moutaouakkil [ WHOAMI2507 ]  (You don't become a coder by just changing the credits)
# Github: https://github.com/whoami2507


# [ Takes snapshot of your screen and saves to a file ]

$outputFile = "C:\Users\Othmane Moutaouakkil\Desktop\ScreenShot.png"

Add-Type -AssemblyName System.Windows.Forms
Add-type -AssemblyName System.Drawing

# Return resolution
$Screen = [System.Windows.Forms.SystemInformation]::VirtualScreen
$Width = $Screen.Width
$Height = $Screen.Height
$Left = $Screen.Left
$Top = $Screen.Top

# Create graphic
$screenshotImage = New-Object System.Drawing.Bitmap $Width, $Height

# Create graphic object
$graphicObject = [System.Drawing.Graphics]::FromImage($screenshotImage)

# Capture screen
$graphicObject.CopyFromScreen($Left, $Top, 0, 0, $screenshotImage.Size)

# Save to file - Saves to your path
$screenshotImage.Save($outputFile)

Write-Output "Saved to:"
Write-Output $outputFile
Start-Sleep -s 5


# PowerShell
#ImageMagick Convert Command-Line Tool
##Use the convert program to convert between image formats as well as resize an image, blur, crop, despeckle, dither, draw on, flip, join, re-sample, and much more. See Command Line Processing for advice on how to structure your convert command or see below for example usages of the command.
# 
# cd 'C:\Program Files\ImageMagick-6.9.2-Q16'
# ls 'D:\power\pdf\pdf\convertir' *.pdf | %{.\convert -density 150 $_.FullName -quality 90 $_.FullName.Replace('pdf','png')}
#
