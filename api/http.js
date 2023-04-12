/**
 * [ajax]
 */
var request = {
	/**
	 * [兼容老版的]
	 */
	utilCreateXHR: function (options) {
		var win = (options && options.window) || window;
		if (win.XMLHttpRequest) {
			return new win.XMLHttpRequest();
		} else {
			var MSXML = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'Microsoft.XMLHTTP'];
			for (var n = 0; n < MSXML.length; n++) {
				try {
					return new win.ActiveXObject(MSXML[n]);
					break;
				} catch (e) {}
			}
		}
	},
	/**
	 * [JSON.parse]
	 */
	parseJson: function (text) {
		var obj = false;
		if (!text) {
			obj = {
				"code": "ER_NOBODY",
				"summary": "responseText is empty"
			};
		}

		if (window.JSON && JSON.parse) {
			try {
				obj = JSON.parse(text);
			} catch (ex) {}
		}

		if (!obj) {
			try {
				obj = eval("(" + text + ")");
			} catch (ex) {
				obj = {
					"code": "ER_INVALIDJSON",
					"summary": "responseText is invalid json"
				};
			}
		}

		return obj;
	},
	/**
	 * [ajax请求]
	 */
	ajax: function (args) {
		var This = this;
		var args = args || {};
		var request = args.request || {};
		var xhr = this.utilCreateXHR(args);

		var onsuccess = args.success || new Function();
		var onerror = args.error || new Function();

		var timeout = request.timeout;
		var timer = null;
		if (timeout > 0) {
			timer = setTimeout(function () {
				if (xhr.readyState == 3 && xhr.status == 200)
					return;
				xhr.abort();
				onerror({
					result: {
						code: "ER_TIMEOUT",
						summary: "timeout"
					}
				});
			}, timeout);
		}

		xhr.onreadystatechange = function (data) {
			//abort()后xhr.status为0
			if (xhr.readyState == 4) {
				clearTimeout(timer);
				if (xhr.status != 0) {
					if (xhr.status == 304 || (xhr.status >= 200 && xhr.status < 300)) {
						onsuccess({
							result: This.parseJson(xhr.responseText),
							text: xhr.responseText,
							status: xhr.status
						});
					} else {
						onerror({
							result: {
								code: "ER_NETWORK",
								summary: "network has error"
							},
							text: xhr.responseText,
							status: xhr.status
						});
					}
				} else {
					onerror({
						result: {
							code: "ER_STATUS",
							summary: "status is 0"
						}
					});
				}
			}
		}
		var method = request.method && request.method.toLowerCase();
		xhr.open(method || "get", request.url, true);

		var data = request.data;

		if (!request.isFormData) {
			//如果到了这里data仍为object类型，则自动转化为urlencoded或JSON.stringify
			if (typeof data == "object") {
				data = [];
				for (var p in request.data) {
					data.push(p + "=" + encodeURIComponent(request.data[p]));
				}
				data = data.join("&");
			}
		}
		if (request.headers) {
			for (var p in request.headers) {
				console.log(xhr)
				xhr.setRequestHeader(p, request.headers[p]);
			}
		}
		if (method != 'post' || !data) {
			data = null;
		}
		//xhr.send仅用于method=post请求
		xhr.send(data);
	}
}
export default request