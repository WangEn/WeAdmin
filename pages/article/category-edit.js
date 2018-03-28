layui.extend({
	admin: '{/}../../static/js/admin'
});
layui.use(['admin', 'jquery', 'element', 'upload', 'form', 'layer', 'layedit'], function() {

	var admin = layui.admin,
		$ = layui.jquery,
		element = layui.element,
		upload = layui.upload,
		form = layui.form,
		layer = layui.layer,
		layedit = layui.layedit;
	//图片上传
	//上传缩略图，设定文件大小限制
	upload.render({
		elem: '#topicImg',
		url: '/upload/',
		size: 500 //限制文件大小，单位 KB
			,
		done: function(res) {
			console.log(res)
		}
	});
	//选择文件，栏目模板
	upload.render({
		elem: '#topicModelBtn',
		url: '/upload/',
		auto: false,
		accept: 'file'
			//,multiple: true
			,
		bindAction: '#editTopic',
		choose: function(res) {
			//var files = res.pushFile();
			//预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
			res.preview(function(index, file, result) {
				//console.log(index); //得到文件索引
				//console.log(file); //得到文件对象
				//console.log(result); //得到文件base64编码，比如图片
				$('input[name=topicModel]').val(file.name);
				//console.log($('input[name=topicModel]').val())

			});
		}
	});

	layedit.build('topicBody'); //建立编辑器

	//监听提交
	form.on('submit(add)', function(data) {
		console.log(data.field);
		//发异步，把数据提交给php
		layer.alert("增加成功", {
			icon: 6
		}, function() {
			// 获得frame索引
			var index = parent.layer.getFrameIndex(window.name);
			//关闭当前frame
			parent.layer.close(index);
		});
		return false;
	});

	//遍历select option
	$(document).ready(function() {
		$("#pid-select option").each(function(text) {

			var level = $(this).attr('data-level');
			var text = $(this).text();
			//console.log(text);
			if(level > 0) {
				text = "├　" + text;
				for(var i = 0; i < level; i++) {
					text = "　　" + text;　 //js中连续显示多个空格，需要使用全角的空格
					//console.log(i+"text:"+text);
				}
			}
			$(this).text(text);

		});

		form.render('select'); //刷新select选择框渲染
	});

});