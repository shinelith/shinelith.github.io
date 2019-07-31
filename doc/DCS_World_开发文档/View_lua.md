# 视角

视角配置有固定的变量名`ViewSettings`，它有2种方式来应用视角的配置

* 在add_aircraft的参数里设置

  ```lua
  MiG_19P = {
  	Name = 'MiG-19P',
  	DisplayName = _('MiG-19P'),
      ...
  	ViewSettings = ViewSettings,
      SnapViews = SnapViews,
  }
  add_aircraft(MiG_19P)
  ```

* 在entry.lua中调用`make_view_settings(AircraftName,ViewSettings,SnapViews)`

  ```lua
  declare_plugin()
  dofile(current_mod_path.."/views.lua")
  make_view_settings('Su-35', ViewSettings, SnapViews)
  plugin_done()
  ```

**推荐采用一个单独的View.lua文件中配置视角**

## 结构

```lua
ViewSettings = {
  Cockpit = {  
    --座舱视角F1
  }，
  Chase = {
    --追逐视角F4
  }，
  Arcade = {
    --游戏模式，第三人称俯视视角，类似ACE
  }，
}

SnapViews = {
  --预设视角
}
```

## Cockpit 视角 (F1)

```lua
Cockpit = {
  -- X轴，前后，机鼻方向为正
  -- Y轴，上下，机背方向为正
  -- Z轴，左右，机翼方向，右为正
  
  --摄影机位置
  CockpitLocalPoint      = {0.000000,2.3,0.000000},
  --摄影机可视角度FOV限制，最窄20度(放大视角)，最广160度(超广角)
  CameraViewAngleLimits  = {20.000000,160.000000},
  
  CameraAngleRestriction = {false,90.000000,0.400000},
  --摄影机转动角度限制{水平角度最大值, 垂直角度最小值 , 垂直角度最大值}
  CameraAngleLimits      = {200.000000,-90.000000,90.000000},
 
  EyePoint               = {0.050000,0.000000,0.000000},
  --摄影机移动限制，摄影机在座舱内允许的移动范围
  limits_6DOF            = {
    x = {0.030000,0.400000},		--前后限定，向前限定在0.03米与0.4米之间
    y = {-0.300000,0.100000},		--下0.3米，上0.1米
    z = {-0.300000,0.300000},		--左右移动 +-0.3米
    roll = 90.000000				--旋转最大90度
  },
  ShoulderSize		   	= 0.25,		--肩宽？
  Allow360rotation	  = false,		--360度旋转
},
```

## Chase & Arcade 跟随视角(F4)和游戏模式视角

```lua
Chase = {
  LocalPoint     = {-5.0,1,3.0},--摄影机位置，后5米，高度1米，偏右3米
  AnglesDefault  = {0.0,0.0},--摄影机角度，向x轴方向看
},
Arcade = {
  LocalPoint	 = {-21.5,5.618,0.0},--摄影机位置，后21.5米，高5.618米，水平正中
  AngleDefault	 = {0.0,-8.0},--摄影机角度，向下看8度
},
```

## Snap Views 预设视角

预设视角是预先设置的若干个视角位置，使用快捷键进行切换。可以自定义机载设备的放大视角，比如雷达或MFCD。SnapView最多设置10个。

```lua
SnapViews = {							--预设视角
	[1] = {
		viewAngle 		= 70.611748,	--FOV Field of View 镜头的可视角度，类似镜头焦距。角度越大，画面越广，角度越小，画面会放大
		hAngle	 		= -1.240272,	--摄影机水平方向角度(Z轴上的旋转角度) 向右为负 向左为正
		vAngle	 		= 0.850250,		--摄影机垂直方向角度(Y轴上的旋转角度) -90俯视 90仰视
        rollAngle 		= 0.000000,		--视角旋转角（Z轴）
		x_trans	 		= 0.164295,		--摄影机X位置（前后)，向前 0.16米
		y_trans	 		= -0.074373,  	--摄影机Y位置（上下)，偏下 0.07米
		z_trans	 		= 0.000000,		--摄影机Z位置（左右)，在中心
	},
  [2] = {
    ...
  },
},
```

## 创建自定义视角和预设视角

* 创建自定义视角

在游戏中使用`RALT+Num0`可保存用户自定义视角，保存的视角会作为`Num5`默认中心视角，并会永久保存。

用户自定义视角配置文件被保存在 Saved Game\DCS\Config\View\SnapViews.lua中的default view中。

* 创建预设视角

将自定义视角生成的代码拷贝到到`View.lua`的SnapViews对象里。