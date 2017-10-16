define(['require'], function(require) {


	return {
		init: function($mod) {
			var obj = this;
			setTimeout(function() {
				require(['https://res.wx.qq.com/open/js/jweixin-1.2.0.js'], function(wx) {
					obj.config(wx);
				})
			}, 3000);
			$.getJSON('/_tool/getwxconfig?url=' + encodeURIComponent(location.href) + '&callback=?', function(r) {
				obj.wxconfig = r;
				//alert(JSON.stringify(r))
			})

		},
		config: function(wx) {

			wx.config({
				debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: this.wxconfig.appId, // 必填，公众号的唯一标识
				timestamp: this.wxconfig.timestamp, // 必填，生成签名的时间戳
				nonceStr: this.wxconfig.noncestr, // 必填，生成签名的随机串
				signature: this.wxconfig.signature, // 必填，签名，见附录1
				jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			wx.onMenuShareTimeline({
				title: document.title, // 分享标题
				link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: 'http://i.oxm1.cc/uploads/git/wurui/img/2aj4imvjbTj07ueq6hR73q7A64nz-690.png', // 分享图标
				success: function() {
					// 用户确认分享后执行的回调函数
				},
				cancel: function() {
					// 用户取消分享后执行的回调函数
				}
			});
			wx.onMenuShareAppMessage({
				title: document.title, // 分享标题
				desc: '这是描述，分享描述～～', // 分享描述
				link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: 'http://i.oxm1.cc/uploads/git/wurui/img/2aj4imvjbTj07ueq6hR73q7A64nz-690.png', // 分享图标
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