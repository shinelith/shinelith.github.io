# entry.lua 文件格式

## 说明

entry.lua会被自动调用，所以它也作为MOD的入口或定义使用。

## 允许在entry.lua中使用的对象、变量和方法

* table
* pairs
* ipairs
* type
* assert
* print
* math
* tostring
* dofile                                   --安全环境
* loadfile
* current_mod_path           --当前MOD的根目录
* _(string)                              --国际化后的字符串 en_string = _("ENGLISH STRING")
* mount_vfs_model_path(current_mod_path..'/Shapes/MyZipOrFolder')     --挂载模型
* mount_vfs_texture_path(current_mod_path..'/Textures/MyZipOrFolder')  --挂载贴图
* mount_vfs_liveries_path(current_mod_path..'/Liveries')                                --挂载涂装
* declare_plugin(unique_plugin_id,info_table)                --定义模组
* add_aircraft(table_aircraft_data) --定义飞机

## 范例

```lua
declare_plugin("MOD NAME FULL NAME"),
	displayName	= _("MOD NAME"),
	developerName = "lith",
    installed 	= true, --如果是false那么只是占位图标
	dirName 	= current_mod_path,

	version 	= "0.0.1 alpha"
)

plugin_done()
```

```lua
declare_plugin("My Mod maded by Me",
{
installed 	 = true, -- if false that will be place holder , or advertising
dirName	  	 = current_mod_path,
fileMenuName = _("My Mod"), -- for mission editor 
version		 = "1.1.2.0",
state		 = "installed", 
info		 = _("Short info about me and my application"),
--collection of binaries which will be asociated with my plugin
binaries 	 =
{
'FM_plugin',			
'Cockpit_dll_1', 
'Cockpit_dll_2'
},
--collection of input profiles 
InputProfiles =
{
    ["PLANE NAME"]      = current_mod_path .. '/Input/hardcore',
    ["PLANE NAME_easy"] = current_mod_path .. '/Input/easy',  
},
-- skin for mission editor , see sample for P-51 , A-10C etc
Skins	=
	{
		{
			name	= _("My Mod"),
			dir		= "Skins/1"
		},
	},
--missions and campaigns
Missions =
	{
		{
			name		= _("My Mod"),
			dir			= "Missions",
			CLSID		= "{CLSIDCLSIID}",		
		},
	},	
-- options related to my plugin
Options = 
	{
		{
			name		= _("My Mod"),
			nameId		= "My Mod",
			dir			= "Options",
			CLSID		= "{0394EC1E-3C24-4ed5-8F13-CD90FF9091A5}"
		},
	},
-- logbook entry
LogBook =
	{
		{
			name		= _("My Mod"),
			type		= "My Mod",
		},
	},		
-- precache resources 
preload_resources = 
	{
		textures   = {},
		models     = {"tracer_bullet_a-10", "shell_50cal", "tracer_bullet_red", "sled"},
		fonts      = {},
		explosions = {},
	},
})

-- the  body of your plugin must be placed here

-- declaration of plugin finished by calling plugin_done()
plugin_done()
```

