# declare_plugin 定义模组

* declare_plugin(string mod_name,table) 定义模组
* plugin_done()

## 参数

### UI界面

DCS允许MOD对部分主界面配图进行替换以一般都默认为current_mod_path\Theme文件夹，使用以下代码定义

```lua
...
Skins = {
    {
        name = _("NewAir"),
        dir = "Theme"
    },
},
...
```

DCS会自动加载Theme里的以下文件

* icon 38x38.png 

* icon 76x76.png

  在`设置`中使用的缩小图标

* icon.png

  DCS主界面底部图标正常状态

* icon_active.png

  DCS主界面底部图标已安装状态

* icon_select.png

  DCS主界面底部图标鼠标高亮状态

* ME\base-menu-window.png

  DCS主菜单背景图

* ME\briefing-map-default.png

  简报默认图

* ME\loading-window.png

  任务加载界面背景图

* ME\MainMenulogo.png

  主菜单右上角LOGO

### 模组任务

```lua
...
Missions = {
    {
        name = _("A-4E-C"),
        dir = "Missions",
    },
},
...
```

#### 快速任务

* current_mod_path\语言缩写\QuickStart\quickstart.lua

  miz文件与quickstart.lua同目录

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

#### 训练任务

* current_mod_path\语言缩写\Training\lessons.lua

  miz文件与lessons.lua同目录

```lua
lessons = 
{
	{
        ["file"] = "01- Su-25T Start Up.miz",
        ["name"] = "Aircraft Start-Up",
        ["description"] = "In this lesson, we will practice starting the Su-25T from the ramp",
    },
	{
        ["file"] = "*.miz",
        ["name"] = "Title in Menu",
        ["description"] = "Description",
    },
}
```

### 飞行日志

```lua
...
LogBook = {
    {
        name = _("A-4E-C"),
        type = "A-4E-C",
    },
},
...
```



### 按键和游戏控制器配置

```lua
...
InputProfiles = {
	["su-35"] = current_mod_path .. '/Input/su-35',
},
...
```

#### 按键设置菜单中的名称

* current_mod_path/Input/<Aircraft_Name>/name.lua 

  ```lua
  return _('Su-35') --显示在按键设置下拉菜单中
  ```

#### 摇杆

* current_mod_path/Input/<Aircraft_Name>/joystick/default.lua

#### 键盘

* current_mod_path/Input/<Aircraft_Name>/keyboard/default.lua

#### 鼠标

* current_mod_path/INput/<Aircraft_Name>/mouse/default.lua

### 外部dll引用 

```lua
...
binaries = {
   'Su27',
   'FM_dll'
},
...
```

### 专用设置

```lua
Options = {
    {
        name = _("A-4E-C"),
        nameId = "A-4E-C",
        dir = "Options",
        CLSID = "{A-4E-C options}"
    },
},	
```



### 百科

指定百科路径

```lua
...
encyclopedia_path = current_mod_path..'/Encyclopedia'
...
```

百科内容需要保存在UTF-8编码的txt格式文本中，DCS会自动根据飞机和武器等装备的Name_语言缩写，自动从`encyclopedia_path`调用。

* current_mod_path\Encyclopedia\Weapon\R-73.txt 默认语言

* current_mod_path\Encyclopedia\Weapon\R-73_ru.txt 俄语

#### 飞机类

current_mod_path\Encyclopedia\Plane\Su-35.txt

```txt
Su-35
Plane/su-35.png
su-35


Name: Su-35 "Flanker-E"
Type: Multirole fighters
Developed: Sukhoi OKB, Russia
Crew: 1
Length: 21.9 m
Height: 5.9 m
Wing span: 14.7 m
Wing area: 62 m²
Maximum Mach at S/L: 1.1
Maximum Mach at height: 2.3
Weight empty: 19000 kg
Normal weight: 25300 kg
Maximum weight: 34500 kg
G limit: 9
Maximum range: 3600 km
Maximum fuel: 11500 kg
Service ceiling: 20000 m
Take-off speed: 280 km/h
Range with nominal load: 3000 km
Landing speed: 280-300 km/h

Armament:
- GSh-301 cannon
```

#### 武器类

current_mod_path\Encyclopedia\Weapon\R-77M.txt

```txt
R-77M
Weapon/R-77M.png
r-77m


Name: R-77M (AA-12C 'Adder')
Type: Medium-range, radar-guided, air-to-air missile.
Developed: Spetztekhnika Vympel NPO, Russia.
Weight, kg: 190
Length, m: 3.60
Diameter, м: 0.200
Warhead: Laser fuse and an expanding rod warhead.
Warhead weight, kg: 22.5
Guidance: AESA seeker, inertial, command, conventional fins, two-pulse motor.
G limit: 40
Maximum Mach number: 4
Range, km: 80
```

#### 船类

current_mod_path\Encyclopedia\Ship

#### 载具

current_mod_path\Encyclopedia\Tech

