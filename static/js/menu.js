/*
 * @Author: https://github.com/WangEn
 * @Author: https://gitee.com/lovetime/
 * @Date:   2019-06-18
 * @lastModify 2019-06-20 11:45:41
 * +----------------------------------------------------------------------
 * | Weadmin [ 后台管理模板 ]
 * | 基于Layui http://www.layui.com/
 * +----------------------------------------------------------------------
 */
/**
 * 扩展一个Menu模块，动态获取左侧菜单
 * 目前多级子菜单是通过延时循环获取的方式
 * 也可以采用点击时获取下级子菜单的方式
 * 当然，具体的情况要参照自己的需求及api返回结构
 **/

layui.define('jquery', function(exports) {
	var $ = layui.jquery;
	var menu = {
		getMenu: function(curl) {
			var that = this;
			if (!$('#side-nav').length) {
				return;
			}
			$.getJSON(curl, function(res) {
				var menuList = res.data;
				var items = [];
				var _ul = $('<ul></ul>').addClass('nav').attr('id', 'nav');
				$.each(menuList, function(index, val) {
					var item = '<li id="menu' + val.id + '"><a _href="' + val.url + '"><i class="iconfont">' + val.icon +
						'</i><cite>' + val.name +
						'</cite><i class="iconfont nav_right">&#xe697;</i></a></li>';

					items.push(item);
					if (val.children && val.children.length) {
						//有二级子菜单
						setTimeout(function() {
							that.getSubMenu(val.id, val.children);
						}, 500);
					}
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
		getSubMenu: function(id, subList) {
			var that = this;
			var subItems = [];
			var subUl = $('<ul></ul>').addClass('sub-menu');
			$.each(subList, function(idx, sub) {
				var subItem = '<li id="menu' + sub.id + '"><a _href="' + sub.url + '"><i class="iconfont">&#xe6a7;</i><cite>' +
					sub.name + '</cite></a></li>';
				subItems.push(subItem);
				if (sub.children && sub.children.length) {
					setTimeout(function() {
						that.getSubMenu(sub.id, sub.children);
					}, 1500);
				}
			});
			subUl.append(subItems.join(''));
			$('#menu' + id).append(subUl);
		}
	};

	exports('menu', menu);
});
