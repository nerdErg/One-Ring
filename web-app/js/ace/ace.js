(function() {
    var a = function() {
        return this
    }();
    if (a.require && a.define)require.packaged = !0; else {
        var b = function(a, c, d) {
            typeof a != "string" ? b.original ? b.original.apply(window, arguments) : (console.error("dropping module because define wasn't a string."),console.trace()) : (arguments.length == 2 && (d = c),define.modules || (define.modules = {}),define.modules[a] = d)
        };
        a.define && (b.original = a.define),a.define = b;
        var c = function(a, b) {
            if (Object.prototype.toString.call(a) === "[object Array]") {
                var e = [];
                for (var f = 0,g = a.length; f < g; ++f) {
                    var h = d(a[f]);
                    if (!h && c.original)return c.original.apply(window, arguments);
                    e.push(h)
                }
                b && b.apply(null, e)
            } else {
                if (typeof a == "string") {
                    var i = d(a);
                    if (!i && c.original)return c.original.apply(window, arguments);
                    b && b();
                    return i
                }
                if (c.original)return c.original.apply(window, arguments)
            }
        };
        a.require && (c.original = a.require),a.require = c,require.packaged = !0;
        var d = function(a) {
            var b = define.modules[a];
            if (b == null) {
                console.error("Missing module: " + a);
                return null
            }
            if (typeof b == "function") {
                var c = {};
                b(require, c, {id:a,uri:""}),define.modules[a] = c;
                return c
            }
            return b
        }
    }
})(),define("pilot/fixoldbrowsers", ["require","exports","module"], function(a, b, c) {
    if (!Function.prototype.bind) {
        var d = Array.prototype.slice;
        Function.prototype.bind = function(a) {
            var b = this;
            if (typeof b.apply != "function" || typeof b.call != "function")return new TypeError;
            var c = d.call(arguments),e = function f() {
                if (this instanceof f) {
                    var a = Object.create(b.prototype);
                    b.apply(a, c.concat(d.call(arguments)));
                    return a
                }
                return b.call.apply(b, c.concat(d.call(arguments)))
            };
            e.length = typeof b == "function" ? Math.max(b.length - c.length, 0) : 0;
            return e
        }
    }
    var e = Function.prototype.call,f = Array.prototype,g = Object.prototype,h = e.bind(g.hasOwnProperty),i,j,k,l,m;
    if (m = h(g, "__defineGetter__"))i = e.bind(g.__defineGetter__),j = e.bind(g.__defineSetter__),k = e.bind(g.__lookupGetter__),l = e.bind(g.__lookupSetter__);
    Array.isArray || (Array.isArray = function(a) {
        return Object.prototype.toString.call(a) === "[object Array]"
    }),Array.prototype.forEach || (Array.prototype.forEach = function(a, b) {
        var c = +this.length;
        for (var d = 0; d < c; d++)d in this && a.call(b, this[d], d, this)
    }),Array.prototype.map || (Array.prototype.map = function(a) {
        var b = +this.length;
        if (typeof a != "function")throw new TypeError;
        var c = Array(b),d = arguments[1];
        for (var e = 0; e < b; e++)e in this && (c[e] = a.call(d, this[e], e, this));
        return c
    }),Array.prototype.filter || (Array.prototype.filter = function(a) {
        var b = [],c = arguments[1];
        for (var d = 0; d < this.length; d++)a.call(c, this[d]) && b.push(this[d]);
        return b
    }),Array.prototype.every || (Array.prototype.every = function(a) {
        var b = arguments[1];
        for (var c = 0; c < this.length; c++)if (!a.call(b, this[c]))return!1;
        return!0
    }),Array.prototype.some || (Array.prototype.some = function(a) {
        var b = arguments[1];
        for (var c = 0; c < this.length; c++)if (a.call(b, this[c]))return!0;
        return!1
    }),Array.prototype.reduce || (Array.prototype.reduce = function(a) {
        var b = +this.length;
        if (typeof a != "function")throw new TypeError;
        if (b === 0 && arguments.length === 1)throw new TypeError;
        var c = 0;
        if (arguments.length >= 2)var d = arguments[1]; else do{
            if (c in this) {
                d = this[c++];
                break
            }
            if (++c >= b)throw new TypeError
        } while (!0);
        for (; c < b; c++)c in this && (d = a.call(null, d, this[c], c, this));
        return d
    }),Array.prototype.reduceRight || (Array.prototype.reduceRight = function(a) {
        var b = +this.length;
        if (typeof a != "function")throw new TypeError;
        if (b === 0 && arguments.length === 1)throw new TypeError;
        var c = b - 1;
        if (arguments.length >= 2)var d = arguments[1]; else do{
            if (c in this) {
                d = this[c--];
                break
            }
            if (--c < 0)throw new TypeError
        } while (!0);
        for (; c >= 0; c--)c in this && (d = a.call(null, d, this[c], c, this));
        return d
    }),Array.prototype.indexOf || (Array.prototype.indexOf = function(a) {
        var b = this.length;
        if (!b)return-1;
        var c = arguments[1] || 0;
        if (c >= b)return-1;
        c < 0 && (c += b);
        for (; c < b; c++) {
            if (!h(this, c))continue;
            if (a === this[c])return c
        }
        return-1
    }),Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(a) {
        var b = this.length;
        if (!b)return-1;
        var c = arguments[1] || b;
        c < 0 && (c += b),c = Math.min(c, b - 1);
        for (; c >= 0; c--) {
            if (!h(this, c))continue;
            if (a === this[c])return c
        }
        return-1
    }),Object.getPrototypeOf || (Object.getPrototypeOf = function(a) {
        return a.__proto__ || a.constructor.prototype
    });
    if (!Object.getOwnPropertyDescriptor) {
        var n = "Object.getOwnPropertyDescriptor called on a non-object: ";
        Object.getOwnPropertyDescriptor = function(a, b) {
            if (typeof a != "object" && typeof a != "function" || a === null)throw new TypeError(n + a);
            if (!h(a, b))return undefined;
            var c,d,e;
            c = {enumerable:!0,configurable:!0};
            if (m) {
                var f = a.__proto__;
                a.__proto__ = g;
                var d = k(a, b),e = l(a, b);
                a.__proto__ = f;
                if (d || e) {
                    d && (descriptor.get = d),e && (descriptor.set = e);
                    return descriptor
                }
            }
            descriptor.value = a[b];
            return descriptor
        }
    }
    Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function(a) {
        return Object.keys(a)
    }),Object.create || (Object.create = function(a, b) {
        var c;
        if (a === null)c = {"__proto__":null}; else {
            if (typeof a != "object")throw new TypeError("typeof prototype[" + typeof a + "] != 'object'");
            var d = function() {
            };
            d.prototype = a,c = new d,c.__proto__ = a
        }
        typeof b != "undefined" && Object.defineProperties(c, b);
        return c
    });
    if (!Object.defineProperty) {
        var o = "Property description must be an object: ",p = "Object.defineProperty called on non-object: ",q = "getters & setters can not be defined on this javascript engine";
        Object.defineProperty = function(a, b, c) {
            if (typeof a != "object" && typeof a != "function")throw new TypeError(p + a);
            if (typeof a != "object" || a === null)throw new TypeError(o + c);
            if (h(c, "value"))if (m && (k(a, b) || l(a, b))) {
                var d = a.__proto__;
                a.__proto__ = g,delete a[b],a[b] = c.value,a.prototype
            } else a[b] = c.value; else {
                if (!m)throw new TypeError(q);
                h(c, "get") && i(a, b, c.get),h(c, "set") && j(a, b, c.set)
            }
            return a
        }
    }
    Object.defineProperties || (Object.defineProperties = function(a, b) {
        for (var c in b)h(b, c) && Object.defineProperty(a, c, b[c]);
        return a
    }),Object.seal || (Object.seal = function(a) {
        return a
    }),Object.freeze || (Object.freeze = function(a) {
        return a
    });
    try {
        Object.freeze(function() {
        })
    } catch(r) {
        Object.freeze = function(a) {
            return function b(b) {
                return typeof b == "function" ? b : a(b)
            }
        }(Object.freeze)
    }
    Object.preventExtensions || (Object.preventExtensions = function(a) {
        return a
    }),Object.isSealed || (Object.isSealed = function(a) {
        return!1
    }),Object.isFrozen || (Object.isFrozen = function(a) {
        return!1
    }),Object.isExtensible || (Object.isExtensible = function(a) {
        return!0
    });
    if (!Object.keys) {
        var s = !0,t = ["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],u = t.length;
        for (var v in{toString:null})s = !1;
        Object.keys = function W(a) {
            if (typeof a != "object" && typeof a != "function" || a === null)throw new TypeError("Object.keys called on a non-object");
            var W = [];
            for (var b in a)h(a, b) && W.push(b);
            if (s)for (var c = 0,d = u; c < d; c++) {
                var e = t[c];
                h(a, e) && W.push(e)
            }
            return W
        }
    }
    Date.prototype.toISOString || (Date.prototype.toISOString = function() {
        return this.getUTCFullYear() + "-" + (this.getUTCMonth() + 1) + "-" + this.getUTCDate() + "T" + this.getUTCHours() + ":" + this.getUTCMinutes() + ":" + this.getUTCSeconds() + "Z"
    }),Date.now || (Date.now = function() {
        return(new Date).getTime()
    }),Date.prototype.toJSON || (Date.prototype.toJSON = function(a) {
        if (typeof this.toISOString != "function")throw new TypeError;
        return this.toISOString()
    }),isNaN(Date.parse("T00:00")) && (Date = function(a) {
        var b = function(c, d, e, f, g, h, i) {
            var j = arguments.length;
            if (this instanceof a) {
                var k = j === 1 && String(c) === c ? new a(b.parse(c)) : j >= 7 ? new a(c, d, e, f, g, h, i) : j >= 6 ? new a(c, d, e, f, g, h) : j >= 5 ? new a(c, d, e, f, g) : j >= 4 ? new a(c, d, e, f) : j >= 3 ? new a(c, d, e) : j >= 2 ? new a(c, d) : j >= 1 ? new a(c) : new a;
                k.constructor = b;
                return k
            }
            return a.apply(this, arguments)
        },c = new RegExp("^(?:((?:[+-]\\d\\d)?\\d\\d\\d\\d)(?:-(\\d\\d)(?:-(\\d\\d))?)?)?(?:T(\\d\\d):(\\d\\d)(?::(\\d\\d)(?:\\.(\\d\\d\\d))?)?)?(?:Z|([+-])(\\d\\d):(\\d\\d))?$");
        for (var d in a)b[d] = a[d];
        b.now = a.now,b.UTC = a.UTC,b.prototype = a.prototype,b.prototype.constructor = b,b.parse = function e(b) {
            var d = c.exec(b);
            if (d) {
                d.shift();
                var e = d[0] === undefined;
                for (var f = 0; f < 10; f++) {
                    if (f === 7)continue;
                    d[f] = +(d[f] || (f < 3 ? 1 : 0)),f === 1 && d[f]--
                }
                if (e)return((d[3] * 60 + d[4]) * 60 + d[5]) * 1e3 + d[6];
                var g = (d[8] * 60 + d[9]) * 60 * 1e3;
                d[6] === "-" && (g = -g);
                return a.UTC.apply(this, d.slice(0, 7)) + g
            }
            return a.parse.apply(this, arguments)
        };
        return b
    }(Date));
    if (!String.prototype.trim) {
        var w = /^\s\s*/,x = /\s\s*$/;
        String.prototype.trim = function() {
            return String(this).replace(w, "").replace(x, "")
        }
    }
}),define("ace/ace", ["require","exports","module","pilot/index","pilot/fixoldbrowsers","pilot/plugin_manager","pilot/dom","pilot/event","ace/editor","ace/edit_session","ace/undomanager","ace/virtual_renderer","ace/theme/textmate","pilot/environment"], function(a, b, c) {
    a("pilot/index"),a("pilot/fixoldbrowsers");
    var d = a("pilot/plugin_manager").catalog;
    d.registerPlugins(["pilot/index"]);
    var e = a("pilot/dom"),f = a("pilot/event"),g = a("ace/editor").Editor,h = a("ace/edit_session").EditSession,i = a("ace/undomanager").UndoManager,j = a("ace/virtual_renderer").VirtualRenderer;
    b.edit = function(b) {
        typeof b == "string" && (b = document.getElementById(b));
        var c = new h(e.getInnerText(b));
        c.setUndoManager(new i),b.innerHTML = "";
        var k = new g(new j(b, a("ace/theme/textmate")));
        k.setSession(c);
        var l = a("pilot/environment").create();
        d.startupPlugins({env:l}).then(function() {
            l.document = c,l.editor = k,k.resize(),f.addListener(window, "resize", function() {
                k.resize()
            }),b.env = l
        }),k.env = l;
        return k
    }
}),define("pilot/index", ["require","exports","module","pilot/fixoldbrowsers","pilot/types/basic","pilot/types/command","pilot/types/settings","pilot/commands/settings","pilot/commands/basic","pilot/settings/canon","pilot/canon"], function(a, b, c) {
    b.startup = function(b, c) {
        a("pilot/fixoldbrowsers"),a("pilot/types/basic").startup(b, c),a("pilot/types/command").startup(b, c),a("pilot/types/settings").startup(b, c),a("pilot/commands/settings").startup(b, c),a("pilot/commands/basic").startup(b, c),a("pilot/settings/canon").startup(b, c),a("pilot/canon").startup(b, c)
    },b.shutdown = function(b, c) {
        a("pilot/types/basic").shutdown(b, c),a("pilot/types/command").shutdown(b, c),a("pilot/types/settings").shutdown(b, c),a("pilot/commands/settings").shutdown(b, c),a("pilot/commands/basic").shutdown(b, c),a("pilot/settings/canon").shutdown(b, c),a("pilot/canon").shutdown(b, c)
    }
}),define("pilot/types/basic", ["require","exports","module","pilot/types"], function(a, b, c) {
    function m(a) {
        if (a instanceof e)this.subtype = a; else {
            if (typeof a != "string")throw new Error("Can' handle array subtype");
            this.subtype = d.getType(a);
            if (this.subtype == null)throw new Error("Unknown array subtype: " + a)
        }
    }

    function l(a) {
        if (typeof a.defer != "function")throw new Error("Instances of DeferredType need typeSpec.defer to be a function that returns a type");
        Object.keys(a).forEach(function(b) {
            this[b] = a[b]
        }, this)
    }

    function j(a) {
        if (!Array.isArray(a.data) && typeof a.data != "function")throw new Error("instances of SelectionType need typeSpec.data to be an array or function that returns an array:" + JSON.stringify(a));
        Object.keys(a).forEach(function(b) {
            this[b] = a[b]
        }, this)
    }

    var d = a("pilot/types"),e = d.Type,f = d.Conversion,g = d.Status,h = new e;
    h.stringify = function(a) {
        return a
    },h.parse = function(a) {
        if (typeof a != "string")throw new Error("non-string passed to text.parse()");
        return new f(a)
    },h.name = "text";
    var i = new e;
    i.stringify = function(a) {
        return a ? "" + a : null
    },i.parse = function(a) {
        if (typeof a != "string")throw new Error("non-string passed to number.parse()");
        if (a.replace(/\s/g, "").length === 0)return new f(null, g.INCOMPLETE, "");
        var b = new f(parseInt(a, 10));
        isNaN(b.value) && (b.status = g.INVALID,b.message = "Can't convert \"" + a + '" to a number.');
        return b
    },i.decrement = function(a) {
        return a - 1
    },i.increment = function(a) {
        return a + 1
    },i.name = "number",j.prototype = new e,j.prototype.stringify = function(a) {
        return a
    },j.prototype.parse = function(a) {
        if (typeof a != "string")throw new Error("non-string passed to parse()");
        if (!this.data)throw new Error("Missing data on selection type extension.");
        var b = typeof this.data == "function" ? this.data() : this.data,c = !1,d,e = [];
        b.forEach(function(b) {
            a == b ? (d = this.fromString(b),c = !0) : b.indexOf(a) === 0 && e.push(this.fromString(b))
        }, this);
        if (c)return new f(d);
        this.noMatch && this.noMatch();
        if (e.length > 0) {
            var h = "Possibilities" + (a.length === 0 ? "" : " for '" + a + "'");
            return new f(null, g.INCOMPLETE, h, e)
        }
        var h = "Can't use '" + a + "'.";
        return new f(null, g.INVALID, h, e)
    },j.prototype.fromString = function(a) {
        return a
    },j.prototype.decrement = function(a) {
        var b = typeof this.data == "function" ? this.data() : this.data,c;
        if (a == null)c = b.length - 1; else {
            var d = this.stringify(a),c = b.indexOf(d);
            c = c === 0 ? b.length - 1 : c - 1
        }
        return this.fromString(b[c])
    },j.prototype.increment = function(a) {
        var b = typeof this.data == "function" ? this.data() : this.data,c;
        if (a == null)c = 0; else {
            var d = this.stringify(a),c = b.indexOf(d);
            c = c === b.length - 1 ? 0 : c + 1
        }
        return this.fromString(b[c])
    },j.prototype.name = "selection",b.SelectionType = j;
    var k = new j({name:"bool",data:["true","false"],stringify:function(a) {
        return"" + a
    },fromString:function(a) {
        return a === "true" ? !0 : !1
    }});
    l.prototype = new e,l.prototype.stringify = function(a) {
        return this.defer().stringify(a)
    },l.prototype.parse = function(a) {
        return this.defer().parse(a)
    },l.prototype.decrement = function(a) {
        var b = this.defer();
        return b.decrement ? b.decrement(a) : undefined
    },l.prototype.increment = function(a) {
        var b = this.defer();
        return b.increment ? b.increment(a) : undefined
    },l.prototype.name = "deferred",b.DeferredType = l,m.prototype = new e,m.prototype.stringify = function(a) {
        return a.join(" ")
    },m.prototype.parse = function(a) {
        return this.defer().parse(a)
    },m.prototype.name = "array";
    var n = !1;
    b.startup = function() {
        n || (n = !0,d.registerType(h),d.registerType(i),d.registerType(k),d.registerType(j),d.registerType(l),d.registerType(m))
    },b.shutdown = function() {
        n = !1,d.unregisterType(h),d.unregisterType(i),d.unregisterType(k),d.unregisterType(j),d.unregisterType(l),d.unregisterType(m)
    }
}),define("pilot/types", ["require","exports","module"], function(a, b, c) {
    function h(a, b) {
        if (a.substr(-2) === "[]") {
            var c = a.slice(0, -2);
            return new g.array(c)
        }
        var d = g[a];
        typeof d == "function" && (d = new d(b));
        return d
    }

    function f() {
    }

    function e(a, b, c, e) {
        this.value = a,this.status = b || d.VALID,this.message = c,this.predictions = e || []
    }

    var d = {VALID:{toString:function() {
        return"VALID"
    },valueOf:function() {
        return 0
    }},INCOMPLETE:{toString:function() {
        return"INCOMPLETE"
    },valueOf:function() {
        return 1
    }},INVALID:{toString:function() {
        return"INVALID"
    },valueOf:function() {
        return 2
    }},combine:function(a) {
        var b = d.VALID;
        for (var c = 0; c < a.length; c++)a[c].valueOf() > b.valueOf() && (b = a[c]);
        return b
    }};
    b.Status = d,b.Conversion = e,f.prototype = {stringify:function(a) {
        throw new Error("not implemented")
    },parse:function(a) {
        throw new Error("not implemented")
    },name:undefined,increment:function(a) {
        return undefined
    },decrement:function(a) {
        return undefined
    },getDefault:function() {
        return this.parse("")
    }},b.Type = f;
    var g = {};
    b.registerType = function(a) {
        if (typeof a == "object") {
            if (!(a instanceof f))throw new Error("Can't registerType using: " + a);
            if (!a.name)throw new Error("All registered types must have a name");
            g[a.name] = a
        } else {
            if (typeof a != "function")throw new Error("Unknown type: " + a);
            if (!a.prototype.name)throw new Error("All registered types must have a name");
            g[a.prototype.name] = a
        }
    },b.registerTypes = function(a) {
        Object.keys(a).forEach(function(c) {
            var d = a[c];
            d.name = c,b.registerType(d)
        })
    },b.deregisterType = function(a) {
        delete g[a.name]
    },b.getType = function(a) {
        if (typeof a == "string")return h(a);
        if (typeof a == "object") {
            if (!a.name)throw new Error("Missing 'name' member to typeSpec");
            return h(a.name, a)
        }
        throw new Error("Can't extract type from " + a)
    }
}),define("pilot/types/command", ["require","exports","module","pilot/canon","pilot/types/basic","pilot/types"], function(a, b, c) {
    var d = a("pilot/canon"),e = a("pilot/types/basic").SelectionType,f = a("pilot/types"),g = new e({name:"command",data:function() {
        return d.getCommandNames()
    },stringify:function(a) {
        return a.name
    },fromString:function(a) {
        return d.getCommand(a)
    }});
    b.startup = function() {
        f.registerType(g)
    },b.shutdown = function() {
        f.unregisterType(g)
    }
}),define("pilot/canon", ["require","exports","module","pilot/console","pilot/stacktrace","pilot/oop","pilot/useragent","pilot/keys","pilot/event_emitter","pilot/typecheck","pilot/catalog","pilot/types","pilot/lang"], function(a, b, c) {
    function J(a) {
        a = a || {},this.command = a.command,this.args = a.args,this.typed = a.typed,this._begunOutput = !1,this.start = new Date,this.end = null,this.completed = !1,this.error = !1
    }

    function G(a, b, c, e, f) {
        function h() {
            a.exec(b, g.args, g),!g.isAsync && !g.isDone && g.done()
        }

        typeof a == "string" && (a = q[a]);
        if (!a)return!1;
        var g = new J({sender:c,command:a,args:e || {},typed:f});
        if (g.getStatus() == l.INVALID) {
            d.error("Canon.exec: Invalid parameter(s) passed to " + a.name);
            return!1
        }
        if (g.getStatus() == l.INCOMPLETE) {
            var i,j = b[c];
            if (!j || !j.getArgsProvider || !(i = j.getArgsProvider()))i = F;
            i(g, function() {
                g.getStatus() == l.VALID && h()
            });
            return!0
        }
        h();
        return!0
    }

    function F(a, b) {
        var c = a.args,d = a.command.params;
        for (var e = 0; e < d.length; e++) {
            var f = d[e];
            if (a.getParamStatus(f) != l.VALID || f.defaultValue === null) {
                var g = f.description;
                f.defaultValue === null && (g += " (optional)");
                var h = prompt(g, f.defaultValue || "");
                if (!h) {
                    b();
                    return
                }
                c[f.name] = h
            }
        }
        b()
    }

    function E() {
        return z
    }

    function D(a) {
        return q[a]
    }

    function C(a) {
        var b = typeof a == "string" ? a : a.name;
        delete q[b],n.arrayRemove(z, b)
    }

    function B(a, b) {
        var c = b.type;
        b.type = m.getType(c);
        if (b.type == null)throw new Error("In " + a + "/" + b.name + ": can't find type for: " + JSON.stringify(c))
    }

    function A(a) {
        if (!a.name)throw new Error("All registered commands must have a name");
        a.params == null && (a.params = []);
        if (!Array.isArray(a.params))throw new Error("command.params must be an array in " + a.name);
        a.params.forEach(function(b) {
            if (!b.name)throw new Error("In " + a.name + ": all params must have a name");
            B(a.name, b)
        }, this),q[a.name] = a,a.bindKey && w(a),z.push(a.name),z.sort()
    }

    function y(a, b, c, d) {
        var e = x(a, b, c, d);
        return e ? G(e, a, b, {}) : !1
    }

    function x(a, b, c, d) {
        j.isNumber(d) && (d = h.keyCodeToString(d));
        var e = (s[c] || {})[d] || [];
        for (var f = 0; f < e.length; f++)if (e[f].sender(a, b, c, d))return e[f].command;
        var g = r[b];
        return g && g[c] && g[c][d]
    }

    function w(a) {
        var b = a.bindKey,c = b[v],d = r,e = s;
        if (!b.sender)throw new Error("All key bindings must have a sender");
        if (!b.mac && b.mac !== null)throw new Error("All key bindings must have a mac key binding");
        if (!b.win && b.win !== null)throw new Error("All key bindings must have a windows key binding");
        if (!!b[v])if (typeof b.sender == "string") {
            var f = t(b.sender, "\\|", null, !0);
            f.forEach(function(b) {
                d[b] || (d[b] = {}),c.split("|").forEach(function(c) {
                    u(c, a, d[b])
                })
            })
        } else {
            if (!j.isFunction(b.sender))throw new Error("Key binding must have a sender that is a string or function");
            var g = {command:a,sender:b.sender};
            keyData = u(c),e[keyData.hashId] || (e[keyData.hashId] = {}),e[keyData.hashId][keyData.key] ? e[keyData.hashId][keyData.key].push(g) : e[keyData.hashId][keyData.key] = [g]
        }
    }

    function u(a, b, c) {
        var d,e = 0,f = t(a, "\\-", null, !0),g = 0,i = f.length;
        for (; g < i; ++g)h.KEY_MODS[f[g]] ? e = e | h.KEY_MODS[f[g]] : d = f[g] || "-";
        if (c == null)return{key:d,hashId:e};
        (c[e] || (c[e] = {}))[d] = b
    }

    function t(a, b, c, d) {
        return(d && a.toLowerCase() || a).replace(/(?:^\s+|\n|\s+$)/g, "").split(new RegExp("[\\s ]*" + b + "[\\s ]*", "g"), c || 999)
    }

    var d = a("pilot/console"),e = a("pilot/stacktrace").Trace,f = a("pilot/oop"),g = a("pilot/useragent"),h = a("pilot/keys"),i = a("pilot/event_emitter").EventEmitter,j = a("pilot/typecheck"),k = a("pilot/catalog"),l = a("pilot/types").Status,m = a("pilot/types"),n = a("pilot/lang"),o = {name:"command",description:"A command is a bit of functionality with optional typed arguments which can do something small like moving the cursor around the screen, or large like cloning a project from VCS.",indexOn:"name"};
    b.startup = function(a, b) {
        k.addExtensionSpec(o)
    },b.shutdown = function(a, b) {
        k.removeExtensionSpec(o)
    };
    var p = {name:"thing",description:"thing is an example command",params:[
        {name:"param1",description:"an example parameter",type:"text",defaultValue:null}
    ],exec:function(a, b, c) {
        thing()
    }},q = {},r = {},s = {},v = g.isMac ? "mac" : "win",z = [];
    b.removeCommand = C,b.addCommand = A,b.getCommand = D,b.getCommandNames = E,b.findKeyCommand = x,b.exec = G,b.execKeyCommand = y,b.upgradeType = B,f.implement(b, i);
    var H = [],I = 100;
    f.implement(J.prototype, i),J.prototype.getParamStatus = function(a) {
        var b = this.args || {};
        if (a.name in b) {
            if (b[a.name] == null)return a.defaultValue === null ? l.VALID : l.INCOMPLETE;
            var c,d = b[a.name].toString();
            try {
                c = a.type.parse(d)
            } catch(e) {
                return l.INVALID
            }
            if (c.status != l.VALID)return c.status
        } else if (a.defaultValue === undefined)return l.INCOMPLETE;
        return l.VALID
    },J.prototype.getParamNameStatus = function(a) {
        var b = this.command.params || [];
        for (var c = 0; c < b.length; c++)if (b[c].name == a)return this.getParamStatus(b[c]);
        throw"Parameter '" + a + "' not defined on command '" + this.command.name + "'"
    },J.prototype.getStatus = function() {
        var a = this.args || {},b = this.command.params;
        if (!b || b.length == 0)return l.VALID;
        var c = [];
        for (var d = 0; d < b.length; d++)c.push(this.getParamStatus(b[d]));
        return l.combine(c)
    },J.prototype._beginOutput = function() {
        this._begunOutput = !0,this.outputs = [],H.push(this);
        while (H.length > I)H.shiftObject();
        b._dispatchEvent("output", {requests:H,request:this})
    },J.prototype.doneWithError = function(a) {
        this.error = !0,this.done(a)
    },J.prototype.async = function() {
        this.isAsync = !0,this._begunOutput || this._beginOutput()
    },J.prototype.output = function(a) {
        this._begunOutput || this._beginOutput(),typeof a != "string" && !(a instanceof Node) && (a = a.toString()),this.outputs.push(a),this.isDone = !0,this._dispatchEvent("output", {});
        return this
    },J.prototype.done = function(a) {
        this.completed = !0,this.end = new Date,this.duration = this.end.getTime() - this.start.getTime(),a && this.output(a),this.isDone || (this.isDone = !0,this._dispatchEvent("output", {}))
    },b.Request = J
}),define("pilot/console", ["require","exports","module"], function(a, b, c) {
    var d = function() {
    },e = ["assert","count","debug","dir","dirxml","error","group","groupEnd","info","log","profile","profileEnd","time","timeEnd","trace","warn"];
    typeof window == "undefined" ? e.forEach(function(a) {
        b[a] = function() {
            var b = Array.prototype.slice.call(arguments),c = {op:"log",method:a,args:b};
            postMessage(JSON.stringify(c))
        }
    }) : e.forEach(function(a) {
        window.console && window.console[a] ? b[a] = Function.prototype.bind.call(window.console[a], window.console) : b[a] = d
    })
}),define("pilot/stacktrace", ["require","exports","module","pilot/useragent","pilot/console"], function(a, b, c) {
    function i() {
    }

    function g(a) {
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            typeof c == "object" ? a[b] = "#object" : typeof c == "function" ? a[b] = "#function" : typeof c == "string" && (a[b] = '"' + c + '"')
        }
        return a.join(",")
    }

    var d = a("pilot/useragent"),e = a("pilot/console"),f = function() {
        return d.isGecko ? "firefox" : d.isOpera ? "opera" : "other"
    }(),h = {chrome:function(a) {
        var b = a.stack;
        if (!b) {
            e.log(a);
            return[]
        }
        return b.replace(/^.*?\n/, "").replace(/^.*?\n/, "").replace(/^.*?\n/, "").replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@").split("\n")
    },firefox:function(a) {
        var b = a.stack;
        if (!b) {
            e.log(a);
            return[]
        }
        b = b.replace(/(?:\n@:0)?\s+$/m, ""),b = b.replace(/^\(/gm, "{anonymous}(");
        return b.split("\n")
    },opera:function(a) {
        var b = a.message.split("\n"),c = "{anonymous}",d = /Line\s+(\d+).*?script\s+(http\S+)(?:.*?in\s+function\s+(\S+))?/i,e,f,g;
        for (e = 4,f = 0,g = b.length; e < g; e += 2)d.test(b[e]) && (b[f++] = (RegExp.$3 ? RegExp.$3 + "()@" + RegExp.$2 + RegExp.$1 : c + "()@" + RegExp.$2 + ":" + RegExp.$1) + " -- " + b[e + 1].replace(/^\s+/, ""));
        b.splice(f, b.length - f);
        return b
    },other:function(a) {
        var b = "{anonymous}",c = /function\s*([\w\-$]+)?\s*\(/i,d = [],e = 0,f,h,i = 10;
        while (a && d.length < i) {
            f = c.test(a.toString()) ? RegExp.$1 || b : b,h = Array.prototype.slice.call(a.arguments),d[e++] = f + "(" + g(h) + ")";
            if (a === a.caller && window.opera)break;
            a = a.caller
        }
        return d
    }};
    i.prototype = {sourceCache:{},ajax:function(a) {
        var b = this.createXMLHTTPObject();
        if (!!b) {
            b.open("GET", a, !1),b.setRequestHeader("User-Agent", "XMLHTTP/1.0"),b.send("");
            return b.responseText
        }
    },createXMLHTTPObject:function() {
        var a,b = [function() {
            return new XMLHttpRequest
        },function() {
            return new ActiveXObject("Msxml2.XMLHTTP")
        },function() {
            return new ActiveXObject("Msxml3.XMLHTTP")
        },function() {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }];
        for (var c = 0; c < b.length; c++)try {
            a = b[c](),this.createXMLHTTPObject = b[c];
            return a
        } catch(d) {
        }
    },getSource:function(a) {
        a in this.sourceCache || (this.sourceCache[a] = this.ajax(a).split("\n"));
        return this.sourceCache[a]
    },guessFunctions:function(a) {
        for (var b = 0; b < a.length; ++b) {
            var c = /{anonymous}\(.*\)@(\w+:\/\/([-\w\.]+)+(:\d+)?[^:]+):(\d+):?(\d+)?/,d = a[b],e = c.exec(d);
            if (e) {
                var f = e[1],g = e[4];
                if (f && g) {
                    var h = this.guessFunctionName(f, g);
                    a[b] = d.replace("{anonymous}", h)
                }
            }
        }
        return a
    },guessFunctionName:function(a, b) {
        try {
            return this.guessFunctionNameFromLines(b, this.getSource(a))
        } catch(c) {
            return"getSource failed with url: " + a + ", exception: " + c.toString()
        }
    },guessFunctionNameFromLines:function(a, b) {
        var c = /function ([^(]*)\(([^)]*)\)/,d = /['"]?([0-9A-Za-z_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,e = "",f = 10;
        for (var g = 0; g < f; ++g) {
            e = b[a - g] + e;
            if (e !== undefined) {
                var h = d.exec(e);
                if (h)return h[1];
                h = c.exec(e);
                if (h && h[1])return h[1]
            }
        }
        return"(?)"
    }};
    var j = new i,k = [/http:\/\/localhost:4020\/sproutcore.js:/];
    b.ignoreFramesMatching = function(a) {
        k.push(a)
    },b.Trace = function(a, b) {
        this._ex = a,this._stack = h[f](a),b && (this._stack = j.guessFunctions(this._stack))
    },b.Trace.prototype.log = function(a) {
        a <= 0 && (a = 999999999);
        var b = 0;
        for (var c = 0; c < this._stack.length && b < a; c++) {
            var d = this._stack[c],f = !0;
            k.forEach(function(a) {
                a.test(d) && (f = !1)
            }),f && (e.debug(d),b++)
        }
    }
}),define("pilot/useragent", ["require","exports","module"], function(a, b, c) {
    var d = (navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(),e = navigator.userAgent,f = navigator.appVersion;
    b.isWin = d == "win",b.isMac = d == "mac",b.isLinux = d == "linux",b.isIE = !1,b.isGecko = b.isMozilla = window.controllers && window.navigator.product === "Gecko",b.isOldGecko = b.isGecko && /rv\:1/.test(navigator.userAgent),b.isOpera = window.opera && Object.prototype.toString.call(window.opera) == "[object Opera]",b.isWebKit = parseFloat(e.split("WebKit/")[1]) || undefined,b.isAIR = e.indexOf("AdobeAIR") >= 0,b.isIPad = e.indexOf("iPad") >= 0,b.OS = {LINUX:"LINUX",MAC:"MAC",WINDOWS:"WINDOWS"},b.getOS = function() {
        return b.isMac ? b.OS.MAC : b.isLinux ? b.OS.LINUX : b.OS.WINDOWS
    }
}),define("pilot/oop", ["require","exports","module"], function(a, b, c) {
    b.inherits = function() {
        var a = function() {
        };
        return function(b, c) {
            a.prototype = c.prototype,b.super_ = c.prototype,b.prototype = new a,b.prototype.constructor = b
        }
    }(),b.mixin = function(a, b) {
        for (var c in b)a[c] = b[c]
    },b.implement = function(a, c) {
        b.mixin(a, c)
    }
}),define("pilot/keys", ["require","exports","module","pilot/oop"], function(a, b, c) {
    var d = a("pilot/oop"),e = function() {
        var a = {MODIFIER_KEYS:{16:"Shift",17:"Ctrl",18:"Alt",224:"Meta"},KEY_MODS:{ctrl:1,alt:2,option:2,shift:4,meta:8,command:8},FUNCTION_KEYS:{8:"Backspace",9:"Tab",13:"Return",19:"Pause",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"Print",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"Numlock",145:"Scrolllock"},PRINTABLE_KEYS:{32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",61:"=",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",107:"+",109:"-",110:".",188:",",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:'"'}};
        for (i in a.FUNCTION_KEYS) {
            var b = a.FUNCTION_KEYS[i].toUpperCase();
            a[b] = parseInt(i, 10)
        }
        d.mixin(a, a.MODIFIER_KEYS),d.mixin(a, a.PRINTABLE_KEYS),d.mixin(a, a.FUNCTION_KEYS);
        return a
    }();
    d.mixin(b, e),b.keyCodeToString = function(a) {
        return(e[a] || String.fromCharCode(a)).toLowerCase()
    }
}),define("pilot/event_emitter", ["require","exports","module"], function(a, b, c) {
    var d = {};
    d._emit = d._dispatchEvent = function(a, b) {
        this._eventRegistry = this._eventRegistry || {};
        var c = this._eventRegistry[a];
        if (!!c && !!c.length) {
            var b = b || {};
            b.type = a;
            for (var d = 0; d < c.length; d++)c[d](b)
        }
    },d.on = d.addEventListener = function(a, b) {
        this._eventRegistry = this._eventRegistry || {};
        var c = this._eventRegistry[a];
        if (!c)var c = this._eventRegistry[a] = [];
        c.indexOf(b) == -1 && c.push(b)
    },d.removeListener = d.removeEventListener = function(a, b) {
        this._eventRegistry = this._eventRegistry || {};
        var c = this._eventRegistry[a];
        if (!!c) {
            var d = c.indexOf(b);
            d !== -1 && c.splice(d, 1)
        }
    },d.removeAllListeners = function(a) {
        this._eventRegistry && (this._eventRegistry[a] = [])
    },b.EventEmitter = d
}),define("pilot/typecheck", ["require","exports","module"], function(a, b, c) {
    var d = Object.prototype.toString;
    b.isString = function(a) {
        return a && d.call(a) === "[object String]"
    },b.isBoolean = function(a) {
        return a && d.call(a) === "[object Boolean]"
    },b.isNumber = function(a) {
        return a && d.call(a) === "[object Number]" && isFinite(a)
    },b.isObject = function(a) {
        return a !== undefined && (a === null || typeof a == "object" || Array.isArray(a) || b.isFunction(a))
    },b.isFunction = function(a) {
        return a && d.call(a) === "[object Function]"
    }
}),define("pilot/catalog", ["require","exports","module"], function(a, b, c) {
    var d = {};
    b.addExtensionSpec = function(a) {
        d[a.name] = a
    },b.removeExtensionSpec = function(a) {
        typeof a == "string" ? delete d[a] : delete d[a.name]
    },b.getExtensionSpec = function(a) {
        return d[a]
    },b.getExtensionSpecs = function() {
        return Object.keys(d)
    }
}),define("pilot/lang", ["require","exports","module"], function(a, b, c) {
    b.stringReverse = function(a) {
        return a.split("").reverse().join("")
    },b.stringRepeat = function(a, b) {
        return Array(b + 1).join(a)
    };
    var d = /^\s\s*/,e = /\s\s*$/;
    b.stringTrimLeft = function(a) {
        return a.replace(d, "")
    },b.stringTrimRight = function(a) {
        return a.replace(e, "")
    },b.copyObject = function(a) {
        var b = {};
        for (var c in a)b[c] = a[c];
        return b
    },b.copyArray = function(a) {
        var b = [];
        for (i = 0,l = a.length; i < l; i++)a[i] && typeof a[i] == "object" ? b[i] = this.copyObject(a[i]) : b[i] = a[i];
        return b
    },b.deepCopy = function(a) {
        if (typeof a != "object")return a;
        var b = a.constructor();
        for (var c in a)typeof a[c] == "object" ? b[c] = this.deepCopy(a[c]) : b[c] = a[c];
        return b
    },b.arrayToMap = function(a) {
        var b = {};
        for (var c = 0; c < a.length; c++)b[a[c]] = 1;
        return b
    },b.arrayRemove = function(a, b) {
        for (var c = 0; c <= a.length; c++)b === a[c] && a.splice(c, 1)
    },b.escapeRegExp = function(a) {
        return a.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1")
    },b.deferredCall = function(a) {
        var b = null,c = function() {
            b = null,a()
        },d = function(a) {
            b || (b = setTimeout(c, a || 0));
            return d
        };
        d.schedule = d,d.call = function() {
            this.cancel(),a();
            return d
        },d.cancel = function() {
            clearTimeout(b),b = null;
            return d
        };
        return d
    }
}),define("pilot/types/settings", ["require","exports","module","pilot/types/basic","pilot/types","pilot/settings"], function(a, b, c) {
    var d = a("pilot/types/basic").SelectionType,e = a("pilot/types/basic").DeferredType,f = a("pilot/types"),g = a("pilot/settings").settings,h,i = new d({name:"setting",data:function() {
        return k.settings.getSettingNames()
    },stringify:function(a) {
        h = a;
        return a.name
    },fromString:function(a) {
        h = g.getSetting(a);
        return h
    },noMatch:function() {
        h = null
    }}),j = new e({name:"settingValue",defer:function() {
        return h ? h.type : f.getType("text")
    },getDefault:function() {
        var a = this.parse("");
        if (h) {
            var b = h.get();
            if (a.predictions.length === 0)a.predictions.push(b); else {
                var c = !1;
                for (; ;) {
                    var d = a.predictions.indexOf(b);
                    if (d === -1)break;
                    a.predictions.splice(d, 1),c = !0
                }
                c && a.predictions.push(b)
            }
        }
        return a
    }}),k;
    b.startup = function(a, b) {
        k = a.env,f.registerType(i),f.registerType(j)
    },b.shutdown = function(a, b) {
        f.unregisterType(i),f.unregisterType(j)
    }
}),define("pilot/settings", ["require","exports","module","pilot/console","pilot/oop","pilot/types","pilot/event_emitter","pilot/catalog"], function(a, b, c) {
    function l() {
    }

    function k(a) {
        this._deactivated = {},this._settings = {},this._settingNames = [],a && this.setPersister(a)
    }

    function j(a, b) {
        this._settings = b,Object.keys(a).forEach(function(b) {
            this[b] = a[b]
        }, this),this.type = f.getType(this.type);
        if (this.type == null)throw new Error("In " + this.name + ": can't find type for: " + JSON.stringify(a.type));
        if (!this.name)throw new Error("Setting.name == undefined. Ignoring.", this);
        if (!this.defaultValue === undefined)throw new Error("Setting.defaultValue == undefined", this);
        this.onChange && this.on("change", this.onChange.bind(this)),this.set(this.defaultValue)
    }

    var d = a("pilot/console"),e = a("pilot/oop"),f = a("pilot/types"),g = a("pilot/event_emitter").EventEmitter,h = a("pilot/catalog"),i = {name:"setting",description:"A setting is something that the application offers as a way to customize how it works",register:"env.settings.addSetting",indexOn:"name"};
    b.startup = function(a, b) {
        h.addExtensionSpec(i)
    },b.shutdown = function(a, b) {
        h.removeExtensionSpec(i)
    },j.prototype = {get:function() {
        return this.value
    },set:function(a) {
        this.value !== a && (this.value = a,this._settings.persister && this._settings.persister.persistValue(this._settings, this.name, a),this._dispatchEvent("change", {setting:this,value:a}))
    },resetValue:function() {
        this.set(this.defaultValue)
    }},e.implement(j.prototype, g),k.prototype = {addSetting:function(a) {
        var b = new j(a, this);
        this._settings[b.name] = b,this._settingNames.push(b.name),this._settingNames.sort()
    },addSettings:function(a) {
        Object.keys(a).forEach(function(b) {
            var c = a[b];
            "name"in c || (c.name = b),this.addSetting(c)
        }, this)
    },removeSetting:function(a) {
        var b = typeof a == "string" ? a : a.name;
        a = this._settings[b],delete this._settings[b],util.arrayRemove(this._settingNames, b),settings.removeAllListeners("change")
    },removeSettings:function(a) {
        Object.keys(a).forEach(function(b) {
            var c = a[b];
            "name"in c || (c.name = b),this.removeSettings(c)
        }, this)
    },getSettingNames:function() {
        return this._settingNames
    },getSetting:function(a) {
        return this._settings[a]
    },setPersister:function(a) {
        this._persister = a,a && a.loadInitialValues(this)
    },resetAll:function() {
        this.getSettingNames().forEach(function(a) {
            this.resetValue(a)
        }, this)
    },_list:function() {
        var a = [];
        this.getSettingNames().forEach(function(b) {
            a.push({key:b,value:this.getSetting(b).get()})
        }, this);
        return a
    },_loadDefaultValues:function() {
        this._loadFromObject(this._getDefaultValues())
    },_loadFromObject:function(a) {
        for (var b in a)if (a.hasOwnProperty(b)) {
            var c = this._settings[b];
            if (c) {
                var d = c.type.parse(a[b]);
                this.set(b, d)
            } else this.set(b, a[b])
        }
    },_saveToObject:function() {
        return this.getSettingNames().map(function(a) {
            return this._settings[a].type.stringify(this.get(a))
        }.bind(this))
    },_getDefaultValues:function() {
        return this.getSettingNames().map(function(a) {
            return this._settings[a].spec.defaultValue
        }.bind(this))
    }},b.settings = new k,l.prototype = {loadInitialValues:function(a) {
        a._loadDefaultValues();
        var b = cookie.get("settings");
        a._loadFromObject(JSON.parse(b))
    },persistValue:function(a, b, c) {
        try {
            var e = JSON.stringify(a._saveToObject());
            cookie.set("settings", e)
        } catch(f) {
            d.error("Unable to JSONify the settings! " + f);
            return
        }
    }},b.CookiePersister = l
}),define("pilot/commands/settings", ["require","exports","module","pilot/canon"], function(a, b, c) {
    var d = {name:"set",params:[
        {name:"setting",type:"setting",description:"The name of the setting to display or alter",defaultValue:null},
        {name:"value",type:"settingValue",description:"The new value for the chosen setting",defaultValue:null}
    ],description:"define and show settings",exec:function(a, b, c) {
        var d;
        if (!b.setting) {
            var e = a.settings.getSettingNames();
            d = "",e.sort(function(a, b) {
                return a.localeCompare(b)
            }),e.forEach(function(b) {
                var c = a.settings.getSetting(b),e = "https://wiki.mozilla.org/Labs/Skywriter/Settings#" + c.name;
                d += '<a class="setting" href="' + e + '" title="View external documentation on setting: ' + c.name + '" target="_blank">' + c.name + "</a> = " + c.value + "<br/>"
            })
        } else b.value === undefined ? d = "<strong>" + setting.name + "</strong> = " + setting.get() : (b.setting.set(b.value),d = "Setting: <strong>" + b.setting.name + "</strong> = " + b.setting.get());
        c.done(d)
    }},e = {name:"unset",params:[
        {name:"setting",type:"setting",description:"The name of the setting to return to defaults"}
    ],description:"unset a setting entirely",exec:function(a, b, c) {
        var d = a.settings.get(b.setting);
        d ? (d.reset(),c.done("Reset " + d.name + " to default: " + a.settings.get(b.setting))) : c.doneWithError("No setting with the name <strong>" + b.setting + "</strong>.")
    }},f = a("pilot/canon");
    b.startup = function(a, b) {
        f.addCommand(d),f.addCommand(e)
    },b.shutdown = function(a, b) {
        f.removeCommand(d),f.removeCommand(e)
    }
}),define("pilot/commands/basic", ["require","exports","module","pilot/typecheck","pilot/canon"], function(require, exports, module) {
    var checks = require("pilot/typecheck"),canon = require("pilot/canon"),helpMessages = {plainPrefix:'<h2>Welcome to Skywriter - Code in the Cloud</h2><ul><li><a href="http://labs.mozilla.com/projects/skywriter" target="_blank">Home Page</a></li><li><a href="https://wiki.mozilla.org/Labs/Skywriter" target="_blank">Wiki</a></li><li><a href="https://wiki.mozilla.org/Labs/Skywriter/UserGuide" target="_blank">User Guide</a></li><li><a href="https://wiki.mozilla.org/Labs/Skywriter/Tips" target="_blank">Tips and Tricks</a></li><li><a href="https://wiki.mozilla.org/Labs/Skywriter/FAQ" target="_blank">FAQ</a></li><li><a href="https://wiki.mozilla.org/Labs/Skywriter/DeveloperGuide" target="_blank">Developers Guide</a></li></ul>',plainSuffix:'For more information, see the <a href="https://wiki.mozilla.org/Labs/Skywriter">Skywriter Wiki</a>.'},helpCommandSpec = {name:"help",params:[
        {name:"search",type:"text",description:"Search string to narrow the output.",defaultValue:null}
    ],description:"Get help on the available commands.",exec:function(a, b, c) {
        var d = [],e = canon.getCommand(b.search);
        if (e && e.exec)d.push(e.description ? e.description : "No description for " + b.search); else {
            var f = !1;
            !b.search && helpMessages.plainPrefix && d.push(helpMessages.plainPrefix),e ? (d.push("<h2>Sub-Commands of " + e.name + "</h2>"),d.push("<p>" + e.description + "</p>")) : b.search ? (b.search == "hidden" && (b.search = "",f = !0),d.push("<h2>Commands starting with '" + b.search + "':</h2>")) : d.push("<h2>Available Commands:</h2>");
            var g = canon.getCommandNames();
            g.sort(),d.push("<table>");
            for (var h = 0; h < g.length; h++) {
                e = canon.getCommand(g[h]);
                if (!f && e.hidden)continue;
                if (e.description === undefined)continue;
                if (b.search && e.name.indexOf(b.search) !== 0)continue;
                if (!b.search && e.name.indexOf(" ") != -1)continue;
                if (e && e.name == b.search)continue;
                d.push("<tr>"),d.push('<th class="right">' + e.name + "</th>"),d.push("<td>" + e.description + "</td>"),d.push("</tr>")
            }
            d.push("</table>"),!b.search && helpMessages.plainSuffix && d.push(helpMessages.plainSuffix)
        }
        c.done(d.join(""))
    }},evalCommandSpec = {name:"eval",params:[
        {name:"javascript",type:"text",description:"The JavaScript to evaluate"}
    ],description:"evals given js code and show the result",hidden:!0,exec:function(env, args, request) {
        var result,javascript = args.javascript;
        try {
            result = eval(javascript)
        } catch(e) {
            result = "<b>Error: " + e.message + "</b>"
        }
        var msg = "",type = "",x;
        if (checks.isFunction(result))msg = (result + "").replace(/\n/g, "<br>").replace(/ /g, "&#160"),type = "function"; else if (checks.isObject(result)) {
            Array.isArray(result) ? type = "array" : type = "object";
            var items = [],value;
            for (x in result)result.hasOwnProperty(x) && (checks.isFunction(result[x]) ? value = "[function]" : checks.isObject(result[x]) ? value = "[object]" : value = result[x],items.push({name:x,value:value}));
            items.sort(function(a, b) {
                return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
            });
            for (x = 0; x < items.length; x++)msg += "<b>" + items[x].name + "</b>: " + items[x].value + "<br>"
        } else msg = result,type = typeof result;
        request.done("Result for eval <b>'" + javascript + "'</b>" + " (type: " + type + "): <br><br>" + msg)
    }},versionCommandSpec = {name:"version",description:"show the Skywriter version",hidden:!0,exec:function(a, b, c) {
        var d = "Skywriter " + skywriter.versionNumber + " (" + skywriter.versionCodename + ")";
        c.done(d)
    }},skywriterCommandSpec = {name:"skywriter",hidden:!0,exec:function(a, b, c) {
        var d = Math.floor(Math.random() * messages.length);
        c.done("Skywriter " + messages[d])
    }},messages = ["really wants you to trick it out in some way.","is your Web editor.","would love to be like Emacs on the Web.","is written on the Web platform, so you can tweak it."],canon = require("pilot/canon");
    exports.startup = function(a, b) {
        canon.addCommand(helpCommandSpec),canon.addCommand(evalCommandSpec),canon.addCommand(skywriterCommandSpec)
    },exports.shutdown = function(a, b) {
        canon.removeCommand(helpCommandSpec),canon.removeCommand(evalCommandSpec),canon.removeCommand(skywriterCommandSpec)
    }
}),define("pilot/settings/canon", ["require","exports","module"], function(a, b, c) {
    var d = {name:"historyLength",description:"How many typed commands do we recall for reference?",type:"number",defaultValue:50};
    b.startup = function(a, b) {
        a.env.settings.addSetting(d)
    },b.shutdown = function(a, b) {
        a.env.settings.removeSetting(d)
    }
}),define("pilot/plugin_manager", ["require","exports","module","pilot/promise"], function(a, b, c) {
    var d = a("pilot/promise").Promise;
    b.REASONS = {APP_STARTUP:1,APP_SHUTDOWN:2,PLUGIN_ENABLE:3,PLUGIN_DISABLE:4,PLUGIN_INSTALL:5,PLUGIN_UNINSTALL:6,PLUGIN_UPGRADE:7,PLUGIN_DOWNGRADE:8},b.Plugin = function(a) {
        this.name = a,this.status = this.INSTALLED
    },b.Plugin.prototype = {NEW:0,INSTALLED:1,REGISTERED:2,STARTED:3,UNREGISTERED:4,SHUTDOWN:5,install:function(b, c) {
        var e = new d;
        if (this.status > this.NEW) {
            e.resolve(this);
            return e
        }
        a([this.name], function(a) {
            a.install && a.install(b, c),this.status = this.INSTALLED,e.resolve(this)
        }.bind(this));
        return e
    },register:function(b, c) {
        var e = new d;
        if (this.status != this.INSTALLED) {
            e.resolve(this);
            return e
        }
        a([this.name], function(a) {
            a.register && a.register(b, c),this.status = this.REGISTERED,e.resolve(this)
        }.bind(this));
        return e
    },startup:function(c, e) {
        e = e || b.REASONS.APP_STARTUP;
        var f = new d;
        if (this.status != this.REGISTERED) {
            f.resolve(this);
            return f
        }
        a([this.name], function(a) {
            a.startup && a.startup(c, e),this.status = this.STARTED,f.resolve(this)
        }.bind(this));
        return f
    },shutdown:function(b, c) {
        this.status == this.STARTED && (pluginModule = a(this.name),pluginModule.shutdown && pluginModule.shutdown(b, c))
    }},b.PluginCatalog = function() {
        this.plugins = {}
    },b.PluginCatalog.prototype = {registerPlugins:function(a, c, e) {
        var f = [];
        a.forEach(function(a) {
            var d = this.plugins[a];
            d === undefined && (d = new b.Plugin(a),this.plugins[a] = d,f.push(d.register(c, e)))
        }.bind(this));
        return d.group(f)
    },startupPlugins:function(a, b) {
        var c = [];
        for (var e in this.plugins) {
            var f = this.plugins[e];
            c.push(f.startup(a, b))
        }
        return d.group(c)
    }},b.catalog = new b.PluginCatalog
}),define("pilot/promise", ["require","exports","module","pilot/console","pilot/stacktrace"], function(a, b, c) {
    var d = a("pilot/console"),e = a("pilot/stacktrace").Trace,f = -1,g = 0,h = 1,i = 0,j = !1,k = [],l = [];
    Promise = function() {
        this._status = g,this._value = undefined,this._onSuccessHandlers = [],this._onErrorHandlers = [],this._id = i++,k[this._id] = this
    },Promise.prototype.isPromise = !0,Promise.prototype.isComplete = function() {
        return this._status != g
    },Promise.prototype.isResolved = function() {
        return this._status == h
    },Promise.prototype.isRejected = function() {
        return this._status == f
    },Promise.prototype.then = function(a, b) {
        typeof a == "function" && (this._status === h ? a.call(null, this._value) : this._status === g && this._onSuccessHandlers.push(a)),typeof b == "function" && (this._status === f ? b.call(null, this._value) : this._status === g && this._onErrorHandlers.push(b));
        return this
    },Promise.prototype.chainPromise = function(a) {
        var b = new Promise;
        b._chainedFrom = this,this.then(function(c) {
            try {
                b.resolve(a(c))
            } catch(d) {
                b.reject(d)
            }
        }, function(a) {
            b.reject(a)
        });
        return b
    },Promise.prototype.resolve = function(a) {
        return this._complete(this._onSuccessHandlers, h, a, "resolve")
    },Promise.prototype.reject = function(a) {
        return this._complete(this._onErrorHandlers, f, a, "reject")
    },Promise.prototype._complete = function(a, b, c, f) {
        if (this._status != g) {
            d.group("Promise already closed"),d.error("Attempted " + f + "() with ", c),d.error("Previous status = ", this._status, ", previous value = ", this._value),d.trace(),this._completeTrace && (d.error("Trace of previous completion:"),this._completeTrace.log(5)),d.groupEnd();
            return this
        }
        j && (this._completeTrace = new e(new Error)),this._status = b,this._value = c,a.forEach(function(a) {
            a.call(null, this._value)
        }, this),this._onSuccessHandlers.length = 0,this._onErrorHandlers.length = 0,delete k[this._id],l.push(this);
        while (l.length > 20)l.shift();
        return this
    },Promise.group = function(a) {
        a instanceof Array || (a = Array.prototype.slice.call(arguments));
        if (a.length === 0)return(new Promise).resolve([]);
        var b = new Promise,c = [],d = 0,e = function(e) {
            return function(g) {
                c[e] = g,d++,b._status !== f && d === a.length && b.resolve(c)
            }
        };
        a.forEach(function(a, c) {
            var d = e(c),f = b.reject.bind(b);
            a.then(d, f)
        });
        return b
    },b.Promise = Promise,b._outstanding = k,b._recent = l
}),define("pilot/dom", ["require","exports","module"], function(a, b, c) {
    var d = "http://www.w3.org/1999/xhtml";
    b.createElement = function(a, b) {
        return document.createElementNS ? document.createElementNS(b || d, a) : document.createElement(a)
    },b.setText = function(a, b) {
        a.innerText !== undefined && (a.innerText = b),a.textContent !== undefined && (a.textContent = b)
    },document.documentElement.classList ? (b.hasCssClass = function(a, b) {
        return a.classList.contains(b)
    },b.addCssClass = function(a, b) {
        a.classList.add(b)
    },b.removeCssClass = function(a, b) {
        a.classList.remove(b)
    },b.toggleCssClass = function(a, b) {
        return a.classList.toggle(b)
    }) : (b.hasCssClass = function(a, b) {
        var c = a.className.split(/\s+/g);
        return c.indexOf(b) !== -1
    },b.addCssClass = function(a, c) {
        b.hasCssClass(a, c) || (a.className += " " + c)
    },b.removeCssClass = function(a, b) {
        var c = a.className.split(/\s+/g);
        for (; ;) {
            var d = c.indexOf(b);
            if (d == -1)break;
            c.splice(d, 1)
        }
        a.className = c.join(" ")
    },b.toggleCssClass = function(a, b) {
        var c = a.className.split(/\s+/g),d = !0;
        for (; ;) {
            var e = c.indexOf(b);
            if (e == -1)break;
            d = !1,c.splice(e, 1)
        }
        d && c.push(b),a.className = c.join(" ");
        return d
    }),b.setCssClass = function(a, c, d) {
        d ? b.addCssClass(a, c) : b.removeCssClass(a, c)
    },b.importCssString = function(a, b) {
        b = b || document;
        if (b.createStyleSheet) {
            var c = b.createStyleSheet();
            c.cssText = a
        } else {
            var e = b.createElementNS ? b.createElementNS(d, "style") : b.createElement("style");
            e.appendChild(b.createTextNode(a));
            var f = b.getElementsByTagName("head")[0] || b.documentElement;
            f.appendChild(e)
        }
    },b.getInnerWidth = function(a) {
        return parseInt(b.computedStyle(a, "paddingLeft")) + parseInt(b.computedStyle(a, "paddingRight")) + a.clientWidth
    },b.getInnerHeight = function(a) {
        return parseInt(b.computedStyle(a, "paddingTop")) + parseInt(b.computedStyle(a, "paddingBottom")) + a.clientHeight
    },window.pageYOffset !== undefined ? (b.getPageScrollTop = function() {
        return window.pageYOffset
    },b.getPageScrollLeft = function() {
        return window.pageXOffset
    }) : (b.getPageScrollTop = function() {
        return document.body.scrollTop
    },b.getPageScrollLeft = function() {
        return document.body.scrollLeft
    }),window.getComputedStyle ? b.computedStyle = function(a, b) {
        return b ? (window.getComputedStyle(a, "") || {})[b] || "" : window.getComputedStyle(a, "") || {}
    } : b.computedStyle = function(a, b) {
        return b ? a.currentStyle[b] : a.currentStyle
    },b.scrollbarWidth = function() {
        var a = b.createElement("p");
        a.style.width = "100%",a.style.height = "200px";
        var c = b.createElement("div"),d = c.style;
        d.position = "absolute",d.left = "-10000px",d.overflow = "hidden",d.width = "200px",d.height = "150px",c.appendChild(a);
        var e = document.body || document.documentElement;
        e.appendChild(c);
        var f = a.offsetWidth;
        d.overflow = "scroll";
        var g = a.offsetWidth;
        f == g && (g = c.clientWidth),e.removeChild(c);
        return f - g
    },b.setInnerHtml = function(a, b) {
        var c = a.cloneNode(!1);
        c.innerHTML = b,a.parentNode.replaceChild(c, a);
        return c
    },b.setInnerText = function(a, b) {
        document.body && "textContent"in document.body ? a.textContent = b : a.innerText = b
    },b.getInnerText = function(a) {
        return document.body && "textContent"in document.body ? a.textContent : a.innerText || a.textContent || ""
    },b.getParentWindow = function(a) {
        return a.defaultView || a.parentWindow
    },b.getSelectionStart = function(a) {
        var b;
        try {
            b = a.selectionStart || 0
        } catch(c) {
            b = 0
        }
        return b
    },b.setSelectionStart = function(a, b) {
        return a.selectionStart = b
    },b.getSelectionEnd = function(a) {
        var b;
        try {
            b = a.selectionEnd || 0
        } catch(c) {
            b = 0
        }
        return b
    },b.setSelectionEnd = function(a, b) {
        return a.selectionEnd = b
    }
}),define("pilot/event", ["require","exports","module","pilot/keys","pilot/useragent","pilot/dom"], function(a, b, c) {
    function g(a, b, c) {
        var f = 0;
        e.isOpera && e.isMac ? f = 0 | (b.metaKey ? 1 : 0) | (b.altKey ? 2 : 0) | (b.shiftKey ? 4 : 0) | (b.ctrlKey ? 8 : 0) : f = 0 | (b.ctrlKey ? 1 : 0) | (b.altKey ? 2 : 0) | (b.shiftKey ? 4 : 0) | (b.metaKey ? 8 : 0);
        if (c in d.MODIFIER_KEYS) {
            switch (d.MODIFIER_KEYS[c]) {
                case"Alt":
                    f = 2;
                    break;
                case"Shift":
                    f = 4;
                    break;
                case"Ctrl":
                    f = 1;
                    break;
                default:
                    f = 8
            }
            c = 0
        }
        f & 8 && (c == 91 || c == 93) && (c = 0);
        return f != 0 || c in d.FUNCTION_KEYS ? a(b, f, c) : !1
    }

    var d = a("pilot/keys"),e = a("pilot/useragent"),f = a("pilot/dom");
    b.addListener = function(a, b, c) {
        if (a.addEventListener)return a.addEventListener(b, c, !1);
        if (a.attachEvent) {
            var d = function() {
                c(window.event)
            };
            c._wrapper = d,a.attachEvent("on" + b, d)
        }
    },b.removeListener = function(a, b, c) {
        if (a.removeEventListener)return a.removeEventListener(b, c, !1);
        a.detachEvent && a.detachEvent("on" + b, c._wrapper || c)
    },b.stopEvent = function(a) {
        b.stopPropagation(a),b.preventDefault(a);
        return!1
    },b.stopPropagation = function(a) {
        a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
    },b.preventDefault = function(a) {
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    },b.getDocumentX = function(a) {
        return a.clientX ? a.clientX + f.getPageScrollLeft() : a.pageX
    },b.getDocumentY = function(a) {
        return a.clientY ? a.clientY + f.getPageScrollTop() : a.pageY
    },b.getButton = function(a) {
        if (a.type == "dblclick")return 0;
        if (a.type == "contextmenu")return 2;
        return a.preventDefault ? a.button : {1:0,2:2,4:1}[a.button]
    },document.documentElement.setCapture ? b.capture = function(a, c, d) {
        function f(e) {
            c && c(e),d && d(),b.removeListener(a, "mousemove", c),b.removeListener(a, "mouseup", f),b.removeListener(a, "losecapture", f),a.releaseCapture()
        }

        function e(a) {
            c(a);
            return b.stopPropagation(a)
        }

        b.addListener(a, "mousemove", c),b.addListener(a, "mouseup", f),b.addListener(a, "losecapture", f),a.setCapture()
    } : b.capture = function(a, b, c) {
        function e(a) {
            b && b(a),c && c(),document.removeEventListener("mousemove", d, !0),document.removeEventListener("mouseup", e, !0),a.stopPropagation()
        }

        function d(a) {
            b(a),a.stopPropagation()
        }

        document.addEventListener("mousemove", d, !0),document.addEventListener("mouseup", e, !0)
    },b.addMouseWheelListener = function(a, c) {
        var d = function(a) {
            a.wheelDelta !== undefined ? a.wheelDeltaX !== undefined ? (a.wheelX = -a.wheelDeltaX / 8,a.wheelY = -a.wheelDeltaY / 8) : (a.wheelX = 0,a.wheelY = -a.wheelDelta / 8) : a.axis && a.axis == a.HORIZONTAL_AXIS ? (a.wheelX = (a.detail || 0) * 5,a.wheelY = 0) : (a.wheelX = 0,a.wheelY = (a.detail || 0) * 5),c(a)
        };
        b.addListener(a, "DOMMouseScroll", d),b.addListener(a, "mousewheel", d)
    },b.addMultiMouseDownListener = function(a, c, d, f, g) {
        var h = 0,i,j,k = function(a) {
            h += 1,h == 1 && (i = a.clientX,j = a.clientY,setTimeout(function() {
                h = 0
            }, f || 600));
            var e = b.getButton(a) == c;
            if (!e || Math.abs(a.clientX - i) > 5 || Math.abs(a.clientY - j) > 5)h = 0;
            h == d && (h = 0,g(a));
            if (e)return b.preventDefault(a)
        };
        b.addListener(a, "mousedown", k),e.isIE && b.addListener(a, "dblclick", k)
    },b.addCommandKeyListener = function(a, c) {
        var d = b.addListener;
        if (e.isOldGecko) {
            var f = null;
            d(a, "keydown", function(a) {
                f = a.keyCode
            }),d(a, "keypress", function(a) {
                return g(c, a, f)
            })
        } else {
            var h = null;
            d(a, "keydown", function(a) {
                h = a.keyIdentifier || a.keyCode;
                return g(c, a, a.keyCode)
            }),e.isMac && e.isOpera && d(a, "keypress", function(a) {
                var b = a.keyIdentifier || a.keyCode;
                if (h !== b)return g(c, a, a.keyCode);
                h = null
            })
        }
    }
}),define("ace/editor", ["require","exports","module","pilot/fixoldbrowsers","pilot/oop","pilot/event","pilot/lang","pilot/useragent","ace/keyboard/textinput","ace/mouse_handler","ace/keyboard/keybinding","ace/edit_session","ace/search","ace/range","pilot/event_emitter"], function(a, b, c) {
    a("pilot/fixoldbrowsers");
    var d = a("pilot/oop"),e = a("pilot/event"),f = a("pilot/lang"),g = a("pilot/useragent"),h = a("ace/keyboard/textinput").TextInput,i = a("ace/mouse_handler").MouseHandler,j = a("ace/keyboard/keybinding").KeyBinding,k = a("ace/edit_session").EditSession,l = a("ace/search").Search,m = a("ace/range").Range,n = a("pilot/event_emitter").EventEmitter,o = function(a, b) {
        var c = a.getContainerElement();
        this.container = c,this.renderer = a,this.textInput = new h(a.getTextAreaContainer(), this),this.keyBinding = new j(this),g.isIPad || (this.$mouseHandler = new i(this)),this.$blockScrolling = 0,this.$search = (new l).set({wrap:!0}),this.setSession(b || new k(""))
    };
    (function() {
        d.implement(this, n),this.$forwardEvents = {gutterclick:1,gutterdblclick:1},this.$originalAddEventListener = this.addEventListener,this.$originalRemoveEventListener = this.removeEventListener,this.addEventListener = function(a, b) {
            return this.$forwardEvents[a] ? this.renderer.addEventListener(a, b) : this.$originalAddEventListener(a, b)
        },this.removeEventListener = function(a, b) {
            return this.$forwardEvents[a] ? this.renderer.removeEventListener(a, b) : this.$originalRemoveEventListener(a, b)
        },this.setKeyboardHandler = function(a) {
            this.keyBinding.setKeyboardHandler(a)
        },this.getKeyboardHandler = function() {
            return this.keyBinding.getKeyboardHandler()
        },this.setSession = function(a) {
            if (this.session != a) {
                if (this.session) {
                    var b = this.session;
                    this.session.removeEventListener("change", this.$onDocumentChange),this.session.removeEventListener("changeMode", this.$onChangeMode),this.session.removeEventListener("tokenizerUpdate", this.$onTokenizerUpdate),this.session.removeEventListener("changeTabSize", this.$onChangeTabSize),this.session.removeEventListener("changeWrapLimit", this.$onChangeWrapLimit),this.session.removeEventListener("changeWrapMode", this.$onChangeWrapMode),this.session.removeEventListener("onChangeFold", this.$onChangeFold),this.session.removeEventListener("changeFrontMarker", this.$onChangeFrontMarker),this.session.removeEventListener("changeBackMarker", this.$onChangeBackMarker),this.session.removeEventListener("changeBreakpoint", this.$onChangeBreakpoint),this.session.removeEventListener("changeAnnotation", this.$onChangeAnnotation),this.session.removeEventListener("changeOverwrite", this.$onCursorChange);
                    var c = this.session.getSelection();
                    c.removeEventListener("changeCursor", this.$onCursorChange),c.removeEventListener("changeSelection", this.$onSelectionChange),this.session.setScrollTopRow(this.renderer.getScrollTopRow())
                }
                this.session = a,this.$onDocumentChange = this.onDocumentChange.bind(this),a.addEventListener("change", this.$onDocumentChange),this.renderer.setSession(a),this.$onChangeMode = this.onChangeMode.bind(this),a.addEventListener("changeMode", this.$onChangeMode),this.$onTokenizerUpdate = this.onTokenizerUpdate.bind(this),a.addEventListener("tokenizerUpdate", this.$onTokenizerUpdate),this.$onChangeTabSize = this.renderer.updateText.bind(this.renderer),a.addEventListener("changeTabSize", this.$onChangeTabSize),this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this),a.addEventListener("changeWrapLimit", this.$onChangeWrapLimit),this.$onChangeWrapMode = this.onChangeWrapMode.bind(this),a.addEventListener("changeWrapMode", this.$onChangeWrapMode),this.$onChangeFold = this.onChangeFold.bind(this),a.addEventListener("changeFold", this.$onChangeFold),this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this),this.session.addEventListener("changeFrontMarker", this.$onChangeFrontMarker),this.$onChangeBackMarker = this.onChangeBackMarker.bind(this),this.session.addEventListener("changeBackMarker", this.$onChangeBackMarker),this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this),this.session.addEventListener("changeBreakpoint", this.$onChangeBreakpoint),this.$onChangeAnnotation = this.onChangeAnnotation.bind(this),this.session.addEventListener("changeAnnotation", this.$onChangeAnnotation),this.$onCursorChange = this.onCursorChange.bind(this),this.session.addEventListener("changeOverwrite", this.$onCursorChange),this.selection = a.getSelection(),this.selection.addEventListener("changeCursor", this.$onCursorChange),this.$onSelectionChange = this.onSelectionChange.bind(this),this.selection.addEventListener("changeSelection", this.$onSelectionChange),this.onChangeMode(),this.onCursorChange(),this.onSelectionChange(),this.onChangeFrontMarker(),this.onChangeBackMarker(),this.onChangeBreakpoint(),this.onChangeAnnotation(),this.session.getUseWrapMode() && this.renderer.adjustWrapLimit(),this.renderer.scrollToRow(a.getScrollTopRow()),this.renderer.updateFull(),this._dispatchEvent("changeSession", {session:a,oldSession:b})
            }
        },this.getSession = function() {
            return this.session
        },this.getSelection = function() {
            return this.selection
        },this.resize = function() {
            this.renderer.onResize()
        },this.setTheme = function(a) {
            this.renderer.setTheme(a)
        },this.getTheme = function() {
            return this.renderer.getTheme()
        },this.setStyle = function(a) {
            this.renderer.setStyle(a)
        },this.unsetStyle = function(a) {
            this.renderer.unsetStyle(a)
        },this.setFontSize = function(a) {
            this.container.style.fontSize = a
        },this.$highlightBrackets = function() {
            this.session.$bracketHighlight && (this.session.removeMarker(this.session.$bracketHighlight),this.session.$bracketHighlight = null);
            if (!this.$highlightPending) {
                var a = this;
                this.$highlightPending = !0,setTimeout(function() {
                    a.$highlightPending = !1;
                    var b = a.session.findMatchingBracket(a.getCursorPosition());
                    if (b) {
                        var c = new m(b.row, b.column, b.row, b.column + 1);
                        a.session.$bracketHighlight = a.session.addMarker(c, "ace_bracket")
                    }
                }, 10)
            }
        },this.focus = function() {
            var a = this;
            g.isIE || setTimeout(function() {
                a.textInput.focus()
            }),this.textInput.focus()
        },this.blur = function() {
            this.textInput.blur()
        },this.onFocus = function() {
            this.renderer.showCursor(),this.renderer.visualizeFocus(),this._dispatchEvent("focus")
        },this.onBlur = function() {
            this.renderer.hideCursor(),this.renderer.visualizeBlur(),this._dispatchEvent("blur")
        },this.onDocumentChange = function(a) {
            var b = a.data,c = b.range;
            if (c.start.row == c.end.row && b.action != "insertLines" && b.action != "removeLines")var d = c.end.row; else d = Infinity;
            this.renderer.updateLines(c.start.row, d),this.renderer.updateCursor()
        },this.onTokenizerUpdate = function(a) {
            var b = a.data;
            this.renderer.updateLines(b.first, b.last)
        },this.onCursorChange = function(a) {
            this.renderer.updateCursor(),this.$blockScrolling || this.renderer.scrollCursorIntoView(),this.renderer.moveTextAreaToCursor(this.textInput.getElement()),this.$highlightBrackets(),this.$updateHighlightActiveLine()
        },this.$updateHighlightActiveLine = function() {
            var a = this.getSession();
            a.$highlightLineMarker && a.removeMarker(a.$highlightLineMarker),a.$highlightLineMarker = null;
            if (this.getHighlightActiveLine() && (this.getSelectionStyle() != "line" || !this.selection.isMultiLine())) {
                var b = this.getCursorPosition(),c = this.session.getFoldLine(b.row),d;
                c ? d = new m(c.start.row, 0, c.end.row + 1, 0) : d = new m(b.row, 0, b.row + 1, 0),a.$highlightLineMarker = a.addMarker(d, "ace_active_line", "line")
            }
        },this.onSelectionChange = function(a) {
            var b = this.getSession();
            b.$selectionMarker && b.removeMarker(b.$selectionMarker),b.$selectionMarker = null;
            if (!this.selection.isEmpty()) {
                var c = this.selection.getRange(),d = this.getSelectionStyle();
                b.$selectionMarker = b.addMarker(c, "ace_selection", d)
            } else this.$updateHighlightActiveLine();
            this.$highlightSelectedWord && this.session.getMode().highlightSelection(this)
        },this.onChangeFrontMarker = function() {
            this.renderer.updateFrontMarkers()
        },this.onChangeBackMarker = function() {
            this.renderer.updateBackMarkers()
        },this.onChangeBreakpoint = function() {
            this.renderer.setBreakpoints(this.session.getBreakpoints())
        },this.onChangeAnnotation = function() {
            this.renderer.setAnnotations(this.session.getAnnotations())
        },this.onChangeMode = function() {
            this.renderer.updateText()
        },this.onChangeWrapLimit = function() {
            this.renderer.updateFull()
        },this.onChangeWrapMode = function() {
            this.renderer.onResize(!0)
        },this.onChangeFold = function() {
            this.$updateHighlightActiveLine(),this.renderer.updateFull()
        },this.getCopyText = function() {
            return this.selection.isEmpty() ? "" : this.session.getTextRange(this.getSelectionRange())
        },this.onCut = function() {
            this.$readOnly || this.selection.isEmpty() || (this.session.remove(this.getSelectionRange()),this.clearSelection())
        },this.insert = function(a) {
            if (!this.$readOnly) {
                var b = this.session,c = b.getMode(),d = this.getCursorPosition();
                if (this.getBehavioursEnabled()) {
                    var e = c.transformAction(b.getState(d.row), "insertion", this, b, a);
                    e && (a = e.text)
                }
                a = a.replace("\t", this.session.getTabString());
                if (!this.selection.isEmpty()) {
                    var d = this.session.remove(this.getSelectionRange());
                    this.clearSelection()
                } else if (this.session.getOverwrite()) {
                    var f = new m.fromPoints(d, d);
                    f.end.column += a.length,this.session.remove(f)
                }
                this.clearSelection();
                var g = d.column,h = b.getState(d.row),i = c.checkOutdent(h, b.getLine(d.row), a),j = b.getLine(d.row),k = c.getNextLineIndent(h, j.slice(0, d.column), b.getTabString()),l = b.insert(d, a);
                e && e.selection && (e.selection.length == 2 ? this.selection.setSelectionRange(new m(d.row, g + e.selection[0], d.row, g + e.selection[1])) : this.selection.setSelectionRange(new m(d.row + e.selection[0], e.selection[1], d.row + e.selection[2], e.selection[3])));
                var h = b.getState(d.row);
                if (b.getDocument().isNewLine(a)) {
                    this.moveCursorTo(d.row + 1, 0);
                    var n = b.getTabSize(),o = Number.MAX_VALUE;
                    for (var p = d.row + 1; p <= l.row; ++p) {
                        var q = 0;
                        j = b.getLine(p);
                        for (var r = 0; r < j.length; ++r)if (j.charAt(r) == "\t")q += n; else if (j.charAt(r) == " ")q += 1; else break;
                        /[^\s]/.test(j) && (o = Math.min(q, o))
                    }
                    for (var p = d.row + 1; p <= l.row; ++p) {
                        var s = o;
                        j = b.getLine(p);
                        for (var r = 0; r < j.length && s > 0; ++r)j.charAt(r) == "\t" ? s -= n : j.charAt(r) == " " && (s -= 1);
                        b.remove(new m(p, 0, p, r))
                    }
                    b.indentRows(d.row + 1, l.row, k)
                } else i && c.autoOutdent(h, b, d.row)
            }
        },this.onTextInput = function(a) {
            this.keyBinding.onTextInput(a)
        },this.onCommandKey = function(a, b, c) {
            this.keyBinding.onCommandKey(a, b, c)
        },this.setOverwrite = function(a) {
            this.session.setOverwrite(a)
        },this.getOverwrite = function() {
            return this.session.getOverwrite()
        },this.toggleOverwrite = function() {
            this.session.toggleOverwrite()
        },this.setScrollSpeed = function(a) {
            this.$mouseHandler.setScrollSpeed(a)
        },this.getScrollSpeed = function() {
            return this.$mouseHandler.getScrollSpeed()
        },this.$selectionStyle = "line",this.setSelectionStyle = function(a) {
            this.$selectionStyle != a && (this.$selectionStyle = a,this.onSelectionChange(),this._dispatchEvent("changeSelectionStyle", {data:a}))
        },this.getSelectionStyle = function() {
            return this.$selectionStyle
        },this.$highlightActiveLine = !0,this.setHighlightActiveLine = function(a) {
            this.$highlightActiveLine != a && (this.$highlightActiveLine = a,this.$updateHighlightActiveLine())
        },this.getHighlightActiveLine = function() {
            return this.$highlightActiveLine
        },this.$highlightSelectedWord = !0,this.setHighlightSelectedWord = function(a) {
            this.$highlightSelectedWord != a && (this.$highlightSelectedWord = a,a ? this.session.getMode().highlightSelection(this) : this.session.getMode().clearSelectionHighlight(this))
        },this.getHighlightSelectedWord = function() {
            return this.$highlightSelectedWord
        },this.setShowInvisibles = function(a) {
            this.getShowInvisibles() != a && this.renderer.setShowInvisibles(a)
        },this.getShowInvisibles = function() {
            return this.renderer.getShowInvisibles()
        },this.setShowPrintMargin = function(a) {
            this.renderer.setShowPrintMargin(a)
        },this.getShowPrintMargin = function() {
            return this.renderer.getShowPrintMargin()
        },this.setPrintMarginColumn = function(a) {
            this.renderer.setPrintMarginColumn(a)
        },this.getPrintMarginColumn = function() {
            return this.renderer.getPrintMarginColumn()
        },this.$readOnly = !1,this.setReadOnly = function(a) {
            this.$readOnly = a
        },this.getReadOnly = function() {
            return this.$readOnly
        },this.$modeBehaviours = !1,this.setBehavioursEnabled = function(a) {
            this.$modeBehaviours = a
        },this.getBehavioursEnabled = function() {
            return this.$modeBehaviours
        },this.removeRight = function() {
            this.$readOnly || (this.selection.isEmpty() && this.selection.selectRight(),this.session.remove(this.getSelectionRange()),this.clearSelection())
        },this.removeLeft = function() {
            if (!this.$readOnly) {
                this.selection.isEmpty() && this.selection.selectLeft();
                var a = this.getSelectionRange();
                if (this.getBehavioursEnabled()) {
                    var b = this.session,c = b.getState(a.start.row),d = b.getMode().transformAction(c, "deletion", this, b, a);
                    d !== !1 && (a = d)
                }
                this.session.remove(a),this.clearSelection()
            }
        },this.removeWordRight = function() {
            this.$readOnly || (this.selection.isEmpty() && this.selection.selectWordRight(),this.session.remove(this.getSelectionRange()),this.clearSelection())
        },this.removeWordLeft = function() {
            this.$readOnly || (this.selection.isEmpty() && this.selection.selectWordLeft(),this.session.remove(this.getSelectionRange()),this.clearSelection())
        },this.removeToLineStart = function() {
            this.$readOnly || (this.selection.isEmpty() && this.selection.selectLineStart(),this.session.remove(this.getSelectionRange()),this.clearSelection())
        },this.removeToLineEnd = function() {
            if (!this.$readOnly) {
                this.selection.isEmpty() && this.selection.selectLineEnd();
                var a = this.getSelectionRange();
                a.start.column == a.end.column && a.start.row == a.end.row && (a.end.column = 0,a.end.row++),this.session.remove(a),this.clearSelection()
            }
        },this.splitLine = function() {
            if (!this.$readOnly) {
                this.selection.isEmpty() || (this.session.remove(this.getSelectionRange()),this.clearSelection());
                var a = this.getCursorPosition();
                this.insert("\n"),this.moveCursorToPosition(a)
            }
        },this.transposeLetters = function() {
            if (!this.$readOnly) {
                if (!this.selection.isEmpty())return;
                var a = this.getCursorPosition(),b = a.column;
                if (b == 0)return;
                var c = this.session.getLine(a.row);
                if (b < c.length)var d = c.charAt(b) + c.charAt(b - 1),e = new m(a.row, b - 1, a.row, b + 1); else var d = c.charAt(b - 1) + c.charAt(b - 2),e = new m(a.row, b - 2, a.row, b);
                this.session.replace(e, d)
            }
        },this.indent = function() {
            if (!this.$readOnly) {
                var a = this.session,b = this.getSelectionRange();
                if (!(b.start.row < b.end.row || b.start.column < b.end.column)) {
                    var d;
                    if (this.session.getUseSoftTabs()) {
                        var e = a.getTabSize(),g = this.getCursorPosition(),h = a.documentToScreenColumn(g.row, g.column),i = e - h % e;
                        d = f.stringRepeat(" ", i)
                    } else d = "\t";
                    return this.onTextInput(d)
                }
                var c = this.$getSelectedRows();
                a.indentRows(c.first, c.last, "\t")
            }
        },this.blockOutdent = function() {
            if (!this.$readOnly) {
                var a = this.session.getSelection();
                this.session.outdentRows(a.getRange())
            }
        },this.toggleCommentLines = function() {
            if (!this.$readOnly) {
                var a = this.session.getState(this.getCursorPosition().row),b = this.$getSelectedRows();
                this.session.getMode().toggleCommentLines(a, this.session, b.first, b.last)
            }
        },this.removeLines = function() {
            if (!this.$readOnly) {
                var a = this.$getSelectedRows();
                this.session.remove(new m(a.first, 0, a.last + 1, 0)),this.clearSelection()
            }
        },this.moveLinesDown = function() {
            this.$readOnly || this.$moveLines(function(a, b) {
                return this.session.moveLinesDown(a, b)
            })
        },this.moveLinesUp = function() {
            this.$readOnly || this.$moveLines(function(a, b) {
                return this.session.moveLinesUp(a, b)
            })
        },this.moveText = function(a, b) {
            return this.$readOnly ? null : this.session.moveText(a, b)
        },this.copyLinesUp = function() {
            this.$readOnly || this.$moveLines(function(a, b) {
                this.session.duplicateLines(a, b);
                return 0
            })
        },this.copyLinesDown = function() {
            this.$readOnly || this.$moveLines(function(a, b) {
                return this.session.duplicateLines(a, b)
            })
        },this.$moveLines = function(a) {
            var b = this.$getSelectedRows(),c = a.call(this, b.first, b.last),d = this.selection;
            d.setSelectionAnchor(b.last + c + 1, 0),d.$moveSelection(function() {
                d.moveCursorTo(b.first + c, 0)
            })
        },this.$getSelectedRows = function() {
            var a = this.getSelectionRange().collapseRows();
            return{first:a.start.row,last:a.end.row}
        },this.onCompositionStart = function(a) {
            this.renderer.showComposition(this.getCursorPosition())
        },this.onCompositionUpdate = function(a) {
            this.renderer.setCompositionText(a)
        },this.onCompositionEnd = function() {
            this.renderer.hideComposition()
        },this.getFirstVisibleRow = function() {
            return this.renderer.getFirstVisibleRow()
        },this.getLastVisibleRow = function() {
            return this.renderer.getLastVisibleRow()
        },this.isRowVisible = function(a) {
            return a >= this.getFirstVisibleRow() && a <= this.getLastVisibleRow()
        },this.$getVisibleRowCount = function() {
            return this.renderer.getScrollBottomRow() - this.renderer.getScrollTopRow() + 1
        },this.$getPageDownRow = function() {
            return this.renderer.getScrollBottomRow()
        },this.$getPageUpRow = function() {
            var a = this.renderer.getScrollTopRow(),b = this.renderer.getScrollBottomRow();
            return a - (b - a)
        },this.selectPageDown = function() {
            var a = this.$getPageDownRow() + Math.floor(this.$getVisibleRowCount() / 2);
            this.scrollPageDown();
            var b = this.getSelection(),c = this.session.documentToScreenPosition(b.getSelectionLead()),d = this.session.screenToDocumentPosition(a, c.column);
            b.selectTo(d.row, d.column)
        },this.selectPageUp = function() {
            var a = this.renderer.getScrollTopRow() - this.renderer.getScrollBottomRow(),b = this.$getPageUpRow() + Math.round(a / 2);
            this.scrollPageUp();
            var c = this.getSelection(),d = this.session.documentToScreenPosition(c.getSelectionLead()),e = this.session.screenToDocumentPosition(b, d.column);
            c.selectTo(e.row, e.column)
        },this.gotoPageDown = function() {
            var a = this.$getPageDownRow(),b = this.getCursorPositionScreen().column;
            this.scrollToRow(a),this.getSelection().moveCursorToScreen(a, b)
        },this.gotoPageUp = function() {
            var a = this.$getPageUpRow(),b = this.getCursorPositionScreen().column;
            this.scrollToRow(a),this.getSelection().moveCursorToScreen(a, b)
        },this.scrollPageDown = function() {
            this.scrollToRow(this.$getPageDownRow())
        },this.scrollPageUp = function() {
            this.renderer.scrollToRow(this.$getPageUpRow())
        },this.scrollToRow = function(a) {
            this.renderer.scrollToRow(a)
        },this.scrollToLine = function(a, b) {
            this.renderer.scrollToLine(a, b)
        },this.centerSelection = function() {
            var a = this.getSelectionRange(),b = Math.floor(a.start.row + (a.end.row - a.start.row) / 2);
            this.renderer.scrollToLine(b, !0)
        },this.getCursorPosition = function() {
            return this.selection.getCursor()
        },this.getCursorPositionScreen = function() {
            return this.session.documentToScreenPosition(this.getCursorPosition())
        },this.getSelectionRange = function() {
            return this.selection.getRange()
        },this.selectAll = function() {
            this.$blockScrolling += 1,this.selection.selectAll(),this.$blockScrolling -= 1
        },this.clearSelection = function() {
            this.selection.clearSelection()
        },this.moveCursorTo = function(a, b) {
            this.selection.moveCursorTo(a, b)
        },this.moveCursorToPosition = function(a) {
            this.selection.moveCursorToPosition(a)
        },this.gotoLine = function(a, b) {
            this.selection.clearSelection(),this.$blockScrolling += 1,this.moveCursorTo(a - 1, b || 0),this.$blockScrolling -= 1,this.isRowVisible(this.getCursorPosition().row) || this.scrollToLine(a, !0)
        },this.navigateTo = function(a, b) {
            this.clearSelection(),this.moveCursorTo(a, b)
        },this.navigateUp = function(a) {
            this.selection.clearSelection(),a = a || 1,this.selection.moveCursorBy(-a, 0)
        },this.navigateDown = function(a) {
            this.selection.clearSelection(),a = a || 1,this.selection.moveCursorBy(a, 0)
        },this.navigateLeft = function(a) {
            if (!this.selection.isEmpty()) {
                var b = this.getSelectionRange().start;
                this.moveCursorToPosition(b)
            } else {
                a = a || 1;
                while (a--)this.selection.moveCursorLeft()
            }
            this.clearSelection()
        },this.navigateRight = function(a) {
            if (!this.selection.isEmpty()) {
                var b = this.getSelectionRange().end;
                this.moveCursorToPosition(b)
            } else {
                a = a || 1;
                while (a--)this.selection.moveCursorRight()
            }
            this.clearSelection()
        },this.navigateLineStart = function() {
            this.selection.moveCursorLineStart(),this.clearSelection()
        },this.navigateLineEnd = function() {
            this.selection.moveCursorLineEnd(),this.clearSelection()
        },this.navigateFileEnd = function() {
            this.selection.moveCursorFileEnd(),this.clearSelection()
        },this.navigateFileStart = function() {
            this.selection.moveCursorFileStart(),this.clearSelection()
        },this.navigateWordRight = function() {
            this.selection.moveCursorWordRight(),this.clearSelection()
        },this.navigateWordLeft = function() {
            this.selection.moveCursorWordLeft(),this.clearSelection()
        },this.replace = function(a, b) {
            b && this.$search.set(b);
            var c = this.$search.find(this.session);
            this.$tryReplace(c, a),c !== null && this.selection.setSelectionRange(c)
        },this.replaceAll = function(a, b) {
            b && this.$search.set(b);
            var c = this.$search.findAll(this.session);
            if (!!c.length) {
                var d = this.getSelectionRange();
                this.clearSelection(),this.selection.moveCursorTo(0, 0),this.$blockScrolling += 1;
                for (var e = c.length - 1; e >= 0; --e)this.$tryReplace(c[e], a);
                this.selection.setSelectionRange(d),this.$blockScrolling -= 1
            }
        },this.$tryReplace = function(a, b) {
            var c = this.session.getTextRange(a),b = this.$search.replace(c, b);
            if (b !== null) {
                a.end = this.session.replace(a, b);
                return a
            }
            return null
        },this.getLastSearchOptions = function() {
            return this.$search.getOptions()
        },this.find = function(a, b) {
            this.clearSelection(),b = b || {},b.needle = a,this.$search.set(b),this.$find()
        },this.findNext = function(a) {
            a = a || {},typeof a.backwards == "undefined" && (a.backwards = !1),this.$search.set(a),this.$find()
        },this.findPrevious = function(a) {
            a = a || {},typeof a.backwards == "undefined" && (a.backwards = !0),this.$search.set(a),this.$find()
        },this.$find = function(a) {
            this.selection.isEmpty() || this.$search.set({needle:this.session.getTextRange(this.getSelectionRange())}),typeof a != "undefined" && this.$search.set({backwards:a});
            var b = this.$search.find(this.session);
            b && (this.gotoLine(b.end.row + 1, b.end.column),this.selection.setSelectionRange(b))
        },this.undo = function() {
            this.session.getUndoManager().undo()
        },this.redo = function() {
            this.session.getUndoManager().redo()
        },this.destroy = function() {
            this.renderer.destroy()
        }
    }).call(o.prototype),b.Editor = o
}),define("ace/keyboard/textinput", ["require","exports","module","pilot/event","pilot/useragent","pilot/dom"], function(a, b, c) {
    var d = a("pilot/event"),e = a("pilot/useragent"),f = a("pilot/dom"),g = function(a, b) {
        function s() {
            return document.activeElement === c
        }

        function k(a) {
            if (!i) {
                var d = a || c.value;
                if (d) {
                    d.charCodeAt(d.length - 1) == g.charCodeAt(0) ? (d = d.slice(0, -1),d && b.onTextInput(d)) : b.onTextInput(d);
                    if (!s())return!1
                }
            }
            i = !1,c.value = g,c.select()
        }

        var c = f.createElement("textarea");
        c.style.left = "-10000px",a.appendChild(c);
        var g = String.fromCharCode(0);
        k();
        var h = !1,i = !1,j = "",l = function(a) {
            e.isIE && c.value.charCodeAt(0) > 128 || setTimeout(function() {
                h || k()
            }, 0)
        },m = function(a) {
            h = !0,e.isIE || (k(),c.value = ""),b.onCompositionStart(),e.isGecko || setTimeout(n, 0)
        },n = function() {
            !h || b.onCompositionUpdate(c.value)
        },o = function(a) {
            h = !1,b.onCompositionEnd(),e.isGecko ? k() : setTimeout(function() {
                h || k()
            }, 0)
        },p = function(a) {
            i = !0;
            var d = b.getCopyText();
            d ? c.value = d : a.preventDefault(),c.select(),setTimeout(function() {
                k()
            }, 0)
        },q = function(a) {
            i = !0;
            var d = b.getCopyText();
            d ? (c.value = d,b.onCut()) : a.preventDefault(),c.select(),setTimeout(function() {
                k()
            }, 0)
        };
        d.addCommandKeyListener(c, b.onCommandKey.bind(b)),d.addListener(c, "keypress", l);
        if (e.isIE) {
            var r = {13:1,27:1};
            d.addListener(c, "keyup", function(a) {
                h && (!c.value || r[a.keyCode]) && setTimeout(o, 0);
                (c.value.charCodeAt(0) | 0) < 129 || (h ? n() : m())
            })
        }
        d.addListener(c, "textInput", l),d.addListener(c, "paste", function(a) {
            a.clipboardData && a.clipboardData.getData ? (k(a.clipboardData.getData("text/plain")),a.preventDefault()) : l()
        }),e.isIE || d.addListener(c, "propertychange", l),e.isIE ? (d.addListener(c, "beforecopy", function(a) {
            var c = b.getCopyText();
            c ? clipboardData.setData("Text", c) : a.preventDefault()
        }),d.addListener(a, "keydown", function(a) {
            if (a.ctrlKey && a.keyCode == 88) {
                var c = b.getCopyText();
                c && (clipboardData.setData("Text", c),b.onCut()),d.preventDefault(a)
            }
        })) : (d.addListener(c, "copy", p),d.addListener(c, "cut", q)),d.addListener(c, "compositionstart", m),e.isGecko && d.addListener(c, "text", n),e.isWebKit && d.addListener(c, "keyup", n),d.addListener(c, "compositionend", o),d.addListener(c, "blur", function() {
            b.onBlur()
        }),d.addListener(c, "focus", function() {
            b.onFocus(),c.select()
        }),this.focus = function() {
            b.onFocus(),c.select(),c.focus()
        },this.blur = function() {
            c.blur()
        },this.isFocused = s,this.getElement = function() {
            return c
        },this.onContextMenu = function(a, b) {
            a && (j || (j = c.style.cssText),c.style.cssText = "position:fixed; z-index:1000;left:" + (a.x - 2) + "px; top:" + (a.y - 2) + "px;"),b && (c.value = "")
        },this.onContextMenuClose = function() {
            setTimeout(function() {
                j && (c.style.cssText = j,j = ""),k()
            }, 0)
        }
    };
    b.TextInput = g
}),define("ace/mouse_handler", ["require","exports","module","pilot/event","pilot/dom"], function(a, b, c) {
    var d = a("pilot/event"),e = a("pilot/dom"),f = 0,g = 1,h = 2,i = 250,j = 5,k = function(a) {
        this.editor = a,d.addListener(a.container, "mousedown", function(b) {
            a.focus();
            return d.preventDefault(b)
        }),d.addListener(a.container, "selectstart", function(a) {
            return d.preventDefault(a)
        });
        var b = a.renderer.getMouseEventTarget();
        d.addListener(b, "mousedown", this.onMouseDown.bind(this)),d.addMultiMouseDownListener(b, 0, 2, 500, this.onMouseDoubleClick.bind(this)),d.addMultiMouseDownListener(b, 0, 3, 600, this.onMouseTripleClick.bind(this)),d.addMultiMouseDownListener(b, 0, 4, 600, this.onMouseQuadClick.bind(this)),d.addMouseWheelListener(b, this.onMouseWheel.bind(this))
    };
    (function() {
        this.$scrollSpeed = 1,this.setScrollSpeed = function(a) {
            this.$scrollSpeed = a
        },this.getScrollSpeed = function() {
            return this.$scrollSpeed
        },this.$getEventPosition = function(a) {
            var b = d.getDocumentX(a),c = d.getDocumentY(a),e = this.editor.renderer.screenToTextCoordinates(b, c);
            e.row = Math.max(0, Math.min(e.row, this.editor.session.getLength() - 1));
            return e
        },this.$distance = function(a, b, c, d) {
            return Math.sqrt(Math.pow(c - a, 2) + Math.pow(d - b, 2))
        },this.onMouseDown = function(a) {
            function D(b) {
                a.shiftKey ? l.selection.selectToPosition(b) : m.$clickSelection || (l.moveCursorToPosition(b),l.selection.clearSelection(b.row, b.column)),p = g
            }

            var b = d.getDocumentX(a),c = d.getDocumentY(a),k = this.$getEventPosition(a),l = this.editor,m = this,n = l.getSelectionRange(),o = n.isEmpty(),p = f,q = !1,r = d.getButton(a);
            if (r !== 0)o && l.moveCursorToPosition(k),r == 2 && (l.textInput.onContextMenu({x:b,y:c}, o),d.capture(l.container, function() {
            }, l.textInput.onContextMenuClose)); else {
                var s = l.session.getFoldAt(k.row, k.column, 1);
                if (s) {
                    l.selection.setSelectionRange(s.range);
                    return
                }
                q = !l.getReadOnly() && !o && n.contains(k.row, k.column),q || D(k);
                var t,u,v = l.getOverwrite(),w = (new Date).getTime(),x,y,z = function(a) {
                    t = d.getDocumentX(a),u = d.getDocumentY(a)
                },A = function() {
                    clearInterval(G),p == f ? D(k) : p == h && B(),m.$clickSelection = null,p = f
                },B = function() {
                    e.removeCssClass(l.container, "ace_dragging"),l.session.removeMarker(dragSelectionMarker),m.$clickSelection || x || (l.moveCursorToPosition(k),l.selection.clearSelection(k.row, k.column));
                    if (!!x) {
                        if (y.contains(x.row, x.column)) {
                            x = null;
                            return
                        }
                        l.clearSelection();
                        var a = l.moveText(y, x);
                        if (!a) {
                            x = null;
                            return
                        }
                        l.selection.setSelectionRange(a)
                    }
                },C = function() {
                    if (t !== undefined && u !== undefined) {
                        if (p == f) {
                            var a = m.$distance(b, c, t, u),d = (new Date).getTime();
                            if (a > j) {
                                p = g;
                                var k = l.renderer.screenToTextCoordinates(t, u);
                                k.row = Math.max(0, Math.min(k.row, l.session.getLength() - 1)),D(k)
                            } else if (d - w > i) {
                                p = h,y = l.getSelectionRange();
                                var n = l.getSelectionStyle();
                                dragSelectionMarker = l.session.addMarker(y, "ace_selection", n),l.clearSelection(),e.addCssClass(l.container, "ace_dragging")
                            }
                        }
                        p == h ? F() : p == g && E()
                    }
                },E = function() {
                    var a = l.renderer.screenToTextCoordinates(t, u);
                    a.row = Math.max(0, Math.min(a.row, l.session.getLength() - 1));
                    if (m.$clickSelection)if (m.$clickSelection.contains(a.row, a.column))l.selection.setSelectionRange(m.$clickSelection); else {
                        if (m.$clickSelection.compare(a.row, a.column) == -1)var b = m.$clickSelection.end; else var b = m.$clickSelection.start;
                        l.selection.setSelectionAnchor(b.row, b.column),l.selection.selectToPosition(a)
                    } else l.selection.selectToPosition(a);
                    l.renderer.scrollCursorIntoView()
                },F = function() {
                    x = l.renderer.screenToTextCoordinates(t, u),x.row = Math.max(0, Math.min(x.row, l.session.getLength() - 1)),l.moveCursorToPosition(x)
                };
                d.capture(l.container, z, A);
                var G = setInterval(C, 20);
                return d.preventDefault(a)
            }
        },this.onMouseDoubleClick = function(a) {
            var b = this.editor,c = this.$getEventPosition(a),d = b.session.getFoldAt(c.row, c.column, 1);
            d ? b.session.expandFold(d) : (b.moveCursorToPosition(c),b.selection.selectWord(),this.$clickSelection = b.getSelectionRange())
        },this.onMouseTripleClick = function(a) {
            var b = this.$getEventPosition(a);
            this.editor.moveCursorToPosition(b),this.editor.selection.selectLine(),this.$clickSelection = this.editor.getSelectionRange()
        },this.onMouseQuadClick = function(a) {
            this.editor.selectAll(),this.$clickSelection = this.editor.getSelectionRange()
        },this.onMouseWheel = function(a) {
            var b = this.$scrollSpeed * 2;
            this.editor.renderer.scrollBy(a.wheelX * b, a.wheelY * b);
            return d.preventDefault(a)
        }
    }).call(k.prototype),b.MouseHandler = k
}),define("ace/keyboard/keybinding", ["require","exports","module","pilot/useragent","pilot/keys","pilot/event","pilot/settings","pilot/canon","ace/commands/default_commands"], function(a, b, c) {
    var d = a("pilot/useragent"),e = a("pilot/keys"),f = a("pilot/event"),g = a("pilot/settings").settings,h = a("pilot/canon");
    a("ace/commands/default_commands");
    var i = function(a) {
        this.$editor = a,this.$data = {},this.$keyboardHandler = null
    };
    (function() {
        this.setKeyboardHandler = function(a) {
            this.$keyboardHandler != a && (this.$data = {},this.$keyboardHandler = a)
        },this.getKeyboardHandler = function() {
            return this.$keyboardHandler
        },this.$callKeyboardHandler = function(a, b, c, d) {
            var e = {editor:this.$editor},g;
            this.$keyboardHandler && (g = this.$keyboardHandler.handleKeyboard(this.$data, b, c, d, a));
            if (!g || !g.command)b != 0 || d != 0 ? g = {command:h.findKeyCommand(e, "editor", b, c)} : g = {command:"inserttext",args:{text:c}};
            if (g) {
                var i = h.exec(g.command, e, "editor", g.args);
                if (i)return f.stopEvent(a)
            }
        },this.onCommandKey = function(a, b, c) {
            var d = e.keyCodeToString(c);
            this.$callKeyboardHandler(a, b, d, c)
        },this.onTextInput = function(a) {
            this.$callKeyboardHandler({}, 0, a, 0)
        }
    }).call(i.prototype),b.KeyBinding = i
}),define("ace/commands/default_commands", ["require","exports","module","pilot/lang","pilot/canon"], function(a, b, c) {
    function f(a, b) {
        return{win:a,mac:b,sender:"editor"}
    }

    var d = a("pilot/lang"),e = a("pilot/canon");
    e.addCommand({name:"null",exec:function(a, b, c) {
    }}),e.addCommand({name:"selectall",bindKey:f("Ctrl-A", "Command-A"),exec:function(a, b, c) {
        a.editor.selectAll()
    }}),e.addCommand({name:"removeline",bindKey:f("Ctrl-D", "Command-D"),exec:function(a, b, c) {
        a.editor.removeLines()
    }}),e.addCommand({name:"gotoline",bindKey:f("Ctrl-L", "Command-L"),exec:function(a, b, c) {
        var d = parseInt(prompt("Enter line number:"));
        isNaN(d) || a.editor.gotoLine(d)
    }}),e.addCommand({name:"togglecomment",bindKey:f("Ctrl-7", "Command-7"),exec:function(a, b, c) {
        a.editor.toggleCommentLines()
    }}),e.addCommand({name:"findnext",bindKey:f("Ctrl-K", "Command-G"),exec:function(a, b, c) {
        a.editor.findNext()
    }}),e.addCommand({name:"findprevious",bindKey:f("Ctrl-Shift-K", "Command-Shift-G"),exec:function(a, b, c) {
        a.editor.findPrevious()
    }}),e.addCommand({name:"find",bindKey:f("Ctrl-F", "Command-F"),exec:function(a, b, c) {
        var d = prompt("Find:");
        a.editor.find(d)
    }}),e.addCommand({name:"replace",bindKey:f("Ctrl-R", "Command-Option-F"),exec:function(a, b, c) {
        var d = prompt("Find:");
        if (!!d) {
            var e = prompt("Replacement:");
            if (!e)return;
            a.editor.replace(e, {needle:d})
        }
    }}),e.addCommand({name:"replaceall",bindKey:f("Ctrl-Shift-R", "Command-Shift-Option-F"),exec:function(a, b, c) {
        var d = prompt("Find:");
        if (!!d) {
            var e = prompt("Replacement:");
            if (!e)return;
            a.editor.replaceAll(e, {needle:d})
        }
    }}),e.addCommand({name:"undo",bindKey:f("Ctrl-Z", "Command-Z"),exec:function(a, b, c) {
        a.editor.undo()
    }}),e.addCommand({name:"redo",bindKey:f("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"),exec:function(a, b, c) {
        a.editor.redo()
    }}),e.addCommand({name:"overwrite",bindKey:f("Insert", "Insert"),exec:function(a, b, c) {
        a.editor.toggleOverwrite()
    }}),e.addCommand({name:"copylinesup",bindKey:f("Ctrl-Alt-Up", "Command-Option-Up"),exec:function(a, b, c) {
        a.editor.copyLinesUp()
    }}),e.addCommand({name:"movelinesup",bindKey:f("Alt-Up", "Option-Up"),exec:function(a, b, c) {
        a.editor.moveLinesUp()
    }}),e.addCommand({name:"selecttostart",bindKey:f("Ctrl-Shift-Home|Alt-Shift-Up", "Command-Shift-Up"),exec:function(a, b, c) {
        a.editor.getSelection().selectFileStart()
    }}),e.addCommand({name:"gotostart",bindKey:f("Ctrl-Home|Ctrl-Up", "Command-Home|Command-Up"),exec:function(a, b, c) {
        a.editor.navigateFileStart()
    }}),e.addCommand({name:"selectup",bindKey:f("Shift-Up", "Shift-Up"),exec:function(a, b, c) {
        a.editor.getSelection().selectUp()
    }}),e.addCommand({name:"golineup",bindKey:f("Up", "Up|Ctrl-P"),exec:function(a, b, c) {
        a.editor.navigateUp(b.times)
    }}),e.addCommand({name:"copylinesdown",bindKey:f("Ctrl-Alt-Down", "Command-Option-Down"),exec:function(a, b, c) {
        a.editor.copyLinesDown()
    }}),e.addCommand({name:"movelinesdown",bindKey:f("Alt-Down", "Option-Down"),exec:function(a, b, c) {
        a.editor.moveLinesDown()
    }}),e.addCommand({name:"selecttoend",bindKey:f("Ctrl-Shift-End|Alt-Shift-Down", "Command-Shift-Down"),exec:function(a, b, c) {
        a.editor.getSelection().selectFileEnd()
    }}),e.addCommand({name:"gotoend",bindKey:f("Ctrl-End|Ctrl-Down", "Command-End|Command-Down"),exec:function(a, b, c) {
        a.editor.navigateFileEnd()
    }}),e.addCommand({name:"selectdown",bindKey:f("Shift-Down", "Shift-Down"),exec:function(a, b, c) {
        a.editor.getSelection().selectDown()
    }}),e.addCommand({name:"golinedown",bindKey:f("Down", "Down|Ctrl-N"),exec:function(a, b, c) {
        a.editor.navigateDown(b.times)
    }}),e.addCommand({name:"selectwordleft",bindKey:f("Ctrl-Shift-Left", "Option-Shift-Left"),exec:function(a, b, c) {
        a.editor.getSelection().selectWordLeft()
    }}),e.addCommand({name:"gotowordleft",bindKey:f("Ctrl-Left", "Option-Left"),exec:function(a, b, c) {
        a.editor.navigateWordLeft()
    }}),e.addCommand({name:"selecttolinestart",bindKey:f("Alt-Shift-Left", "Command-Shift-Left"),exec:function(a, b, c) {
        a.editor.getSelection().selectLineStart()
    }}),e.addCommand({name:"gotolinestart",bindKey:f("Alt-Left|Home", "Command-Left|Home|Ctrl-A"),exec:function(a, b, c) {
        a.editor.navigateLineStart()
    }}),e.addCommand({name:"selectleft",bindKey:f("Shift-Left", "Shift-Left"),exec:function(a, b, c) {
        a.editor.getSelection().selectLeft()
    }}),e.addCommand({name:"gotoleft",bindKey:f("Left", "Left|Ctrl-B"),exec:function(a, b, c) {
        a.editor.navigateLeft(b.times)
    }}),e.addCommand({name:"selectwordright",bindKey:f("Ctrl-Shift-Right", "Option-Shift-Right"),exec:function(a, b, c) {
        a.editor.getSelection().selectWordRight()
    }}),e.addCommand({name:"gotowordright",bindKey:f("Ctrl-Right", "Option-Right"),exec:function(a, b, c) {
        a.editor.navigateWordRight()
    }}),e.addCommand({name:"selecttolineend",bindKey:f("Alt-Shift-Right", "Command-Shift-Right"),exec:function(a, b, c) {
        a.editor.getSelection().selectLineEnd()
    }}),e.addCommand({name:"gotolineend",bindKey:f("Alt-Right|End", "Command-Right|End|Ctrl-E"),exec:function(a, b, c) {
        a.editor.navigateLineEnd()
    }}),e.addCommand({name:"selectright",bindKey:f("Shift-Right", "Shift-Right"),exec:function(a, b, c) {
        a.editor.getSelection().selectRight()
    }}),e.addCommand({name:"gotoright",bindKey:f("Right", "Right|Ctrl-F"),exec:function(a, b, c) {
        a.editor.navigateRight(b.times)
    }}),e.addCommand({name:"selectpagedown",bindKey:f("Shift-PageDown", "Shift-PageDown"),exec:function(a, b, c) {
        a.editor.selectPageDown()
    }}),e.addCommand({name:"pagedown",bindKey:f(null, "PageDown"),exec:function(a, b, c) {
        a.editor.scrollPageDown()
    }}),e.addCommand({name:"gotopagedown",bindKey:f("PageDown", "Option-PageDown|Ctrl-V"),exec:function(a, b, c) {
        a.editor.gotoPageDown()
    }}),e.addCommand({name:"selectpageup",bindKey:f("Shift-PageUp", "Shift-PageUp"),exec:function(a, b, c) {
        a.editor.selectPageUp()
    }}),e.addCommand({name:"pageup",bindKey:f(null, "PageUp"),exec:function(a, b, c) {
        a.editor.scrollPageUp()
    }}),e.addCommand({name:"gotopageup",bindKey:f("PageUp", "Option-PageUp"),exec:function(a, b, c) {
        a.editor.gotoPageUp()
    }}),e.addCommand({name:"selectlinestart",bindKey:f("Shift-Home", "Shift-Home"),exec:function(a, b, c) {
        a.editor.getSelection().selectLineStart()
    }}),e.addCommand({name:"selectlineend",bindKey:f("Shift-End", "Shift-End"),exec:function(a, b, c) {
        a.editor.getSelection().selectLineEnd()
    }}),e.addCommand({name:"del",bindKey:f("Delete", "Delete|Ctrl-D"),exec:function(a, b, c) {
        a.editor.removeRight()
    }}),e.addCommand({name:"backspace",bindKey:f("Ctrl-Backspace|Command-Backspace|Option-Backspace|Shift-Backspace|Backspace", "Ctrl-Backspace|Command-Backspace|Shift-Backspace|Backspace|Ctrl-H"),exec:function(a, b, c) {
        a.editor.removeLeft()
    }}),e.addCommand({name:"removetolinestart",bindKey:f(null, "Option-Backspace"),exec:function(a, b, c) {
        a.editor.removeToLineStart()
    }}),e.addCommand({name:"removetolineend",bindKey:f(null, "Ctrl-K"),exec:function(a, b, c) {
        a.editor.removeToLineEnd()
    }}),e.addCommand({name:"removewordleft",bindKey:f("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"),exec:function(a, b, c) {
        a.editor.removeWordLeft()
    }}),e.addCommand({name:"removewordright",bindKey:f(null, "Alt-Delete"),exec:function(a, b, c) {
        a.editor.removeWordRight()
    }}),e.addCommand({name:"outdent",bindKey:f("Shift-Tab", "Shift-Tab"),exec:function(a, b, c) {
        a.editor.blockOutdent()
    }}),e.addCommand({name:"indent",bindKey:f("Tab", "Tab"),exec:function(a, b, c) {
        a.editor.indent()
    }}),e.addCommand({name:"inserttext",exec:function(a, b, c) {
        a.editor.insert(d.stringRepeat(b.text || "", b.times || 1))
    }}),e.addCommand({name:"centerselection",bindKey:f(null, "Ctrl-L"),exec:function(a, b, c) {
        a.editor.centerSelection()
    }}),e.addCommand({name:"splitline",bindKey:f(null, "Ctrl-O"),exec:function(a, b, c) {
        a.editor.splitLine()
    }}),e.addCommand({name:"transposeletters",bindKey:f("Ctrl-T", "Ctrl-T"),exec:function(a, b, c) {
        a.editor.transposeLetters()
    }})
}),define("ace/edit_session", ["require","exports","module","pilot/oop","pilot/lang","pilot/event_emitter","ace/selection","ace/mode/text","ace/range","ace/document","ace/background_tokenizer","ace/edit_session/folding"], function(a, b, c) {
    var d = a("pilot/oop"),e = a("pilot/lang"),f = a("pilot/event_emitter").EventEmitter,g = a("ace/selection").Selection,h = a("ace/mode/text").Mode,j = a("ace/range").Range,k = a("ace/document").Document,l = a("ace/background_tokenizer").BackgroundTokenizer,m = function(a, b) {
        this.$modified = !0,this.$breakpoints = [],this.$frontMarkers = {},this.$backMarkers = {},this.$markerId = 1,this.$rowCache = [],this.$rowCacheSize = 1e3,this.$wrapData = [],this.$foldData = [],this.$foldData.toString = function() {
            var a = "";
            this.forEach(function(b) {
                a += "\n" + b.toString()
            });
            return a
        },this.$docChangeCounter = 0,a instanceof k ? this.setDocument(a) : this.setDocument(new k(a)),this.selection = new g(this),b ? this.setMode(b) : this.setMode(new h)
    };
    (function() {
        function o(a) {
            return a < 4352 ? !1 : a >= 4352 && a <= 4447 || a >= 4515 && a <= 4519 || a >= 4602 && a <= 4607 || a >= 9001 && a <= 9002 || a >= 11904 && a <= 11929 || a >= 11931 && a <= 12019 || a >= 12032 && a <= 12245 || a >= 12272 && a <= 12283 || a >= 12288 && a <= 12350 || a >= 12353 && a <= 12438 || a >= 12441 && a <= 12543 || a >= 12549 && a <= 12589 || a >= 12593 && a <= 12686 || a >= 12688 && a <= 12730 || a >= 12736 && a <= 12771 || a >= 12784 && a <= 12830 || a >= 12832 && a <= 12871 || a >= 12880 && a <= 13054 || a >= 13056 && a <= 19903 || a >= 19968 && a <= 42124 || a >= 42128 && a <= 42182 || a >= 43360 && a <= 43388 || a >= 44032 && a <= 55203 || a >= 55216 && a <= 55238 || a >= 55243 && a <= 55291 || a >= 63744 && a <= 64255 || a >= 65040 && a <= 65049 || a >= 65072 && a <= 65106 || a >= 65108 && a <= 65126 || a >= 65128 && a <= 65131 || a >= 65281 && a <= 65376 || a >= 65504 && a <= 65510
        }

        d.implement(this, f),this.setDocument = function(a) {
            if (this.doc)throw new Error("Document is already set");
            this.doc = a,a.on("change", this.onChange.bind(this)),a.on("changeStart", this.onChangeStart.bind(this)),a.on("changeEnd", this.onChangeEnd.bind(this)),this.on("changeFold", this.onChangeFold.bind(this))
        },this.getDocument = function() {
            return this.doc
        },this.onChangeStart = function() {
            this.$docChangeCounter++
        },this.$resetRowCache = function(a) {
            if (a == 0)this.$rowCache = []; else {
                var b = this.$rowCache;
                for (var c = 0; c < b.length; c++)if (b[c].docRow >= a) {
                    b.splice(c, b.length);
                    return
                }
            }
        },this.onChangeEnd = function() {
            this.$docChangeCounter--,this.$docChangeCounter == 0 && !this.$fromUndo && this.$undoManager && (this.$deltasFold.length && (this.$deltas.push({group:"fold",deltas:this.$deltasFold}),this.$deltasFold = []),this.$deltasDoc && (this.$deltas.push({group:"doc",deltas:this.$deltasDoc}),this.$deltasDoc = []),this.$informUndoManager.schedule())
        },this.onChangeFold = function(a) {
            var b = a.data;
            this.$resetRowCache(b.start.row)
        },this.onChange = function(a) {
            var b = a.data;
            this.$modified = !0,this.$resetRowCache(b.range.start.row);
            var c = this.$updateInternalDataOnChange(a);
            !this.$fromUndo && this.$undoManager && !b.ignore && (this.$deltasDoc.push(b),c && c.length != 0 && this.$deltasFold.push({action:"removeFolds",folds:c})),this.bgTokenizer.start(b.range.start.row),this._dispatchEvent("change", a)
        },this.setValue = function(a) {
            this.doc.setValue(a),this.$resetRowCache(0),this.$deltas = [],this.$deltasDoc = [],this.$deltasFold = [],this.getUndoManager().reset()
        },this.getValue = this.toString = function() {
            return this.doc.getValue()
        },this.getSelection = function() {
            return this.selection
        },this.getState = function(a) {
            return this.bgTokenizer.getState(a)
        },this.getTokens = function(a, b) {
            return this.bgTokenizer.getTokens(a, b)
        },this.setUndoManager = function(a) {
            this.$undoManager = a,this.$resetRowCache(0),this.$deltas = [],this.$deltasDoc = [],this.$deltasFold = [],this.$informUndoManager && this.$informUndoManager.cancel();
            if (a) {
                var b = this;
                this.$syncInformUndoManager = function() {
                    b.$informUndoManager.cancel(),b.$deltas.length > 0 && a.execute({action:"aceupdate",args:[b.$deltas,b]}),b.$deltas = []
                },this.$informUndoManager = e.deferredCall(this.$syncInformUndoManager)
            }
        },this.$defaultUndoManager = {undo:function() {
        },redo:function() {
        },reset:function() {
        }},this.getUndoManager = function() {
            return this.$undoManager || this.$defaultUndoManager
        },this.getTabString = function() {
            return this.getUseSoftTabs() ? e.stringRepeat(" ", this.getTabSize()) : "\t"
        },this.$useSoftTabs = !0,this.setUseSoftTabs = function(a) {
            this.$useSoftTabs !== a && (this.$useSoftTabs = a)
        },this.getUseSoftTabs = function() {
            return this.$useSoftTabs
        },this.$tabSize = 4,this.setTabSize = function(a) {
            !isNaN(a) && this.$tabSize !== a && (this.$modified = !0,this.$tabSize = a,this._dispatchEvent("changeTabSize"))
        },this.getTabSize = function() {
            return this.$tabSize
        },this.isTabStop = function(a) {
            return this.$useSoftTabs && a.column % this.$tabSize == 0
        },this.$overwrite = !1,this.setOverwrite = function(a) {
            this.$overwrite != a && (this.$overwrite = a,this._dispatchEvent("changeOverwrite"))
        },this.getOverwrite = function() {
            return this.$overwrite
        },this.toggleOverwrite = function() {
            this.setOverwrite(!this.$overwrite)
        },this.getBreakpoints = function() {
            return this.$breakpoints
        },this.setBreakpoints = function(a) {
            this.$breakpoints = [];
            for (var b = 0; b < a.length; b++)this.$breakpoints[a[b]] = !0;
            this._dispatchEvent("changeBreakpoint", {})
        },this.clearBreakpoints = function() {
            this.$breakpoints = [],this._dispatchEvent("changeBreakpoint", {})
        },this.setBreakpoint = function(a) {
            this.$breakpoints[a] = !0,this._dispatchEvent("changeBreakpoint", {})
        },this.clearBreakpoint = function(a) {
            delete this.$breakpoints[a],this._dispatchEvent("changeBreakpoint", {})
        },this.getBreakpoints = function() {
            return this.$breakpoints
        },this.addMarker = function(a, b, c, d) {
            var e = this.$markerId++,f = {range:a,type:c || "line",renderer:typeof c == "function" ? c : null,clazz:b,inFront:!!d};
            d ? (this.$frontMarkers[e] = f,this._dispatchEvent("changeFrontMarker")) : (this.$backMarkers[e] = f,this._dispatchEvent("changeBackMarker"));
            return e
        },this.removeMarker = function(a) {
            var b = this.$frontMarkers[a] || this.$backMarkers[a];
            if (!!b) {
                var c = b.inFront ? this.$frontMarkers : this.$backMarkers;
                b && (delete c[a],this._dispatchEvent(b.inFront ? "changeFrontMarker" : "changeBackMarker"))
            }
        },this.getMarkers = function(a) {
            return a ? this.$frontMarkers : this.$backMarkers
        },this.setAnnotations = function(a) {
            this.$annotations = {};
            for (var b = 0; b < a.length; b++) {
                var c = a[b],d = c.row;
                this.$annotations[d] ? this.$annotations[d].push(c) : this.$annotations[d] = [c]
            }
            this._dispatchEvent("changeAnnotation", {})
        },this.getAnnotations = function() {
            return this.$annotations
        },this.clearAnnotations = function() {
            this.$annotations = {},this._dispatchEvent("changeAnnotation", {})
        },this.$detectNewLine = function(a) {
            var b = a.match(/^.*?(\r?\n)/m);
            b ? this.$autoNewLine = b[1] : this.$autoNewLine = "\n"
        },this.tokenRe = /^[\w\d]+/g,this.nonTokenRe = /^(?:[^\w\d]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\u4E00-\u9FFF\uF900-\uFAFF\u3400-\u4DBF])+/g,this.getWordRange = function(a, b) {
            var c = this.getLine(a),d = !1;
            b > 0 && (d = !!c.charAt(b - 1).match(this.tokenRe)),d || (d = !!c.charAt(b).match(this.tokenRe));
            var e = d ? this.tokenRe : this.nonTokenRe,f = b;
            if (f > 0) {
                do f--; while (f >= 0 && c.charAt(f).match(e));
                f++
            }
            var g = b;
            while (g < c.length && c.charAt(g).match(e))g++;
            return new j(a, f, a, g)
        },this.setNewLineMode = function(a) {
            this.doc.setNewLineMode(a)
        },this.getNewLineMode = function() {
            return this.doc.getNewLineMode()
        },this.$useWorker = !0,this.setUseWorker = function(a) {
            this.$useWorker != a && (this.$useWorker = a,this.$stopWorker(),a && this.$startWorker())
        },this.getUseWorker = function() {
            return this.$useWorker
        },this.onReloadTokenizer = function(a) {
            var b = a.data;
            this.bgTokenizer.start(b.first),this._dispatchEvent("tokenizerUpdate", a)
        },this.$mode = null,this.setMode = function(a) {
            if (this.$mode !== a) {
                this.$mode = a,this.$stopWorker(),this.$useWorker && this.$startWorker();
                var b = a.getTokenizer();
                if (b.addEventListener !== undefined) {
                    var c = this.onReloadTokenizer.bind(this);
                    b.addEventListener("update", c)
                }
                if (!this.bgTokenizer) {
                    this.bgTokenizer = new l(b);
                    var d = this;
                    this.bgTokenizer.addEventListener("update", function(a) {
                        d._dispatchEvent("tokenizerUpdate", a)
                    })
                } else this.bgTokenizer.setTokenizer(b);
                this.bgTokenizer.setDocument(this.getDocument()),this.bgTokenizer.start(0),this._dispatchEvent("changeMode")
            }
        },this.$stopWorker = function() {
            this.$worker && this.$worker.terminate(),this.$worker = null
        },this.$startWorker = function() {
            if (typeof Worker != "undefined" && !a.noWorker)try {
                this.$worker = this.$mode.createWorker(this)
            } catch(b) {
                console.log("Could not load worker"),console.log(b),this.$worker = null
            } else this.$worker = null
        },this.getMode = function() {
            return this.$mode
        },this.$scrollTop = 0,this.setScrollTopRow = function(a) {
            this.$scrollTop !== a && (this.$scrollTop = a,this._dispatchEvent("changeScrollTop"))
        },this.getScrollTopRow = function() {
            return this.$scrollTop
        },this.getWidth = function() {
            this.$computeWidth();
            return this.width
        },this.getScreenWidth = function() {
            this.$computeWidth();
            return this.screenWidth
        },this.$computeWidth = function(a) {
            if (this.$modified || a) {
                this.$modified = !1;
                var b = this.doc.getAllLines(),c = 0,d = 0;
                for (var e = 0; e < b.length; e++) {
                    var f = this.getFoldLine(e),g,h;
                    g = b[e];
                    if (f) {
                        var i = f.range.end;
                        g = this.getFoldDisplayLine(f),e = i.row
                    }
                    h = g.length,c = Math.max(c, h),this.$useWrapMode || (d = Math.max(d, this.$getStringScreenWidth(g)[0]))
                }
                this.width = c,this.$useWrapMode ? this.screenWidth = this.$wrapLimit : this.screenWidth = d
            }
        },this.getLine = function(a) {
            return this.doc.getLine(a)
        },this.getLines = function(a, b) {
            return this.doc.getLines(a, b)
        },this.getLength = function() {
            return this.doc.getLength()
        },this.getTextRange = function(a) {
            return this.doc.getTextRange(a)
        },this.findMatchingBracket = function(a) {
            if (a.column == 0)return null;
            var b = this.getLine(a.row).charAt(a.column - 1);
            if (b == "")return null;
            var c = b.match(/([\(\[\{])|([\)\]\}])/);
            return c ? c[1] ? this.$findClosingBracket(c[1], a) : this.$findOpeningBracket(c[2], a) : null
        },this.$brackets = {")":"(","(":")","]":"[","[":"]","{":"}","}":"{"},this.$findOpeningBracket = function(a, b) {
            var c = this.$brackets[a],d = b.column - 2,e = b.row,f = 1,g = this.getLine(e);
            for (; ;) {
                while (d >= 0) {
                    var h = g.charAt(d);
                    if (h == c) {
                        f -= 1;
                        if (f == 0)return{row:e,column:d}
                    } else h == a && (f += 1);
                    d -= 1
                }
                e -= 1;
                if (e < 0)break;
                var g = this.getLine(e),d = g.length - 1
            }
            return null
        },this.$findClosingBracket = function(a, b) {
            var c = this.$brackets[a],d = b.column,e = b.row,f = 1,g = this.getLine(e),h = this.getLength();
            for (; ;) {
                while (d < g.length) {
                    var i = g.charAt(d);
                    if (i == c) {
                        f -= 1;
                        if (f == 0)return{row:e,column:d}
                    } else i == a && (f += 1);
                    d += 1
                }
                e += 1;
                if (e >= h)break;
                var g = this.getLine(e),d = 0
            }
            return null
        },this.insert = function(a, b) {
            return this.doc.insert(a, b)
        },this.remove = function(a) {
            return this.doc.remove(a)
        },this.undoChanges = function(a, b) {
            if (!!a.length) {
                this.$fromUndo = !0;
                var c = null;
                for (var d = a.length - 1; d != -1; d--)delta = a[d],delta.group == "doc" ? (this.doc.revertDeltas(delta.deltas),c = this.$getUndoSelection(delta.deltas, !0, c)) : delta.deltas.forEach(function(a) {
                    this.addFolds(a.folds)
                }, this);
                this.$fromUndo = !1,c && !b && this.selection.setSelectionRange(c);
                return c
            }
        },this.redoChanges = function(a, b) {
            if (!!a.length) {
                this.$fromUndo = !0;
                var c = null;
                for (var d = 0; d < a.length; d++)delta = a[d],delta.group == "doc" && (this.doc.applyDeltas(delta.deltas),c = this.$getUndoSelection(delta.deltas, !1, c));
                this.$fromUndo = !1,c && !b && this.selection.setSelectionRange(c);
                return c
            }
        },this.$getUndoSelection = function(a, b, c) {
            function d(a) {
                var c = a.action == "insertText" || a.action == "insertLines";
                return b ? !c : c
            }

            var e = a[0],f,g,h = !1;
            d(e) ? (f = e.range.clone(),h = !0) : (f = j.fromPoints(e.range.start, e.range.start),h = !1);
            for (var i = 1; i < a.length; i++)e = a[i],d(e) ? (g = e.range.start,f.compare(g.row, g.column) == -1 && f.setStart(e.range.start),g = e.range.end,f.compare(g.row, g.column) == 1 && f.setEnd(e.range.end),h = !0) : (g = e.range.start,f.compare(g.row, g.column) == -1 && (f = j.fromPoints(e.range.start, e.range.start)),h = !1);
            if (c != null) {
                var k = c.compareRange(f);
                k == 1 ? f.setStart(c.start) : k == -1 && f.setEnd(c.end)
            }
            return f
        },this.replace = function(a, b) {
            return this.doc.replace(a, b)
        },this.moveText = function(a, b) {
            var c = this.getTextRange(a);
            this.remove(a);
            var d = b.row,e = b.column;
            !a.isMultiLine() && a.start.row == d && a.end.column < e && (e -= c.length);
            if (a.isMultiLine() && a.end.row < d) {
                var f = this.doc.$split(c);
                d -= f.length - 1
            }
            var g = d + a.end.row - a.start.row,h = a.isMultiLine() ? a.end.column : e + a.end.column - a.start.column,i = new j(d, e, g, h);
            this.insert(i.start, c);
            return i
        },this.indentRows = function(a, b, c) {
            c = c.replace(/\t/g, this.getTabString());
            for (var d = a; d <= b; d++)this.insert({row:d,column:0}, c)
        },this.outdentRows = function(a) {
            var b = a.collapseRows(),c = new j(0, 0, 0, 0),d = this.getTabSize();
            for (var e = b.start.row; e <= b.end.row; ++e) {
                var f = this.getLine(e);
                c.start.row = e,c.end.row = e;
                for (var g = 0; g < d; ++g)if (f.charAt(g) != " ")break;
                g < d && f.charAt(g) == "\t" ? (c.start.column = g,c.end.column = g + 1) : (c.start.column = 0,c.end.column = g),this.remove(c)
            }
        },this.moveLinesUp = function(a, b) {
            if (a <= 0)return 0;
            var c = this.doc.removeLines(a, b);
            this.doc.insertLines(a - 1, c);
            return-1
        },this.moveLinesDown = function(a, b) {
            if (b >= this.doc.getLength() - 1)return 0;
            var c = this.doc.removeLines(a, b);
            this.doc.insertLines(a + 1, c);
            return 1
        },this.duplicateLines = function(a, b) {
            var a = this.$clipRowToDocument(a),b = this.$clipRowToDocument(b),c = this.getLines(a, b);
            this.doc.insertLines(a, c);
            var d = b - a + 1;
            return d
        },this.$clipRowToDocument = function(a) {
            return Math.max(0, Math.min(a, this.doc.getLength() - 1))
        },this.$wrapLimit = 80,this.$useWrapMode = !1,this.$wrapLimitRange = {min:null,max:null},this.setUseWrapMode = function(a) {
            if (a != this.$useWrapMode) {
                this.$useWrapMode = a,this.$modified = !0,this.$resetRowCache(0);
                if (a) {
                    var b = this.getLength();
                    this.$wrapData = [];
                    for (i = 0; i < b; i++)this.$wrapData.push([]);
                    this.$updateWrapData(0, b - 1)
                }
                this._dispatchEvent("changeWrapMode")
            }
        },this.getUseWrapMode = function() {
            return this.$useWrapMode
        },this.setWrapLimitRange = function(a, b) {
            if (this.$wrapLimitRange.min !== a || this.$wrapLimitRange.max !== b)this.$wrapLimitRange.min = a,this.$wrapLimitRange.max = b,this.$modified = !0,this._dispatchEvent("changeWrapMode")
        },this.adjustWrapLimit = function(a) {
            var b = this.$constrainWrapLimit(a);
            if (b != this.$wrapLimit && b > 0) {
                this.$wrapLimit = b,this.$modified = !0,this.$useWrapMode && (this.$updateWrapData(0, this.getLength() - 1),this.$resetRowCache(0),this._dispatchEvent("changeWrapLimit"));
                return!0
            }
            return!1
        },this.$constrainWrapLimit = function(a) {
            var b = this.$wrapLimitRange.min;
            b && (a = Math.max(b, a));
            var c = this.$wrapLimitRange.max;
            c && (a = Math.min(c, a));
            return Math.max(1, a)
        },this.getWrapLimit = function() {
            return this.$wrapLimit
        },this.getWrapLimitRange = function() {
            return{min:this.$wrapLimitRange.min,max:this.$wrapLimitRange.max}
        },this.$updateInternalDataOnChange = function(a) {
            var b = this.$useWrapMode,c,d = a.data.action,e = a.data.range.start.row,f = a.data.range.end.row,g = a.data.range.start,h = a.data.range.end,i = null;
            d.indexOf("Lines") != -1 ? (d == "insertLines" ? f = e + a.data.lines.length : f = e,c = a.data.lines.length) : c = f - e;
            if (c != 0)if (d.indexOf("remove") != -1) {
                b && this.$wrapData.splice(e, c);
                var j = this.$foldData;
                i = this.getFoldsInRange(a.data.range),this.removeFolds(i);
                var k = this.getFoldLine(h.row),l = 0;
                if (k) {
                    k.addRemoveChars(h.row, h.column, g.column - h.column),k.shiftRow(-c);
                    var m = this.getFoldLine(e);
                    m && m !== k && (m.merge(k),k = m),l = j.indexOf(k) + 1
                }
                for (l; l < j.length; l++) {
                    var k = j[l];
                    k.start.row >= h.row && k.shiftRow(-c)
                }
                f = e
            } else {
                var n;
                if (b) {
                    n = [e,0];
                    for (var o = 0; o < c; o++)n.push([]);
                    this.$wrapData.splice.apply(this.$wrapData, n)
                }
                var j = this.$foldData,k = this.getFoldLine(e),l = 0;
                if (k) {
                    var p = k.range.compareInside(g.row, g.column);
                    p == 0 ? (k = k.split(g.row, g.column),k.shiftRow(c),k.addRemoveChars(f, 0, h.column - g.column)) : p == -1 && (k.addRemoveChars(e, 0, h.column - g.column),k.shiftRow(c)),l = j.indexOf(k) + 1
                }
                for (l; l < j.length; l++) {
                    var k = j[l];
                    k.start.row >= e && k.shiftRow(c)
                }
            } else {
                var q;
                c = Math.abs(a.data.range.start.column - a.data.range.end.column),d.indexOf("remove") != -1 && (i = this.getFoldsInRange(a.data.range),this.removeFolds(i),c = -c);
                var k = this.getFoldLine(e);
                k && k.addRemoveChars(e, g.column, c)
            }
            b && this.$wrapData.length != this.doc.getLength() && console.error("doc.getLength() and $wrapData.length have to be the same!"),b && this.$updateWrapData(e, f);
            return i
        },this.$updateWrapData = function(a, b) {
            var c = this.doc.getAllLines(),d = this.getTabSize(),f = this.$wrapData,i = this.$wrapLimit,j,l,m = a;
            b = Math.min(b, c.length - 1);
            while (m <= b) {
                l = this.getFoldLine(m);
                if (!l)j = this.$getDisplayTokens(e.stringTrimRight(c[m])); else {
                    j = [],l.walk(function(a, b, d, e) {
                        var f;
                        if (a) {
                            f = this.$getDisplayTokens(a, j.length),f[0] = g;
                            for (var i = 1; i < f.length; i++)f[i] = h
                        } else f = this.$getDisplayTokens(c[b].substring(e, d), j.length);
                        j = j.concat(f)
                    }.bind(this), l.end.row, c[l.end.row].length + 1);
                    while (j.length != 0 && j[j.length - 1] >= k)j.pop()
                }
                f[m] = this.$computeWrapSplits(j, i, d),m = this.getRowFoldEnd(m) + 1
            }
        };
        var b = 1,c = 2,g = 3,h = 4,k = 10,m = 11,n = 12;
        this.$computeWrapSplits = function(a, b, c) {
            function j(b) {
                var c = a.slice(f, b),e = c.length;
                c.join("").replace(/12/g,
                    function(a) {
                        e -= 1
                    }).replace(/2/g, function(a) {
                    e -= 1
                }),i += e,d.push(i),f = b
            }

            if (a.length == 0)return[];
            var c = this.getTabSize(),d = [],e = a.length,f = 0,i = 0;
            while (e - f > b) {
                var l = f + b;
                if (a[l] >= k) {
                    while (a[l] >= k)l++;
                    j(l);
                    continue
                }
                if (a[l] == g || a[l] == h) {
                    for (l; l != f - 1; l--)if (a[l] == g)break;
                    if (l > f) {
                        j(l);
                        continue
                    }
                    l = f + b;
                    for (l; l < a.length; l++)if (a[l] != h)break;
                    if (l == a.length)break;
                    j(l);
                    continue
                }
                for (l; l != f - 1; l--)if (a[l] >= g) {
                    l++;
                    break
                }
                if (l > f) {
                    j(l);
                    continue
                }
                l = f + b,j(f + b)
            }
            return d
        },this.$getDisplayTokens = function(a, d) {
            var e = [],f;
            d = d || 0;
            for (var g = 0; g < a.length; g++) {
                var h = a.charCodeAt(g);
                if (h == 9) {
                    f = this.getScreenTabSize(e.length + d),e.push(m);
                    for (var i = 1; i < f; i++)e.push(n)
                } else h == 32 ? e.push(k) : o(h) ? e.push(b, c) : e.push(b)
            }
            return e
        },this.$getStringScreenWidth = function(a, b, c) {
            if (b == 0)return[0,0];
            b == null && (b = c + a.length * Math.max(this.getTabSize(), 2)),c = c || 0;
            var d,e;
            for (e = 0; e < a.length; e++) {
                d = a.charCodeAt(e),d == 9 ? c += this.getScreenTabSize(c) : o(d) ? c += 2 : c += 1;
                if (c > b)break
            }
            return[c,e]
        },this.getRowLength = function(a) {
            return!this.$useWrapMode || !this.$wrapData[a] ? 1 : this.$wrapData[a].length + 1
        },this.getRowHeight = function(a, b) {
            return this.getRowLength(b) * a.lineHeight
        },this.getScreenLastRowColumn = function(a) {
            return this.screenToDocumentColumn(a, Number.MAX_VALUE / 10)
        },this.getDocumentLastRowColumn = function(a, b) {
            var c = this.documentToScreenRow(a, b);
            return this.getScreenLastRowColumn(c)
        },this.getDocumentLastRowColumnPosition = function(a, b) {
            var c = this.documentToScreenRow(a, b);
            return this.screenToDocumentPosition(c, Number.MAX_VALUE / 10)
        },this.getRowSplitData = function(a) {
            return this.$useWrapMode ? this.$wrapData[a] : undefined
        },this.getScreenTabSize = function(a) {
            return this.$tabSize - a % this.$tabSize
        },this.screenToDocumentRow = function(a, b) {
            return this.screenToDocumentPosition(a, b).row
        },this.screenToDocumentColumn = function(a, b) {
            return this.screenToDocumentPosition(a, b).column
        },this.screenToDocumentPosition = function(a, b) {
            var c,d = 0,e = 0,f,g,h = 0,i = 0,j = null,k = this.$rowCache,l = !k.length;
            for (var m = 0; m < k.length; m++)k[m].screenRow < a && (h = k[m].screenRow,d = k[m].docRow,l = m == k.length - 1);
            var n = d,o = this.getLength() - 1,p = this.getNextFold(d),q = p ? p.start.row : Infinity;
            while (h <= a) {
                l && d - n > this.$rowCacheSize && (k.push({docRow:d,screenRow:h}),n = d),i = this.getRowLength(d);
                if (h + i - 1 >= a || d >= o)break;
                h += i,d++,d > q && (d = p.end.row + 1,p = this.getNextFold(d),q = p ? p.start.row : Infinity)
            }
            p && p.start.row <= d ? c = this.getFoldDisplayLine(p) : (c = this.getLine(d),p = null),this.$useWrapMode && (j = this.$wrapData[d],j && (f = j[a - h],a > h && j.length && (e = j[a - h - 1] || j[j.length - 1],c = c.substring(e)))),e += this.$getStringScreenWidth(c, b)[1],this.$useWrapMode ? e >= f && (e = f - 1) : e = Math.min(e, c.length);
            return p ? p.idxToPosition(e) : {row:d,column:e}
        },this.documentToScreenPosition = function(a, b) {
            b == null && (b = a.column,a = a.row);
            var c;
            if (this.$useWrapMode) {
                c = this.$wrapData;
                if (a > c.length - 1)return{row:this.getScreenLength(),column:c.length == 0 ? 0 : c[c.length - 1].length - 1}
            }
            var d = 0,e = 0,f = null,g = null;
            g = this.getFoldAt(a, b, 1),g && (a = g.start.row,b = g.start.column);
            var h,i = 0,j = this.$rowCache,k = !j.length;
            for (var l = 0; l < j.length; l++)j[l].docRow < a && (d = j[l].screenRow,i = j[l].docRow,k = l == j.length - 1);
            var m = i,n = this.getNextFold(i),o = n ? n.start.row : Infinity;
            while (i < a) {
                if (i >= o) {
                    h = n.end.row + 1;
                    if (h > a)break;
                    n = this.getNextFold(h),o = n ? n.start.row : Infinity
                } else h = i + 1;
                k && i - m > this.$rowCacheSize && (j.push({docRow:i,screenRow:d}),m = i),d += this.getRowLength(i),i = h
            }
            var p = "";
            n && i >= o ? (p = this.getFoldDisplayLine(n, a, b),f = n.start.row) : (p = this.getLine(a).substring(0, b),f = a);
            if (this.$useWrapMode) {
                var q = c[f],r = 0;
                while (p.length >= q[r])d++,r++;
                p = p.substring(q[r - 1] || 0, p.length)
            }
            return{row:d,column:this.$getStringScreenWidth(p)[0]}
        },this.documentToScreenColumn = function(a, b) {
            return this.documentToScreenPosition(a, b).column
        },this.documentToScreenRow = function(a, b) {
            return this.documentToScreenPosition(a, b).row
        },this.getScreenLength = function() {
            var a = 0,b = null,c = null;
            if (!this.$useWrapMode) {
                a = this.getLength();
                var d = this.$foldData;
                for (var e = 0; e < d.length; e++)c = d[e],a -= c.end.row - c.start.row
            } else for (var f = 0; f < this.$wrapData.length; f++)(c = this.getFoldLine(f, b)) ? (f = c.end.row,a += 1) : a += this.$wrapData[f].length + 1;
            return a
        }
    }).call(m.prototype),a("ace/edit_session/folding").Folding.call(m.prototype),b.EditSession = m
}),define("ace/selection", ["require","exports","module","pilot/oop","pilot/lang","pilot/event_emitter","ace/range"], function(a, b, c) {
    var d = a("pilot/oop"),e = a("pilot/lang"),f = a("pilot/event_emitter").EventEmitter,g = a("ace/range").Range,h = function(a) {
        this.session = a,this.doc = a.getDocument(),this.clearSelection(),this.selectionLead = this.doc.createAnchor(0, 0),this.selectionAnchor = this.doc.createAnchor(0, 0);
        var b = this;
        this.selectionLead.on("change", function(a) {
            b._dispatchEvent("changeCursor"),b.$isEmpty || b._dispatchEvent("changeSelection"),a.old.row == a.value.row && b.$updateDesiredColumn()
        }),this.selectionAnchor.on("change", function() {
            b.$isEmpty || b._dispatchEvent("changeSelection")
        })
    };
    (function() {
        d.implement(this, f),this.isEmpty = function() {
            return this.$isEmpty || this.selectionAnchor.row == this.selectionLead.row && this.selectionAnchor.column == this.selectionLead.column
        },this.isMultiLine = function() {
            return this.isEmpty() ? !1 : this.getRange().isMultiLine()
        },this.getCursor = function() {
            return this.selectionLead.getPosition()
        },this.setSelectionAnchor = function(a, b) {
            this.selectionAnchor.setPosition(a, b),this.$isEmpty && (this.$isEmpty = !1,this._dispatchEvent("changeSelection"))
        },this.getSelectionAnchor = function() {
            return this.$isEmpty ? this.getSelectionLead() : this.selectionAnchor.getPosition()
        },this.getSelectionLead = function() {
            return this.selectionLead.getPosition()
        },this.shiftSelection = function(a) {
            if (this.$isEmpty)this.moveCursorTo(this.selectionLead.row, this.selectionLead.column + a); else {
                var b = this.getSelectionAnchor(),c = this.getSelectionLead(),d = this.isBackwards();
                (!d || b.column !== 0) && this.setSelectionAnchor(b.row, b.column + a),(d || c.column !== 0) && this.$moveSelection(function() {
                    this.moveCursorTo(c.row, c.column + a)
                })
            }
        },this.isBackwards = function() {
            var a = this.selectionAnchor,b = this.selectionLead;
            return a.row > b.row || a.row == b.row && a.column > b.column
        },this.getRange = function() {
            var a = this.selectionAnchor,b = this.selectionLead;
            return this.isEmpty() ? g.fromPoints(b, b) : this.isBackwards() ? g.fromPoints(b, a) : g.fromPoints(a, b)
        },this.clearSelection = function() {
            this.$isEmpty || (this.$isEmpty = !0,this._dispatchEvent("changeSelection"))
        },this.selectAll = function() {
            var a = this.doc.getLength() - 1;
            this.setSelectionAnchor(a, this.doc.getLine(a).length),this.moveCursorTo(0, 0)
        },this.setSelectionRange = function(a, b) {
            b ? (this.setSelectionAnchor(a.end.row, a.end.column),this.selectTo(a.start.row, a.start.column)) : (this.setSelectionAnchor(a.start.row, a.start.column),this.selectTo(a.end.row, a.end.column)),this.$updateDesiredColumn()
        },this.$updateDesiredColumn = function() {
            var a = this.getCursor();
            this.$desiredColumn = this.session.documentToScreenColumn(a.row, a.column)
        },this.$moveSelection = function(a) {
            var b = this.selectionLead;
            this.$isEmpty && this.setSelectionAnchor(b.row, b.column),a.call(this)
        },this.selectTo = function(a, b) {
            this.$moveSelection(function() {
                this.moveCursorTo(a, b)
            })
        },this.selectToPosition = function(a) {
            this.$moveSelection(function() {
                this.moveCursorToPosition(a)
            })
        },this.selectUp = function() {
            this.$moveSelection(this.moveCursorUp)
        },this.selectDown = function() {
            this.$moveSelection(this.moveCursorDown)
        },this.selectRight = function() {
            this.$moveSelection(this.moveCursorRight)
        },this.selectLeft = function() {
            this.$moveSelection(this.moveCursorLeft)
        },this.selectLineStart = function() {
            this.$moveSelection(this.moveCursorLineStart)
        },this.selectLineEnd = function() {
            this.$moveSelection(this.moveCursorLineEnd)
        },this.selectFileEnd = function() {
            this.$moveSelection(this.moveCursorFileEnd)
        },this.selectFileStart = function() {
            this.$moveSelection(this.moveCursorFileStart)
        },this.selectWordRight = function() {
            this.$moveSelection(this.moveCursorWordRight)
        },this.selectWordLeft = function() {
            this.$moveSelection(this.moveCursorWordLeft)
        },this.selectWord = function() {
            var a = this.getCursor(),b = this.session.getWordRange(a.row, a.column);
            this.setSelectionRange(b)
        },this.selectLine = function() {
            var a = this.selectionLead.row,b,c = this.session.getFoldLine(a);
            c ? (a = c.start.row,b = c.end.row) : b = a,this.setSelectionAnchor(a, 0),this.$moveSelection(function() {
                this.moveCursorTo(b + 1, 0)
            })
        },this.moveCursorUp = function() {
            this.moveCursorBy(-1, 0)
        },this.moveCursorDown = function() {
            this.moveCursorBy(1, 0)
        },this.moveCursorLeft = function() {
            var a = this.selectionLead.getPosition(),b;
            if (b = this.session.getFoldAt(a.row, a.column, -1))this.moveCursorTo(b.start.row, b.start.column); else if (a.column == 0)a.row > 0 && this.moveCursorTo(a.row - 1, this.doc.getLine(a.row - 1).length); else {
                var c = this.session.getTabSize();
                this.session.isTabStop(a) && this.doc.getLine(a.row).slice(a.column - c, a.column).split(" ").length - 1 == c ? this.moveCursorBy(0, -c) : this.moveCursorBy(0, -1)
            }
        },this.moveCursorRight = function() {
            var a = this.selectionLead.getPosition(),b;
            if (b = this.session.getFoldAt(a.row, a.column, 1))this.moveCursorTo(b.end.row, b.end.column); else if (this.selectionLead.column == this.doc.getLine(this.selectionLead.row).length)this.selectionLead.row < this.doc.getLength() - 1 && this.moveCursorTo(this.selectionLead.row + 1, 0); else {
                var c = this.session.getTabSize(),a = this.selectionLead;
                this.session.isTabStop(a) && this.doc.getLine(a.row).slice(a.column, a.column + c).split(" ").length - 1 == c ? this.moveCursorBy(0, c) : this.moveCursorBy(0, 1)
            }
        },this.moveCursorLineStart = function() {
            var a = this.selectionLead.row,b = this.selectionLead.column,c = this.session.documentToScreenRow(a, b),d = this.session.screenToDocumentPosition(c, 0),e = this.session.getDisplayLine(a, b, d.row, d.column),f = e.match(/^\s*/);
            f[0].length == 0 || f[0].length >= b - d.column ? this.moveCursorTo(d.row, d.column) : this.moveCursorTo(d.row, d.column + f[0].length)
        },this.moveCursorLineEnd = function() {
            var a = this.selectionLead,b = this.session.getDocumentLastRowColumnPosition(a.row, a.column);
            this.moveCursorTo(b.row, b.column)
        },this.moveCursorFileEnd = function() {
            var a = this.doc.getLength() - 1,b = this.doc.getLine(a).length;
            this.moveCursorTo(a, b)
        },this.moveCursorFileStart = function() {
            this.moveCursorTo(0, 0)
        },this.moveCursorWordRight = function() {
            var a = this.selectionLead.row,b = this.selectionLead.column,c = this.doc.getLine(a),d = c.substring(b),e;
            this.session.nonTokenRe.lastIndex = 0,this.session.tokenRe.lastIndex = 0;
            var f;
            if (f = this.session.getFoldAt(a, b, 1))this.moveCursorTo(f.end.row, f.end.column); else {
                if (b == c.length) {
                    this.moveCursorRight();
                    return
                }
                if (e = this.session.nonTokenRe.exec(d))b += this.session.nonTokenRe.lastIndex,this.session.nonTokenRe.lastIndex = 0; else if (e = this.session.tokenRe.exec(d))b += this.session.tokenRe.lastIndex,this.session.tokenRe.lastIndex = 0;
                this.moveCursorTo(a, b)
            }
        },this.moveCursorWordLeft = function() {
            var a = this.selectionLead.row,b = this.selectionLead.column,c;
            if (c = this.session.getFoldAt(a, b, -1))this.moveCursorTo(c.start.row, c.start.column); else {
                if (b == 0) {
                    this.moveCursorLeft();
                    return
                }
                var d = this.session.getFoldStringAt(a, b, -1);
                d == null && (d = this.doc.getLine(a).substring(0, b));
                var f = e.stringReverse(d),g;
                this.session.nonTokenRe.lastIndex = 0,this.session.tokenRe.lastIndex = 0;
                if (g = this.session.nonTokenRe.exec(f))b -= this.session.nonTokenRe.lastIndex,this.session.nonTokenRe.lastIndex = 0; else if (g = this.session.tokenRe.exec(f))b -= this.session.tokenRe.lastIndex,this.session.tokenRe.lastIndex = 0;
                this.moveCursorTo(a, b)
            }
        },this.moveCursorBy = function(a, b) {
            var c = this.session.documentToScreenPosition(this.selectionLead.row, this.selectionLead.column),d = b == 0 && this.$desiredColumn || c.column,e = this.session.screenToDocumentPosition(c.row + a, d);
            this.moveCursorTo(e.row, e.column + b, b == 0)
        },this.moveCursorToPosition = function(a) {
            this.moveCursorTo(a.row, a.column)
        },this.moveCursorTo = function(a, b, c) {
            var d = this.session.getFoldAt(a, b, 1);
            d && (a = d.start.row,b = d.start.column),this.selectionLead.setPosition(a, b),c || this.$updateDesiredColumn(this.selectionLead.column)
        },this.moveCursorToScreen = function(a, b, c) {
            var d = this.session.screenToDocumentPosition(a, b);
            a = d.row,b = d.column,this.moveCursorTo(a, b, c)
        }
    }).call(h.prototype),b.Selection = h
}),define("ace/range", ["require","exports","module"], function(a, b, c) {
    var d = function(a, b, c, d) {
        this.start = {row:a,column:b},this.end = {row:c,column:d}
    };
    (function() {
        this.toString = function() {
            return"Range: [" + this.start.row + "/" + this.start.column + "] -> [" + this.end.row + "/" + this.end.column + "]"
        },this.contains = function(a, b) {
            return this.compare(a, b) == 0
        },this.compareRange = function(a) {
            var b,c = a.end,d = a.start;
            b = this.compare(c.row, c.column);
            if (b == 1) {
                b = this.compare(d.row, d.column);
                return b == 1 ? 2 : b == 0 ? 1 : 0
            }
            if (b == -1)return-2;
            b = this.compare(d.row, d.column);
            return b == -1 ? -1 : b == 1 ? 42 : 0
        },this.containsRange = function(a) {
            var b = this.compareRange(a);
            return b == -1 || b == 0 || b == 1
        },this.isEnd = function(a, b) {
            return this.end.row == a && this.end.column == b
        },this.isStart = function(a, b) {
            return this.start.row == a && this.start.column == b
        },this.setStart = function(a, b) {
            typeof a == "object" ? (this.start.column = a.column,this.start.row = a.row) : (this.start.row = a,this.start.column = b)
        },this.setEnd = function(a, b) {
            typeof a == "object" ? (this.end.column = a.column,this.end.row = a.row) : (this.end.row = a,this.end.column = b)
        },this.inside = function(a, b) {
            if (this.compare(a, b) == 0)return this.isEnd(a, b) || this.isStart(a, b) ? !1 : !0;
            return!1
        },this.insideStart = function(a, b) {
            if (this.compare(a, b) == 0)return this.isEnd(a, b) ? !1 : !0;
            return!1
        },this.insideEnd = function(a, b) {
            if (this.compare(a, b) == 0)return this.isStart(a, b) ? !1 : !0;
            return!1
        },this.compare = function(a, b) {
            if (!this.isMultiLine() && a === this.start.row)return b < this.start.column ? -1 : b > this.end.column ? 1 : 0;
            return a < this.start.row ? -1 : a > this.end.row ? 1 : this.start.row === a ? b >= this.start.column ? 0 : -1 : this.end.row === a ? b <= this.end.column ? 0 : 1 : 0
        },this.compareStart = function(a, b) {
            return this.start.row == a && this.start.column == b ? -1 : this.compare(a, b)
        },this.compareEnd = function(a, b) {
            return this.end.row == a && this.end.column == b ? 1 : this.compare(a, b)
        },this.compareInside = function(a, b) {
            return this.end.row == a && this.end.column == b ? 1 : this.start.row == a && this.start.column == b ? -1 : this.compare(a, b)
        },this.clipRows = function(a, b) {
            if (this.end.row > b)var c = {row:b + 1,column:0};
            if (this.start.row > b)var e = {row:b + 1,column:0};
            if (this.start.row < a)var e = {row:a,column:0};
            if (this.end.row < a)var c = {row:a,column:0};
            return d.fromPoints(e || this.start, c || this.end)
        },this.extend = function(a, b) {
            var c = this.compare(a, b);
            if (c == 0)return this;
            if (c == -1)var e = {row:a,column:b}; else var f = {row:a,column:b};
            return d.fromPoints(e || this.start, f || this.end)
        },this.isEmpty = function() {
            return this.start.row == this.end.row && this.start.column == this.end.column
        },this.isMultiLine = function() {
            return this.start.row !== this.end.row
        },this.clone = function() {
            return d.fromPoints(this.start, this.end)
        },this.collapseRows = function() {
            return this.end.column == 0 ? new d(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0) : new d(this.start.row, 0, this.end.row, 0)
        },this.toScreenRange = function(a) {
            var b = a.documentToScreenPosition(this.start),c = a.documentToScreenPosition(this.end);
            return new d(b.row, b.column, c.row, c.column)
        }
    }).call(d.prototype),d.fromPoints = function(a, b) {
        return new d(a.row, a.column, b.row, b.column)
    },b.Range = d
}),define("ace/mode/text", ["require","exports","module","ace/tokenizer","ace/mode/text_highlight_rules","ace/mode/behaviour"], function(a, b, c) {
    var d = a("ace/tokenizer").Tokenizer,e = a("ace/mode/text_highlight_rules").TextHighlightRules,f = a("ace/mode/behaviour").Behaviour,g = function() {
        this.$tokenizer = new d((new e).getRules()),this.$behaviour = new f
    };
    (function() {
        this.getTokenizer = function() {
            return this.$tokenizer
        },this.toggleCommentLines = function(a, b, c, d) {
        },this.getNextLineIndent = function(a, b, c) {
            return""
        },this.checkOutdent = function(a, b, c) {
            return!1
        },this.autoOutdent = function(a, b, c) {
        },this.$getIndent = function(a) {
            var b = a.match(/^(\s+)/);
            return b ? b[1] : ""
        },this.createWorker = function(a) {
            return null
        },this.highlightSelection = function(a) {
            var b = a.session;
            b.$selectionOccurrences || (b.$selectionOccurrences = []),b.$selectionOccurrences.length && this.clearSelectionHighlight(a);
            var c = a.getSelectionRange();
            if (!c.isEmpty() && !c.isMultiLine()) {
                var d = c.start.column - 1,e = c.end.column + 1,f = b.getLine(c.start.row),g = f.length,h = f.substring(Math.max(d, 0), Math.min(e, g));
                if (d >= 0 && /^[\w\d]/.test(h) || e <= g && /[\w\d]$/.test(h))return;
                h = f.substring(c.start.column, c.end.column);
                if (!/^[\w\d]+$/.test(h))return;
                var i = a.getCursorPosition(),j = {wrap:!0,wholeWord:!0,caseSensitive:!0,needle:h},k = a.$search.getOptions();
                a.$search.set(j);
                var l = a.$search.findAll(b);
                l.forEach(function(a) {
                    if (!a.contains(i.row, i.column)) {
                        var c = b.addMarker(a, "ace_selected_word");
                        b.$selectionOccurrences.push(c)
                    }
                }),a.$search.set(k)
            }
        },this.clearSelectionHighlight = function(a) {
            !a.session.$selectionOccurrences || (a.session.$selectionOccurrences.forEach(function(b) {
                a.session.removeMarker(b)
            }),a.session.$selectionOccurrences = [])
        },this.createModeDelegates = function(a) {
            if (!!this.$embeds) {
                this.$modes = {};
                for (var b = 0; b < this.$embeds.length; b++)a[this.$embeds[b]] && (this.$modes[this.$embeds[b]] = new a[this.$embeds[b]]);
                var c = ["toggleCommentLines","getNextLineIndent","checkOutdent","autoOutdent","transformAction"];
                for (var b = 0; b < c.length; b++)(function(a) {
                    var d = c[b],e = a[d];
                    a[c[b]] = function() {
                        return this.$delegator(d, arguments, e)
                    }
                })(this)
            }
        },this.$delegator = function(a, b, c) {
            var d = b[0];
            for (var e = 0; e < this.$embeds.length; e++) {
                if (!this.$modes[this.$embeds[e]])continue;
                var f = d.split(this.$embeds[e]);
                if (!f[0] && f[1]) {
                    b[0] = f[1];
                    var g = this.$modes[this.$embeds[e]];
                    return g[a].apply(g, b)
                }
            }
            var h = c.apply(this, b);
            return c ? h : undefined
        },this.transformAction = function(a, b, c, d, e) {
            if (this.$behaviour) {
                var f = this.$behaviour.getBehaviours();
                for (var g in f)if (f[g][b]) {
                    var h = f[g][b].apply(this, arguments);
                    if (h !== !1)return h
                }
            }
            return!1
        }
    }).call(g.prototype),b.Mode = g
}),define("ace/tokenizer", ["require","exports","module"], function(a, b, c) {
    var d = function(a) {
        this.rules = a,this.regExps = {},this.matchMappings = {};
        for (var b in this.rules) {
            var c = this.rules[b],d = c,e = [],f = 0,g = this.matchMappings[b] = {};
            for (var h = 0; h < d.length; h++) {
                var i = (new RegExp("(?:(" + d[h].regex + ")|(.))")).exec("a").length - 2,j = d[h].regex.replace(/\\([0-9]+)/g, function(a, b) {
                    return"\\" + (parseInt(b, 10) + f + 1)
                });
                g[f] = {rule:h,len:i},f += i,e.push(j)
            }
            this.regExps[b] = new RegExp("(?:(" + e.join(")|(") + ")|(.))", "g")
        }
    };
    (function() {
        this.getLineTokens = function(a, b) {
            var c = b,d = this.rules[c],e = this.matchMappings[c],f = this.regExps[c];
            f.lastIndex = 0;
            var g,h = [],i = 0,j = {type:null,value:""};
            while (g = f.exec(a)) {
                var k = "text",l = [g[0]];
                for (var m = 0; m < g.length - 2; m++)if (g[m + 1] !== undefined) {
                    var n = d[e[m].rule];
                    e[m].len > 1 && (l = g.slice(m + 2, m + 1 + e[m].len)),typeof n.token == "function" ? k = n.token.apply(this, l) : k = n.token,n.next && n.next !== c && (c = n.next,d = this.rules[c],e = this.matchMappings[c],i = f.lastIndex,f = this.regExps[c],f.lastIndex = i);
                    break
                }
                typeof k == "string" && (typeof l != "string" && (l = [l.join("")]),k = [k]);
                for (var m = 0; m < l.length; m++)j.type !== k[m] ? (j.type && h.push(j),j = {type:k[m],value:l[m]}) : j.value += l[m];
                if (i == a.length)break;
                i = f.lastIndex
            }
            j.type && h.push(j);
            return{tokens:h,state:c}
        }
    }).call(d.prototype),b.Tokenizer = d
}),define("ace/mode/text_highlight_rules", ["require","exports","module","pilot/lang"], function(a, b, c) {
    var d = a("pilot/lang"),e = function() {
        this.$rules = {start:[
            {token:"empty_line",regex:"^$"},
            {token:"text",regex:".+"}
        ]}
    };
    (function() {
        this.addRules = function(a, b) {
            for (var c in a) {
                var d = a[c];
                for (var e = 0; e < d.length; e++) {
                    var f = d[e];
                    f.next ? f.next = b + f.next : f.next = b + c
                }
                this.$rules[b + c] = d
            }
        },this.getRules = function() {
            return this.$rules
        },this.embedRules = function(a, b, c, e) {
            var f = (new a).getRules();
            if (e)for (var g = 0; g < e.length; g++)e[g] = b + e[g]; else {
                e = [];
                for (var h in f)e.push(b + h)
            }
            this.addRules(f, b);
            for (var g = 0; g < e.length; g++)Array.prototype.unshift.apply(this.$rules[e[g]], d.deepCopy(c));
            this.$embeds || (this.$embeds = []),this.$embeds.push(b)
        },this.getEmbeds = function() {
            return this.$embeds
        }
    }).call(e.prototype),b.TextHighlightRules = e
}),define("ace/mode/behaviour", ["require","exports","module"], function(a, b, c) {
    var d = function() {
        this.$behaviours = {}
    };
    (function() {
        this.add = function(a, b, c) {
            switch (undefined) {
                case this.$behaviours:
                    this.$behaviours = {};
                case this.$behaviours[a]:
                    this.$behaviours[a] = {}
            }
            this.$behaviours[a][b] = c
        },this.addBehaviours = function(a) {
            for (var b in a)for (var c in a[b])this.add(b, c, a[b][c])
        },this.remove = function(a) {
            this.$behaviours && this.$behaviours[a] && delete this.$behaviours[a]
        },this.inherit = function(a, b) {
            if (typeof a == "function")var c = (new a).getBehaviours(b); else var c = a.getBehaviours(b);
            this.addBehaviours(c)
        },this.getBehaviours = function(a) {
            if (!a)return this.$behaviours;
            var b = {};
            for (var c = 0; c < a.length; c++)this.$behaviours[a[c]] && (b[a[c]] = this.$behaviours[a[c]]);
            return b
        }
    }).call(d.prototype),b.Behaviour = d
}),define("ace/document", ["require","exports","module","pilot/oop","pilot/event_emitter","ace/range","ace/anchor"], function(a, b, c) {
    var d = a("pilot/oop"),e = a("pilot/event_emitter").EventEmitter,f = a("ace/range").Range,g = a("ace/anchor").Anchor,h = function(a) {
        this.$lines = [],Array.isArray(a) ? this.insertLines(0, a) : a.length == 0 ? this.$lines = [""] : this.insert({row:0,column:0}, a)
    };
    (function() {
        d.implement(this, e),this.setValue = function(a) {
            var b = this.getLength();
            this.remove(new f(0, 0, b, this.getLine(b - 1).length)),this.insert({row:0,column:0}, a)
        },this.getValue = function() {
            return this.getAllLines().join(this.getNewLineCharacter())
        },this.createAnchor = function(a, b) {
            return new g(this, a, b)
        },"aaa".split(/a/).length == 0 ? this.$split = function(a) {
            return a.replace(/\r\n|\r/g, "\n").split("\n")
        } : this.$split = function(a) {
            return a.split(/\r\n|\r|\n/)
        },this.$detectNewLine = function(a) {
            var b = a.match(/^.*?(\r?\n)/m);
            b ? this.$autoNewLine = b[1] : this.$autoNewLine = "\n"
        },this.getNewLineCharacter = function() {
            switch (this.$newLineMode) {
                case"windows":
                    return"\r\n";
                case"unix":
                    return"\n";
                case"auto":
                    return this.$autoNewLine
            }
        },this.$autoNewLine = "\n",this.$newLineMode = "auto",this.setNewLineMode = function(a) {
            this.$newLineMode !== a && (this.$newLineMode = a)
        },this.getNewLineMode = function() {
            return this.$newLineMode
        },this.isNewLine = function(a) {
            return a == "\r\n" || a == "\r" || a == "\n"
        },this.getLine = function(a) {
            return this.$lines[a] || ""
        },this.getLines = function(a, b) {
            return this.$lines.slice(a, b + 1)
        },this.getAllLines = function() {
            return this.getLines(0, this.getLength())
        },this.getLength = function() {
            return this.$lines.length
        },this.getTextRange = function(a) {
            if (a.start.row == a.end.row)return this.$lines[a.start.row].substring(a.start.column, a.end.column);
            var b = [];
            b.push(this.$lines[a.start.row].substring(a.start.column)),b.push.apply(b, this.getLines(a.start.row + 1, a.end.row - 1)),b.push(this.$lines[a.end.row].substring(0, a.end.column));
            return b.join(this.getNewLineCharacter())
        },this.$clipPosition = function(a) {
            var b = this.getLength();
            a.row >= b && (a.row = Math.max(0, b - 1),a.column = this.getLine(b - 1).length);
            return a
        },this.insert = function(a, b) {
            if (b.length == 0)return a;
            a = this.$clipPosition(a),this.getLength() <= 1 && this.$detectNewLine(b);
            var c = this.$split(b),d = c.splice(0, 1)[0],e = c.length == 0 ? null : c.splice(c.length - 1, 1)[0];
            this._dispatchEvent("changeStart"),a = this.insertInLine(a, d),e !== null && (a = this.insertNewLine(a),a = this.insertLines(a.row, c),a = this.insertInLine(a, e || "")),this._dispatchEvent("changeEnd");
            return a
        },this.insertLines = function(a, b) {
            if (b.length == 0)return{row:a,column:0};
            var c = [a,0];
            c.push.apply(c, b),this.$lines.splice.apply(this.$lines, c),this._dispatchEvent("changeStart");
            var d = new f(a, 0, a + b.length, 0),e = {action:"insertLines",range:d,lines:b};
            this._dispatchEvent("change", {data:e}),this._dispatchEvent("changeEnd");
            return d.end
        },this.insertNewLine = function(a) {
            a = this.$clipPosition(a);
            var b = this.$lines[a.row] || "";
            this._dispatchEvent("changeStart"),this.$lines[a.row] = b.substring(0, a.column),this.$lines.splice(a.row + 1, 0, b.substring(a.column, b.length));
            var c = {row:a.row + 1,column:0},d = {action:"insertText",range:f.fromPoints(a, c),text:this.getNewLineCharacter()};
            this._dispatchEvent("change", {data:d}),this._dispatchEvent("changeEnd");
            return c
        },this.insertInLine = function(a, b) {
            if (b.length == 0)return a;
            var c = this.$lines[a.row] || "";
            this._dispatchEvent("changeStart"),this.$lines[a.row] = c.substring(0, a.column) + b + c.substring(a.column);
            var d = {row:a.row,column:a.column + b.length},e = {action:"insertText",range:f.fromPoints(a, d),text:b};
            this._dispatchEvent("change", {data:e}),this._dispatchEvent("changeEnd");
            return d
        },this.remove = function(a) {
            a.start = this.$clipPosition(a.start),a.end = this.$clipPosition(a.end);
            if (a.isEmpty())return a.start;
            var b = a.start.row,c = a.end.row;
            this._dispatchEvent("changeStart");
            if (a.isMultiLine()) {
                var d = a.start.column == 0 ? b : b + 1,e = c - 1;
                a.end.column > 0 && this.removeInLine(c, 0, a.end.column),e >= d && this.removeLines(d, e),d != b && (this.removeInLine(b, a.start.column, this.getLine(b).length),this.removeNewLine(a.start.row))
            } else this.removeInLine(b, a.start.column, a.end.column);
            this._dispatchEvent("changeEnd");
            return a.start
        },this.removeInLine = function(a, b, c) {
            if (b != c) {
                var d = new f(a, b, a, c),e = this.getLine(a),g = e.substring(b, c),h = e.substring(0, b) + e.substring(c, e.length);
                this._dispatchEvent("changeStart"),this.$lines.splice(a, 1, h);
                var i = {action:"removeText",range:d,text:g};
                this._dispatchEvent("change", {data:i}),this._dispatchEvent("changeEnd");
                return d.start
            }
        },this.removeLines = function(a, b) {
            this._dispatchEvent("changeStart");
            var c = new f(a, 0, b + 1, 0),d = this.$lines.splice(a, b - a + 1),e = {action:"removeLines",range:c,nl:this.getNewLineCharacter(),lines:d};
            this._dispatchEvent("change", {data:e}),this._dispatchEvent("changeEnd");
            return d
        },this.removeNewLine = function(a) {
            var b = this.getLine(a),c = this.getLine(a + 1),d = new f(a, b.length, a + 1, 0),e = b + c;
            this._dispatchEvent("changeStart"),this.$lines.splice(a, 2, e);
            var g = {action:"removeText",range:d,text:this.getNewLineCharacter()};
            this._dispatchEvent("change", {data:g}),this._dispatchEvent("changeEnd")
        },this.replace = function(a, b) {
            if (b.length == 0 && a.isEmpty())return a.start;
            if (b == this.getTextRange(a))return a.end;
            this._dispatchEvent("changeStart"),this.remove(a);
            if (b)var c = this.insert(a.start, b); else c = a.start;
            this._dispatchEvent("changeEnd");
            return c
        },this.applyDeltas = function(a) {
            for (var b = 0; b < a.length; b++) {
                var c = a[b],d = f.fromPoints(c.range.start, c.range.end);
                c.action == "insertLines" ? this.insertLines(d.start.row, c.lines) : c.action == "insertText" ? this.insert(d.start, c.text) : c.action == "removeLines" ? this.removeLines(d.start.row, d.end.row - 1) : c.action == "removeText" && this.remove(d)
            }
        },this.revertDeltas = function(a) {
            for (var b = a.length - 1; b >= 0; b--) {
                var c = a[b],d = f.fromPoints(c.range.start, c.range.end);
                c.action == "insertLines" ? this.removeLines(d.start.row, d.end.row - 1) : c.action == "insertText" ? this.remove(d) : c.action == "removeLines" ? this.insertLines(d.start.row, c.lines) : c.action == "removeText" && this.insert(d.start, c.text)
            }
        }
    }).call(h.prototype),b.Document = h
}),define("ace/anchor", ["require","exports","module","pilot/oop","pilot/event_emitter"], function(a, b, c) {
    var d = a("pilot/oop"),e = a("pilot/event_emitter").EventEmitter,f = b.Anchor = function(a, b, c) {
        this.document = a,typeof c == "undefined" ? this.setPosition(b.row, b.column) : this.setPosition(b, c),this.$onChange = this.onChange.bind(this),a.on("change", this.$onChange)
    };
    (function() {
        d.implement(this, e),this.getPosition = function() {
            return this.$clipPositionToDocument(this.row, this.column)
        },this.getDocument = function() {
            return this.document
        },this.onChange = function(a) {
            var b = a.data,c = b.range;
            if (c.start.row != c.end.row || c.start.row == this.row) {
                if (c.start.row > this.row)return;
                if (c.start.row == this.row && c.start.column > this.column)return;
                var d = this.row,e = this.column;
                b.action === "insertText" ? c.start.row === d && c.start.column <= e ? c.start.row === c.end.row ? e += c.end.column - c.start.column : (e -= c.start.column,d += c.end.row - c.start.row) : c.start.row !== c.end.row && c.start.row < d && (d += c.end.row - c.start.row) : b.action === "insertLines" ? c.start.row <= d && (d += c.end.row - c.start.row) : b.action == "removeText" ? c.start.row == d && c.start.column < e ? c.end.column >= e ? e = c.start.column : e = Math.max(0, e - (c.end.column - c.start.column)) : c.start.row !== c.end.row && c.start.row < d ? (c.end.row == d && (e = Math.max(0, e - c.end.column) + c.start.column),d -= c.end.row - c.start.row) : c.end.row == d && (d -= c.end.row - c.start.row,e = Math.max(0, e - c.end.column) + c.start.column) : b.action == "removeLines" && c.start.row <= d && (c.end.row <= d ? d -= c.end.row - c.start.row : (d = c.start.row,e = 0)),this.setPosition(d, e, !0)
            }
        },this.setPosition = function(a, b, c) {
            c ? pos = {row:a,column:b} : pos = this.$clipPositionToDocument(a, b);
            if (this.row != pos.row || this.column != pos.column) {
                var d = {row:this.row,column:this.column};
                this.row = pos.row,this.column = pos.column,this._dispatchEvent("change", {old:d,value:pos})
            }
        },this.detach = function() {
            this.document.removeEventListener("change", this.$onChange)
        },this.$clipPositionToDocument = function(a, b) {
            var c = {};
            a >= this.document.getLength() ? (c.row = Math.max(0, this.document.getLength() - 1),c.column = this.document.getLine(c.row).length) : a < 0 ? (c.row = 0,c.column = 0) : (c.row = a,c.column = Math.min(this.document.getLine(c.row).length, Math.max(0, b))),b < 0 && (c.column = 0);
            return c
        }
    }).call(f.prototype)
}),define("ace/background_tokenizer", ["require","exports","module","pilot/oop","pilot/event_emitter"], function(a, b, c) {
    var d = a("pilot/oop"),e = a("pilot/event_emitter").EventEmitter,f = function(a, b) {
        this.running = !1,this.lines = [],this.currentLine = 0,this.tokenizer = a;
        var c = this;
        this.$worker = function() {
            if (!!c.running) {
                var a = new Date,b = c.currentLine,d = c.doc,e = 0,f = d.getLength();
                while (c.currentLine < f) {
                    c.lines[c.currentLine] = c.$tokenizeRows(c.currentLine, c.currentLine)[0],c.currentLine++,e += 1;
                    if (e % 5 == 0 && new Date - a > 20) {
                        c.fireUpdateEvent(b, c.currentLine - 1),c.running = setTimeout(c.$worker, 20);
                        return
                    }
                }
                c.running = !1,c.fireUpdateEvent(b, f - 1)
            }
        }
    };
    (function() {
        d.implement(this, e),this.setTokenizer = function(a) {
            this.tokenizer = a,this.lines = [],this.start(0)
        },this.setDocument = function(a) {
            this.doc = a,this.lines = [],this.stop()
        },this.fireUpdateEvent = function(a, b) {
            var c = {first:a,last:b};
            this._dispatchEvent("update", {data:c})
        },this.start = function(a) {
            this.currentLine = Math.min(a || 0, this.currentLine, this.doc.getLength()),this.lines.splice(this.currentLine, this.lines.length),this.stop(),this.running = setTimeout(this.$worker, 700)
        },this.stop = function() {
            this.running && clearTimeout(this.running),this.running = !1
        },this.getTokens = function(a, b) {
            return this.$tokenizeRows(a, b)
        },this.getState = function(a) {
            return this.$tokenizeRows(a, a)[0].state
        },this.$tokenizeRows = function(a, b) {
            if (!this.doc)return[];
            var c = [],d = "start",e = !1;
            a > 0 && this.lines[a - 1] ? (d = this.lines[a - 1].state,e = !0) : a == 0 ? (d = "start",e = !0) : this.lines.length > 0 && (d = this.lines[this.lines.length - 1].state);
            var f = this.doc.getLines(a, b);
            for (var g = a; g <= b; g++)if (!this.lines[g]) {
                var h = this.tokenizer.getLineTokens(f[g - a] || "", d),d = h.state;
                c.push(h),e && (this.lines[g] = h)
            } else {
                var h = this.lines[g];
                d = h.state,c.push(h)
            }
            return c
        }
    }).call(f.prototype),b.BackgroundTokenizer = f
}),define("ace/edit_session/folding", ["require","exports","module","ace/range","ace/edit_session/fold_line"], function(a, b, c) {
    function g() {
        this.getFoldAt = function(a, b, c) {
            var d = this.getFoldLine(a);
            if (!d)return null;
            var e = d.folds,f;
            for (var g = 0; g < e.length; g++) {
                f = e[g];
                if (f.range.contains(a, b)) {
                    if (c == 1 && f.range.isEnd(a, b))continue;
                    if (c == -1 && f.range.isStart(a, b))continue;
                    return f
                }
            }
        },this.getFoldsInRange = function(a) {
            a = a.clone();
            var b = a.start,c = a.end,d = this.$foldData,e,f,g,h = [];
            b.column += 1,c.column -= 1;
            for (var i = 0; i < d.length; i++) {
                g = d[i].range.compareRange(a);
                if (g == 2)continue;
                if (g == -2)break;
                e = d[i].folds;
                for (var j = 0; j < e.length; j++) {
                    f = e[j],g = f.range.compareRange(a);
                    if (g == -2)break;
                    if (g == 2)continue;
                    if (g == 42)break;
                    h.push(f)
                }
            }
            return h
        },this.getFoldStringAt = function(a, b, c, d) {
            var d = d || this.getFoldLine(a);
            if (!d)return null;
            var e,f,g,h;
            f = {end:{column:0}};
            for (var i = 0; i < d.folds.length; i++) {
                e = d.folds[i],g = e.range.compareEnd(a, b);
                if (g == -1) {
                    h = this.getLine(e.start.row).substring(f.end.column, e.start.column);
                    break
                }
                if (g == 0)return null;
                f = e
            }
            h || (h = this.getLine(e.start.row).substring(f.end.column));
            return c == -1 ? h.substring(0, b - f.end.column) : c == 1 ? h.substring(b - f.end.column) : h
        },this.getFoldLine = function(a, b) {
            var c = this.$foldData,d = 0;
            b && (d = c.indexOf(b)),d == -1 && (d = 0);
            for (d; d < c.length; d++) {
                var e = c[d];
                if (e.start.row <= a && e.end.row >= a)return e;
                if (e.end.row > a)return null
            }
            return null
        },this.getNextFold = function(a, b) {
            var c = this.$foldData,d,e = 0;
            b && (e = c.indexOf(b)),e == -1 && (e = 0);
            for (e; e < c.length; e++) {
                var f = c[e];
                if (f.end.row >= a)return f
            }
            return null
        },this.getFoldedRowCount = function(a, b) {
            var c = this.$foldData,d = b - a + 1;
            for (var e = 0; e < c.length; e++) {
                var f = c[e],g = f.end.row,h = f.start.row;
                if (g >= b) {
                    h < b && (h >= a ? d -= b - h : d = 0);
                    break
                }
                g >= a && (h >= a ? d -= g - h : d -= g - a + 1)
            }
            return d
        },this.$addFoldLine = function(a) {
            this.$foldData.push(a),this.$foldData.sort(function(a, b) {
                return a.start.row - b.start.row
            });
            return a
        },this.addFold = function(a, b, c, g, h) {
            var i,j = this.$foldData,k = null,l,m,n,o,p = !1;
            a instanceof f && (n = a,b = n.range,a = n.placeholder),b instanceof d ? (i = b,b = i.start.row,c = i.start.column,g = i.end.row,h = i.end.column) : i = new d(b, c, g, h);
            if (a.length < 2)throw"Placeholder has to be at least 2 characters";
            if (b == g && h - c < 2)throw"The range has to be at least 2 characters width";
            m = this.getFoldAt(b, c, 1);
            if (m && m.range.isEnd(g, h) && m.range.isStart(b, c))return m;
            m = this.getFoldAt(b, c, 1);
            if (m && !m.range.isStart(b, c))throw"A fold can't start inside of an already existing fold";
            m = this.getFoldAt(g, h, -1);
            if (m && !m.range.isEnd(g, h))throw"A fold can't end inside of an already existing fold";
            if (g >= this.doc.getLength())throw"End of fold is outside of the document.";
            if (h > this.getLine(g).length || c > this.getLine(b).length)throw"End of fold is outside of the document.";
            m = n || new f(i, a),o = this.getFoldsInRange(i),o.length > 0 && (this.removeFolds(o),m.subFolds = o);
            for (var q = 0; q < j.length; q++) {
                l = j[q];
                if (g == l.start.row) {
                    l.addFold(m),p = !0;
                    break
                }
                if (b == l.end.row) {
                    l.addFold(m),p = !0;
                    if (!m.sameRow) {
                        foldLineNext = j[q + 1];
                        if (foldLineNext && foldLineNext.start.row == g) {
                            l.merge(foldLineNext);
                            break
                        }
                    }
                    break
                }
                if (g <= l.start.row)break
            }
            p || (l = this.$addFoldLine(new e(this.$foldData, m))),this.$useWrapMode && this.$updateWrapData(l.start.row, l.start.row),this.$modified = !0,this._dispatchEvent("changeFold", {data:m});
            return m
        },this.addFolds = function(a) {
            a.forEach(function(a) {
                this.addFold(a)
            }, this)
        },this.removeFold = function(a) {
            var b = a.foldLine,c = b.start.row,d = b.end.row,e = this.$foldData,f = b.folds;
            if (f.length == 1)e.splice(e.indexOf(b), 1); else if (b.range.isEnd(a.end.row, a.end.column))f.pop(),b.end.row = f[f.length - 1].end.row,b.end.column = f[f.length - 1].end.column; else if (b.range.isStart(a.start.row, a.start.column))f.shift(),b.start.row = f[0].start.row,b.start.column = f[0].start.column; else if (a.sameRow)f.splice(f.indexOf(a), 1); else {
                var g = b.split(a.start.row, a.start.column);
                g.folds.shift(),b.start.row = f[0].start.row,b.start.column = f[0].start.column,this.$addFoldLine(g)
            }
            this.$useWrapMode && this.$updateWrapData(c, d),this.$modified = !0,this._dispatchEvent("changeFold", {data:a})
        },this.removeFolds = function(a) {
            var b = [];
            for (var c = 0; c < a.length; c++)b.push(a[c]);
            b.forEach(function(a) {
                this.removeFold(a)
            }, this),this.$modified = !0
        },this.expandFold = function(a) {
            this.removeFold(a),a.subFolds.forEach(function(a) {
                this.addFold(a)
            }, this),a.subFolds = []
        },this.expandFolds = function(a) {
            a.forEach(function(a) {
                this.expandFold(a)
            }, this)
        },this.isRowFolded = function(a, b) {
            return!!this.getFoldLine(a, b)
        },this.getRowFoldEnd = function(a, b) {
            var c = this.getFoldLine(a, b);
            return c ? c.end.row : a
        },this.getFoldDisplayLine = function(a, b, c, d, e) {
            d == null && (d = a.start.row,e = 0),b == null && (b = a.end.row,c = this.getLine(b).length);
            var f = "",g = this.doc,h = "";
            a.walk(function(a, b, c, f, i) {
                if (!(b < d)) {
                    if (b == d) {
                        if (c < e)return;
                        f = Math.max(e, f)
                    }
                    a ? h += a : h += g.getLine(b).substring(f, c)
                }
            }.bind(this), b, c);
            return h
        },this.getDisplayLine = function(a, b, c, d) {
            var e = this.getFoldLine(a);
            if (!e) {
                var f;
                f = this.doc.getLine(a);
                return f.substring(d || 0, b || f.length)
            }
            return this.getFoldDisplayLine(e, a, b, c, d)
        },this.$cloneFoldData = function() {
            var a = this.$foldData,b = [];
            b = this.$foldData.map(function(a) {
                var c = a.folds.map(function(a) {
                    return a.clone()
                });
                return new e(b, c)
            });
            return b
        }
    }

    function f(a, b) {
        this.foldLine = null,this.placeholder = b,this.range = a,this.start = a.start,this.end = a.end,this.sameRow = a.start.row == a.end.row,this.subFolds = []
    }

    var d = a("ace/range").Range,e = a("ace/edit_session/fold_line").FoldLine;
    f.prototype.toString = function() {
        return'"' + this.placeholder + '" ' + this.range.toString()
    },f.prototype.setFoldLine = function(a) {
        this.foldLine = a,this.subFolds.forEach(function(b) {
            b.setFoldLine(a)
        })
    },f.prototype.clone = function() {
        var a = this.range.clone(),b = new f(a, this.placeholder);
        this.subFolds.forEach(function(a) {
            b.subFolds.push(a.clone())
        });
        return b
    },b.Folding = g
}),define("ace/edit_session/fold_line", ["require","exports","module","ace/range"], function(a, b, c) {
    function e(a, b) {
        this.foldData = a,Array.isArray(b) ? this.folds = b : b = this.folds = [b];
        var c = b[b.length - 1];
        this.range = new d(b[0].start.row, b[0].start.column, c.end.row, c.end.column),this.start = this.range.start,this.end = this.range.end,this.folds.forEach(function(a) {
            a.setFoldLine(this)
        }, this)
    }

    var d = a("ace/range").Range;
    (function() {
        this.shiftRow = function(a) {
            this.start.row += a,this.end.row += a,this.folds.forEach(function(b) {
                b.start.row += a,b.end.row += a
            })
        },this.addFold = function(a) {
            if (a.sameRow) {
                if (a.start.row < this.startRow || a.endRow > this.endRow)throw"Can't add a fold to this FoldLine as it has no connection";
                this.folds.push(a),this.folds.sort(function(a, b) {
                    return-a.range.compareEnd(b.start.row, b.start.column)
                }),this.range.compareEnd(a.start.row, a.start.column) > 0 ? (this.end.row = a.end.row,this.end.column = a.end.column) : this.range.compareStart(a.end.row, a.end.column) < 0 && (this.start.row = a.start.row,this.start.column = a.start.column)
            } else if (a.start.row == this.end.row)this.folds.push(a),this.end.row = a.end.row,this.end.column = a.end.column; else if (a.end.row == this.start.row)this.folds.unshift(a),this.start.row = a.start.row,this.start.column = a.start.column; else throw"Trying to add fold to FoldRow that doesn't have a matching row";
            a.foldLine = this
        },this.containsRow = function(a) {
            return a >= this.start.row && a <= this.end.row
        },this.walk = function(a, b, c) {
            var d = 0,e = this.folds,f,g,h,i = !0;
            b == null && (b = this.end.row,c = this.end.column);
            for (var j = 0; j < e.length; j++) {
                f = e[j],g = f.range.compareStart(b, c);
                if (g == -1) {
                    a(null, b, c, d, i);
                    return
                }
                h = a(null, f.start.row, f.start.column, d, i),h = !h && a(f.placeholder, f.start.row, f.start.column, d);
                if (h || g == 0)return;
                i = !f.sameRow,d = f.end.column
            }
            a(null, b, c, d, i)
        },this.getNextFoldTo = function(a, b) {
            var c,d;
            for (var e = 0; e < this.folds.length; e++) {
                c = this.folds[e],d = c.range.compareEnd(a, b);
                if (d == -1)return{fold:c,kind:"after"};
                if (d == 0)return{fold:c,kind:"inside"}
            }
            return null
        },this.addRemoveChars = function(a, b, c) {
            var d = this.getNextFoldTo(a, b),e,f;
            if (d) {
                e = d.fold;
                if (d.kind == "inside" && e.start.column != b && e.start.row != a)throw"Moving characters inside of a fold should never be reached";
                if (e.start.row == a) {
                    f = this.folds;
                    var g = f.indexOf(e);
                    g == 0 && (this.start.column += c);
                    for (g; g < f.length; g++) {
                        e = f[g],e.start.column += c;
                        if (!e.sameRow)return;
                        e.end.column += c
                    }
                    this.end.column += c
                }
            }
        },this.split = function(a, b) {
            var c = this.getNextFoldTo(a, b).fold,d = this.folds,f = this.foldData;
            if (!c)return null;
            var g = d.indexOf(c),h = d[g - 1];
            this.end.row = h.end.row,this.end.column = h.end.column,d = d.splice(g, d.length - g);
            var i = new e(f, d);
            f.splice(f.indexOf(this) + 1, 0, i);
            return i
        },this.merge = function(a) {
            var b = a.folds;
            for (var c = 0; c < b.length; c++)this.addFold(b[c]);
            var d = this.foldData;
            d.splice(d.indexOf(a), 1)
        },this.toString = function() {
            var a = [this.range.toString() + ": ["];
            this.folds.forEach(function(b) {
                a.push("  " + b.toString())
            }),a.push("]");
            return a.join("\n")
        },this.idxToPosition = function(a) {
            var b = 0,c;
            for (var d = 0; d < this.folds.length; d++) {
                var c = this.folds[d];
                a -= c.start.column - b;
                if (a < 0)return{row:c.start.row,column:c.start.column + a};
                a -= c.placeholder.length;
                if (a < 0)return c.start;
                b = c.end.column
            }
            return{row:this.end.row,column:this.end.column + a}
        }
    }).call(e.prototype),b.FoldLine = e
}),define("ace/search", ["require","exports","module","pilot/lang","pilot/oop","ace/range"], function(a, b, c) {
    var d = a("pilot/lang"),e = a("pilot/oop"),f = a("ace/range").Range,g = function() {
        this.$options = {needle:"",backwards:!1,wrap:!1,caseSensitive:!1,wholeWord:!1,scope:g.ALL,regExp:!1}
    };
    g.ALL = 1,g.SELECTION = 2,function() {
        this.set = function(a) {
            e.mixin(this.$options, a);
            return this
        },this.getOptions = function() {
            return d.copyObject(this.$options)
        },this.find = function(a) {
            if (!this.$options.needle)return null;
            if (this.$options.backwards)var b = this.$backwardMatchIterator(a); else b = this.$forwardMatchIterator(a);
            var c = null;
            b.forEach(function(a) {
                c = a;
                return!0
            });
            return c
        },this.findAll = function(a) {
            if (!this.$options.needle)return[];
            if (this.$options.backwards)var b = this.$backwardMatchIterator(a); else b = this.$forwardMatchIterator(a);
            var c = [];
            b.forEach(function(a) {
                c.push(a)
            });
            return c
        },this.replace = function(a, b) {
            var c = this.$assembleRegExp(),d = c.exec(a);
            return d && d[0].length == a.length ? this.$options.regExp ? a.replace(c, b) : b : null
        },this.$forwardMatchIterator = function(a) {
            var b = this.$assembleRegExp(),c = this;
            return{forEach:function(d) {
                c.$forwardLineIterator(a).forEach(function(a, e, f) {
                    e && (a = a.substring(e));
                    var g = [];
                    a.replace(b, function(a) {
                        var b = arguments[arguments.length - 2];
                        g.push({str:a,offset:e + b});
                        return a
                    });
                    for (var h = 0; h < g.length; h++) {
                        var i = g[h],j = c.$rangeFromMatch(f, i.offset, i.str.length);
                        if (d(j))return!0
                    }
                })
            }}
        },this.$backwardMatchIterator = function(a) {
            var b = this.$assembleRegExp(),c = this;
            return{forEach:function(d) {
                c.$backwardLineIterator(a).forEach(function(a, e, f) {
                    e && (a = a.substring(e));
                    var g = [];
                    a.replace(b, function(a, b) {
                        g.push({str:a,offset:e + b});
                        return a
                    });
                    for (var h = g.length - 1; h >= 0; h--) {
                        var i = g[h],j = c.$rangeFromMatch(f, i.offset, i.str.length);
                        if (d(j))return!0
                    }
                })
            }}
        },this.$rangeFromMatch = function(a, b, c) {
            return new f(a, b, a, b + c)
        },this.$assembleRegExp = function() {
            if (this.$options.regExp)var a = this.$options.needle; else a = d.escapeRegExp(this.$options.needle);
            this.$options.wholeWord && (a = "\\b" + a + "\\b");
            var b = "g";
            this.$options.caseSensitive || (b += "i");
            var c = new RegExp(a, b);
            return c
        },this.$forwardLineIterator = function(a) {
            function k(e) {
                var f = a.getLine(e);
                b && e == c.end.row && (f = f.substring(0, c.end.column)),j && e == d.row && (f = f.substring(0, d.column));
                return f
            }

            var b = this.$options.scope == g.SELECTION,c = a.getSelection().getRange(),d = a.getSelection().getCursor(),e = b ? c.start.row : 0,f = b ? c.start.column : 0,h = b ? c.end.row : a.getLength() - 1,i = this.$options.wrap,j = !1;
            return{forEach:function(a) {
                var b = d.row,c = k(b),g = d.column,l = !1;
                j = !1;
                while (!a(c, g, b)) {
                    if (l)return;
                    b++,g = 0;
                    if (b > h)if (i)b = e,g = f,j = !0; else return;
                    b == d.row && (l = !0),c = k(b)
                }
            }}
        },this.$backwardLineIterator = function(a) {
            var b = this.$options.scope == g.SELECTION,c = a.getSelection().getRange(),d = b ? c.end : c.start,e = b ? c.start.row : 0,f = b ? c.start.column : 0,h = b ? c.end.row : a.getLength() - 1,i = this.$options.wrap;
            return{forEach:function(g) {
                var j = d.row,k = a.getLine(j).substring(0, d.column),l = 0,m = !1,n = !1;
                while (!g(k, l, j)) {
                    if (m)return;
                    j--,l = 0;
                    if (j < e)if (i)j = h,n = !0; else return;
                    j == d.row && (m = !0),k = a.getLine(j),b && (j == e ? l = f : j == h && (k = k.substring(0, c.end.column))),n && j == d.row && (l = d.column)
                }
            }}
        }
    }.call(g.prototype),b.Search = g
}),define("ace/undomanager", ["require","exports","module"], function(a, b, c) {
    var d = function() {
        this.reset()
    };
    (function() {
        this.execute = function(a) {
            var b = a.args[0];
            this.$doc = a.args[1],this.$undoStack.push(b),this.$redoStack = []
        },this.undo = function(a) {
            var b = this.$undoStack.pop(),c = null;
            b && (c = this.$doc.undoChanges(b, a),this.$redoStack.push(b));
            return c
        },this.redo = function(a) {
            var b = this.$redoStack.pop(),c = null;
            b && (c = this.$doc.redoChanges(b, a),this.$undoStack.push(b));
            return c
        },this.reset = function() {
            this.$undoStack = [],this.$redoStack = []
        },this.hasUndo = function() {
            return this.$undoStack.length > 0
        },this.hasRedo = function() {
            return this.$redoStack.length > 0
        }
    }).call(d.prototype),b.UndoManager = d
}),define("ace/virtual_renderer", ["require","exports","module","pilot/oop","pilot/dom","pilot/event","pilot/useragent","ace/layer/gutter","ace/layer/marker","ace/layer/text","ace/layer/cursor","ace/scrollbar","ace/renderloop","pilot/event_emitter","text/ace/css/editor.css"], function(a, b, c) {
    var d = a("pilot/oop"),e = a("pilot/dom"),f = a("pilot/event"),g = a("pilot/useragent"),h = a("ace/layer/gutter").Gutter,i = a("ace/layer/marker").Marker,j = a("ace/layer/text").Text,k = a("ace/layer/cursor").Cursor,l = a("ace/scrollbar").ScrollBar,m = a("ace/renderloop").RenderLoop,n = a("pilot/event_emitter").EventEmitter,o = a("text/ace/css/editor.css");
    e.importCssString(o);
    var p = function(a, b) {
        this.container = a,e.addCssClass(this.container, "ace_editor"),this.setTheme(b),this.$gutter = e.createElement("div"),this.$gutter.className = "ace_gutter",this.container.appendChild(this.$gutter),this.scroller = e.createElement("div"),this.scroller.className = "ace_scroller",this.container.appendChild(this.scroller),this.content = e.createElement("div"),this.content.className = "ace_content",this.scroller.appendChild(this.content),this.$gutterLayer = new h(this.$gutter),this.$markerBack = new i(this.content);
        var c = this.$textLayer = new j(this.content);
        this.canvas = c.element,this.$markerFront = new i(this.content),this.characterWidth = c.getCharacterWidth(),this.lineHeight = c.getLineHeight(),this.$cursorLayer = new k(this.content),this.$cursorPadding = 8,this.$horizScroll = !0,this.$horizScrollAlwaysVisible = !0,this.scrollBar = new l(a),this.scrollBar.addEventListener("scroll", this.onScroll.bind(this)),this.scrollTop = 0,this.cursorPos = {row:0,column:0};
        var d = this;
        this.$textLayer.addEventListener("changeCharaterSize", function() {
            d.characterWidth = c.getCharacterWidth(),d.lineHeight = c.getLineHeight(),d.$updatePrintMargin(),d.onResize(!0),d.$loop.schedule(d.CHANGE_FULL)
        }),f.addListener(this.$gutter, "click", this.$onGutterClick.bind(this)),f.addListener(this.$gutter, "dblclick", this.$onGutterClick.bind(this)),this.$size = {width:0,height:0,scrollerHeight:0,scrollerWidth:0},this.layerConfig = {width:1,padding:0,firstRow:0,firstRowScreen:0,lastRow:0,lineHeight:1,characterWidth:1,minHeight:1,maxHeight:1,offset:0,height:1},this.$loop = new m(this.$renderChanges.bind(this)),this.$loop.schedule(this.CHANGE_FULL),this.setPadding(4),this.$updatePrintMargin()
    };
    (function() {
        this.showGutter = !0,this.CHANGE_CURSOR = 1,this.CHANGE_MARKER = 2,this.CHANGE_GUTTER = 4,this.CHANGE_SCROLL = 8,this.CHANGE_LINES = 16,this.CHANGE_TEXT = 32,this.CHANGE_SIZE = 64,this.CHANGE_MARKER_BACK = 128,this.CHANGE_MARKER_FRONT = 256,this.CHANGE_FULL = 512,d.implement(this, n),this.setSession = function(a) {
            this.session = a,this.$cursorLayer.setSession(a),this.$markerBack.setSession(a),this.$markerFront.setSession(a),this.$gutterLayer.setSession(a),this.$textLayer.setSession(a),this.$loop.schedule(this.CHANGE_FULL)
        },this.updateLines = function(a, b) {
            b === undefined && (b = Infinity),this.$changedLines ? (this.$changedLines.firstRow > a && (this.$changedLines.firstRow = a),this.$changedLines.lastRow < b && (this.$changedLines.lastRow = b)) : this.$changedLines = {firstRow:a,lastRow:b},this.$loop.schedule(this.CHANGE_LINES)
        },this.updateText = function() {
            this.$loop.schedule(this.CHANGE_TEXT)
        },this.updateFull = function() {
            this.$loop.schedule(this.CHANGE_FULL)
        },this.updateFontSize = function() {
            this.$textLayer.checkForSizeChanges()
        },this.onResize = function(a) {
            var b = this.CHANGE_SIZE,c = this.$size,d = e.getInnerHeight(this.container);
            if (a || c.height != d)c.height = d,this.scroller.style.height = d + "px",c.scrollerHeight = this.scroller.clientHeight,this.scrollBar.setHeight(c.scrollerHeight),this.session && (this.scrollToY(this.getScrollTop()),b = b | this.CHANGE_FULL);
            var f = e.getInnerWidth(this.container);
            if (a || c.width != f) {
                c.width = f;
                var g = this.showGutter ? this.$gutter.offsetWidth : 0;
                this.scroller.style.left = g + "px",c.scrollerWidth = Math.max(0, f - g - this.scrollBar.getWidth()),this.scroller.style.width = c.scrollerWidth + "px";
                if (this.session.getUseWrapMode() && this.adjustWrapLimit() || a)b = b | this.CHANGE_FULL
            }
            this.$loop.schedule(b)
        },this.adjustWrapLimit = function() {
            var a = this.$size.scrollerWidth - this.$padding * 2,b = Math.floor(a / this.characterWidth) - 1;
            return this.session.adjustWrapLimit(b)
        },this.$onGutterClick = function(a) {
            var b = f.getDocumentX(a),c = f.getDocumentY(a);
            this._dispatchEvent("gutter" + a.type, {row:this.screenToTextCoordinates(b, c).row,htmlEvent:a})
        },this.setShowInvisibles = function(a) {
            this.$textLayer.setShowInvisibles(a) && this.$loop.schedule(this.CHANGE_TEXT)
        },this.getShowInvisibles = function() {
            return this.$textLayer.showInvisibles
        },this.$showPrintMargin = !0,this.setShowPrintMargin = function(a) {
            this.$showPrintMargin = a,this.$updatePrintMargin()
        },this.getShowPrintMargin = function() {
            return this.$showPrintMargin
        },this.$printMarginColumn = 80,this.setPrintMarginColumn = function(a) {
            this.$printMarginColumn = a,this.$updatePrintMargin()
        },this.getPrintMarginColumn = function() {
            return this.$printMarginColumn
        },this.getShowGutter = function() {
            return this.showGutter
        },this.setShowGutter = function(a) {
            this.showGutter !== a && (this.$gutter.style.display = a ? "block" : "none",this.showGutter = a,this.onResize(!0))
        },this.$updatePrintMargin = function() {
            var a;
            if (!!this.$showPrintMargin || !!this.$printMarginEl) {
                this.$printMarginEl || (a = e.createElement("div"),a.className = "ace_print_margin_layer",this.$printMarginEl = e.createElement("div"),this.$printMarginEl.className = "ace_print_margin",a.appendChild(this.$printMarginEl),this.content.insertBefore(a, this.$textLayer.element));
                var b = this.$printMarginEl.style;
                b.left = this.characterWidth * this.$printMarginColumn + this.$padding * 2 + "px",b.visibility = this.$showPrintMargin ? "visible" : "hidden"
            }
        },this.getContainerElement = function() {
            return this.container
        },this.getMouseEventTarget = function() {
            return this.content
        },this.getTextAreaContainer = function() {
            return this.container
        },this.moveTextAreaToCursor = function(a) {
            if (!g.isIE) {
                var b = this.$cursorLayer.getPixelPosition();
                if (!b)return;
                var c = this.content.getBoundingClientRect(),d = this.layerConfig.offset;
                a.style.left = c.left + b.left + this.$padding + "px",a.style.top = c.top + b.top - this.scrollTop + d + "px"
            }
        },this.getFirstVisibleRow = function() {
            return this.layerConfig.firstRow
        },this.getFirstFullyVisibleRow = function() {
            return this.layerConfig.firstRow + (this.layerConfig.offset === 0 ? 0 : 1)
        },this.getLastFullyVisibleRow = function() {
            var a = Math.floor((this.layerConfig.height + this.layerConfig.offset) / this.layerConfig.lineHeight);
            return this.layerConfig.firstRow - 1 + a
        },this.getLastVisibleRow = function() {
            return this.layerConfig.lastRow
        },this.$padding = null,this.setPadding = function(a) {
            this.$padding = a,this.content.style.padding = "0 " + a + "px",this.$loop.schedule(this.CHANGE_FULL),this.$updatePrintMargin()
        },this.getHScrollBarAlwaysVisible = function() {
            return this.$horizScrollAlwaysVisible
        },this.setHScrollBarAlwaysVisible = function(a) {
            this.$horizScrollAlwaysVisible != a && (this.$horizScrollAlwaysVisible = a,(!this.$horizScrollAlwaysVisible || !this.$horizScroll) && this.$loop.schedule(this.CHANGE_SCROLL))
        },this.onScroll = function(a) {
            this.scrollToY(a.data)
        },this.$updateScrollBar = function() {
            this.scrollBar.setInnerHeight(this.layerConfig.maxHeight),this.scrollBar.setScrollTop(this.scrollTop)
        },this.$renderChanges = function(a) {
            if (!!a && !!this.session) {
                (a & this.CHANGE_FULL || a & this.CHANGE_SIZE || a & this.CHANGE_TEXT || a & this.CHANGE_LINES || a & this.CHANGE_SCROLL) && this.$computeLayerConfig();
                if (a & this.CHANGE_FULL) {
                    this.$textLayer.update(this.layerConfig),this.showGutter && this.$gutterLayer.update(this.layerConfig),this.$markerBack.update(this.layerConfig),this.$markerFront.update(this.layerConfig),this.$cursorLayer.update(this.layerConfig),this.$updateScrollBar();
                    return
                }
                if (a & this.CHANGE_SCROLL) {
                    a & this.CHANGE_TEXT || a & this.CHANGE_LINES ? this.$textLayer.update(this.layerConfig) : this.$textLayer.scrollLines(this.layerConfig),this.showGutter && this.$gutterLayer.update(this.layerConfig),this.$markerBack.update(this.layerConfig),this.$markerFront.update(this.layerConfig),this.$cursorLayer.update(this.layerConfig),this.$updateScrollBar();
                    return
                }
                a & this.CHANGE_TEXT ? (this.$textLayer.update(this.layerConfig),this.showGutter && this.$gutterLayer.update(this.layerConfig)) : a & this.CHANGE_LINES ? (this.$updateLines(),this.$updateScrollBar(),this.showGutter && this.$gutterLayer.update(this.layerConfig)) : a & this.CHANGE_GUTTER && this.showGutter && this.$gutterLayer.update(this.layerConfig),a & this.CHANGE_CURSOR && this.$cursorLayer.update(this.layerConfig),a & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT) && this.$markerFront.update(this.layerConfig),a & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK) && this.$markerBack.update(this.layerConfig),a & this.CHANGE_SIZE && this.$updateScrollBar()
            }
        },this.$computeLayerConfig = function() {
            var a = this.session,b = this.scrollTop % this.lineHeight,c = this.$size.scrollerHeight + this.lineHeight,d = this.$getLongestLine(),e = this.layerConfig.width != d,f = this.$horizScrollAlwaysVisible || this.$size.scrollerWidth - d < 0,g = this.$horizScroll !== f;
            this.$horizScroll = f,g && (this.scroller.style.overflowX = f ? "scroll" : "hidden");
            var h = this.session.getScreenLength() * this.lineHeight;
            this.scrollTop = Math.max(0, Math.min(this.scrollTop, h - this.$size.scrollerHeight));
            var i = Math.ceil(c / this.lineHeight) - 1,j = Math.max(0, Math.round((this.scrollTop - b) / this.lineHeight)),k = j + i,l,m,n = {lineHeight:this.lineHeight};
            j = a.screenToDocumentRow(j, 0);
            var o = a.getFoldLine(j);
            o && (j = o.start.row),l = a.documentToScreenRow(j, 0),m = a.getRowHeight(n, j),k = Math.min(a.screenToDocumentRow(k, 0), a.getLength() - 1),c = this.$size.scrollerHeight + a.getRowHeight(n, k) + m,b = this.scrollTop - l * this.lineHeight,this.layerConfig = {width:d,padding:this.$padding,firstRow:j,firstRowScreen:l,lastRow:k,lineHeight:this.lineHeight,characterWidth:this.characterWidth,minHeight:c,maxHeight:h,offset:b,height:this.$size.scrollerHeight},this.$gutterLayer.element.style.marginTop = -b + "px",this.content.style.marginTop = -b + "px",this.content.style.width = d + "px",this.content.style.height = c + "px",this.$desiredScrollLeft && (this.scrollToX(this.$desiredScrollLeft),this.$desiredScrollLeft = 0),g && this.onResize(!0)
        },this.$updateLines = function() {
            var a = this.$changedLines.firstRow,b = this.$changedLines.lastRow;
            this.$changedLines = null;
            var c = this.layerConfig;
            if (c.width != this.$getLongestLine())return this.$textLayer.update(c);
            if (!(a > c.lastRow + 1)) {
                if (b < c.firstRow)return;
                if (b === Infinity) {
                    this.showGutter && this.$gutterLayer.update(c),this.$textLayer.update(c);
                    return
                }
                this.$textLayer.updateLines(c, a, b)
            }
        },this.$getLongestLine = function() {
            var a = this.session.getScreenWidth() + 1;
            this.$textLayer.showInvisibles && (a += 1);
            return Math.max(this.$size.scrollerWidth - this.$padding * 2, Math.round(a * this.characterWidth))
        },this.updateFrontMarkers = function() {
            this.$markerFront.setMarkers(this.session.getMarkers(!0)),this.$loop.schedule(this.CHANGE_MARKER_FRONT)
        },this.updateBackMarkers = function() {
            this.$markerBack.setMarkers(this.session.getMarkers()),this.$loop.schedule(this.CHANGE_MARKER_BACK)
        },this.addGutterDecoration = function(a, b) {
            this.$gutterLayer.addGutterDecoration(a, b),this.$loop.schedule(this.CHANGE_GUTTER)
        },this.removeGutterDecoration = function(a, b) {
            this.$gutterLayer.removeGutterDecoration(a, b),this.$loop.schedule(this.CHANGE_GUTTER)
        },this.setBreakpoints = function(a) {
            this.$gutterLayer.setBreakpoints(a),this.$loop.schedule(this.CHANGE_GUTTER)
        },this.setAnnotations = function(a) {
            this.$gutterLayer.setAnnotations(a),this.$loop.schedule(this.CHANGE_GUTTER)
        },this.updateCursor = function() {
            this.$loop.schedule(this.CHANGE_CURSOR)
        },this.hideCursor = function() {
            this.$cursorLayer.hideCursor()
        },this.showCursor = function() {
            this.$cursorLayer.showCursor()
        },this.scrollCursorIntoView = function() {
            if (this.$size.scrollerHeight !== 0) {
                var a = this.$cursorLayer.getPixelPosition(),b = a.left + this.$padding,c = a.top;
                this.scrollTop > c && this.scrollToY(c),this.scrollTop + this.$size.scrollerHeight < c + this.lineHeight && this.scrollToY(c + this.lineHeight - this.$size.scrollerHeight);
                var d = this.scroller.scrollLeft;
                d > b && this.scrollToX(b),d + this.$size.scrollerWidth < b + this.characterWidth && (b > this.layerConfig.width ? this.$desiredScrollLeft = b + 2 * this.characterWidth : this.scrollToX(Math.round(b + this.characterWidth - this.$size.scrollerWidth)))
            }
        },this.getScrollTop = function() {
            return this.scrollTop
        },this.getScrollLeft = function() {
            return this.scroller.scrollLeft
        },this.getScrollTopRow = function() {
            return this.scrollTop / this.lineHeight
        },this.getScrollBottomRow = function() {
            return Math.max(0, Math.floor((this.scrollTop + this.$size.scrollerHeight) / this.lineHeight) - 1)
        },this.scrollToRow = function(a) {
            this.scrollToY(a * this.lineHeight)
        },this.scrollToLine = function(a, b) {
            var c = {lineHeight:this.lineHeight},d = 0;
            for (var e = 1; e < a; e++)d += this.session.getRowHeight(c, e - 1);
            b && (d -= this.$size.scrollerHeight / 2),this.scrollToY(d)
        },this.scrollToY = function(a) {
            a = Math.max(0, a),this.scrollTop !== a && (this.$loop.schedule(this.CHANGE_SCROLL),this.scrollTop = a)
        },this.scrollToX = function(a) {
            a <= this.$padding && (a = 0),this.scroller.scrollLeft = a
        },this.scrollBy = function(a, b) {
            b && this.scrollToY(this.scrollTop + b),a && this.scrollToX(this.scroller.scrollLeft + a)
        },this.screenToTextCoordinates = function(a, b) {
            var c = this.scroller.getBoundingClientRect(),d = Math.round((a + this.scroller.scrollLeft - c.left - this.$padding - e.getPageScrollLeft()) / this.characterWidth),f = Math.floor((b + this.scrollTop - c.top - e.getPageScrollTop()) / this.lineHeight);
            return this.session.screenToDocumentPosition(f, Math.max(d, 0))
        },this.textToScreenCoordinates = function(a, b) {
            var c = this.scroller.getBoundingClientRect(),d = this.session.documentToScreenPosition(a, b),e = this.$padding + Math.round(d.column * this.characterWidth),f = d.row * this.lineHeight;
            return{pageX:c.left + e - this.getScrollLeft(),pageY:c.top + f - this.getScrollTop()}
        },this.visualizeFocus = function() {
            e.addCssClass(this.container, "ace_focus")
        },this.visualizeBlur = function() {
            e.removeCssClass(this.container, "ace_focus")
        },this.showComposition = function(a) {
            this.$composition || (this.$composition = e.createElement("div"),this.$composition.className = "ace_composition",this.content.appendChild(this.$composition)),this.$composition.innerHTML = "&#160;";
            var b = this.$cursorLayer.getPixelPosition(),c = this.$composition.style;
            c.top = b.top + "px",c.left = b.left + this.$padding + "px",c.height = this.lineHeight + "px",this.hideCursor()
        },this.setCompositionText = function(a) {
            e.setInnerText(this.$composition, a)
        },this.hideComposition = function() {
            this.showCursor();
            if (!!this.$composition) {
                var a = this.$composition.style;
                a.top = "-10000px",a.left = "-10000px"
            }
        },this.setTheme = function(b) {
            function d(a) {
                c.$theme && e.removeCssClass(c.container, c.$theme),c.$theme = a ? a.cssClass : null,c.$theme && e.addCssClass(c.container, c.$theme),c.$size && (c.$size.width = 0,c.onResize())
            }

            var c = this;
            this.$themeValue = b,!b || typeof b == "string" ? (b = b || "ace/theme/textmate",a([b], function(a) {
                d(a)
            })) : d(b)
        },this.getTheme = function() {
            return this.$themeValue
        },this.setStyle = function(a) {
            e.addCssClass(this.container, a)
        },this.unsetStyle = function(a) {
            e.removeCssClass(this.container, a)
        },this.destroy = function() {
            this.$textLayer.destroy(),this.$cursorLayer.destroy()
        }
    }).call(p.prototype),b.VirtualRenderer = p
}),define("ace/layer/gutter", ["require","exports","module","pilot/dom"], function(a, b, c) {
    var d = a("pilot/dom"),e = function(a) {
        this.element = d.createElement("div"),this.element.className = "ace_layer ace_gutter-layer",a.appendChild(this.element),this.$breakpoints = [],this.$annotations = [],this.$decorations = []
    };
    (function() {
        this.setSession = function(a) {
            this.session = a
        },this.addGutterDecoration = function(a, b) {
            this.$decorations[a] || (this.$decorations[a] = ""),this.$decorations[a] += " ace_" + b
        },this.removeGutterDecoration = function(a, b) {
            this.$decorations[a] = this.$decorations[a].replace(" ace_" + b, "")
        },this.setBreakpoints = function(a) {
            this.$breakpoints = a.concat()
        },this.setAnnotations = function(a) {
            this.$annotations = [];
            for (var b in a)if (a.hasOwnProperty(b)) {
                var c = a[b];
                if (!c)continue;
                var d = this.$annotations[b] = {text:[]};
                for (var e = 0; e < c.length; e++) {
                    var f = c[e];
                    d.text.push(f.text.replace(/"/g, "&quot;").replace(/'/g, "&#8217;").replace(/</, "&lt;"));
                    var g = f.type;
                    g == "error" ? d.className = "ace_error" : g == "warning" && d.className != "ace_error" ? d.className = "ace_warning" : g == "info" && !d.className && (d.className = "ace_info")
                }
            }
        },this.update = function(a) {
            this.$config = a;
            var b = {className:"",text:[]},c = [],e = a.firstRow,f = a.lastRow,g = this.session.getNextFold(e),h = g ? g.start.row : Infinity;
            for (; ;) {
                e > h && (e = g.end.row + 1,g = this.session.getNextFold(e),h = g ? g.start.row : Infinity);
                if (e > f)break;
                var i = this.$annotations[e] || b;
                c.push("<div class='ace_gutter-cell", this.$decorations[e] || "", this.$breakpoints[e] ? " ace_breakpoint " : " ", i.className, "' title='", i.text.join("\n"), "' style='height:", a.lineHeight, "px;'>", e + 1);
                var j = this.session.getRowLength(e) - 1;
                while (j--)c.push("</div><div class='ace_gutter-cell' style='height:", a.lineHeight, "px'>&brvbar;</div>");
                c.push("</div>"),e++
            }
            this.element = d.setInnerHtml(this.element, c.join("")),this.element.style.height = a.minHeight + "px"
        }
    }).call(e.prototype),b.Gutter = e
}),define("ace/layer/marker", ["require","exports","module","ace/range","pilot/dom"], function(a, b, c) {
    var d = a("ace/range").Range,e = a("pilot/dom"),f = function(a) {
        this.element = e.createElement("div"),this.element.className = "ace_layer ace_marker-layer",a.appendChild(this.element)
    };
    (function() {
        this.setSession = function(a) {
            this.session = a
        },this.setMarkers = function(a) {
            this.markers = a
        },this.update = function(a) {
            var a = a || this.config;
            if (!!a) {
                this.config = a;
                var b = [];
                for (var c in this.markers) {
                    var d = this.markers[c],f = d.range.clipRows(a.firstRow, a.lastRow);
                    if (f.isEmpty())continue;
                    f = f.toScreenRange(this.session);
                    if (d.renderer) {
                        var g = this.$getTop(f.start.row, a),h = Math.round(f.start.column * a.characterWidth);
                        d.renderer(b, f, h, g, a)
                    } else f.isMultiLine() ? d.type == "text" ? this.drawTextMarker(b, f, d.clazz, a) : this.drawMultiLineMarker(b, f, d.clazz, a) : this.drawSingleLineMarker(b, f, d.clazz, a)
                }
                this.element = e.setInnerHtml(this.element, b.join(""))
            }
        },this.$getTop = function(a, b) {
            return(a - b.firstRowScreen) * b.lineHeight
        },this.drawTextMarker = function(a, b, c, e) {
            var f = b.start.row,g = new d(f, b.start.column, f, this.session.getScreenLastRowColumn(f));
            this.drawSingleLineMarker(a, g, c, e, 1);
            var f = b.end.row,g = new d(f, 0, f, b.end.column);
            this.drawSingleLineMarker(a, g, c, e);
            for (var f = b.start.row + 1; f < b.end.row; f++)g.start.row = f,g.end.row = f,g.end.column = this.session.getScreenLastRowColumn(f),this.drawSingleLineMarker(a, g, c, e, 1)
        },this.drawMultiLineMarker = function(a, b, c, d) {
            var e = d.lineHeight,f = Math.round(d.width - b.start.column * d.characterWidth),g = this.$getTop(b.start.row, d),h = Math.round(b.start.column * d.characterWidth);
            a.push("<div class='", c, "' style='", "height:", e, "px;", "width:", f, "px;", "top:", g, "px;", "left:", h, "px;'></div>");
            var g = this.$getTop(b.end.row, d),f = Math.round(b.end.column * d.characterWidth);
            a.push("<div class='", c, "' style='", "height:", e, "px;", "top:", g, "px;", "width:", f, "px;'></div>");
            var e = (b.end.row - b.start.row - 1) * d.lineHeight;
            if (!(e < 0)) {
                var g = this.$getTop(b.start.row + 1, d);
                a.push("<div class='", c, "' style='", "height:", e, "px;", "width:", d.width, "px;", "top:", g, "px;'></div>")
            }
        },this.drawSingleLineMarker = function(a, b, c, d, e) {
            var f = d.lineHeight,g = Math.round((b.end.column + (e || 0) - b.start.column) * d.characterWidth),h = this.$getTop(b.start.row, d),i = Math.round(b.start.column * d.characterWidth);
            a.push("<div class='", c, "' style='", "height:", f, "px;", "width:", g, "px;", "top:", h, "px;", "left:", i, "px;'></div>")
        }
    }).call(f.prototype),b.Marker = f
}),define("ace/layer/text", ["require","exports","module","pilot/oop","pilot/dom","pilot/lang","pilot/useragent","pilot/event_emitter"], function(a, b, c) {
    var d = a("pilot/oop"),e = a("pilot/dom"),f = a("pilot/lang"),g = a("pilot/useragent"),h = a("pilot/event_emitter").EventEmitter,i = function(a) {
        this.element = e.createElement("div"),this.element.className = "ace_layer ace_text-layer",a.appendChild(this.element),this.$characterSize = this.$measureSizes() || {width:0,height:0},this.$pollSizeChanges()
    };
    (function() {
        d.implement(this, h),this.EOF_CHAR = "&para;",this.EOL_CHAR = "&not;",this.TAB_CHAR = "&rarr;",this.SPACE_CHAR = "&middot;",this.getLineHeight = function() {
            return this.$characterSize.height || 1
        },this.getCharacterWidth = function() {
            return this.$characterSize.width || 1
        },this.checkForSizeChanges = function() {
            var a = this.$measureSizes();
            a && (this.$characterSize.width !== a.width || this.$characterSize.height !== a.height) && (this.$characterSize = a,this._dispatchEvent("changeCharaterSize", {data:a}))
        },this.$pollSizeChanges = function() {
            var a = this;
            this.$pollSizeChangesTimer = setInterval(function() {
                a.checkForSizeChanges()
            }, 500)
        },this.$fontStyles = {fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,lineHeight:1},this.$measureSizes = function() {
            var a = 1e3;
            if (!this.$measureNode) {
                var b = this.$measureNode = e.createElement("div"),c = b.style;
                c.width = c.height = "auto",c.left = c.top = -a * 40 + "px",c.visibility = "hidden",c.position = "absolute",c.overflow = "visible",c.whiteSpace = "nowrap",b.innerHTML = f.stringRepeat("Xy", a);
                if (document.body)document.body.appendChild(b); else {
                    var d = this.element.parentNode;
                    while (!e.hasCssClass(d, "ace_editor"))d = d.parentNode;
                    d.appendChild(b)
                }
            }
            var c = this.$measureNode.style,g = e.computedStyle(this.element);
            for (var h in this.$fontStyles)c[h] = g[h];
            var i = {height:this.$measureNode.offsetHeight,width:this.$measureNode.offsetWidth / (a * 2)};
            return i.width == 0 && i.height == 0 ? null : i
        },this.setSession = function(a) {
            this.session = a
        },this.showInvisibles = !1,this.setShowInvisibles = function(a) {
            if (this.showInvisibles == a)return!1;
            this.showInvisibles = a;
            return!0
        },this.$tabStrings = [],this.$computeTabString = function() {
            var a = this.session.getTabSize(),b = this.$tabStrings = [0];
            for (var c = 1; c < a + 1; c++)this.showInvisibles ? b.push("<span class='ace_invisible'>" + this.TAB_CHAR + Array(c).join("&#160;") + "</span>") : b.push(Array(c + 1).join("&#160;"))
        },this.updateLines = function(a, b, c) {
            this.$computeTabString(),(this.config.lastRow != a.lastRow || this.config.firstRow != a.firstRow) && this.scrollLines(a),this.config = a;
            var d = Math.max(b, a.firstRow),f = Math.min(c, a.lastRow),g = this.element.childNodes,h = 0;
            for (var i = a.firstRow; i < d; i++) {
                var j = this.session.getFoldLine(i);
                if (j) {
                    if (j.containsRow(d))break;
                    i = j.end.row
                }
                h++
            }
            for (var k = d; k <= f; k++) {
                var l = g[h++];
                if (!l)continue;
                var m = [],n = this.session.getTokens(k, k);
                this.$renderLine(m, k, n[0].tokens),l = e.setInnerHtml(l, m.join("")),k = this.session.getRowFoldEnd(k)
            }
        },this.scrollLines = function(a) {
            this.$computeTabString();
            var b = this.config;
            this.config = a;
            if (!b || b.lastRow < a.firstRow)return this.update(a);
            if (a.lastRow < b.firstRow)return this.update(a);
            var c = this.element;
            if (b.firstRow < a.firstRow)for (var d = this.session.getFoldedRowCount(b.firstRow, a.firstRow - 1); d > 0; d--)c.removeChild(c.firstChild);
            if (b.lastRow > a.lastRow)for (var d = this.session.getFoldedRowCount(a.lastRow + 1, b.lastRow); d > 0; d--)c.removeChild(c.lastChild);
            if (a.firstRow < b.firstRow) {
                var e = this.$renderLinesFragment(a, a.firstRow, b.firstRow - 1);
                c.firstChild ? c.insertBefore(e, c.firstChild) : c.appendChild(e)
            }
            if (a.lastRow > b.lastRow) {
                var e = this.$renderLinesFragment(a, b.lastRow + 1, a.lastRow);
                c.appendChild(e)
            }
        },this.$renderLinesFragment = function(a, b, c) {
            var d = document.createDocumentFragment(),f = b,g = this.session.getNextFold(f),h = g ? g.start.row : Infinity;
            for (; ;) {
                f > h && (f = g.end.row + 1,g = this.session.getNextFold(f),h = g ? g.start.row : Infinity);
                if (f > c)break;
                var i = e.createElement("div");
                i.className = "ace_line";
                var j = [],k = this.session.getTokens(f, f);
                k.length == 1 && this.$renderLine(j, f, k[0].tokens),i.innerHTML = j.join(""),d.appendChild(i),f++
            }
            return d
        },this.update = function(a) {
            this.$computeTabString(),this.config = a;
            var b = [],c = a.firstRow,d = a.lastRow,f = c,g = this.session.getNextFold(f),h = g ? g.start.row : Infinity;
            for (; ;) {
                f > h && (f = g.end.row + 1,g = this.session.getNextFold(f),h = g ? g.start.row : Infinity);
                if (f > d)break;
                b.push("<div class='ace_line'>");
                var i = this.session.getTokens(f, f);
                i.length == 1 && this.$renderLine(b, f, i[0].tokens),b.push("</div>"),f++
            }
            this.element = e.setInnerHtml(this.element, b.join(""))
        },this.$textToken = {text:!0,rparen:!0,lparen:!0},this.$renderToken = function(a, b, c, d) {
            var e = this,f = /\t|&|<|( +)|([\v\f \u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000])|[\u1100-\u115F]|[\u11A3-\u11A7]|[\u11FA-\u11FF]|[\u2329-\u232A]|[\u2E80-\u2E99]|[\u2E9B-\u2EF3]|[\u2F00-\u2FD5]|[\u2FF0-\u2FFB]|[\u3000-\u303E]|[\u3041-\u3096]|[\u3099-\u30FF]|[\u3105-\u312D]|[\u3131-\u318E]|[\u3190-\u31BA]|[\u31C0-\u31E3]|[\u31F0-\u321E]|[\u3220-\u3247]|[\u3250-\u32FE]|[\u3300-\u4DBF]|[\u4E00-\uA48C]|[\uA490-\uA4C6]|[\uA960-\uA97C]|[\uAC00-\uD7A3]|[\uD7B0-\uD7C6]|[\uD7CB-\uD7FB]|[\uF900-\uFAFF]|[\uFE10-\uFE19]|[\uFE30-\uFE52]|[\uFE54-\uFE66]|[\uFE68-\uFE6B]|[\uFF01-\uFF60]|[\uFFE0-\uFFE6]/g,h = function(a, c, d, f, h) {
                if (a.charCodeAt(0) == 32)return Array(a.length + 1).join("&#160;");
                if (a == "\t") {
                    var i = e.session.getScreenTabSize(b + f);
                    b += i - 1;
                    return e.$tabStrings[i]
                }
                if (a == "&")return g.isOldGecko ? "&" : "&amp;";
                if (a == "<")return"&lt;";
                if (a.match(/[\v\f \u00a0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000]/)) {
                    if (e.showInvisibles) {
                        var j = Array(a.length + 1).join(e.SPACE_CHAR);
                        return"<span class='ace_invisible'>" + j + "</span>"
                    }
                    return"&#160;"
                }
                b += 1;
                return"<span class='ace_cjk' style='width:" + e.config.characterWidth * 2 + "px'>" + a + "</span>"
            },i = d.replace(f, h);
            if (!this.$textToken[c.type]) {
                var j = "ace_" + c.type.replace(/\./g, " ace_");
                a.push("<span class='", j, "'>", i, "</span>")
            } else a.push(i);
            return b + d.length
        },this.$renderLineCore = function(a, b, c, d) {
            function k(b, c) {
                i = j.$renderToken(a, i, b, c)
            }

            var e = 0,f = 0,g,h = this.config.characterWidth,i = 0,j = this;
            !d || d.length == 0 ? g = Number.MAX_VALUE : g = d[0],a.push("<div style='height:", this.config.lineHeight, "px", "'>");
            for (var l = 0; l < c.length; l++) {
                var m = c[l],n = m.value;
                if (e + n.length < g)k(m, n),e += n.length; else {
                    while (e + n.length >= g)k(m, n.substring(0, g - e)),n = n.substring(g - e),e = g,a.push("</div>", "<div style='height:", this.config.lineHeight, "px", "'>"),f++,i = 0,g = d[f] || Number.MAX_VALUE;
                    n.length != 0 && (e += n.length,k(m, n))
                }
            }
            this.showInvisibles && (b !== this.session.getLength() - 1 ? a.push("<span class='ace_invisible'>" + this.EOL_CHAR + "</span>") : a.push("<span class='ace_invisible'>" + this.EOF_CHAR + "</span>")),a.push("</div>")
        },this.$renderLine = function(a, b, c) {
            if (!this.session.isRowFolded(b)) {
                var d = this.session.getRowSplitData(b);
                this.$renderLineCore(a, b, c, d)
            } else this.$renderFoldLine(a, b, c)
        },this.$renderFoldLine = function(a, b, c) {
            function g(a, b, c) {
                var d = 0,e = 0;
                while (e + a[d].value.length < b) {
                    e += a[d].value.length,d++;
                    if (d == a.length)return
                }
                if (e != b) {
                    var g = a[d].value.substring(b - e);
                    g.length > c - b && (g = g.substring(0, c - b)),f.push({type:a[d].type,value:g}),e = b + g.length,d += 1
                }
                while (e < c) {
                    var g = a[d].value;
                    g.length + e > c && (g = g.substring(0, c - e)),f.push({type:a[d].type,value:g}),e += g.length,d += 1
                }
            }

            var d = this.session,e = d.getFoldLine(b),f = [];
            e.walk(function(a, b, d, e, h) {
                a ? f.push({type:"fold",value:a}) : (h && (c = this.session.getTokens(b, b)[0].tokens),c.length != 0 && g(c, e, d))
            }.bind(this), e.end.row, this.session.getLine(e.end.row).length);
            var h = this.session.$useWrapMode ? this.session.$wrapData[b] : null;
            this.$renderLineCore(a, b, f, h)
        },this.destroy = function() {
            clearInterval(this.$pollSizeChangesTimer)
        }
    }).call(i.prototype),b.Text = i
}),define("ace/layer/cursor", ["require","exports","module","pilot/dom"], function(a, b, c) {
    var d = a("pilot/dom"),e = function(a) {
        this.element = d.createElement("div"),this.element.className = "ace_layer ace_cursor-layer",a.appendChild(this.element),this.cursor = d.createElement("div"),this.cursor.className = "ace_cursor ace_hidden",this.element.appendChild(this.cursor),this.isVisible = !1
    };
    (function() {
        this.setSession = function(a) {
            this.session = a
        },this.hideCursor = function() {
            this.isVisible = !1,d.addCssClass(this.cursor, "ace_hidden"),clearInterval(this.blinkId)
        },this.showCursor = function() {
            this.isVisible = !0,d.removeCssClass(this.cursor, "ace_hidden"),this.cursor.style.visibility = "visible",this.restartTimer()
        },this.restartTimer = function() {
            clearInterval(this.blinkId);
            if (!!this.isVisible) {
                var a = this.cursor;
                this.blinkId = setInterval(function() {
                    a.style.visibility = "hidden",setTimeout(function() {
                        a.style.visibility = "visible"
                    }, 400)
                }, 1e3)
            }
        },this.getPixelPosition = function(a) {
            if (!this.config || !this.session)return{left:0,top:0};
            var b = this.session.selection.getCursor(),c = this.session.documentToScreenPosition(b),d = Math.round(c.column * this.config.characterWidth),e = (c.row - (a ? this.config.firstRowScreen : 0)) * this.config.lineHeight;
            return{left:d,top:e}
        },this.update = function(a) {
            this.config = a,this.pixelPos = this.getPixelPosition(!0),this.cursor.style.left = this.pixelPos.left + "px",this.cursor.style.top = this.pixelPos.top + "px",this.cursor.style.width = a.characterWidth + "px",this.cursor.style.height = a.lineHeight + "px";
            var b = this.session.getOverwrite();
            b != this.overwrite && (this.overwrite = b,b ? d.addCssClass(this.cursor, "ace_overwrite") : d.removeCssClass(this.cursor, "ace_overwrite")),this.restartTimer()
        },this.destroy = function() {
            clearInterval(this.blinkId)
        }
    }).call(e.prototype),b.Cursor = e
}),define("ace/scrollbar", ["require","exports","module","pilot/oop","pilot/dom","pilot/event","pilot/event_emitter"], function(a, b, c) {
    var d = a("pilot/oop"),e = a("pilot/dom"),f = a("pilot/event"),g = a("pilot/event_emitter").EventEmitter,h = function(a) {
        this.element = e.createElement("div"),this.element.className = "ace_sb",this.inner = e.createElement("div"),this.element.appendChild(this.inner),a.appendChild(this.element),this.width = e.scrollbarWidth(),this.element.style.width = this.width + "px",f.addListener(this.element, "scroll", this.onScroll.bind(this))
    };
    (function() {
        d.implement(this, g),this.onScroll = function() {
            this._dispatchEvent("scroll", {data:this.element.scrollTop})
        },this.getWidth = function() {
            return this.width
        },this.setHeight = function(a) {
            this.element.style.height = a + "px"
        },this.setInnerHeight = function(a) {
            this.inner.style.height = a + "px"
        },this.setScrollTop = function(a) {
            this.element.scrollTop = a
        }
    }).call(h.prototype),b.ScrollBar = h
}),define("ace/renderloop", ["require","exports","module","pilot/event"], function(a, b, c) {
    var d = a("pilot/event"),e = function(a) {
        this.onRender = a,this.pending = !1,this.changes = 0
    };
    (function() {
        this.schedule = function(a) {
            this.changes = this.changes | a;
            if (!this.pending) {
                this.pending = !0;
                var b = this;
                this.setTimeoutZero(function() {
                    b.pending = !1;
                    var a = b.changes;
                    b.changes = 0,b.onRender(a)
                })
            }
        },this.setTimeoutZero = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame,this.setTimeoutZero ? this.setTimeoutZero = this.setTimeoutZero.bind(window) : window.postMessage ? (this.messageName = "zero-timeout-message",this.setTimeoutZero = function(a) {
            if (!this.attached) {
                var b = this;
                d.addListener(window, "message", function(a) {
                    b.callback && a.data == b.messageName && (d.stopPropagation(a),b.callback())
                }),this.attached = !0
            }
            this.callback = a,window.postMessage(this.messageName, "*")
        }) : this.setTimeoutZero = function(a) {
            setTimeout(a, 0)
        }
    }).call(e.prototype),b.RenderLoop = e
}),define("ace/theme/textmate", ["require","exports","module","pilot/dom"], function(a, b, c) {
    var d = a("pilot/dom"),e = ".ace-tm .ace_editor {\n  border: 2px solid rgb(159, 159, 159);\n}\n\n.ace-tm .ace_editor.ace_focus {\n  border: 2px solid #327fbd;\n}\n\n.ace-tm .ace_gutter {\n  width: 50px;\n  background: #e8e8e8;\n  color: #333;\n  overflow : hidden;\n}\n\n.ace-tm .ace_gutter-layer {\n  width: 100%;\n  text-align: right;\n}\n\n.ace-tm .ace_gutter-layer .ace_gutter-cell {\n  padding-right: 6px;\n}\n\n.ace-tm .ace_print_margin {\n  width: 1px;\n  background: #e8e8e8;\n}\n\n.ace-tm .ace_text-layer {\n  cursor: text;\n}\n\n.ace-tm .ace_cursor {\n  border-left: 2px solid black;\n}\n\n.ace-tm .ace_cursor.ace_overwrite {\n  border-left: 0px;\n  border-bottom: 1px solid black;\n}\n        \n.ace-tm .ace_line .ace_invisible {\n  color: rgb(191, 191, 191);\n}\n\n.ace-tm .ace_line .ace_keyword {\n  color: blue;\n}\n\n.ace-tm .ace_line .ace_constant.ace_buildin {\n  color: rgb(88, 72, 246);\n}\n\n.ace-tm .ace_line .ace_constant.ace_language {\n  color: rgb(88, 92, 246);\n}\n\n.ace-tm .ace_line .ace_constant.ace_library {\n  color: rgb(6, 150, 14);\n}\n\n.ace-tm .ace_line .ace_invalid {\n  background-color: rgb(153, 0, 0);\n  color: white;\n}\n\n.ace-tm .ace_line .ace_fold {\n    background-color: #E4E4E4;\n    border-radius: 3px;\n}\n\n.ace-tm .ace_line .ace_support.ace_function {\n  color: rgb(60, 76, 114);\n}\n\n.ace-tm .ace_line .ace_support.ace_constant {\n  color: rgb(6, 150, 14);\n}\n\n.ace-tm .ace_line .ace_support.ace_type,\n.ace-tm .ace_line .ace_support.ace_class {\n  color: rgb(109, 121, 222);\n}\n\n.ace-tm .ace_line .ace_keyword.ace_operator {\n  color: rgb(104, 118, 135);\n}\n\n.ace-tm .ace_line .ace_string {\n  color: rgb(3, 106, 7);\n}\n\n.ace-tm .ace_line .ace_comment {\n  color: rgb(76, 136, 107);\n}\n\n.ace-tm .ace_line .ace_comment.ace_doc {\n  color: rgb(0, 102, 255);\n}\n\n.ace-tm .ace_line .ace_comment.ace_doc.ace_tag {\n  color: rgb(128, 159, 191);\n}\n\n.ace-tm .ace_line .ace_constant.ace_numeric {\n  color: rgb(0, 0, 205);\n}\n\n.ace-tm .ace_line .ace_variable {\n  color: rgb(49, 132, 149);\n}\n\n.ace-tm .ace_line .ace_xml_pe {\n  color: rgb(104, 104, 91);\n}\n\n.ace-tm .ace_marker-layer .ace_selection {\n  background: rgb(181, 213, 255);\n}\n\n.ace-tm .ace_marker-layer .ace_step {\n  background: rgb(252, 255, 0);\n}\n\n.ace-tm .ace_marker-layer .ace_stack {\n  background: rgb(164, 229, 101);\n}\n\n.ace-tm .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid rgb(192, 192, 192);\n}\n\n.ace-tm .ace_marker-layer .ace_active_line {\n  background: rgb(232, 242, 254);\n}\n\n.ace-tm .ace_marker-layer .ace_selected_word {\n  background: rgb(250, 250, 255);\n  border: 1px solid rgb(200, 200, 250);\n}\n\n.ace-tm .ace_string.ace_regex {\n  color: rgb(255, 0, 0)\n}";
    d.importCssString(e),b.cssClass = "ace-tm"
}),define("pilot/environment", ["require","exports","module","pilot/settings"], function(a, b, c) {
    function e() {
        return{settings:d}
    }

    var d = a("pilot/settings").settings;
    b.create = e
}),define("text/ace/css/editor.css", [], '.ace_editor {    position: absolute;    overflow: hidden;    font-family: "Menlo", "Monaco", "Courier New", monospace;    font-size: 12px;}.ace_scroller {    position: absolute;    overflow-x: scroll;    overflow-y: hidden;}.ace_content {    position: absolute;    box-sizing: border-box;    -moz-box-sizing: border-box;    -webkit-box-sizing: border-box;}.ace_composition {    position: absolute;    background: #555;    color: #DDD;    z-index: 4;}.ace_gutter {    position: absolute;    overflow-x: hidden;    overflow-y: hidden;    height: 100%;}.ace_gutter-cell.ace_error {    background-image: url("data:image/gif,GIF89a%10%00%10%00%D5%00%00%F5or%F5%87%88%F5nr%F4ns%EBmq%F5z%7F%DDJT%DEKS%DFOW%F1Yc%F2ah%CE(7%CE)8%D18E%DD%40M%F2KZ%EBU%60%F4%60m%DCir%C8%16(%C8%19*%CE%255%F1%3FR%F1%3FS%E6%AB%B5%CA%5DI%CEn%5E%F7%A2%9A%C9G%3E%E0a%5B%F7%89%85%F5yy%F6%82%80%ED%82%80%FF%BF%BF%E3%C4%C4%FF%FF%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%25%00%2C%00%00%00%00%10%00%10%00%00%06p%C0%92pH%2C%1A%8F%C8%D2H%93%E1d4%23%E4%88%D3%09mB%1DN%B48%F5%90%40%60%92G%5B%94%20%3E%22%D2%87%24%FA%20%24%C5%06A%00%20%B1%07%02B%A38%89X.v%17%82%11%13q%10%0Fi%24%0F%8B%10%7BD%12%0Ei%09%92%09%0EpD%18%15%24%0A%9Ci%05%0C%18F%18%0B%07%04%01%04%06%A0H%18%12%0D%14%0D%12%A1I%B3%B4%B5IA%00%3B");    background-repeat: no-repeat;    background-position: 4px center;}.ace_gutter-cell.ace_warning {    background-image: url("data:image/gif,GIF89a%10%00%10%00%D5%00%00%FF%DBr%FF%DE%81%FF%E2%8D%FF%E2%8F%FF%E4%96%FF%E3%97%FF%E5%9D%FF%E6%9E%FF%EE%C1%FF%C8Z%FF%CDk%FF%D0s%FF%D4%81%FF%D5%82%FF%D5%83%FF%DC%97%FF%DE%9D%FF%E7%B8%FF%CCl%7BQ%13%80U%15%82W%16%81U%16%89%5B%18%87%5B%18%8C%5E%1A%94d%1D%C5%83-%C9%87%2F%C6%84.%C6%85.%CD%8B2%C9%871%CB%8A3%CD%8B5%DC%98%3F%DF%9BB%E0%9CC%E1%A5U%CB%871%CF%8B5%D1%8D6%DB%97%40%DF%9AB%DD%99B%E3%B0p%E7%CC%AE%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%2F%00%2C%00%00%00%00%10%00%10%00%00%06a%C0%97pH%2C%1A%8FH%A1%ABTr%25%87%2B%04%82%F4%7C%B9X%91%08%CB%99%1C!%26%13%84*iJ9(%15G%CA%84%14%01%1A%97%0C%03%80%3A%9A%3E%81%84%3E%11%08%B1%8B%20%02%12%0F%18%1A%0F%0A%03\'F%1C%04%0B%10%16%18%10%0B%05%1CF%1D-%06%07%9A%9A-%1EG%1B%A0%A1%A0U%A4%A5%A6BA%00%3B");    background-repeat: no-repeat;    background-position: 4px center;}.ace_editor .ace_sb {    position: absolute;    overflow-x: hidden;    overflow-y: scroll;    right: 0;}.ace_editor .ace_sb div {    position: absolute;    width: 1px;    left: 0;}.ace_editor .ace_print_margin_layer {    z-index: 0;    position: absolute;    overflow: hidden;    margin: 0;    left: 0;    height: 100%;    width: 100%;}.ace_editor .ace_print_margin {    position: absolute;    height: 100%;}.ace_editor textarea {    position: fixed;    z-index: -1;    width: 10px;    height: 30px;    opacity: 0;    background: transparent;    appearance: none;    border: none;    resize: none;    outline: none;    overflow: hidden;}.ace_layer {    z-index: 1;    position: absolute;    overflow: hidden;    white-space: nowrap;    height: 100%;    width: 100%;}.ace_text-layer {    font-family: Monaco, "Courier New", monospace;    color: black;}.ace_cjk {    display: inline-block;    text-align: center;}.ace_cursor-layer {    z-index: 4;    cursor: text;    pointer-events: none;}.ace_cursor {    z-index: 4;    position: absolute;}.ace_cursor.ace_hidden {    opacity: 0.2;}.ace_line {    white-space: nowrap;}.ace_marker-layer {    cursor: text;    pointer-events: none;}.ace_marker-layer .ace_step {    position: absolute;    z-index: 3;}.ace_marker-layer .ace_selection {    position: absolute;    z-index: 4;}.ace_marker-layer .ace_bracket {    position: absolute;    z-index: 5;}.ace_marker-layer .ace_active_line {    position: absolute;    z-index: 2;}.ace_marker-layer .ace_selected_word {    position: absolute;    z-index: 6;    box-sizing: border-box;    -moz-box-sizing: border-box;    -webkit-box-sizing: border-box;}.ace_line .ace_fold {    cursor: pointer;}.ace_dragging .ace_marker-layer, .ace_dragging .ace_text-layer {  cursor: move;}'),define("text/styles.css", [], "html {    height: 100%;    width: 100%;    overflow: hidden;}body {    overflow: hidden;    margin: 0;    padding: 0;    height: 100%;    width: 100%;    font-family: Arial, Helvetica, sans-serif, Tahoma, Verdana, sans-serif;    font-size: 12px;    background: rgb(14, 98, 165);    color: white;}#logo {    padding: 15px;    margin-left: 65px;}#editor {    position: absolute;    top:  0px;    left: 280px;    bottom: 0px;    right: 0px;    background: white;}#controls {    padding: 5px;}#controls td {    text-align: right;}#controls td + td {    text-align: left;}#cockpitInput {    position: absolute;    left: 280px;    right: 0px;    bottom: 0;    border: none; outline: none;    font-family: consolas, courier, monospace;    font-size: 120%;}#cockpitOutput {    padding: 10px;    margin: 0 15px;    border: 1px solid #AAA;    -moz-border-radius-topleft: 10px;    -moz-border-radius-topright: 10px;    border-top-left-radius: 4px; border-top-right-radius: 4px;    background: #DDD; color: #000;}"),require(["ace/ace"], function(a) {
    window.ace = a
})