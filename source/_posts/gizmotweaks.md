---
title: How to Gizmo Client Remove Desktop 
---
I really love Gizmo and it's Material Design client, but i wanted to hide everything related to desktop like on legacy theme expect when i enter to maintance mode (so win10 taskbar + system notifications) but without start button, and desktop icons showing before client load :)
<!-- more -->
To archive this i needed to do several things and here is how to do it :)

<h1>0. Fix Files</h1>
Here are all files you will need in this manual: https://c.m0k1.pw/s/MbscnGSHt76eNep

Download it & extract folder it to C:/

<h1>1. Removing of Desktop Icons before client load</h1>

For this purpose i created 2 bat files that are Hiding/Showing Desktop Icons.
I actually added them to right click on desktop so i can show icons if i need them in Gizmo's Maintance Mode. 

- (optional) Go to extracted GizmoFixes folder and open AddToRightClick.reg change location to extracted GizmoFixes if needed and run it (impor to registry)
- Run HideDesktopIcons.bat to hide desktop icons and re-login to windows so changes can be applied.
- TIP: When you are in MaintanceMode you can right click to desktop and Show/Hide Desktop icons.
- NOTE: .bat is need to be runed with Administrator Privigiles

<h1>1. Removing of ShowDesktop in task bar</h1>

This fix is removing ShowDesktop in right corner of taskbar.
So this is needed to do everytime when user login as fix is hooking to explorer.exe
To archive this you will need to craete Task Inside Gizmo Manager Configuration.

- Go to Manager then Setup and then Configure, then select Client -> Task.
- Select process and click + to Add new Task and enter following:

<img src="https://i.imgur.com/DW2hWVf.png">

After clicking Ok to add it, set it to be runed on Login as show on picture:

<img src="https://i.imgur.com/wJftpbF.png">

- A Gizmo will now remove ShowDesktop on login of users.

<h1>2. Removing of RightClick on taskbar and show desktop</h1>

You have 2 options: REG or Group Policy ! I STRONGLY RECOMMEND GROUP POLICY INSTEAD OF REG !

https://www.tenforums.com/tutorials/99035-enable-disable-taskbar-context-menus-windows-10-a.html



<h1>3. Removing of Windows+D (show desktop)</h1>

You have 2 options: REG or Group Policy ! I STRONGLY RECOMMEND GROUP POLICY INSTEAD OF REG !

https://www.isumsoft.com/it/disable-win-keyboard-shortcuts-in-windows-10/
