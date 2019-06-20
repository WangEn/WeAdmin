/**
 * 废弃，仅供参考代码，可直接删除！！
 * 扩展一个Menu模块，dev中间版本
 * 通过插入的方式，直接一级级完全拼接进去
**/

layui.define(['jquery'], function(exports) { //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
	var $ = layui.jquery;
	var obj = {
		getMenu: function(curl) {
			if(!$('#side-nav').length){
				return;
			}
			$.getJSON(curl, function(res) {
				var menuList = res.data;
				var items = [];
				var _ul = $('<ul></ul>').addClass('nav').attr('id', 'nav');
				$.each(menuList, function(index, val) {
					var item = '<li><a _href="' + val.url + '"><i class="iconfont">' + val.icon + '</i><cite>' + val.name +
						'</cite><i class="iconfont nav_right">&#xe697;</i></a>';
					if(val.children && val.children.length){
						//有二级子菜单
						var _subitems = [];
						var _subul = $('<ul></ul>').addClass('sub-menu');
						$.each(val.children, function(idx, submenu){
							var _subitem = '<li><a _href="'+ submenu.url +'"><i class="iconfont">&#xe6a7;</i><cite>'+ submenu.name +'</cite></a>';
							if(submenu.children && submenu.children.length){
								// 有三级子菜单
								var _seconditems = [];
								var _secondul = $('<ul></ul>').addClass('sub-menu');
								$.each(submenu.children, function(idxx, secondmenu){
									var _seconditem = '<li><a _href="'+ secondmenu.url +'"><i class="iconfont">&#xe6a7;</i><cite>'+ secondmenu.name +'</cite></a></li>';
									_seconditems.push(_seconditem);
								});
								_secondul.append(_seconditems.join(''));
								_subitem += '<ul class="sub-menu">' + $(_secondul).html() + '</ul>';
							}
							_subitem += '</li>';
							_subitems.push(_subitem);
						})
						_subul.append(_subitems.join(''));
						item += '<ul class="sub-menu">' + $(_subul).html() + '</ul>';
					}
					item += '</li>';
					items.push(item);
				});
				$('#side-nav').empty();
				_ul.append(items.join(''));
				$('#side-nav').append(_ul);
			});
		},
		/**
		 * @param {Object} id 上级子菜单id,拼接menu获取元素
		 * @param {Object} subList 子菜单列表
		 */
		getSubMenu: function(id, subList){
			var subItems = [];
			var subUl = $('<ul></ul>').addClass('sub-menu');
			$.each(subList, function(idx, sub){
				var subItem = '<li><a _href="'+ sub.url +'"><i class="iconfont">&#xe6a7;</i><cite>'+ sub.name +'</cite></a></li>';
				subItems.push(subItem);
			});
			subUl.append(subItems.join(''));
			$('#menu'+id).appendTo(subUl);
		}
	};

	//输出test接口
	exports('menu', obj);
});
