var $as = (function(e) {
    var g = "v1.0.0-2021.12.09-14:30";
    var a = "ANALYTIC-SELF";
    var i = 2147483647;
    var f = 1;
    var b = {
        serverAddress: "http://52.81.101.191:8989/log",
    };
    var h = {
        serverAddress: "https://api.d4b80cba.com/log",
    };
    var d = f ? h.serverAddress : b.serverAddress;
    var c = {
        getRandomStr: function(k) {
            var o = "abcdefghijklmnopqrstuvwxyzABCDYFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var n = o.split("");
            var m = null;
            var j = "";
            if (k < 1) {
                return j
            }
            for (var l = 0; l < k; l++) {
                m = parseInt(Math.random() * o.length);
                if (n[m]) {
                    j += n[m]
                } else {
                    j += n[7]
                }
            }
            return j
        },
        setCookie: function(k, l, j) {
            var m = new Date();
            m.setTime(+new Date() + j);
            document.cookie = k + "=" + escape(l) + ";path=/" + ((j == null) ? "" : ";expires=" + m.toGMTString())
        },
        deleteCookie: function(j) {
            var k = new Date();
            k.setTime(+new Date() - 1);
            document.cookie = j + "=" + ";path=/" + ";expires=" + k.toGMTString()
        },
        getCookie: function(k) {
            var l, j;
            if (document.cookie.length > 0) {
                l = document.cookie.indexOf(k + "=");
                if (l !== -1) {
                    l = l + k.length + 1;
                    j = document.cookie.indexOf(";", l);
                    if (j === -1) {
                        j = document.cookie.length
                    }
                    return unescape(document.cookie.substring(l, j))
                }
            }
            return ""
        },
        getLang: function() {
            var j = [];
            var k = e.navigator.language.toLowerCase();
            if (k.indexOf("-") > -1) {
                j = k.split("-")
            } else {
                j[0] = k
            }
            return langs[j[0]] || langs["en"]
        },
        getQueryString: function(j, k) {
            var l = new URL(j);
            var n = "";
            try {
                n = l.searchParams.get(k)
            } catch (m) {
                n = ""
            }
            return n
        },
        ajax: function(k) {
            var x = {
                url: "",
                type: "GET",
                data: null,
                timeout: 30,
                contentType: "application/x-www-form-urlencoded",
                success: function() {},
                error: function() {},
                timeoutFn: function() {}
            };
            if (!k.url || !k.type) {
                return
            }
            for (var p in k) {
                x[p] = k[p]
            }

            function v(y) {
                var u = function() {
                    if (o.responseText.indexOf("401") > -1) {
                        alert(" xmlhttp.responseText = " + o.responseText)
                    } else {
                        alert("xmlhttp.status = " + o.status + " xmlhttp.responseText = " + o.responseText)
                    }
                };
                o.boxNetStatus = 1;
                if (o.readyState == 4) {
                    clearTimeout(q);
                    if (o.status == 200 || o.status == 0) {
                        if (o.status == 0 && !o.responseText) {
                            o.boxNetStatus = 0;
                            x.error(o)
                        } else {
                            x.success(o.responseText);
                            clearTimeout(q)
                        }
                    } else {
                        if (o.status == 401) {
                            if (e.account) {
                                e.account.gotoLogin()
                            } else {
                                x.error(o)
                            }
                        } else {
                            if (o.status == 400) {
                                x.error(o);
                                clearTimeout(q)
                            } else {}
                        }
                    }
                }
            }
            var o = new XMLHttpRequest();
            var q = null;
            o.onreadystatechange = v;
            if (x.type == "GET") {
                var w = "";
                if (x.data) {
                    for (var r in x.data) {
                        w += r + "=" + x.data[r] + "&"
                    }
                    w = x.url + "?" + w.substring(0, w.length - 1)
                } else {
                    w = x.url
                }
                o.open(x.type, w, true);
                o.send(null)
            } else {
                if (x.type == "POST") {
                    o.open(x.type, x.url, true);
                    o.setRequestHeader("Content-Type", x.contentType);
                    var s = "";
                    var n = "&";
                    if (x.contentType == "application/json") {
                        o.setRequestHeader("accept", x.contentType);
                        s = x.data
                    } else {
                        if (!x.data) {
                            return ""
                        }
                        var m = [];
                        for (var l in x.data) {
                            if (!x.data.hasOwnProperty(l)) {
                                continue
                            }
                            if (typeof x.data[l] === "function") {
                                continue
                            }
                            var t = x.data[l].toString();
                            l = encodeURIComponent(l.replace("%20", "+"));
                            t = encodeURIComponent(t.replace("%20", "+"));
                            m.push(l + "=" + t)
                        }
                        s = m.join("&")
                    }
                    o.send(s)
                }
            }
            q = setTimeout(j, x.timeout * 1000);

            function j() {
                o.abort();
                x.timeoutFn()
            }
        }
    };
    return {
        ver: g,
        send: function(m) {
            var n = {};
            var l = c.getCookie(a) || null;
            var k = "as-" + c.getRandomStr(8) + "-" + +new Date;
            var j = "show_page";
            if (typeof m === "string") {
                j = m
            } else {
                if (m instanceof Array) {
                    j = m[0]
                } else {
                    return
                }
            }
            n.event_name = j;
            n.event_source = e.location.href;
            n.host_name = e.location.host || e.location.hostname;
            n.origin = e.location.origin;
            n.search = e.location.search || "";
            n.ts = +new Date;
            n.ua = e.navigator.userAgent;
            n.language = e.navigator.language || "";
            if (l) {
                n.ck = l
            } else {
                c.setCookie(a, k, i);
                n.ck = k
            }
            c.ajax({
                url: d,
                data: n,
                type: "POST",
                success: function(q) {
                    var o = null;
                    try {
                        if (q) {
                            o = JSON.parse(q);
                            if (o.status.code == 0) {
                                console.log("发送成功")
                            }
                        }
                    } catch (p) {
                        console.log("发送异常")
                    }
                },
                error: function(o) {
                    console.log("发送失败")
                }
            })
        }
    }
})(window);