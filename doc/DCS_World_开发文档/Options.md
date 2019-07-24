#Options 专用设置 文件格式

## optionsData.lua

位置MOD\Options\optionsData.lua

用来定义变量，并在options.dlg中使用

```lua
cdata = {
  --变量名 				= 值
	PLANENAME 			= _('A-4E-C'),
	RWRTYPE					= _('RWR-Type(WIP-Nonfunctional)'),
	HIDESTICK				= _('Control Stick'),
	TRIMSPEEDL			= _('Trimspeed'),
}
```

## optionsDb.lua

位置 MOD\Options\optionsDb.lua

用来创建存储数据的对象

optionsDb.lua的代码有固定的开头，需要关注return的内容

```lua
local DbOption  = require('Options.DbOption')
local i18n	    = require('i18n')
local oms       = require('optionsModsScripts')
local _ = i18n.ptranslate
-- find the relative location of optionsDb.lua
function script_path() 
    -- remember to strip off the starting @ 
	local luafileloc = debug.getinfo(2, "S").source:sub(2)
	local ti, tj = string.find(luafileloc, "Options")
	local temploc = string.sub(luafileloc, 1, ti-1)
    return temploc
end 
-- find module path
local relativeloc = script_path()
modulelocation = lfs.currentdir().."\\"..relativeloc
local tblCPLocalList = oms.getTblCPLocalList(modulelocation)

return {
  	-- !!!!!数据持久化的代码!!!!!
		-- 参数名称 = DbOption.new():默认值:UI控件(UI控件参数)
}
```

### 下拉选项

UI控件为combo，使用DbOption.Item()创建条目，使用Value()设置条目的值。

```lua
rwrType = DbOption.new():setValue(0):combo({
    DbOption.Item(_('AN/APR-23 (Sound only)')):Value(0),
		DbOption.Item(_('AN/APR-25 (Display)')):Value(1),
    DbOption.Item(_('ON')):Value(2),
		DbOption.Item(_('DISMOUNTED')):Value(3),
}),
```

###复选框

UI控件为checkbox，使用setValue()设置条目的默认值

```lua
hideControlStick = DbOption.new():setValue(true):checkbox(),
```

### 滑块

UI控件为slider,使用Range()设置滑块的最小值和最大值

```lua
assistance = DbOptions.new():setValue(100):slider(Range(0,100)),
```

## options.dlg

位置 MOD\Options\options.dlg

DCS会根据此文件绘制"专用设置"界面，实现Mod的Settings。"专用设置"界面由窗体，面板和控件构成。

####dialog 窗体

```lua
dialog = {																--固定写法
  ["children"] = {												--自成员
    --在此绘制面板和控件，其他内容无需修改
  },
  ["params"] = {													--窗体参数
    ["bounds"] = {												--坐标
			["h"] = 851,												--panel的高度，固定值不需修改
			["w"] = 1135,												--panel的宽度，固定值不需修改
			["x"] = 0,													--绘制起始点x
			["y"] = 0,													--绘制起始点y
		},
		["draggable"] = true,									--可拖拽，无实际作用								
		["enabled"] = true,										--可用性
		["hasCursor"] = true,									--绘制鼠标指针
		["lockFlow"] = false,
		["modal"] = false,
		["offscreen"] = false,								--是否全屏幕显示
		["resizable"] = false,								--是否允许调整大小
		["text"] = "New dialog",							--不显示
		["zOrder"] = 0,
  },
	["skin"] = {														--固定值
		["params"] = {
			["name"] = "windowSkin",
		},
	},
  ["type"] = "window",										--固定值
}
```

#### panel 面板

```lua
["containerPlugin"] = {									--固定写法					
  ["children"] = {
    --在此绘制控件，其他内容无需修改
  },
  ["params"] = {												--面板参数
    ["bounds"] = {											--面板的位置
      ["h"] = 600,											--x、y、width、height为固定值
      ["w"] = 974,
      ["x"] = 0,
      ["y"] = 0,
    },
    ["enabled"] = true,									--可用性
    ["text"] = "",											--内容不显示
    ["tooltip"] = "",										--内容不显示
    ["visible"] = true,									--可见性
    ["zindex"] = 2,											--层排序
  },
  ["skin"] = {													--固定值
    ["params"] = {
      ["name"] = "panelSkin",
    },
    },
    ["type"] = "Panel"									--固定值
},
```

####Label

使用label控件显示optionsData.lua中定义的变量

```lua
["CPLabelLabel"] = {										--对象名，可修改
  ["params"] = {
    ["bounds"] = {											--文本的坐标
      ["h"] = 25,
      ["w"] = 200,
      ["x"] = 57,
      ["y"] = 84,
    },
    ["enabled"] = true,									--可用性
    ["text"] = "$CPDICT",								--文字，使用optionsData.lua中定义的变量
    ["tooltip"] = "",										--提示文字，鼠标进入时显示
    ["visible"] = true,									--可见性
    ["zindex"] = 0,											--层排序
  },
  ["skin"] = {													--固定值
    ["params"] = {
      ["name"] = "staticOptionsCaptionSkin",
    },
  },
  ["type"] = "Static",									--固定值
},
```

#### 下拉列表

```lua
["rwrTypeComboList"] = {	--DCS会根据optionDb.lua中定义的名称并根据{变量名+类型}进行回调
  ["params"] = {
    ["bounds"] = {
      ["h"] = 24,
      ["w"] = 180,
      ["x"] = 331,
      ["y"] = 90,
    },
    ["enabled"] = true,
    ["tabOrder"] = 0,
    ["text"] = "Item1",
    ["tooltip"] = "",
    ["visible"] = true,
    ["zindex"] = 0,
  },
  ["skin"] = {													--固定值
    ["params"] = {
      ["name"] = "comboListSkin_options",
    },
  },
  ["type"] = "ComboList",								--固定值
},
```

#### 复选框

复选框自带文字显示区

```lua
["hideStickCheckbox"] = {	--hideStick的复选框，hideStick在optionDb.lua中定义
  ["params"] = {
    ["bounds"] = {
      ["h"] = 18,
      ["w"] = 300,
      ["x"] = 57,
      ["y"] = 175,
    },
    ["enabled"] = true,
    ["state"] = false,
    ["tabOrder"] = 0,
    ["text"] = "$HIDESTICK",
    ["tooltip"] = "",
    ["visible"] = true,
    ["zindex"] = 0,
  },
  ["skin"] = {													--固定值
    ["params"] = {
      ["name"] = "checkBoxSkin_options",
    },
  },
  ["type"] = "CheckBox",								--固定值
},
```

#### 滑块

```lua
["assistanceWidget"] = {								--参数名为assistance
  ["params"] = {
    ["bounds"] = {
      ["h"] = 18,
      ["w"] = 300,
      ["x"] = 57,
      ["y"] = 175,
    },
    ["enabled"] = true,
    ["text"] = "0",																	--可选，推荐与滑块最小值相同
    ["tooltip"] = "",
    ["visible"] = true,
    ["zindex"] = 0,
  },
  ["skin"] = {																			--固定值
    ["params"] = {
      ["name"] = "staticOptionsSliderValueSkin"			--固定值
    },
  },
  ["type"] = "Static",
}
```

