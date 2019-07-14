# entry.8lua 文件格式

entry.lua会被自动调用，所以它也作为MOD的入口或定义使用。

## 允许在DCS lua中使用的方法

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
* _(string)                              -- en_string = _("ENGLISH STRING")
* mount_vfs_model_path(current_mod_path..'/Shapes/MyZipOrFolder')     --挂载模型
* mount_vfs_texture_path(current_mod_path..'/Textures/MyZipOrFolder')  --挂载贴图
* mount_vfs_liveries_path(current_mod_path..'/Liveries')                                --挂载涂装
* declare_plugin(unique_plugin_id,info_table)                --定义模组

## entry.lua

DCS 模组的入口函数，任何MOD文件夹中的entry.lua会在DCS加载过程中执行。

```lua
declare_plugin("MOD NAME FULL NAME"),
    installed 	= true, --如果是false那么只是占位图标
	dirName 	= current_mod_path,
	displayName	= _("MOD NAME"),
	version 	= "0.0.1 alpha"
)

plugin_done()
```

