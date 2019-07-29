const fs = require('fs');
const path = require('path');
const walk = require('walk');

var menuCategory = function(showText){
    return [
        '* ',
        '**'+ showText +'**',
        '\n'
    ].join('');
}

var menuLink = function(level,showText,link){
    var tab = '';
    for(var i = 0; i < level; i++){
        tab +='  ';
    }
    return [
        tab,
        '* ',
        '['+ showText +']',
        '('+ link +')',
        '\n'
    ].join('');
}

var menuHome = function(){return menuLink(0,'关于shinedoclib','/');}

var menuTitle = function(s){
    return s.replace(/\_/g,' ');
}

var _sidebar = menuHome();
var walker = walk.walk(__dirname + '/doc');

// 按目录遍历md文件
walker.on('files', function(roots, stat, next) {
    // 生成分类
	var categoryName = path.basename(roots);
	// 跳过这些文件夹
	var skinFolder = [
		"assets",
		"attachment",
	];
	if(skinFolder.indexOf(categoryName) == -1){
		var category = menuTitle(categoryName);
		_sidebar += menuCategory(category)
	}
    // 生成菜单项
    for(var file of stat) {
        if(path.extname(file.name) == '.md'){
            var mk_text = menuTitle(path.parse(file.name).name);
            var mk_link = path.relative(__dirname,roots).replace(path.sep,'/')+'/'+file.name;
            _sidebar += menuLink(1,mk_text,mk_link);
        }
    }
    next();
});  

// 遍历完成后写到_sidebar.md
walker.on('end', function() {

    fs.writeFile(__dirname + '/_sidebar.md',_sidebar,function(error){
        if(error){
          console.log('写入失败');
          return
        }
        console.log('写入成功');
    })
    // console.log(menuHome());
    // console.log(_sidebar);
});  
