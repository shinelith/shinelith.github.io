# Missions lua 文件格式

## Campaigns

放置cmp战役文件

## QuickStart

位置 MOD\Missions\EN\QuickStart\quickstart.lua

* name 任务名称
* file miz文件名，miz文件应与lua文件同路径

```lua
planes = {
	{ 
		name = _('Cold Start'),
    file = 'a4e_cold_start.miz',
	},
	{ 
    name = _('Free Flight'),
    file = 'a4e_free_flight.miz',
  },
  { 
    name = _('Ground Attack'),
    file = 'a4e_ground_attack.miz',
  },
  { 
    name = _('Dogfight'),
    file = 'a4e_dogfight.miz',
  },
	{ 
    name = _('Takeoff'),
    file = 'a4e_takeoff.miz',
  },
	{ 
    name = _('Landing'),
    file = 'a4e_landing.miz',
  },
}
```

## Single

位置 MOD\Missions\EN\Single\localization.lua



## Training

位置 MOD\Missions\EN\Training\lessons.lua

- file miz文件名，miz文件应与lua文件同路径
- name 列表名称
- description 描述

```lua
lessons = 
{
	{
		["file"] = "01- Su-25T Start Up.miz",
		["name"] = "Aircraft Start-Up, Taxi, and Takeoff",
		["description"] = "In this lesson, we will practice starting the Su-25T from the ramp, taxi to the runway, and takeoff.",
  },
	{
		["file"] = "02- Su-25T Flight and Navigation.miz",
		["name"] = "Basic Flight Controls and Navigation",
		["description"] = "In this lesson, we will learn about the basic flight controls of the Su-25T, how to navigate between waypoints, and how to select autopilot modes.",
  },
  ...
}

```