# Input lua 文件格式

模组的按键响应有继承关系

* 用户自定义的按键配置

  `Mods\aircraft\XXX\Input\XXX\joystick\摇杆名.diff.lua`

* MOD中的缺省按键配置

  `Mods\aircraft\XXX\Input\XXX\joystick\default.lua`

* DCS通用按键配置

   `DCS World2\Config\Input\Aircrafts\common_joystick_binding.lua`

##MOD default.lua

模组默认的按键配置，用来生成DCS按键设置

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

## forceFeedback

##keyCommands

####按钮

```lua
{
    down = iCommandQuit,		--down按键按下 = 命令ID
    name = _('End mission'), 	--name = 在“按键设置”中显示的名称
    category = _('General')		--category = 在"按键设置"中的分类，相同分类会显示在一起
},
```

#### 按钮

```lua
{
    pressed = iCommandViewLeftSlow,		--按下的命令ID
    up = iCommandViewStopSlow,			--弹起的命令ID
    name = _('View Left slow'),			--名称
    category = _('View')				--分类
},
```

####开关

```lua
{
    down = iCommandViewCameraUp, 		--下位置的命令ID
    up = iCommandViewCameraCenter, 		--上位置的命令ID
    name = _('Glance up'), 
    category = _('View Cockpit')
},
```

#### 组合键

```lua
{
    combos = {
        {
            key = 'R', 				--按键
            reformers = {'LShift'}	--修饰键
        }
    },
    down = iCommandMissionRestart,	--按下时的命令ID
    name = _('Restart Mission'),	--名称
    category = _('Debug')			--分类
},
```

## axisCommands

