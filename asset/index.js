define(['require', 'oxjs'], function(require, OXJS) {

	var getShortcutIcon = function() {
		//document.head.getElementsByTagName('link');
		var link = document.querySelector('link[rel="Shortcut Icon"]');
		return link && link.href;
	},
	getContentImg=function(){
		var img=$('img')[0];
		if(img){
			return img.src
		}
		return getShortcutIcon();
	};

	return {
		init: function($mod) {
			var wxconfig, _this = this;
			setTimeout(function() {
				var shareData = {
					title: $mod.attr('data-title') || document.title,
					img: $mod.attr('data-img') || (OXJS.queryString('_id') ? getContentImg() : getShortcutIcon())
				};
				require(['https://res.wx.qq.com/open/js/jweixin-1.2.0.js'], function(wx) {
					_this.config(wx, wxconfig, shareData);
				})
			}, 3000);
			$.getJSON('/_tool/getwxconfig?url=' + encodeURIComponent(location.href) + '&callback=?', function(r) {
				wxconfig = r;
				//alert(JSON.stringify(r))
			})

		},
		config: function(wx, wxconfig, shareData) {
			if (!wxconfig) {
				return
			}

			wx.config({
				//debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: wxconfig.appId, // 必填，公众号的唯一标识
				timestamp: wxconfig.timestamp, // 必填，生成签名的时间戳
				nonceStr: wxconfig.noncestr, // 必填，生成签名的随机串
				signature: wxconfig.signature, // 必填，签名，见附录1
				jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			wx.onMenuShareTimeline({
				title: shareData.title, // 分享标题
				link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: shareData.img, // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
			wx.onMenuShareAppMessage({
				title: shareData.title, // 分享标题
				desc: '来自OPENXSL应用', // 分享描述
				link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: shareData.img, // 分享图标
				type: '', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});

		}
	}
})