# L1 MOD的初始化



## 目录结构

修改DCS系统自身的文件会导致红盾，且被修改后文件的哈希值会发生变化，在进行更新时DCS_Updater会将修改还原，所以不要修改DCS\目录中的文件。官方推荐在`X:\Users\<username>\Saved Games\DCS\Mod\`中添加第三方的MOD。

进入 `X:\Users\<username>\Saved Games\DCS\` 目录，新建`Mods\tech\newair`目录。

新建`entry.lua`。

![1563954367927](assets/1563954364945.png)

## entry.lua

`entry.lua`会在DCS启动前被回调，可以在entry.lua中引用其他的lua文件。在entry.lua中可使用的API与Hooks不同，相比Hooks会更少。具体可调用的成员和方法在DCS\Scripts\Database\db_mods.lua中的make_environment方法中的env中定义。

```lua
local env = {
    table                  = table, 
    pairs                  = pairs,
    ipairs                 = ipairs,
    type                   = type,
    assert                 = assert_,
    print                  = print_,
    math                   = math,
    tostring               = tostring,
    _ = _,
    --some global defines
    __DCS_VERSION__		   =  __DCS_VERSION__,
    __FINAL_VERSION__	   =  __FINAL_VERSION__,
    ED_FINAL_VERSION		= __FINAL_VERSION__,
    ED_PUBLIC_AVAILABLE		= ED_PUBLIC_AVAILABLE,
    USE_TERRAIN4			= true,

    mount_vfs_model_path	= mount_vfs_model_path,
    mount_vfs_texture_path	= mount_vfs_texture_path,
    mount_vfs_liveries_path	= mount_vfs_liveries_path,
    mount_vfs_sound_path	= mount_vfs_sound_path,
    declare_plugin			= declare_plugin,
    plugin_done				= plugin_done,
    WSTYPE_PLACEHOLDER		= WSTYPE_PLACEHOLDER,
    --weapon loadout declaration
    CAT_BOMBS 	 			= CAT_BOMBS,
    CAT_MISSILES   			= CAT_MISSILES,
    CAT_ROCKETS	 			= CAT_ROCKETS, --!unguided!
    CAT_AIR_TO_AIR 			= CAT_AIR_TO_AIR,
    CAT_FUEL_TANKS 			= CAT_FUEL_TANKS,
    CAT_PODS	 	 		= CAT_PODS,
    CAT_SHELLS				= CAT_SHELLS,
    CAT_GUN_MOUNT	 		= CAT_GUN_MOUNT,
    CAT_CLUSTER_DESC		= CAT_CLUSTER_DESC,
    declare_weapon			= declare_weapon,
    declare_loadout			= declare_loadout,	
    cluster_desc			= cluster_desc,		
    combine_cluster			= combine_cluster,
    --warheads 
    simple_aa_warhead			=	simple_aa_warhead,							
    enhanced_a2a_warhead        =   enhanced_a2a_warhead,
    directional_a2a_warhead     =   directional_a2a_warhead,
    simple_warhead              =   simple_warhead,
    cumulative_warhead          =   cumulative_warhead,
    penetrating_warhead         =   penetrating_warhead,
    antiship_penetrating_warhead=   antiship_penetrating_warhead,
    predefined_warhead 			=   predefined_warhead,

    get_bomb_munition		= function(nm) return weapons_table.weapons.bombs[nm] end,
    PTAB_2_5_DATA			= PTAB_2_5_DATA,
    PTAB_10_5_DATA 			= PTAB_10_5_DATA,
    AO_2_5_DATA				= AO_2_5_DATA,
    MK118_DATA				= MK118_DATA,
    BLU97B_DATA				= BLU97B_DATA,
    BLU108B_DATA			= BLU108B_DATA,
    HEAT_DATA				= HEAT_DATA,

    add_aircraft           = add_aircraft,
    pylon                  = pylon,
    aircraft_task          = aircraft_task,
    gun_mount              = gun_mount,
    smoke_effect 		   = smoke_effect,
    fire_effect 		   = fire_effect,
    declare_gun_mount	   = declare_gun_mount,
    --tasks
    Nothing                 = Nothing,          
    SEAD                    = SEAD,            
    AntishipStrike          = AntishipStrike,  
    AWACS                   = AWACS,           
    CAS                     = CAS,             
    CAP                     = CAP ,            
    Escort                  = Escort,          
    FighterSweep            = FighterSweep ,   
    GroundAttack            = GroundAttack ,   
    Intercept               = Intercept   ,    
    AFAC                    = AFAC        ,    
    PinpointStrike          = PinpointStrike,   
    Reconnaissance          = Reconnaissance , 
    Refueling               = Refueling      , 
    RunwayAttack            = RunwayAttack   , 
    Transport               = Transport     ,
    MODULATION_AM			= MODULATION_AM,
    MODULATION_FM			= MODULATION_FM,
    LOOK_BAD				= LOOK_BAD,
    LOOK_AVERAGE			= LOOK_AVERAGE,
    LOOK_GOOD				= LOOK_GOOD,
    LOOK_EXELLENT_B17 		= LOOK_EXELLENT_B17,
    add_unit_to_country		= add_unit_to_country,
    makeAirplaneCanopyGeometry = makeAirplaneCanopyGeometry,
    makeHelicopterCanopyGeometry = makeHelicopterCanopyGeometry,
    verbose_to_dmg_properties = verbose_to_dmg_properties, --damage
    set_manual_path		   	  = function(unit,manual_path)  		   various_unit_settings(unit,{ManualPath = manual_path}) end,
    make_view_settings		  = function(unit,ViewSettings,SnapViews)  various_unit_settings(unit,{ViewSettings = ViewSettings,SnapViews    = SnapViews}) end,
    --ground units adding support------------------------------
    set_recursive_metatable = set_recursive_metatable,
    new_reference			= new_reference,
    add_launcher            = add_launcher,
    add_surface_unit        = add_surface_unit,
    GT_t                    = db.Units.GT_t,
    ------------------------------------------------------------	
    -- sensors declaration
    SENSOR_OPTICAL      = SENSOR_OPTICAL,
    SENSOR_RADAR        = SENSOR_RADAR,
    SENSOR_IRST         = SENSOR_IRST,
    SENSOR_RWR          = SENSOR_RWR,
    --RADAR
    RADAR_AS            = RADAR_AS,
    RADAR_SS            = RADAR_SS,
    RADAR_MULTIROLE     = RADAR_MULTIROLE,
    --
    ASPECT_HEAD_ON      = ASPECT_HEAD_ON,
    ASPECT_TAIL_ON      = ASPECT_TAIL_ON,
    --
    HEMISPHERE_UPPER    = HEMISPHERE_UPPER,
    HEMISPHERE_LOWER    = HEMISPHERE_LOWER,
    --IRST
    ENGINE_MODE_FORSAGE = ENGINE_MODE_FORSAGE,
    ENGINE_MODE_MAXIMAL = ENGINE_MODE_MAXIMAL,
    ENGINE_MODE_MINIMAL = ENGINE_MODE_MINIMAL,
    --OPTIC
    OPTIC_SENSOR_TV     = OPTIC_SENSOR_TV,
    OPTIC_SENSOR_LLTV   = OPTIC_SENSOR_LLTV,
    OPTIC_SENSOR_IR     = OPTIC_SENSOR_IR,

    FIXED_WING					= FIXED_WING,				
    VARIABLE_GEOMETRY			= VARIABLE_GEOMETRY,
    FOLDED_WING					= FOLDED_WING,				
    VARIABLE_GEOMETRY_FOLDED 	= VARIABLE_GEOMETRY_FOLDED, 

    declare_sensor		= declare_sensor,
    make_default_mech_animation = make_default_mech_animation,
    ------------------------------------------------------------	
}
```

## DEMO

```lua
local self_ID = "NewAir"

declare_plugin(self_ID,
{
	displayName = _("NewAirplane"), --显示名
	developerName = "lith",	--开发者名称
	
	installed = true,
	dirName = current_mod_path,
	version = "0.0.1.dev",
	state = "installed",
	info = "",
	
})


--挂载3D模型、涂装、贴图路径
mount_vfs_model_path(current_mod_path.."/Shapes")
mount_vfs_liveries_path(current_mod_path.."/Liveries")
mount_vfs_texture_path(current_mod_path.."/Textures")


NewAir =  {
	-- 单位名
	Name = self_ID.."F1", 
	
	-- 单位显示在列表、状态栏中的名称
	DisplayName = _(self_ID.."F1"), 
	
	Picture = "",
	
	-- 积分值 单位在多人游戏中被摧毁时的分数
	Rate = 0, 
	
	-- 与单位关联的ShapeName，Shape属性会被shape_table_data覆盖
	-- 可指定为系统中已有的Shape如F-15C（需要删除shape_table_data）
	Shape = "", 
	
	-- 使用指定的edm文件作为Shape
	shape_table_data = {
		{
			-- name = '' , --shape的名称 可空，如空name = file
			file = 'paper', -- edm文件名
			life = 18, -- 单位强度（血量）
			vis = 3, -- 能见度系数
			desrt = 'Fighter-1-crush', -- 残骸的Sharp Name
			fire = { 300 , 2 }, -- 燃烧 默认时间300秒，范围2米
			username = 'paper_plane', -- 别名
			index =  WSTYPE_PLACEHOLDER,
		},
		{	-- 定义另一个Shape
			file  = "F-104T-destr", -- edm文件名
			fire  = { 240 , 2},
		},
	},
	
	-- 猜测 单位的地图类型识别符
	-- P0091000025 是攻击机
	-- P0091000024 是战斗机
	mapclasskey = "P0091000025",
	
	
	-- 单位的属性
	-- 在DCS\Scripts\Database\wsTypes.lua中定义的类型
	-- wsType_Air 空中
	-- wsType_Airplane 空中-飞机 （关键参数，会影响后续识别）
	-- wsType_Fighter 空中-飞机-战斗机

	-- 自定义属性 很多mod没有按照wsTypes的规范写法
	-- "Battleplanes" 攻击机
	-- "Refuelable" 可加油
	-- "Datalink" 支持数据链
	-- "Link16" 支持Link16数据链
	attribute = {wsType_Air, wsType_Airplane, wsType_Fighter, WSTYPE_PLACEHOLDER ,"Battleplanes",},
	
	-- 国籍
	Countries = {"USA"},
	
	-- 单位的分类
	-- 在DCS\Scripts\Database\db_categories.lua中定义
	Categories = {
		"{78EFB7A2-FD52-4b57-A6A6-3BF0E1D6555F}", "Interceptor",
	},
	
	M_empty 					= 8000, -- 包含飞行员和nose load的重量 kg
	M_nominal 					= 10000, -- 零油重 Empty Plus Full Internal Fuel kg
	M_max 						= 12000, -- 最大起飞重量 kg
	M_fuel_max 					= 4000, -- 最大燃油的重量 kg （仅油的重量）
	H_max 					 	= 21000, -- 最大升线 m
	average_fuel_consumption 	= 0.5, -- 平均油耗 kg/s this is highly relative, but good estimates are 36-40l/min = 28-31kg/min = 0.47-0.52kg/s -- 45l/min = 35kg/min = 0.583kg/s
	CAS_min 					= 50, -- if this is not OVERAL FLIGHT TIME, but jus LOITER TIME, than it shuh                                    *olud be 10-15 minutes.....CAS capability in minute (for AI)
	V_opt 						= 300, -- AI巡航速度 m/s
	V_take_off 					= 100, -- AI离地速度 m/s
	V_land 						= 100, -- AI着陆速度 m/s
	V_max_sea_level 			= 400, -- AI海平面最大速度 m/s
	V_max_h 					= 800, -- AI最大高度速度 m/s
	Vy_max 						= 200, -- AI最大爬升速度 m/s
	Mach_max 					= 2.35, -- AI最大马赫数 马赫
	Ny_min 						= -3, -- AI负G极限 G
	Ny_max 						= 9.0,  -- AI正G极限
	Ny_max_e 					= 9.0,  -- AI正G极限
	AOA_take_off 				= 0.12, -- AI起飞攻角
	bank_angle_max 				= 85, -- Max bank angle (for AI)
	
	has_afteburner 				= true, -- 是否有加力
	has_speedbrake 				= true, -- 是否有减速板
	nose_gear_pos 				= {  3.3,	-2,	0}, -- 前起落架坐标
	main_gear_pos 				= { -1.5,	-2,	2}, -- 主起落架坐标
	tand_gear_max 				= 0.4,
	tanker_type 				= 0, -- Tanker type if the plane is airrefuel capable
	wing_area 					= 40, -- 机翼面积 平米
	wing_span 					= 14, -- wing spain in m
	wing_type 					= 0, -- 固定翼 = 0
	thrust_sum_max 				= 8000, -- 最大推力 kg
	thrust_sum_ab 				= 10000, -- 最大推力（加力）kg
	length 						= 18, -- 长度 m
	height 						= 5, -- 高度 m
	flaps_maneuver 				= 0.5, -- AI起飞时的襟翼形态 (0.5 = 形态1; 1.0 = 形态2) 
	range 						= 2000, -- AI最大范围直径 km
	RCS 						= 5, -- 雷达截面积 平米
	IR_emission_coeff 			= 0.62, -- 引擎红外辐射系数（正常情况） 作为参考，Su-27不开加力时的系数为1 
	IR_emission_coeff_ab 		= 1.02, -- 引擎红外辐射系数（加力）
	wing_tip_pos 				=  {-2,	2, 7}, -- wingtip coords for visual effects
	nose_gear_wheel_diameter 	= 0.500, -- 前起落架轮直径 m
	main_gear_wheel_diameter 	= 0.800, -- 主起落架轮直径 m
	brakeshute_name 			= 3, -- Landing - brake chute visual shape after separation
	is_tanker 					= false, -- 是否是有加油能力
	air_refuel_receptacle_pos 	= {0, 0, 0}, -- 加油器坐标
	engines_count				= 1, -- 发动机数量
	
	engines_nozzles = {			--发动机喷嘴
		[1] = 
		{
			pos 		=  {-8,	0,	0}, -- 喷嘴坐标
			elevation   =  0, -- AFB cone elevation 加力锥型的高
			diameter	 = 1, -- AFB cone diameter 加力锥型的直径
			exhaust_length_ab   = 7, -- lenght in m
			exhaust_length_ab_K = 0.76, -- AB animation 
			smokiness_level = 0.1,	--烟雾等级
		},
		-- 不存在第二台发动机
	},
	
	crew_size = 1, --成员数 项可空
	
	-- 机组成员
	crew_members = {
		[1] = 
		{
		
			ejection_seat_name = "pilot+ejectionseat", --如果是String则以这个名字创建一个新的Shape 如果是int，则使用DCS中已有Parts的Shape （Shape = edm模型）
			drop_canopy_name = 12,
			pos =  {4,	1,	0},		--坐标
			canopy_pos = {4, 1,	0}, --座舱盖的坐标 好像是以pos为准
		},
	},

	fires_pos = {
		[1] = 	{-2.117, -0.9, 		0},
		[2] = 	{-1.584, 0.176,	2.693},
		[3] = 	{-1.645, 0.213,	-2.182},
		[4] = 	{-0.82,	0.265,	2.774},
		[5] = 	{-0.82,	0.265,	-2.774},
		[6] = 	{-0.82,	0.255,	4.274},
		[7] = 	{-0.82,	0.255,	-4.274},
		[8] = 	{-6.548, -0.248,	0},
		[9] = 	{-6.548, -0.248,	0},
		[10] = 	{0.304,	-0.748,	0.442},
		[11] = 	{0.304,	-0.748,	-0.442},
	},
	
	-- 对抗
	SingleChargeTotal	 	= 120,
	CMDS_Incrementation 	= 4,
	ChaffDefault 			= 64, 
	ChaffChargeSize 		= 1,
	FlareDefault 			= 64, 
	FlareChargeSize 		= 1,
	CMDS_Edit 				= true,
	
	-- 新的对抗配置代码 TODO 验证有效性
	-- passivCounterm = {
		-- CMDS_Edit = true,
		-- SingleChargeTotal = 162,
		-- chaff = {default = 112, increment = 112, chargeSz = 1},
		-- flare = {default = 16,  increment = 16, chargeSz = 1},
	-- },
	
	
	chaff_flare_dispenser 	= {  --铂条 红外干扰弹布撒
		-- 调用drop_flares和drop_chaff时应从序号0开始(lua数组以1开始)
		[1] = {
			dir = {0, -1, -1}, -- 抛射方向的向量{X,Y,Z}
			pos = {-3, -1, 2}, -- 抛射位置{X,Y,Z}
		},
		[2] = {
			dir = {0, -1, 1},
			pos = {-3, -1, -2},
		}
	},

	--传感器
	detection_range_max = 60,	--最大探测距离 km
	radar_can_see_ground = true, -- this should be examined (what is this exactly?)
	
	CanopyGeometry = {
		azimuth   = {-160.0, 160.0}, -- AI飞行员水平视角 度
		elevation = {-50.0, 90.0} -- AI飞行员垂直视角 度
	},
	
	Sensors = {
		RWR = "Abstract RWR", -- RWR类型
		RADAR = "N-019", -- Radar类型
		-- ...
	},
	
	HumanRadio = {
		frequency = 127.5,  -- 无线电频率 默认值251.0
		editable = true,	-- 可操作 默认值 true
		minFrequency = 100.000,	--最小频率 默认值 225.000
		maxFrequency = 156.000,	--最大频率 默认值 399.975
		modulation = MODULATION_AM  --AM电台 默认值 MODULATION_AM
	},
	
	--机炮配置项
	Guns = {
		gun_mount("ADEN", { -- 机炮名 标识符
			count = 1000,	-- 备弹数
			muzzle_pos_connector = "GUN_POINT", --枪口的Connector名称 （edm connector）
			muzzle_pos 		  = {1, -0.5, -1}, --枪口的模型坐标
			elevation_initial = 2.000,
			supply_position   = {1, 0, 0},
			effect_arg_number = 350,
		}),
		-- 如果还有其他的机炮
	},
	
	--挂载配置项
	Pylons = {
		-- 会影响挂载页的功能
		-- pylon(编号,0,X坐标,Y坐标,Z坐标,模型相关的对象,可挂载的武器)
        pylon(1, 0, 0.660000, -0.078000, -3.325000, -- 
            {
				use_full_connector_position = true,
				--connector = "Pylon1",  --模型Connector名
				--arg = xxx,  --模型动画的编号 Args
				--arg_value = 0,  --模型动画Arg的值
            },
            {
				-- CLSID = "XXX"
				-- 参考 DCS\Scripts\Database\db_weapons_data.lua
                { CLSID = "{C8E06185-7CD6-4C90-959F-044679E90751}" }, -- 	AIM-120B
				{ CLSID = "{40EF17B7-F508-45de-8566-6FFECC0C1AB8}" }, --    AIM-120C
				{ CLSID = "{6CEB49FC-DED8-4DED-B053-E1F033FF72D3}" }, --    AIM-9M 
            }
        ),
        pylon(2, 0, -0.155000, -0.343000, -2.944000,
            {
				use_full_connector_position=true,
            },
            {
                { CLSID = "{E1F29B21-F291-4589-9FD8-3272EEC69506}" },
				{ CLSID = "{BCE4E030-38E9-423E-98ED-24BE3DA87C32}" }, -- "Mk-82"
				{ CLSID = "{AB8B8299-F1CC-4359-89B5-2172E0CF4A5A}" }, -- "Mk-84"
				{ CLSID = "{Mk82AIR}" },
				{ CLSID = "{51F9AAE5-964F-4D21-83FB-502E3BFE5F8A}"}, -- GBU-10
				{ CLSID = "{DB769D48-67D7-42ED-A2BE-108D566C8B1E}"}, -- GBU-12
				{ CLSID = "{EF0A9419-01D6-473B-99A3-BEBDB923B14D}"}, -- GBU-27
				{ CLSID = "{GBU-31}"},
				{ CLSID = "{GBU-38}"},
				{ CLSID = "{CAE48299-A294-4bad-8EE6-89EFC5DCDF00}"}, -- SU-25
				{ CLSID = "{CBU-87}"},
				{ CLSID = "{5335D97A-35A5-4643-9D9B-026C75961E52}"}, -- CBU-97
				{ CLSID = "{CBU_103}"},			
				{ CLSID = "{CBU_105}"},
				{ CLSID = "{444BA8AE-82A7-4345-842E-76154EFCCA46}"}, -- AGM-65D LAU-117
				{ CLSID = "{F16A4DE0-116C-4A71-97F0-2CF85B0313EC}"}, -- AGM-65E LAU-117
				{ CLSID = "LAU_117_AGM_65H"},
				{ CLSID = "{69DC8AE7-8F77-427B-B8AA-B19D3F478B66}"}, -- AGM-65K LAU-117
				{ CLSID = "{9BCC2A2B-5708-4860-B1F1-053A18442067}"}, -- AGM-154
            }
        ),
        pylon(3, 0, 0.660000, -0.078000, -2.563000,
            {
				use_full_connector_position=true,
            },
            {
                { CLSID = "{C8E06185-7CD6-4C90-959F-044679E90751}" }, -- 	AIM-120B
				{ CLSID = "{40EF17B7-F508-45de-8566-6FFECC0C1AB8}" }, --    AIM-120C
				{ CLSID = "{6CEB49FC-DED8-4DED-B053-E1F033FF72D3}" }, --    AIM-9M 
            }
        ),
		------------ 
		pylon(4, 0, -3.55, -0.6000, -2.1,
            {
				use_full_connector_position=true,
			},
            {
                { CLSID = "{BCE4E030-38E9-423E-98ED-24BE3DA87C32}" }, -- "Mk-82"
				{ CLSID = "{AB8B8299-F1CC-4359-89B5-2172E0CF4A5A}" }, -- "Mk-84"
				{ CLSID = "{Mk82AIR}" },
				{ CLSID = "{51F9AAE5-964F-4D21-83FB-502E3BFE5F8A}"}, -- GBU-10
				{ CLSID = "{DB769D48-67D7-42ED-A2BE-108D566C8B1E}"}, -- GBU-12
				{ CLSID = "{EF0A9419-01D6-473B-99A3-BEBDB923B14D}"}, -- GBU-27
				{ CLSID = "{GBU-31}"},
				{ CLSID = "{GBU-38}"},
				{ CLSID = "{CAE48299-A294-4bad-8EE6-89EFC5DCDF00}"}, -- SU-25
				{ CLSID = "{CBU-87}"},
				{ CLSID = "{5335D97A-35A5-4643-9D9B-026C75961E52}"}, -- CBU-97
				{ CLSID = "{CBU_103}"},			
				{ CLSID = "{CBU_105}"},
            }
		),
		pylon(5, 0, -1.155000, -0.753000, -2.1,
            {
				use_full_connector_position=true,
			},
            {
                { CLSID = "{BCE4E030-38E9-423E-98ED-24BE3DA87C32}" }, -- "Mk-82"
				{ CLSID = "{AB8B8299-F1CC-4359-89B5-2172E0CF4A5A}" }, -- "Mk-84"
				{ CLSID = "{Mk82AIR}" },
				{ CLSID = "{51F9AAE5-964F-4D21-83FB-502E3BFE5F8A}"}, -- GBU-10
				{ CLSID = "{DB769D48-67D7-42ED-A2BE-108D566C8B1E}"}, -- GBU-12
				{ CLSID = "{EF0A9419-01D6-473B-99A3-BEBDB923B14D}"}, -- GBU-27
				{ CLSID = "{GBU-31}"},
				{ CLSID = "{GBU-38}"},
				{ CLSID = "{CAE48299-A294-4bad-8EE6-89EFC5DCDF00}"}, -- SU-25
				{ CLSID = "{CBU-87}"},
				{ CLSID = "{5335D97A-35A5-4643-9D9B-026C75961E52}"}, -- CBU-97
				{ CLSID = "{CBU_103}"},			
				{ CLSID = "{CBU_105}"},
            }
		),
		pylon(6, 0, 1.40, -0.77, -2.15,
            {
				use_full_connector_position=true,
			},
            {
				{ CLSID = "{BCE4E030-38E9-423E-98ED-24BE3DA87C32}" }, -- "Mk-82"
				{ CLSID = "{AB8B8299-F1CC-4359-89B5-2172E0CF4A5A}" }, -- "Mk-84"
				{ CLSID = "{Mk82AIR}" },
				{ CLSID = "{51F9AAE5-964F-4D21-83FB-502E3BFE5F8A}"}, -- GBU-10
				{ CLSID = "{DB769D48-67D7-42ED-A2BE-108D566C8B1E}"}, -- GBU-12
				{ CLSID = "{EF0A9419-01D6-473B-99A3-BEBDB923B14D}"}, -- GBU-27
				{ CLSID = "{GBU-31}"},
				{ CLSID = "{GBU-38}"},
				{ CLSID = "{CAE48299-A294-4bad-8EE6-89EFC5DCDF00}"}, -- SU-25
				{ CLSID = "{CBU-87}"},
				{ CLSID = "{5335D97A-35A5-4643-9D9B-026C75961E52}"}, -- CBU-97
				{ CLSID = "{CBU_103}"},			
				{ CLSID = "{CBU_105}"},
            }
		),
		------------
        pylon(7, 0, -3.20000, -0.880000, -1.75,
            {
				use_full_connector_position=true,
            },
            {
                { CLSID = "{02CAFD34-010A-4874-8506-4A7C89210353}" },
                { CLSID = "{446E122B-8E9D-457e-AE8E-7AE88E3E566B}" },
                { CLSID = "{8D399DDA-FF81-4F14-904D-099B34FE7918}" },
				{ CLSID = "{BCE4E030-38E9-423E-98ED-24BE3DA87C32}" }, -- "Mk-82"
				{ CLSID = "{AB8B8299-F1CC-4359-89B5-2172E0CF4A5A}" }, -- "Mk-84"
				{ CLSID = "{Mk82AIR}" },
				{ CLSID = "{51F9AAE5-964F-4D21-83FB-502E3BFE5F8A}"}, -- GBU-10
				{ CLSID = "{DB769D48-67D7-42ED-A2BE-108D566C8B1E}"}, -- GBU-12
				{ CLSID = "{EF0A9419-01D6-473B-99A3-BEBDB923B14D}"}, -- GBU-27
				{ CLSID = "{GBU-31}"},
				{ CLSID = "{GBU-38}"},
				{ CLSID = "{CAE48299-A294-4bad-8EE6-89EFC5DCDF00}"}, -- SU-25
				{ CLSID = "{CBU-87}"},
				{ CLSID = "{5335D97A-35A5-4643-9D9B-026C75961E52}"}, -- CBU-97
				{ CLSID = "{CBU_103}"},			
				{ CLSID = "{CBU_105}"},
            }
        ),
		------------
		pylon(8, 0, -0.6, -1.10000, -1.75,
            {
				use_full_connector_position=true,
            },
            {
				{ CLSID = "{BCE4E030-38E9-423E-98ED-24BE3DA87C32}" }, -- "Mk-82"
				{ CLSID = "{AB8B8299-F1CC-4359-89B5-2172E0CF4A5A}" }, -- "Mk-84"
				{ CLSID = "{Mk82AIR}" },
				{ CLSID = "{51F9AAE5-964F-4D21-83FB-502E3BFE5F8A}"}, -- GBU-10
				{ CLSID = "{DB769D48-67D7-42ED-A2BE-108D566C8B1E}"}, -- GBU-12
				{ CLSID = "{EF0A9419-01D6-473B-99A3-BEBDB923B14D}"}, -- GBU-27
				{ CLSID = "{GBU-31}"},
				{ CLSID = "{GBU-38}"},
				{ CLSID = "{CAE48299-A294-4bad-8EE6-89EFC5DCDF00}"}, -- SU-25
				{ CLSID = "{CBU-87}"},
				{ CLSID = "{5335D97A-35A5-4643-9D9B-026C75961E52}"}, -- CBU-97
				{ CLSID = "{CBU_103}"},			
				{ CLSID = "{CBU_105}"},
            }
		),
		------------
        pylon(9, 0, 1.9000, -1.10000, -1.75,
            {
				use_full_connector_position=true,
            },
            {
                { CLSID = "{02CAFD34-010A-4874-8506-4A7C89210353}" },
                { CLSID = "{446E122B-8E9D-457e-AE8E-7AE88E3E566B}" },
                { CLSID = "{8D399DDA-FF81-4F14-904D-099B34FE7918}" },
				{ CLSID = "{BCE4E030-38E9-423E-98ED-24BE3DA87C32}" }, -- "Mk-82"
				{ CLSID = "{AB8B8299-F1CC-4359-89B5-2172E0CF4A5A}" }, -- "Mk-84"
				{ CLSID = "{Mk82AIR}" },
				{ CLSID = "{51F9AAE5-964F-4D21-83FB-502E3BFE5F8A}"}, -- GBU-10
				{ CLSID = "{DB769D48-67D7-42ED-A2BE-108D566C8B1E}"}, -- GBU-12
				{ CLSID = "{EF0A9419-01D6-473B-99A3-BEBDB923B14D}"}, -- GBU-27
				{ CLSID = "{GBU-31}"},
				{ CLSID = "{GBU-38}"},
				{ CLSID = "{CAE48299-A294-4bad-8EE6-89EFC5DCDF00}"}, -- SU-25
				{ CLSID = "{CBU-87}"},
				{ CLSID = "{5335D97A-35A5-4643-9D9B-026C75961E52}"}, -- CBU-97
				{ CLSID = "{CBU_103}"},			
				{ CLSID = "{CBU_105}"},
            }
        ),
        pylon(10, 0, 0.184000, -1.030000, 0.000000,
            {
				use_full_connector_position=true,
            },
            {
                { CLSID = "{E1F29B21-F291-4589-9FD8-3272EEC69506}" },
				{ CLSID = "{Mk82AIR}" },
				{ CLSID = "{51F9AAE5-964F-4D21-83FB-502E3BFE5F8A}"}, -- GBU-10
				{ CLSID = "{DB769D48-67D7-42ED-A2BE-108D566C8B1E}"}, -- GBU-12
				{ CLSID = "{EF0A9419-01D6-473B-99A3-BEBDB923B14D}"}, -- GBU-27
				{ CLSID = "{GBU-31}"},
				{ CLSID = "{GBU-38}"},
				{ CLSID = "{CAE48299-A294-4bad-8EE6-89EFC5DCDF00}"}, -- SU-25
				{ CLSID = "{CBU-87}"},
				{ CLSID = "{5335D97A-35A5-4643-9D9B-026C75961E52}"}, -- CBU-97
				{ CLSID = "{CBU_103}"},			
				{ CLSID = "{CBU_105}"},
            }
        ),
        pylon(11, 0 , -3.20000, -0.880000, 1.75,
            {
				-- FiZ = -4.0,
				use_full_connector_position=true,
            },
            {
                { CLSID = "{33556742-C0F5-4643-BD8F-530B4DEC719B}" },
                { CLSID = "{DA8F810A-EA40-4091-8127-CC2E026041E7}" },
                { CLSID = "{8D399DDA-FF81-4F14-904D-099B34FE7918}" },
				{ CLSID = "{BCE4E030-38E9-423E-98ED-24BE3DA87C32}" }, -- "Mk-82"
				{ CLSID = "{AB8B8299-F1CC-4359-89B5-2172E0CF4A5A}" }, -- "Mk-84"
				{ CLSID = "{Mk82AIR}" },
				{ CLSID = "{51F9AAE5-964F-4D21-83FB-502E3BFE5F8A}"}, -- GBU-10
				{ CLSID = "{DB769D48-67D7-42ED-A2BE-108D566C8B1E}"}, -- GBU-12
				{ CLSID = "{EF0A9419-01D6-473B-99A3-BEBDB923B14D}"}, -- GBU-27
				{ CLSID = "{GBU-31}"},
				{ CLSID = "{GBU-38}"},
				{ CLSID = "{CAE48299-A294-4bad-8EE6-89EFC5DCDF00}"}, -- SU-25
				{ CLSID = "{CBU-87}"},
				{ CLSID = "{5335D97A-35A5-4643-9D9B-026C75961E52}"}, -- CBU-97
				{ CLSID = "{CBU_103}"},			
				{ CLSID = "{CBU_105}"},
            }
        ),
		---------
		pylon(12, 0, -0.6, -1.10000, 1.75,
            {
				use_full_connector_position=true,
			},
            {
				{ CLSID = "{BCE4E030-38E9-423E-98ED-24BE3DA87C32}" }, -- "Mk-82"
				{ CLSID = "{AB8B8299-F1CC-4359-89B5-2172E0CF4A5A}" }, -- "Mk-84"
				{ CLSID = "{Mk82AIR}" },
				{ CLSID = "{51F9AAE5-964F-4D21-83FB-502E3BFE5F8A}"}, -- GBU-10
				{ CLSID = "{DB769D48-67D7-42ED-A2BE-108D566C8B1E}"}, -- GBU-12
				{ CLSID = "{EF0A9419-01D6-473B-99A3-BEBDB923B14D}"}, -- GBU-27
				{ CLSID = "{GBU-31}"},
				{ CLSID = "{GBU-38}"},
				{ CLSID = "{CAE48299-A294-4bad-8EE6-89EFC5DCDF00}"}, -- SU-25
				{ CLSID = "{CBU-87}"},
				{ CLSID = "{5335D97A-35A5-4643-9D9B-026C75961E52}"}, -- CBU-97
				{ CLSID = "{CBU_103}"},			
				{ CLSID = "{CBU_105}"},
            }
		),
		---------
        pylon(13, 0, 1.9000, -1.10000, 1.75,
            {
				use_full_connector_position=true,
            },
            {
                { CLSID = "{33556742-C0F5-4643-BD8F-530B4DEC719B}" },
                { CLSID = "{DA8F810A-EA40-4091-8127-CC2E026041E7}" },
                { CLSID = "{8D399DDA-FF81-4F14-904D-099B34FE7918}" },
				{ CLSID = "{BCE4E030-38E9-423E-98ED-24BE3DA87C32}" }, -- "Mk-82"
				{ CLSID = "{AB8B8299-F1CC-4359-89B5-2172E0CF4A5A}" }, -- "Mk-84"
				{ CLSID = "{Mk82AIR}" },
				{ CLSID = "{51F9AAE5-964F-4D21-83FB-502E3BFE5F8A}"}, -- GBU-10
				{ CLSID = "{DB769D48-67D7-42ED-A2BE-108D566C8B1E}"}, -- GBU-12
				{ CLSID = "{EF0A9419-01D6-473B-99A3-BEBDB923B14D}"}, -- GBU-27
				{ CLSID = "{GBU-31}"},
				{ CLSID = "{GBU-38}"},
				{ CLSID = "{CAE48299-A294-4bad-8EE6-89EFC5DCDF00}"}, -- SU-25
				{ CLSID = "{CBU-87}"},
				{ CLSID = "{5335D97A-35A5-4643-9D9B-026C75961E52}"}, -- CBU-97
				{ CLSID = "{CBU_103}"},			
				{ CLSID = "{CBU_105}"},
            }
        ),
		
		------------ 
		pylon(14, 0, -3.55, -0.6000, 2.1,
            {
				use_full_connector_position=true,
			},
            {
                { CLSID = "{BCE4E030-38E9-423E-98ED-24BE3DA87C32}" }, -- "Mk-82"
				{ CLSID = "{AB8B8299-F1CC-4359-89B5-2172E0CF4A5A}" }, -- "Mk-84"
				{ CLSID = "{Mk82AIR}" },
				{ CLSID = "{51F9AAE5-964F-4D21-83FB-502E3BFE5F8A}"}, -- GBU-10
				{ CLSID = "{DB769D48-67D7-42ED-A2BE-108D566C8B1E}"}, -- GBU-12
				{ CLSID = "{EF0A9419-01D6-473B-99A3-BEBDB923B14D}"}, -- GBU-27
				{ CLSID = "{GBU-31}"},
				{ CLSID = "{GBU-38}"},
				{ CLSID = "{CAE48299-A294-4bad-8EE6-89EFC5DCDF00}"}, -- SU-25
				{ CLSID = "{CBU-87}"},
				{ CLSID = "{5335D97A-35A5-4643-9D9B-026C75961E52}"}, -- CBU-97
				{ CLSID = "{CBU_103}"},			
				{ CLSID = "{CBU_105}"},
            }
		),
		pylon(15, 0,  -1.155000, -0.753000, 2.1,
            {
				use_full_connector_position=true,
			},
            {
                { CLSID = "{BCE4E030-38E9-423E-98ED-24BE3DA87C32}" }, -- "Mk-82"
				{ CLSID = "{AB8B8299-F1CC-4359-89B5-2172E0CF4A5A}" }, -- "Mk-84"
				{ CLSID = "{Mk82AIR}" },
				{ CLSID = "{51F9AAE5-964F-4D21-83FB-502E3BFE5F8A}"}, -- GBU-10
				{ CLSID = "{DB769D48-67D7-42ED-A2BE-108D566C8B1E}"}, -- GBU-12
				{ CLSID = "{EF0A9419-01D6-473B-99A3-BEBDB923B14D}"}, -- GBU-27
				{ CLSID = "{GBU-31}"},
				{ CLSID = "{GBU-38}"},
				{ CLSID = "{CAE48299-A294-4bad-8EE6-89EFC5DCDF00}"}, -- SU-25
				{ CLSID = "{CBU-87}"},
				{ CLSID = "{5335D97A-35A5-4643-9D9B-026C75961E52}"}, -- CBU-97
				{ CLSID = "{CBU_103}"},			
				{ CLSID = "{CBU_105}"},
            }
		),
		pylon(16, 0, 1.40, -0.77, 2.15,
            {
				use_full_connector_position=true,
			},
            {
				{ CLSID = "{BCE4E030-38E9-423E-98ED-24BE3DA87C32}" }, -- "Mk-82"
				{ CLSID = "{AB8B8299-F1CC-4359-89B5-2172E0CF4A5A}" }, -- "Mk-84"
				{ CLSID = "{Mk82AIR}" },
				{ CLSID = "{51F9AAE5-964F-4D21-83FB-502E3BFE5F8A}"}, -- GBU-10
				{ CLSID = "{DB769D48-67D7-42ED-A2BE-108D566C8B1E}"}, -- GBU-12
				{ CLSID = "{EF0A9419-01D6-473B-99A3-BEBDB923B14D}"}, -- GBU-27
				{ CLSID = "{GBU-31}"},
				{ CLSID = "{GBU-38}"},
				{ CLSID = "{CAE48299-A294-4bad-8EE6-89EFC5DCDF00}"}, -- SU-25
				{ CLSID = "{CBU-87}"},
				{ CLSID = "{5335D97A-35A5-4643-9D9B-026C75961E52}"}, -- CBU-97
				{ CLSID = "{CBU_103}"},			
				{ CLSID = "{CBU_105}"},
            }
		),
		------------
		
        pylon(17, 0, 0.660000, -0.078000, 2.563000,
            {
				use_full_connector_position=true,
            },
            {
                { CLSID = "{C8E06185-7CD6-4C90-959F-044679E90751}" }, -- 	AIM-120B
				{ CLSID = "{40EF17B7-F508-45de-8566-6FFECC0C1AB8}" }, --    AIM-120C
				{ CLSID = "{6CEB49FC-DED8-4DED-B053-E1F033FF72D3}" }, --    AIM-9M 
            }
        ),
        pylon(18, 0, -0.155000, -0.343000, 2.944000,
            {
				use_full_connector_position=true,
            },
            {
			    { CLSID = "{E1F29B21-F291-4589-9FD8-3272EEC69506}" },
				{ CLSID = "{BCE4E030-38E9-423E-98ED-24BE3DA87C32}" }, -- "Mk-82"
				{ CLSID = "{AB8B8299-F1CC-4359-89B5-2172E0CF4A5A}" }, -- "Mk-84"
				{ CLSID = "{Mk82AIR}" },
				{ CLSID = "{51F9AAE5-964F-4D21-83FB-502E3BFE5F8A}"}, -- GBU-10
				{ CLSID = "{DB769D48-67D7-42ED-A2BE-108D566C8B1E}"}, -- GBU-12
				{ CLSID = "{EF0A9419-01D6-473B-99A3-BEBDB923B14D}"}, -- GBU-27
				{ CLSID = "{GBU-31}"},
				{ CLSID = "{GBU-38}"},
				{ CLSID = "{CAE48299-A294-4bad-8EE6-89EFC5DCDF00}"}, -- SU-25
				{ CLSID = "{CBU-87}"},
				{ CLSID = "{5335D97A-35A5-4643-9D9B-026C75961E52}"}, -- CBU-97
				{ CLSID = "{CBU_103}"},			
				{ CLSID = "{CBU_105}"},
				{ CLSID = "{444BA8AE-82A7-4345-842E-76154EFCCA46}"}, -- AGM-65D LAU-117
				{ CLSID = "{F16A4DE0-116C-4A71-97F0-2CF85B0313EC}"}, -- AGM-65E LAU-117
				{ CLSID = "LAU_117_AGM_65H"},
				{ CLSID = "{69DC8AE7-8F77-427B-B8AA-B19D3F478B66}"}, -- AGM-65K LAU-117
				{ CLSID = "{9BCC2A2B-5708-4860-B1F1-053A18442067}"}, -- AGM-154
				
            }
        ),
        pylon(19, 0, 0.660000, -0.078000, 3.325000,
            {
				use_full_connector_position=true,
            },
            {
                { CLSID = "{C8E06185-7CD6-4C90-959F-044679E90751}" }, -- 	AIM-120B
				{ CLSID = "{40EF17B7-F508-45de-8566-6FFECC0C1AB8}" }, --    AIM-120C
				{ CLSID = "{6CEB49FC-DED8-4DED-B053-E1F033FF72D3}" }, --    AIM-9M 
            }
        ),
    },
	
	-- 任务DCS\Scripts\Database\db_units_planes.lua定义的Task
	-- 如果不设置Tasks项，则会加入默认的aircraft_task(Reconnaissance)
	Tasks = {
        aircraft_task(GroundAttack),
        aircraft_task(RunwayAttack),
        aircraft_task(PinpointStrike),
        aircraft_task(CAS),
        aircraft_task(AFAC),
		aircraft_task(CAP),
        aircraft_task(Escort),
        aircraft_task(FighterSweep),
        aircraft_task(Intercept),
    },	
	DefaultTask = aircraft_task(CAP),
	
	-- 基础气动数据
	SFM_Data = {
		aerodynamics = {-- 空气动力学 Cx = Cx_0 + Cy^2*B2 +Cy^4*B4
			Cy0			=	0,      -- 0攻角升力系数  zero AoA lift coefficient
			Mzalfa		=	4.355,  -- coefficients for pitch agility
			Mzalfadt	=	0.8,    -- coefficients for pitch agility
			kjx			=	2.3,    -- 滚转惯性
			kjz			=	0.0011, -- 俯仰惯性
			Czbe		=	-0.014, -- coefficient, along Z axis (perpendicular), affects yaw, negative value means force orientation in FC coordinate system
			cx_gear		=	0.3,    -- 起落架X方向阻力系数 coefficient, drag, gear
			cx_flap		=	0.08,   -- 襟翼X方向阻力系数 coefficient, drag, full flaps
			cy_flap		=	0.4,    -- 襟翼Y方向阻力系数 coefficient, normal force, lift, flaps
			cx_brk		=	0.08,   -- 减速板X方向阻力系数 coefficient, drag, breaks
			table_data  = 
			{	--      M		Cx0		 	Cya			B		 	B4	    	Omxmax		Aldop		Cymax
				[1] = 	{0,	0.024,	0.07,	0.075,	0.12,	0.5,											30					,	1.2},
				[2] = 	{0.2,	0.024,	0.07,	0.075,	0.12,	1.5,										30					,	1.2},
				[3] = 	{0.4,	0.024,	0.07,	0.075,	0.12,	2.5,										30					,	1.2},
				[4] = 	{0.6,	0.0239,	0.073,	0.075,	0.12,	3.5,										30					,	1.2},
				[5] = 	{0.7,	0.024,	0.076,	0.075,	0.12,	3.5,										28.666666666667		,	1.18},
				[6] = 	{0.8,	0.0235,	0.079,	0.075,	0.12,	3.5,										27.333333333333		,	1.16},
				[7] = 	{0.9,	0.025,	0.083,	0.075,	0.125,	3.5,										26					,	1.14},
				[8] = 	{1	,	0.044,	0.085,	0.14,	0.1,	3.5,										24.666666666667		,	1.12},
				[9] = 	{1.05,	0.0465,	0.0855,	0.1775,	0.125,	3.5,										24					,	1.11},
				[10] = 	{1.1,	0.049,	0.086,	0.215,	0.15,	3.15,										18			,	1.1},
				[11] = 	{1.2,	0.049,	0.083,	0.228,	0.17,	2.45,										17,	1.05},
				[12] = 	{1.3,	0.049,	0.077,	0.237,	0.2,	1.75,										16,	1},
				[13] = 	{1.5,	0.0475,	0.062,	0.251,	0.2,	1.5,										13,	0.9},
				[14] = 	{1.7,	0.045166666666667,	0.051333333333333,	0.24366666666667,	0.32,	0.9,	12,	0.7},
				[15] = 	{1.8,	0.044,	0.046,	0.24,	0.38,	0.86,										11.4,	0.64},
				[16] = 	{2,	0.043,	0.039,	0.222,	2.5,	0.78,											10.2,	0.52},
				[17] = 	{2.2,	0.041,	0.034,	0.227,	3.2,	0.7,										9,	0.4},
				[18] = 	{2.5,	0.04,	0.033,	0.25,	4.5,	0.7,										9,	0.4},
				[19] = 	{3.9,	0.035,	0.033,	0.35,	6,		0.7,										9,	0.4},
			},
			-- M 马赫数
			-- Cx0 - Coefficient, drag, profile, of the airplane
			-- Cya - Normal force coefficient of the wing and body of the aircraft in the normal direction to that of flight. Inversely proportional to the available G-loading at any Mach value. (lower the Cya value, higher G available) per 1 degree AOA
			-- B - Polar quad coeff
			-- B4 - Polar 4th power coeff
			-- Omxmax - 滚转率 roll rate, rad/s
			-- Aldop - Alfadop Max AOA at current M - departure threshold
			-- Cymax - Coefficient, lift, maximum possible (ignores other calculations if current Cy > Cymax)
		},
		
		--引擎
		engine = {
			Nmg	=	62, -- 怠速转速 RPM at idle
			MinRUD	=	0, -- 最低油门值 Min state of the throttle
			MaxRUD	=	1, -- 最大油门值 Max state of the throttle
			MaksRUD	=	0.85, -- 军推油门值 Military power state of the throttle
			ForsRUD	=	0.91, -- 加力油门值 Afterburner state of the throttle
			
			--[[
				E_TURBOJET = 0 喷气引擎
				E_TURBOJET_AB = 1 喷气引擎带加力
				E_PISTON = 2 活塞
				E_TURBOPROP = 3 涡轮螺旋桨
				E_TURBOFAN = 4 涡扇
				E_TURBOSHAFT = 5 涡轮轴发动机
			--]]
			typeng	=	1, --引擎类型 喷气引擎带加力
			
			hMaxEng	=	19, -- 引擎工作高度最大值 Max altitude for safe engine operation in km
			dcx_eng	=	0.0124, --发动机阻力系数，影响关机效率 Engine drag coeficient
            -- cemax/cefor affect sponginess of elevator/inertia at slow speed
            -- affects available g load apparently
			cemax	=	1.24, -- not used for fuel calulation , only for AI routines to check flight time ( fuel calculation algorithm is built in )
			cefor	=	2.56, -- not used for fuel calulation , only for AI routines to check flight time ( fuel calculation algorithm is built in )
			dpdh_m	=	2000, --  最大油门的高度系数 altitude coefficient for max thrust
			dpdh_f	=	4200,  -- 加力后的高度系数 altitude coefficient for AB thrust
			table_data = 
			{		--   M		Pmax		 Pfor	
				[1] = 	{0,	88000,	141000},
				[2] = 	{0.2,	80000,	143000},
				[3] = 	{0.4,	79000,	150000},
				[4] = 	{0.6,	82000,	165000},
				[5] = 	{0.7,	90000,	177000},
				[6] = 	{0.8,	94000,	193000},
				[7] = 	{0.9,	96000,	200000},
				[8] = 	{1,	100000,	205000},
				[9] = 	{1.1,	100000,	214000},
				[10] = 	{1.2,	98000,	222000},
				[11] = 	{1.3,	100000,	235000},
				[12] = 	{1.5,	98000,	258000},
				[13] = 	{1.8,	94000,	276000},
				[14] = 	{2,	88000,	283000},
				[15] = 	{2.2,	82000,	285000},
				[16] = 	{2.5,	80000,	287000},
				[17] = 	{3.9,	50000,	200000},
			},
			-- M 马赫数
			-- Pmax - 军推推力 newton
			-- Pfor - 加力推力 newton
		}
	},
	--损伤 
	--[IDx] = {...}  在DCS\Scripts\Aircrafts\_Common\Damage.lua中定义的损伤枚举
	--可使用verbose_to_dmg_properties()以字符串形式替换IDx的数字编号
	--critical_damage
	--args edm模型的动画编号
	--deps_cell 该部件损伤后，被关联的部件也会出现相同等级(损伤动画值)的损伤 {损伤编号,损伤编号}
	--			比如襟翼根部受损会连带翼尖、副翼的损伤
	Damage = {
		[0]		= {critical_damage = 5, args = {146}},
		[3]		= {critical_damage = 20,args = {65}}  ,
		[4]		= {critical_damage = 20, args = {150}},
		[5]		= {critical_damage = 20, args = {147}},
		[7]		= {critical_damage = 4, args = {249}} ,
		[9]		= {critical_damage = 3, args = {154}},
		[10]	= {critical_damage = 3, args = {153}},
		[11]	= {critical_damage = 3, args = {167}},
		[12]	= {critical_damage = 3, args = {161}},
		[15]	= {critical_damage = 5, args = {267}},
		[16]	= {critical_damage = 5, args = {266}},
		[23]	= {critical_damage = 8, args = {223}, deps_cells = {25}},
		[24]	= {critical_damage = 8, args = {213}, deps_cells = {26, 60}},
		[25]	= {critical_damage = 3, args = {226}},
		[26]	= {critical_damage = 3, args = {216}},
		[29]	= {critical_damage = 9, args = {224}, deps_cells = {31, 25, 23}},
		[30]	= {critical_damage = 9, args = {214}, deps_cells = {32, 26, 24, 60}},
		[31]	= {critical_damage = 4, args = {229}},
		[32]	= {critical_damage = 4, args = {219}},
		[35]	= {critical_damage = 10, args = {225}, deps_cells = {29, 31, 25, 23}},
		[36]	= {critical_damage = 10, args = {215}, deps_cells = {30, 32, 26, 24, 60}} ,
		[37]	= {critical_damage = 4, args = {227}},
		[38]	= {critical_damage = 4, args = {217}},
		[39]	= {critical_damage = 7,	args = {244}, deps_cells = {53}},
		[40]	= {critical_damage = 7, args = {241}, deps_cells = {54}},
		[45]	= {critical_damage = 9, args = {235}, deps_cells = {39, 51, 53}},
		[46]	= {critical_damage = 9, args = {233}, deps_cells = {40, 52, 54}},
		[51]	= {critical_damage = 3, args = {239}},
		[52]	= {critical_damage = 3, args = {237}},
		[53]	= {critical_damage = 3, args = {248}},
		[54]	= {critical_damage = 3, args = {247}},
		[55]	= {critical_damage = 20, args = {81}, deps_cells = {39, 40, 45, 46, 51, 52, 53, 54}},
		[59]	= {critical_damage = 5, args = {148}},
		[60]	= {critical_damage = 1, args = {144}},
		[83]	= {critical_damage = 3, args = {134}} ,-- nose wheel
		[84]	= {critical_damage = 3, args = {136}}, -- left wheel
		[85]	= {critical_damage = 3, args = {135}} ,-- right wheel
	},
	
	-- 使用verbose_to_dmg_properties来替换IDx编号
	-- planes_dmg_properties[Tu_22M3]  = verbose_to_dmg_properties({
	-- ...
	-- ["NOSE_CENTER"] 		= {critical_damage = 5 ,args =  {146}},
	-- ["COCKPIT"]				= {critical_damage = 10,args =  { 65}},
	-- ["NOSE_RIGHT_SIDE"]		= {critical_damage = 5 ,args =  {147}},
	-- ["NOSE_LEFT_SIDE"] 		= {critical_damage = 5 ,args =  {150}},
	-- ["WING_L_OUT"]			= {critical_damage = 3, args =  {223},deps_cells = {"WING_L_PART_CENTER","FLAP_L_OUT","FLAP_L_IN","FLAP_L_CENTER"}},
	-- ["WING_R_OUT"]      	= {critical_damage = 3, args =  {213},deps_cells = {"WING_R_PART_CENTER","FLAP_R_OUT","FLAP_R_IN","FLAP_R_CENTER"}},
	-- ...})
	
	-- 必须创建损伤组件
	DamageParts = {  
		-- [1000 + 0]  = "M2KC-fragment-nose",
		-- [1000 + 1]  = "M2KC-fragment-nose-1",
		-- [1000 + 35] = "M-2000c-oblomok-wing-L",
		-- [1000 + 29] = "M-2000c-oblomok-wing-L",
		-- [1000 + 23] = "M-2000c-oblomok-wing-L",
		-- [1000 + 35] = "M-2000c-oblomok-wing-R",
		-- [1000 + 29] = "M-2000c-oblomok-wing-R",
		-- [1000 + 23] = "M-2000c-oblomok-wing-R",
		-- [1000 + 47] = "M2KC-fragment-stabilizador-L",
		-- [1000 + 48] = "M2KC-fragment-stabilizador-R",
		-- [1000 + 55] = "M2KC-fragment-tail",
		-- [1000 + 41] = "M2KC-fragment-fin-center",
		-- [1000 + 5]  = "M2KC-fragment-canopy",
		-- [1000 + 3]  = "M2KC-fragment-canopy-back",
	},
	
	-- 故障
	Failures = {
	-- {
		-- id 故障ID/名
		-- label 故障菜单中的显示文字
		-- enable 生效状态 默认为false
		-- hh 在X小时后 默认0
		-- mm 在X分钟后 默认0
		-- mmint 在几分钟内 默认1
		-- prob 发生概率 默认100
	-- }
	--{ id = 'l_engine', label = _('L-ENGINE'), enable = false, hh = 0, mm = 0, mmint = 1, prob = 100 },
	},
	
	lights_data = {
	typename = "collection",
	-- 参考DCS\Scripts\Aircrafts\_Common\Lights.lua
	lights = {
		[1] = { 
			typename = "collection",
			lights = {
				-- Left Anticollision Light
				-- typename 灯光的类型 {strobelight}
				-- connector 模型connector名
				-- color 颜色 {R,G,B} 0.0(0) - 1.0(255)
				-- argument
				-- period
				-- phase_shift
				{typename = "natostrobelight", connector = "WHITE_BEACON L", argument_1 = 195, period = 1.2, phase_shift = 0 },
				-- Right Anticollision Light
				{typename = "natostrobelight", connector = "WHITE_BEACON R", argument_1 = 196, period = 1.2, phase_shift = 0 },
				-- Tail Anticollision Light
				{typename = "natostrobelight", connector = "BANO_0_BACK", argument_1 = 192, period = 1.2, phase_shift = 0 }
			}
		},
		[2] = { 
			typename = "collection",
			lights = {
				-- Landing light
				{typename = "spotlight", connector = "MAIN_SPOT_PTR_02", argument = 209, dir_correction = {elevation = math.rad(-1)}},
				-- Landing/Taxi light
				{typename = "spotlight", connector = "MAIN_SPOT_PTR_01", argument = 208, dir_correction = {elevation = math.rad(3)}}
			}
		},
		[3]	= {
			typename = "collection",
			lights = {
				-- Left Position Light (red)
				{typename = "omnilight", connector = "BANO_1", color = {0.99, 0.11, 0.3}, pos_correction  = {0, 0, -0.2}, argument = 190},
				-- Right Position Light (green)
				{typename = "omnilight",connector = "BANO_2", color = {0, 0.894, 0.6}, pos_correction = {0, 0, 0.2}, argument  = 191},
				-- Tail Position Light (white)
				{typename = "omnilight", connector = "BANO_0_BACK", color = {1, 1, 1}, pos_correction  = {0, 0, 0}, argument  = 203 }
			}
		},
		[4] = {
			typename = "collection",
			lights = {
				{
					typename = "collection",
					lights = {
						-- Top Formation Light (white)
						{typename = "omnilight",connector = "BANO_0_TOP", color = {1, 1, 1}, },
						{typename  = "argumentlight", argument = 202},
						-- Bottom Formation Light (white)
						{typename = "omnilight", connector = "BANO_0_BOTTOM", color = {1, 1, 1},},
						{typename  = "argumentlight", argument = 201},
					}
				},
				-- Tail formation lights
				{
					typename = "collection",
					lights = {
						-- Right Tail Formation Light
						{			
							typename = "spotlight",
							connector = "BANO_W_HR",
							color = {1.0, 1.0, 1.0},
							intensity_max = 6,
							angle_max = 0.65,
							argument = 205,
							dont_change_color = false,
							angle_change_rate = 0,
							pos_correction = {0.0, 0.0, 0.1},
							dir_correction = {azimuth = math.rad(-3), elevation = math.rad(9)},
						},
						-- Left Tail Formation Light
						{
							typename = "spotlight",
							connector = "BANO_W_HL",
							color = {1.0, 1.0, 1.0},
							intensity_max = 6,
							angle_max = 0.65,
							argument = 204,
							dont_change_color = false,
							angle_change_rate = 0,
							pos_correction = {0.0, 0.0, -0.1},
							dir_correction = {azimuth = math.rad(-3), elevation = math.rad(-9)},
						}
					},
				},
				-- Electroluminescent formation lights
				{typename  = "argumentlight", argument = 200},
		}
	},
	[5]	= {typename = "collection",
			lights = {
			{
				typename = "collection",
				lights = {
					{
						-- Right Nacelle Floodlight
						typename = "spotlight",
						position  = {0.5, 1.2, 0},
						color = {1.0, 1.0, 1.0},
						intensity_max = 6.0,
						angle_max = 0.45,
						direction = {azimuth = math.rad(150), elevation = math.rad(5)},
						dont_change_color = false,
						angle_change_rate = 0
					},
					{
						-- Left Nacelle Floodlight
						typename = "spotlight",
						position  = {0.5, 1.2, 0},
						color = {1.0, 1.0, 1.0},
						intensity_max = 6.0,
						angle_max = 0.45,
						direction = {azimuth = math.rad(-150), elevation = math.rad(5)},
						dont_change_color = false,
						angle_change_rate = 0
					},
					{typename  = "argumentlight", argument = 212},
				},
			},
			{
				typename = "collection",
				lights = {
					{
						-- Left Nose Floodlight
						typename  = "spotlight",
						position  = {0, -0.3, -5.80},
						color = {1.0, 1.0, 1.0},
						intensity_max = 6.0, 
						angle_max = 0.45,
						direction = {azimuth = math.rad(45)},
						argument = 211,
						dont_change_color = false,
						angle_change_rate = 0
					},
					{
						-- Right Nose Floodlight
						typename = "spotlight",
						position  = {0, -0.3, 5.80},
						color = {1.0, 1.0, 1.0},
						intensity_max = 6.0,
						angle_max = 0.45,
						direction = {azimuth = math.rad(-45)},
						argument = 210,
						dont_change_color = false,
						angle_change_rate = 0
					}
				}
			},
			-- UARRSI light
			{
				typename = "omnilight", position  = {6.5, 0.4, 0}, color = {1, 1, 1}
			}
			},
		}
	}
	},
}

add_aircraft(NewAir)
plugin_done()
```

