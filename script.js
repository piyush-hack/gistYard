function getQuery(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' ')) && decodeURIComponent(results[2].replace(/\+/g, ' ')).trim() == "" ? null : decodeURIComponent(results[2].replace(/\+/g, ' ')).trim();
}

var lang = getQuery('lang');
var code;
if (getQuery("code")) {
    code = getQuery("code");
}

if (lang) {
    $("#root").attr("data-lang", lang);
    $(".file-name").html(lang.toUpperCase());
    $("#editor").html(`// Online Editor for free iframe
// Write, Edit and Run your code using NoteYard Compiler`)
} else {
    function get_url_extension(url) {
        return url.split(/[#?]/)[0].split('.').pop().trim();
    }
    $(".file-name").html(get_url_extension(code).toUpperCase());
}

if (code) {

    fetch(code)
        .then(response => response.text())
        .then(data => {
            var lines = data.split("\n");

            if (getQuery('to') && getQuery('from')) {
                lines = lines.slice(getQuery('from'), getQuery('to')).join("\n");
            } else if (getQuery('from') && !getQuery('to')) {
                lines = lines.slice(getQuery('from'),).join("\n");
            } else if (!getQuery('from') && getQuery('to')) {
                lines = lines.slice(0, getQuery('to')).join("\n");
            } else {
                lines = lines.join("\n")
            }

            $("#editor").text(lines);

            let catchoutput = [];

            !(function (e) {
                var t = {};
                function o(n) {
                    if (t[n]) return t[n].exports;
                    var r = (t[n] = { i: n, l: !1, exports: {} });
                    return e[n].call(r.exports, r, r.exports, o), (r.l = !0), r.exports;
                }
                (o.m = e),
                    (o.c = t),
                    (o.d = function (e, t, n) {
                        o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
                    }),
                    (o.r = function (e) {
                        "undefined" != typeof Symbol &&
                            Symbol.toStringTag &&
                            Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
                            Object.defineProperty(e, "__esModule", { value: !0 });
                    }),
                    (o.t = function (e, t) {
                        if ((1 & t && (e = o(e)), 8 & t)) return e;
                        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                        var n = Object.create(null);
                        if (
                            (o.r(n),
                                Object.defineProperty(n, "default", { enumerable: !0, value: e }),
                                2 & t && "string" != typeof e)
                        )
                            for (var r in e)
                                o.d(
                                    n,
                                    r,
                                    function (t) {
                                        return e[t];
                                    }.bind(null, r)
                                );
                        return n;
                    }),
                    (o.n = function (e) {
                        var t =
                            e && e.__esModule
                                ? function () {
                                    return e.default;
                                }
                                : function () {
                                    return e;
                                };
                        return o.d(t, "a", t), t;
                    }),
                    (o.o = function (e, t) {
                        return Object.prototype.hasOwnProperty.call(e, t);
                    }),
                    (o.p = "/public/build"),
                    o((o.s = 2));
            })([
                function (e, t) {
                    const o = {
                        C: "c",
                        CPP: "cpp",
                        PYTHON: "python",
                        JAVA: "java",
                        JAVASCRIPT: "javascript",
                        CSHARP: "csharp",
                        HTML: "html",
                        PHP: "php",
                    },
                        n = o.PYTHON,
                        r = {
                            [o.C]: "c_cpp",
                            [o.CPP]: "c_cpp",
                            [o.PYTHON]: "python",
                            [o.JAVA]: "java",
                            [o.JAVASCRIPT]: "javascript",
                            [o.CSHARP]: "csharp",
                            [o.HTML]: "html",
                            [o.PHP]: "php",
                        };
                    e.exports = {
                        DEFAULT_SHELL: "dash",
                        SUPPORTED_LANGUAGES: o,
                        DEFAULT_LANGUAGE: n,
                        ACE_EDITOR_MODES: r,
                    };
                },
                function (e, t) {
                    e.exports = (e) => {
                        for (
                            var t = "",
                            o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                            n = o.length,
                            r = 0;
                            r < e;
                            r++
                        )
                            t += o.charAt(Math.floor(Math.random() * n));
                        return t;
                    };
                },
                function (e, t, o) {
                    "use strict";
                    o.r(t);
                    var a = o(0),
                        i = o(1),
                        s = o.n(i);
                    const l = ace.edit("editor");
                    if (getQuery("edit") == 'false') {
                        l.setReadOnly(true);
                    }
                    let d = $("#root").data("lang") || a.DEFAULT_LANGUAGE,
                        m = a.ACE_EDITOR_MODES[d];
                    l.setTheme("ace/theme/textmate"),
                        l.getSession().setMode("ace/mode/" + m);
                    const u = () => {
                        const e = ($(".wrapper").height() + 30) / 22 - 3;
                        l.setOptions({
                            fontFamily: "droid_sans_monoregular",
                            fontSize: getQuery("fs") || "12px",
                            showGutter: !0,
                            highlightActiveLine: !0,
                            wrap: !0,
                            useWorker: !1,
                            overwrite: !1,
                            tooltipFollowsMouse: !1,
                            maxLines: e,
                            dragEnabled: !1,
                            showPrintMargin: !1,
                        }),
                            (l.container.style.lineHeight = getQuery("lh") || "20px");
                    };
                    u(), $(window).resize(u);
                    let p = !1;
                    const g = new URLSearchParams(window.location.search).get("ref");
                    let h = "";
                    try {
                        const e = localStorage.getItem("playground"),
                            t = JSON.parse(e);
                        t && g && t[g] && t[g].code && ((h = t[g].code), l.setValue(h, 1));
                    } catch (e) {
                        localStorage.removeItem("playground");
                    }
                    window.innerWidth < 1e3 &&
                        ((l.renderer.$cursorLayer.isBlinking = !1));
                    $(".spinner").hide(),
                        $(".wrapper").css({ display: "block" }),
                        $(".mobile-nav-drawer").addClass("show");
                    function P(e = !0) {
                        if (e)
                            return (
                                l.setTheme("ace/theme/twilight"),
                                $("#logo").attr("src", "assets/logos/logo-inverted.svg"),
                                $("#nav-logo").attr("src", "assets/logos/logo-inverted.svg"),
                                $(".container").addClass("dark-mode"),
                                void $("#toggle-dark-mode-desktop").prop("title", "Toggle light mode")
                            );
                        l.setTheme("ace/theme/textmate"),
                            $(".container").removeClass("dark-mode"),
                            $("#logo").attr("src", "assets/logos/logo.svg"),
                            $("#nav-logo").attr("src", "assets/logos/logo.svg"),
                            $("#toggle-dark-mode-desktop").prop("title", "Toggle dark mode");
                    }
                    function _() {
                        const e = JSON.parse(localStorage.getItem("playground")) || {};
                        return !!(e && e.darkMode && e.darkMode.status);
                    }


                    $("#toggle-dark-mode-mobile, #toggle-dark-mode-desktop").click(() => {
                        const e = JSON.parse(localStorage.getItem("playground")) || {},
                            t = _() ? 0 : 1;
                        let o = { status: t, updatedAt: Date.now() };
                        const n = Object.assign(e, { darkMode: o });
                        P(t), localStorage.setItem("playground", JSON.stringify(n));
                    }),
                        _() && P(!0),
                        $("img.svg").each(function () {
                            var e = $(this),
                                t = e.attr("id"),
                                o = e.attr("class"),
                                n = e.attr("src");
                            $.get(
                                n,
                                function (n) {
                                    var r = $(n).find("svg");
                                    void 0 !== t && (r = r.attr("id", t)),
                                        void 0 !== o && (r = r.attr("class", o + " replaced-svg")),
                                        (r = r.removeAttr("xmlns:a")),
                                        e.replaceWith(r);
                                },
                                "xml"
                            );
                        });
                    if (getQuery("dm") == "on") {
                        console.log(getQuery("dm"));
                        $("#toggle-dark-mode-desktop").css('display', 'none');
                        const t = 1;
                        P(t);
                    }
                },
            ]);
        });

}


