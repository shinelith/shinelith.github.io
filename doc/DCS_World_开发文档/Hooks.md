# DCS Hooks

## 功能说明

Hooks是DCS World提供给第三方外挂程序执行的入口（或称为钩子），位置为`C:\Users\%UserName%\Saved Games\DCS.openbeta\Scripts\Hooks\`，DCS会在启动主界面前在沙箱环境（相互隔离）中执行这个目录里的所有`*.lua`代码。

在Hooks lua中可调用DCS和第三方的lua库。

## 范例 'Hooks/test.lua'

```lua
local test = {}

function test.onPlayerTryConnect(ipaddr, name, ucid, playerID)
    print('onPlayerTryConnect(%s, %s, %s, %d)', ipaddr, name, ucid, playerID)
    -- if you want to gently intercept the call, allowing other user scripts to get it,
    -- you better return nothing here
    return true -- allow the player to connect
end

function test.onSimulationStart()
    print('Current mission is '..DCS.getMissionName())
end

DCS.setUserCallbacks(test)  -- here we set our callbacks
```

## 可使用的lua 5.1库函数

* base api, like print, etc,
* math.\*
* table.\*
* string.\*
* io.\*
* os.\*
* debug.\*

## Lua 文件系统 lfs API

* lfs.currentdir() -> string

  返回DCS的安装目录

* _lfs.writedir() -> string_

  返回`保存的游戏\DCS`的目录

* _lfs.tempdir() -> string_

  返回DCS Temp临时文件目录 `AppData\Local\Temp\DCS`

* _lfs.mkdir()_

  创建目录

* _lfs.rmdir()_
* _lfs.attributes()_
* _lfs.dir()_
* _lfs.normpath()_
* _lfs.realpath()_

## 可在Hooks中使用的Callbacks

使用`DCS.setUserCallBacks(myHandler)`在发生下列事件时收到回调。

* onMissionLoadBegin
* onMissionLoadProgress
* onMissionLoadEnd
* onSimulationStart
* onSimulationStop
* onMissionLoadBegin
* onSimulationFrame
* onSimulationPause
* onSimulationResume
* onGameEvent
* onNetConnect
* onNetMissionChanged
* onNetConnect
* onNetDisconnect
* onPlayerConnect
* onPlayerDisconnect
* onPlayerStart
* onPlayerStop
* onPlayerChangeSlot
* onPlayerTryConnect
* onPlayerTrySendChat
* onPlayerTryChangeSlot

## 更多信息

参照[DCS_ControlAPI](doc/DCS_World开发文档/DCS_ControlAPI.md) 或`DCS\API\DCS_ControlAPI.md`



