//import SVGA from 'svgaplayerweb';
export default {
	install(Vue, options) {
		// 时间转换为时间戳
		Vue.prototype.date2timestamp = function (datetime) {
			datetime = datetime.replace(/-/g, '/');
			let timestamp = new Date(Date.parse(datetime));
			timestamp = timestamp.getTime();
			timestamp = timestamp / 1000;
			return timestamp;
		},
			// 交互函数传参
			// par1 ios
			// par2 android
			Vue.prototype.params = function (par1, par2, functionName) {
				let ua = navigator.userAgent.toLowerCase();
				if (par1 == '') {
					if (/iphone|ipad|ipod|macintosh/i.test(ua)) {
						window.webkit.messageHandlers[functionName].postMessage(null)
					} else if (/android/i.test(ua)) {
						window.AndroidToast[functionName]("success")
					}
				} else {
					if (/iphone|ipad|ipod|macintosh/i.test(ua)) {
						window.webkit.messageHandlers[functionName].postMessage(par1)
					} else if (/android/i.test(ua)) {
						window.AndroidToast[functionName](par2)
					}
				}
			},
			//会员昵称加密
			Vue.prototype.nicknameHandle = function ($name) {
				if ($name.length <= 0) {
					$name = '***';
				} else if ($name.length == 1) {
					$name = $name;
				} else if ($name.length == 2) {
					$name = $name.substring(0, 1) + '*';
				} else if ($name.length == 3) {
					$name = $name.substring(0, 1) + '**';
				} else if ($name.length == 4) {
					$name = $name.substring(0, 1) + '*' + $name.substring($name.length - 2, $name.length);
				} else {
					$name = $name.substring(0, 1) + '**' + $name.substring($name.length - 2, $name.length);
				}
				return $name;
			},
			// 判断当前设备是否是IphoneX
			Vue.prototype.isIphoneX = function () {
				let isiOS1 = /iphone|ipad|ipod|macintosh/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375);
				let isiOS2 = /iphone|ipad|ipod|macintosh/gi.test(navigator.userAgent) && (screen.height == 896 && screen.width == 414);
				let isiOS12 = /iphone|ipad|ipod|macintosh/gi.test(navigator.userAgent) && (screen.height == 844 && screen.width == 390);
				let isPad1 = /iphone|ipad|ipod|macintosh/gi.test(navigator.userAgent) && (screen.height == 1194 && screen.width == 834);
				let isPad2 = /iphone|ipad|ipod|macintosh/gi.test(navigator.userAgent) && (screen.height == 1366 && screen.width == 1024);
				let isiOS = isiOS1 || isiOS2 || isiOS12 || isPad1 ||isPad2;
				return isiOS;
			},
			// 判断当前设备是否是IphoneX
			Vue.prototype.isAppleOS = function () {
				const u = navigator.userAgent
				let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || /iphone|ipad|ipod|macintosh/gi.test(u); //ios终端
				return isiOS;
			},
			//数字小于10补0  (6=>06)
			Vue.prototype.checkTime = function (i) {
				if (i < 10) {
					i = "0" + i
				}
				return i
			},
			Vue.prototype.openApp = function (type, code, parmSrc) {
				var u = navigator.userAgent;
				//var isWeixin = u.toLowerCase().indexOf('micromessenger') !== -1; // 微信内
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
				var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				//android端
				if (isAndroid) {
					//安卓app的scheme协议
					window.location.href = 'xblife://' + parmSrc;
					setTimeout(function () {
						let hidden = window.document.hidden || window.document.mozHidden || window.document.msHidden || window.document.webkitHidden
						if (typeof hidden == "undefined" || hidden == false) {
							if (type == 'register') {
								window.location.href = "/share?" + code;
							} else {
								window.location.href = "/load";
							}
						}
					}, 2000);
				}
				//ios端
				if (isIOS) {
					//ios的scheme协议
					window.location.href = 'ShallBuyLife123://' + parmSrc
					setTimeout(function () {
						let hidden = window.document.hidden || window.document.mozHidden || window.document.msHidden || window.document.webkitHidden
						if (typeof hidden == "undefined" || hidden == false) {
							if (type == 'register') {
								window.location.href = "/share?" + code;
							} else {
								window.location.href = "/load";
							}
						}
					}, 2000);
				}
			},
			// 二维数组
			Vue.prototype.arrTrans = function (num, arr) {
				if (!Array.isArray(arr)) {
					return []
				}
				const newArr = [];
				while (arr.length > 0) {
					newArr.push(arr.splice(0, num));
				}
				return newArr;
			}
		//	    ,
		//		Vue.prototype.SVGA = function(fileUrl, svgaElement, loops, stop){
		//	      let player = new SVGA.Player(svgaElement)
		//	      let parser = new SVGA.Parser(svgaElement)
		//	      parser.load(fileUrl, function (videoItem) {
		//	        player.loops = loops // 设置循环播放次数是 1
		//	        player.setVideoItem(videoItem)
		//	        player.stepToFrame(0, true) // 从指定帧开始播放动画
		//	        if(stop) {
		//      		player.clearsAfterStop = false;
		//      	}
		////	        player.onFrame((i) => {
		////	        	 
		////	          console.log(i) // 。这里输入的是动画的帧数
		////	          if (i >= 24 && i < 26) {
		////	            console.log('111')
		////	          } else if (i >= 70) {
		////	            player.clear()
		////	          }
		////	        })
		//	      })
		//	    }
	}
}
