# Input lua 格式说明

模组的按键响应有一定的关系，按优先级排依次是

* 用户自定义的按键配置

  `Mods\aircraft\XXX\Input\XXX\joystick\摇杆名.diff.lua`

* MOD定义的默认按键配置

  `Mods\aircraft\XXX\Input\XXX\joystick\default.lua`

* DCS通用按键绑定

   `DCS World2\Config\Input\Aircrafts\common_joystick_binding.lua`

##用户自定义的按键配置 Joystick.diff.lua

```lua
local diff = {
  ["keyDiffs"] = {
    ["d3002pnilunilcd7vd-1vpnilvunil"] = {
			["added"] = {
				[1] = {
					["key"] = "JOY_BTN14",
				},
			},
			["name"] = "Nav Lights Flash",
		},
  },
}
```

d3002pnilunilcd7vd-1vpnilvunil 的解读

* d(down) = 3002(command_id)
* p(pressed) = =nil
* u(up) = nil
* cd(cockpit_device_id) = -1
* vd(value_down) = -1
* vp(value_pressed) = nil
* vu(value_up) = nil

##MOD定义的默认按键配置 default.lua

模组默认的按键配置，这个文件也用来生成DCS按键设置，并显示在DCS的按键设置界面中。

```lua
--获取座舱的文件夹路径
local cockpit = folder.."../../../Cockpit/Scripts/"
--执行devices.lua 和 command_defs.lua
dofile(cockpit.."devices.lua")
dofile(cockpit.."command_defs.lua")

--需要return一个固定的结构
return {
    forceFeedback = {
        --力回馈参数
    }， 
    keyCommands = {
       --按键命令
    }，	
    axisCommands = {
        --轴命令
    }，	
}
```

### forceFeedback 

 ```lua
...
forceFeedback = {
  trimmer = 1.0,
	shake = 0.5,
	swapAxes = false,
	invertX = false,
	invertY = false,
},
...
 ```

###keyCommands

####单次触发的按钮

```lua
{
    down = iCommandQuit,					--down按键按下 = 命令ID
    name = _('End mission'), 			--name = 在“按键设置”中显示的名称
    category = _('General')				--category = 在"按键设置"中的分类，相同分类会显示在一起
},
```

#### 2段式触发按钮

```lua
{
    down = iCommandViewCameraUp, 			--下位置的命令ID
    up = iCommandViewCameraCenter, 		--上位置的命令ID
    name = _('Glance up'), 
    category = _('View Cockpit')
},
```

没有指定具体的(key)，依靠diff中的按键绑定。当按键(down)时，触发iCommandQuit命令，仅触发1次。松开(up)按钮时，触发iCommandViewCameraCenter命令

#### 按住按钮

```lua
{
    pressed = iCommandViewLeftSlow,		--按下的命令ID
    up = iCommandViewStopSlow,				--弹起的命令ID
    name = _('View Left slow'),				--名称
    category = _('View')							--分类
},
```

没有指定具体的按键(key)，当按钮(pressed)时，持续触发iCommandViewLeftSlow命令，直到松开按钮(up)时，触发iCommandViewStopSlow命令

#### 绑定具体的一个按键或组合键

```lua
{
    combos = {
        {
            key = 'R', 							--按键 或 按键编号
            reformers = {'LShift'}	--修饰键
        }
    },
    down = iCommandMissionRestart,	--按下时的命令ID
    name = _('Restart Mission'),		--名称
    category = _('Debug')						--分类
},
```

####按下按钮给出一个指定值

```lua
{
  combos = {{key = 'K'}},
  down = iCommandPlaneShowKneeboard,
  up = iCommandPlaneShowKneeboard,
  value_down = 1.0,
  value_up = -1.0,
  name = _('Kneeboard glance view'),
  category = _('Kneeboard')
},
```

当按下(down)K键时iCommandPlaneShowKneeboard命令的值为(value_down)1.0，松开(up)按键iCommandPlaneShowKneeboard的命令值为-1.0

####设置设备

```lua
{
  down = device_commands.cm_auto, 				--device_commands.cm_auto在command_defs.lua中定义
  up = device_commands.cm_auto,
  cockpit_device_id = devices.COUNTERMEASURES,		--devices.lua 中定义
  value_down = 1.0, 
  value_up = 0,
  name = _('Countermeasures: Auto Pushbutton'),
  category = _('Countermeasures')
},
```

### axisCommands

定义一个空的轴选项（没有绑定硬件）

```lua
{
  action = iCommandPlaneMFDZoomAbs,
  name = _('I-251 Zoom')
},
```

定义一个指定设备action的轴（没有绑定硬件）

 ```lua
{
  action = device_commands.radar_angle_axis,   --在command_defs.lua重定义
  cockpit_device_id = devices.RADAR,
  name = _('Radar Angle Slew')
},
 ```

绑定DCS默认的设备到一个轴

```LUA
{
  combos = defaultDeviceAssignmentFor("roll"),
  action = iCommandPlaneRoll, 
  name = _('Roll')
},
```

已知defaultDeviceAssignmentFor (String)可以获取到的默认设备如下

* roll
* pitch
* rudder
* thrust
* fire