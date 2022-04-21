!(function (e, t) {
    'object' == typeof exports && 'object' == typeof module
        ? (module.exports = t())
        : 'function' == typeof define && define.amd
        ? define([], t)
        : 'object' == typeof exports
        ? (exports['show-model'] = t())
        : (e['show-model'] = t());
})(self, function () {
    return (() => {
        'use strict';
        var e = {
                1900: (e, t, o) => {
                    function n(e, t, o, n, r, s, i, a) {
                        var d,
                            f = 'function' == typeof e ? e.options : e;
                        if (
                            (t && ((f.render = t), (f.staticRenderFns = o), (f._compiled = !0)),
                            n && (f.functional = !0),
                            s && (f._scopeId = 'data-v-' + s),
                            i
                                ? ((d = function (e) {
                                      (e =
                                          e ||
                                          (this.$vnode && this.$vnode.ssrContext) ||
                                          (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext)) ||
                                          'undefined' == typeof __VUE_SSR_CONTEXT__ ||
                                          (e = __VUE_SSR_CONTEXT__),
                                          r && r.call(this, e),
                                          e && e._registeredComponents && e._registeredComponents.add(i);
                                  }),
                                  (f._ssrRegister = d))
                                : r &&
                                  (d = a
                                      ? function () {
                                            r.call(this, (f.functional ? this.parent : this).$root.$options.shadowRoot);
                                        }
                                      : r),
                            d)
                        )
                            if (f.functional) {
                                f._injectStyles = d;
                                var u = f.render;
                                f.render = function (e, t) {
                                    return d.call(t), u(e, t);
                                };
                            } else {
                                var c = f.beforeCreate;
                                f.beforeCreate = c ? [].concat(c, d) : [d];
                            }
                        return { exports: e, options: f };
                    }
                    o.d(t, { Z: () => n });
                },
            },
            t = {};
        function o(n) {
            var r = t[n];
            if (void 0 !== r) return r.exports;
            var s = (t[n] = { exports: {} });
            return e[n](s, s.exports, o), s.exports;
        }
        (o.d = (e, t) => {
            for (var n in t) o.o(t, n) && !o.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        }),
            (o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
            (o.r = (e) => {
                'undefined' != typeof Symbol &&
                    Symbol.toStringTag &&
                    Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
                    Object.defineProperty(e, '__esModule', { value: !0 });
            });
        var n = {};
        return (
            (() => {
                o.r(n), o.d(n, { default: () => t });
                const e = (0, o(1900).Z)(
                        {
                            name: 'show-model',
                            props: ['age'],
                            data: function () {
                                return { hisName: 'jimous is cool' };
                            },
                        },
                        function () {
                            var e = this,
                                t = e.$createElement;
                            return (e._self._c || t)('div', [e._v(e._s(e.hisName) + ' and hisAge is ' + e._s(e.age))]);
                        },
                        [],
                        !1,
                        null,
                        '7371ff6e',
                        null
                    ).exports,
                    t = Vue.extend(e);
            })(),
            n
        );
    })();
});
