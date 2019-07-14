# MOD 文件结构说明

```
> Bin								气动模拟、加密等 C++的DLL库
> Cockpit							座舱
    > Scripts						脚本
    > Shapes						edm模型
    > Textures						贴图，zip格式
> Doc								文档
> Encyclopedia						百科
    > Plane							飞机类型
        > {MODName}					文件名与定义的MOD名称相同，无扩展名，纯文本文件，UTF-8编码
> ImagesGUI							编辑器中所用的图片，如挂载图片，简报图片等
        > briefing-map-{MODName}.png  	{MODName}为MOD名，格式png，512x512
> Input								操控配置文件
    > joystick						摇杆
    	> default.lua				摇杆的默认配置文件。keyboard、mouse都可设置default.lua
    > keyboard						键盘
    > mouse							鼠标
    > name.lua						操控配置名称，固定内容为 return _('{MODName}') 模组名
> l10n								国际化文件（mo）
	> en							英文	
> Liveries							涂装
> Missions							任务
    > EN							语言代码
        > Campaigns					战役
        > QuickStart				快速任务
            > quickstart.lua		快速任务配置文件
        > Single					单人任务
            > localization.lua		单人任务配置文件
        > Training					训练
            > lessons.lua			训练配置文件
> Options							MOD的专用设置
    > options.dlg					专用设置UI界面绘制的配置
    > optionsData.lua				定义UI界面中使用的变量
    > optionsDb.lua					Setting的变量持久化
> Shapes							EDM模型
> Sounds							音效
> Textures							纹理zip包
> Theme								主界面配图
    > ME							编辑器相关图
        > base-menu-window.png		主界面背景图 
        > briefing-map-default.png	简报图
        > loading-window.png		加载图
        > campaign-window.png		战役图
        > MainMenulogo.png			主界面右上角LOGO
    > icon_active.png				主界面MOD图标(启用状态)
    > icon_noactive.png				主界面MOD图标(未启用状态)
    > icon_select.png				主界面MOD图标(鼠标选中状态)
    > icon.png						主界面MOD图标，可与active.png相同
> UnitPayloads						挂载
    > {MODName}.lua					挂载配置文件
> Weapons							武器
> {MODName}.lua
> comm.lua							无线电菜单配置文件
> entry.lua							MOD的入口程序
> Views.lua							视角配置文件
```

