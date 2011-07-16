function initSender() {
    var a = require("pilot/event_emitter").EventEmitter,b = require("pilot/oop"),c = function() {
    };
    (function() {
        b.implement(this, a),this.callback = function(a, b) {
            postMessage({type:"call",id:b,data:a})
        },this.emit = function(a, b) {
            postMessage({type:"event",name:a,data:b})
        }
    }).call(c.prototype);
    return new c
}
function initBaseUrls(a) {
    require.tlns = a
}
var console = {log:function(a) {
    postMessage({type:"log",data:a})
}},window = {console:console},require = function(a) {
    var b = require.modules[a];
    if (b) {
        b.initialized || (b.exports = b.factory().exports,b.initialized = !0);
        return b.exports
    }
    var c = a.split("/");
    c[0] = require.tlns[c[0]] || c[0],path = c.join("/") + ".js",require.id = a,importScripts(path);
    return require(a)
};
require.modules = {},require.tlns = {};
var define = function(a, b, c) {
    arguments.length == 2 ? c = b : arguments.length == 1 && (c = a,a = require.id);
    a.indexOf("text/") !== 0 && (require.modules[a] = {factory:function() {
        var a = {exports:{}},b = c(require, a.exports, a);
        b && (a.exports = b);
        return a
    }})
},main,sender;
onmessage = function(a) {
    var b = a.data;
    if (b.command)main[b.command].apply(main, b.args); else if (b.init) {
        initBaseUrls(b.tlns),require("pilot/fixoldbrowsers"),sender = initSender();
        var c = require(b.module)[b.classname];
        main = new c(sender)
    } else b.event && sender && sender._dispatchEvent(b.event, b.data)
},define("pilot/fixoldbrowsers", ["require","exports","module"], function(a, b, c) {
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
}),define("ace/mode/javascript_worker", ["require","exports","module","pilot/oop","ace/worker/mirror","ace/worker/jshint","ace/narcissus/jsparse"], function(a, b, c) {
    var d = a("pilot/oop"),e = a("ace/worker/mirror").Mirror,f = a("ace/worker/jshint").JSHINT,g = b.JavaScriptWorker = function(a) {
        e.call(this, a),this.setTimeout(500)
    };
    d.inherits(g, e),function() {
        this.onUpdate = function() {
            var b = this.doc.getValue();
            b = b.replace(/^#!.*\n/, "\n");
            var c = a("ace/narcissus/jsparse");
            try {
                c.parse(b)
            } catch(d) {
                this.sender.emit("narcissus", {row:d.lineno - 1,column:null,text:d.message,type:"error"});
                return
            } finally {
            }
            f(b, {undef:!1,onevar:!1,passfail:!1}),this.sender.emit("jslint", f.errors)
        }
    }.call(g.prototype)
}),define("ace/worker/mirror", ["require","exports","module","ace/document","pilot/lang"], function(a, b, c) {
    var d = a("ace/document").Document,e = a("pilot/lang"),f = b.Mirror = function(a) {
        this.sender = a;
        var b = this.doc = new d(""),c = this.deferredUpdate = e.deferredCall(this.onUpdate.bind(this)),f = this;
        a.on("change", function(a) {
            b.applyDeltas([a.data]),c.schedule(f.$timeout)
        })
    };
    (function() {
        this.$timeout = 500,this.setTimeout = function(a) {
            this.$timeout = a
        },this.setValue = function(a) {
            this.doc.setValue(a),this.deferredUpdate.schedule(this.$timeout)
        },this.getValue = function(a) {
            this.sender.callback(this.doc.getValue(), a)
        },this.onUpdate = function() {
        }
    }).call(f.prototype)
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
}),define("ace/worker/jshint", ["require","exports","module"], function(a, b, c) {
    var d = function() {
        function bY() {
            function b() {
                var a = w;
                bl("[");
                if (w.id !== "]")for (; ;) {
                    if (w.id === "(end)")bf("Missing ']' to match '[' from line {a}.", w, a.line); else {
                        if (w.id === "]") {
                            bd("Unexpected comma.", N);
                            break
                        }
                        w.id === "," && bf("Unexpected comma.", w)
                    }
                    bY();
                    if (w.id !== ",")break;
                    bl(",")
                }
                bl("]")
            }

            function a() {
                var a = {},b = w;
                bl("{");
                if (w.id !== "}")for (; ;) {
                    if (w.id === "(end)")bf("Missing '}' to match '{' from line {a}.", w, b.line); else {
                        if (w.id === "}") {
                            bd("Unexpected comma.", N);
                            break
                        }
                        w.id === "," ? bf("Unexpected comma.", w) : w.id !== "(string)" && bd("Expected a string and instead saw {a}.", w, w.value)
                    }
                    a[w.value] === !0 ? bd("Duplicate key '{a}'.", w, w.value) : w.value === "__proto__" ? bd("Stupid key '{a}'.", w, w.value) : a[w.value] = !0,bl(),bl(":"),bY();
                    if (w.id !== ",")break;
                    bl(",")
                }
                bl("}")
            }

            switch (w.id) {
                case"{":
                    a();
                    break;
                case"[":
                    b();
                    break;
                case"true":
                case"false":
                case"null":
                case"(number)":
                case"(string)":
                    bl();
                    break;
                case"-":
                    bl("-"),N.character !== w.from && bd("Unexpected space after '-'.", N),bn(N, w),bl("(number)");
                    break;
                default:
                    bf("Expected a JSON value.", w)
            }
        }

        function bW(b, c) {
            var d,e = z,f = F;
            z = Object.create(z),F = Object.create(F),i = {"(name)":b || '"' + a + '"',"(line)":w.line,"(context)":i,"(breakage)":0,"(loopage)":0,"(scope)":F,"(statement)":c},d = i,N.funct = i,k.push(i),b && bi(b, "function"),i["(params)"] = bV(),bR(!1),F = f,z = e,i["(last)"] = N.line,i = i["(context)"];
            return d
        }

        function bV() {
            var a,b = w,c = [];
            bl("("),bp();
            if (w.id === ")")bl(")"),bp(C, N); else for (; ;) {
                a = bM(!0),c.push(a),bi(a, "parameter");
                if (w.id === ",")bu(); else {
                    bl(")", b),bp(C, N);
                    return c
                }
            }
        }

        function bU() {
            var a = bL(!0);
            a || (w.id === "(string)" ? (a = w.value,bl()) : w.id === "(number)" && (a = w.value.toString(),bl()));
            return a
        }

        function bT(a) {
            var b = a.value,c = a.line,d = m[b];
            typeof d == "function" && (d = !1),d ? d[d.length - 1] !== c && d.push(c) : (d = [c],m[b] = d)
        }

        function bS(a) {
            u && typeof u[a] != "boolean" && bd("Unexpected /*member '{a}'.", N, a),typeof t[a] == "number" ? t[a] += 1 : t[a] = 1
        }

        function bR(a, b) {
            var c,d = n,e = o,f = K,g = F,h;
            n = a,F = Object.create(F),bq(N, w),h = w;
            if (w.id === "{") {
                bl("{");
                if (w.id !== "}" || N.line !== w.line) {
                    o += z.indent;
                    while (!a && w.from > o)o += z.indent;
                    !a && !bP() && !f && z.strict && i["(context)"]["(global)"] && bd('Missing "use strict" statement.'),c = bQ(),K = f,o -= z.indent,bs()
                }
                bl("}", h),o = e
            } else a ? ((!b || z.curly) && bd("Expected '{a}' and instead saw '{b}'.", w, "{", w.value),y = !0,c = [bO()],y = !1) : bf("Expected '{a}' and instead saw '{b}'.", w, "{", w.value);
            i["(verb)"] = null,F = g,n = d,a && z.noempty && (!c || c.length === 0) && bd("Empty block.");
            return c
        }

        function bQ(a) {
            var b = [],c,d;
            while (!w.reach && w.id !== "(end)")w.id === ";" ? (bd("Unnecessary semicolon."),bl(";")) : b.push(bO());
            return b
        }

        function bP() {
            if (w.value === "use strict") {
                K && bd('Unnecessary "use strict".'),bl(),bl(";"),K = !0,z.newcap = !0,z.undef = !0;
                return!0
            }
            return!1
        }

        function bO(a) {
            var b = o,c,d = F,e = w;
            if (e.id === ";")bd("Unnecessary semicolon.", e),bl(";"); else {
                e.identifier && !e.reserved && bk().id === ":" && (bl(),bl(":"),F = Object.create(d),bi(e.value, "label"),w.labelled || bd("Label '{a}' on {b} statement.", w, e.value, w.value),Y.test(e.value + ":") && bd("Label '{a}' looks like a javascript url.", e, e.value),w.label = e.value,e = w),a || bs(),c = bm(0, !0),e.block || (!z.expr && (!c || !c.exps) ? bd("Expected an assignment or function call and instead saw an expression.", N) : z.nonew && c.id === "(" && c.left.id === "new" && bd("Do not use 'new' for side effects."),w.id !== ";" ? !z.asi && (!z.lastsemic || w.id != "}" || w.line != N.line) && be("Missing semicolon.", N.line, N.from + N.value.length) : (bn(N, w),bl(";"),bq(N, w))),o = b,F = d;
                return c
            }
        }

        function bN(a) {
            var b = 0,c;
            if (w.id === ";" && !y)for (; ;) {
                c = bk(b);
                if (c.reach)return;
                if (c.id !== "(endline)") {
                    if (c.id === "function") {
                        bd("Inner functions should be listed at the top of the outer function.", c);
                        break
                    }
                    bd("Unreachable '{a}' after '{b}'.", c, c.value, a);
                    break
                }
                b += 1
            }
        }

        function bM(a) {
            var b = bL(a);
            if (b)return b;
            N.id === "function" && w.id === "(" ? bd("Missing name in function declaration.") : bf("Expected an identifier and instead saw '{a}'.", w, w.value)
        }

        function bL(a) {
            if (w.identifier) {
                bl(),N.reserved && !z.es5 && (!a || N.value != "undefined") && bd("Expected an identifier and instead saw '{a}' (a reserved word).", N, N.id);
                return N.value
            }
        }

        function bK(a, b) {
            var c = bv(a, 150);
            c.led = function(a) {
                z.plusplus ? bd("Unexpected use of '{a}'.", this, this.id) : (!a.identifier || a.reserved) && a.id !== "." && a.id !== "[" && bd("Bad operand.", this),this.left = a;
                return this
            };
            return c
        }

        function bJ(a) {
            bv(a, 20).exps = !0;
            return bE(a, function(a, b) {
                z.bitwise && bd("Unexpected use of '{a}'.", b, b.id),bq(C, N),bq(N, w);
                if (a) {
                    if (a.id === "." || a.id === "[" || a.identifier && !a.reserved) {
                        bm(19);
                        return b
                    }
                    a === L["function"] && bd("Expected an identifier in an assignment, and instead saw a function invocation.", N);
                    return b
                }
                bf("Bad assignment.", b)
            }, 20)
        }

        function bI(a, b, c) {
            var d = bv(a, c);
            bz(d),d.led = typeof b == "function" ? b : function(a) {
                z.bitwise && bd("Unexpected use of '{a}'.", this, this.id),this.left = a,this.right = bm(c);
                return this
            };
            return d
        }

        function bH(a, b) {
            bv(a, 20).exps = !0;
            return bE(a, function(a, b) {
                var c;
                b.left = a,A[a.value] === !1 && F[a.value]["(global)"] === !0 ? bd("Read only.", a) : a["function"] && bd("'{a}' is a function.", a, a.value);
                if (a) {
                    if (a.id === "." || a.id === "[") {
                        (!a.left || a.left.value === "arguments") && bd("Bad assignment.", b),b.right = bm(19);
                        return b
                    }
                    if (a.identifier && !a.reserved) {
                        i[a.value] === "exception" && bd("Do not assign to the exception parameter.", a),b.right = bm(19);
                        return b
                    }
                    a === L["function"] && bd("Expected an identifier in an assignment and instead saw a function invocation.", N)
                }
                bf("Bad assignment.", b)
            }, 20)
        }

        function bG(a) {
            return a && (a.type === "(number)" && +a.value === 0 || a.type === "(string)" && a.value === "" || a.type === "null" && !z.eqnull || a.type === "true" || a.type === "false" || a.type === "undefined")
        }

        function bF(a, b) {
            var c = bv(a, 100);
            c.led = function(a) {
                br(C, N),bq(N, w);
                var c = bm(100);
                a && a.id === "NaN" || c && c.id === "NaN" ? bd("Use the isNaN function to compare with NaN.", this) : b && b.apply(this, [a,c]),a.id === "!" && bd("Confusing use of '{a}'.", a, "!"),c.id === "!" && bd("Confusing use of '{a}'.", a, "!"),this.left = a,this.right = c;
                return this
            };
            return c
        }

        function bE(a, b, c, d) {
            var e = bv(a, c);
            bz(e),e.led = function(a) {
                d || (br(C, N),bq(N, w));
                if (typeof b == "function")return b(a, this);
                this.left = a,this.right = bm(c);
                return this
            };
            return e
        }

        function bD(a, b) {
            return bC(a, function() {
                typeof b == "function" && b(this);
                return this
            })
        }

        function bC(a, b) {
            var c = bB(a, b);
            c.identifier = c.reserved = !0;
            return c
        }

        function bB(a, b) {
            var c = bw(a);
            c.type = a,c.nud = b;
            return c
        }

        function bA(a, b) {
            var c = bv(a, 150);
            bz(c),c.nud = typeof b == "function" ? b : function() {
                this.right = bm(150),this.arity = "unary";
                if (this.id === "++" || this.id === "--")z.plusplus ? bd("Unexpected use of '{a}'.", this, this.id) : (!this.right.identifier || this.right.reserved) && this.right.id !== "." && this.right.id !== "[" && bd("Bad operand.", this);
                return this
            };
            return c
        }

        function bz(a) {
            var b = a.id.charAt(0);
            if (b >= "a" && b <= "z" || b >= "A" && b <= "Z")a.identifier = a.reserved = !0;
            return a
        }

        function by(a, b) {
            var c = bx(a, b);
            c.block = !0;
            return c
        }

        function bx(a, b) {
            var c = bw(a);
            c.identifier = c.reserved = !0,c.fud = b;
            return c
        }

        function bw(a) {
            return bv(a, 0)
        }

        function bv(a, b) {
            var c = L[a];
            if (!c || typeof c != "object")L[a] = c = {id:a,lbp:b,value:a};
            return c
        }

        function bu() {
            N.line !== w.line ? z.laxbreak || bd("Bad line breaking before '{a}'.", N, w.id) : N.character !== w.from && z.white && bd("Unexpected space after '{a}'.", w, N.value),bl(","),bq(N, w)
        }

        function bt(a) {
            a = a || N,a.line !== w.line && bd("Line breaking error '{a}'.", a, a.value)
        }

        function bs(a) {
            var b;
            z.white && w.id !== "(end)" && (b = o + (a || 0),w.from !== b && bd("Expected '{a}' to have an indentation at {b} instead at {c}.", w, w.value, b, w.from))
        }

        function br(a, b) {
            a = a || N,b = b || w,!z.laxbreak && a.line !== b.line ? bd("Bad line breaking before '{a}'.", b, b.id) : z.white && (a = a || N,b = b || w,a.character === b.from && bd("Missing space after '{a}'.", w, a.value))
        }

        function bq(a, b) {
            z.white && (a = a || N,b = b || w,a.line === b.line && a.character === b.from && bd("Missing space after '{a}'.", w, a.value))
        }

        function bp(a, b) {
            a = a || N,b = b || w,z.white && !a.comment && a.line === b.line && bn(a, b)
        }

        function bo(a, b) {
            a = a || N,b = b || w,z.white && (a.character !== b.from || a.line !== b.line) && bd("Unexpected space before '{a}'.", b, b.value)
        }

        function bn(a, b) {
            a = a || N,b = b || w,z.white && a.character !== b.from && a.line === b.line && bd("Unexpected space after '{a}'.", b, a.value)
        }

        function bm(b, c) {
            var d,e = !1;
            w.id === "(end)" && bf("Unexpected early end of program.", N),bl(),c && (a = "anonymous",i["(verb)"] = N.value);
            if (c === !0 && N.fud)d = N.fud(); else {
                if (N.nud)d = N.nud(); else {
                    if (w.type === "(number)" && N.id === ".") {
                        bd("A leading decimal point can be confused with a dot: '.{a}'.", N, w.value),bl();
                        return N
                    }
                    bf("Expected an identifier and instead saw '{a}'.", N, N.id)
                }
                while (b < w.lbp)e = N.value == "Array",bl(),e && N.id == "(" && w.id == ")" && bd("Use the array literal notation [].", N),N.led ? d = N.led(d) : bf("Expected an operator and instead saw '{a}'.", N, N.id)
            }
            return d
        }

        function bl(b, c) {
            switch (N.id) {
                case"(number)":
                    w.id === "." && bd("A dot following a number can be confused with a decimal point.", N);
                    break;
                case"-":
                    (w.id === "-" || w.id === "--") && bd("Confusing minusses.");
                    break;
                case"+":
                    (w.id === "+" || w.id === "++") && bd("Confusing plusses.")
            }
            if (N.type === "(string)" || N.identifier)a = N.value;
            b && w.id !== b && (c ? w.id === "(end)" ? bd("Unmatched '{a}'.", c, c.id) : bd("Expected '{a}' to match '{b}' from line {c} and instead saw '{d}'.", w, b, c.id, c.line, w.value) : (w.type !== "(identifier)" || w.value !== b) && bd("Expected '{a}' and instead saw '{b}'.", w, b, w.value)),C = N,N = w;
            for (; ;) {
                w = s.shift() || bh.token();
                if (w.id === "(end)" || w.id === "(error)")return;
                if (w.type === "special")bj(); else if (w.id !== "(endline)")break
            }
        }

        function bk(a) {
            var b = a || 0,c = 0,d;
            while (c <= b)d = s[c],d || (d = s[c] = bh.token()),c += 1;
            return d
        }

        function bj() {
            var a,b,d,e = w.value,f,g;
            switch (e) {
                case"*/":
                    bf("Unbegun comment.");
                    break;
                case"/*members":
                case"/*member":
                    e = "/*members",u || (u = {}),b = u;
                    break;
                case"/*jshint":
                case"/*jslint":
                    b = z,d = c;
                    break;
                case"/*global":
                    b = A;
                    break;
                default:
                    bf("What?")
            }
            f = bh.token();
            loop:for (; ;) {
                for (; ;) {
                    if (f.type === "special" && f.value === "*/")break loop;
                    if (f.id !== "(endline)" && f.id !== ",")break;
                    f = bh.token()
                }
                f.type !== "(string)" && f.type !== "(identifier)" && e !== "/*members" && bf("Bad option.", f),g = bh.token(),g.id === ":" ? (g = bh.token(),b === u && bf("Expected '{a}' and instead saw '{b}'.", f, "*/", ":"),f.value !== "indent" || e !== "/*jshint" && e !== "/*jslint" ? f.value !== "maxerr" || e !== "/*jshint" && e !== "/*jslint" ? f.value !== "maxlen" || e !== "/*jshint" && e !== "/*jslint" ? g.value === "true" ? b[f.value] = !0 : g.value === "false" ? b[f.value] = !1 : bf("Bad option value.", g) : (a = +g.value,(typeof a != "number" || !isFinite(a) || a <= 0 || Math.floor(a) !== a) && bf("Expected a small integer and instead saw '{a}'.", g, g.value),b.maxlen = a) : (a = +g.value,(typeof a != "number" || !isFinite(a) || a <= 0 || Math.floor(a) !== a) && bf("Expected a small integer and instead saw '{a}'.", g, g.value),b.maxerr = a) : (a = +g.value,(typeof a != "number" || !isFinite(a) || a <= 0 || Math.floor(a) !== a) && bf("Expected a small integer and instead saw '{a}'.", g, g.value),b.white = !0,b.indent = a),f = bh.token()) : ((e === "/*jshint" || e === "/*jslint") && bf("Missing option value.", f),b[f.value] = !1,f = g)
            }
            d && bb()
        }

        function bi(a, b) {
            a === "hasOwnProperty" && bd("'hasOwnProperty' is a really bad name."),_(i, a) && !i["(global)"] && (i[a] === !0 ? z.latedef && bd("'{a}' was used before it was defined.", w, a) : z.shadow || bd("'{a}' is already defined.", w, a)),i[a] = b,i["(global)"] ? (l[a] = i,_(m, a) && (z.latedef && bd("'{a}' was used before it was defined.", w, a),delete m[a])) : F[a] = i
        }

        function bg(a, b, c, d, e, f, g) {
            return bf(a, {line:b,from:c}, d, e, f, g)
        }

        function bf(a, b, c, d, e, f) {
            var g = bd(a, b, c, d, e, f);
            bc("Stopping, unable to continue.", g.line, g.character)
        }

        function be(a, b, c, d, e, f, g) {
            return bd(a, {line:b,from:c}, d, e, f, g)
        }

        function bd(a, b, c, e, f, g) {
            var h,i,j;
            b = b || w,b.id === "(end)" && (b = N),i = b.line || 0,h = b.from || 0,j = {id:"(error)",raw:a,evidence:r[i - 1] || "",line:i,character:h,a:c,b:e,c:f,d:g},j.reason = a.supplant(j),d.errors.push(j),z.passfail && bc("Stopping. ", i, h),P += 1,P >= z.maxerr && bc("Too many errors.", i, h);
            return j
        }

        function bc(a, b, c) {
            var d = Math.floor(b / r.length * 100);
            throw{name:"JSHintError",line:b,character:c,message:a + " (" + d + "% scanned)."}
        }

        function bb() {
            z.couch && ba(A, f),z.rhino && ba(A, E),z.prototypejs && ba(A, D),z.node && ba(A, x),z.devel && ba(A, g),z.browser && ba(A, e),z.jquery && ba(A, q),z.mootools && ba(A, v),z.wsh && ba(A, Q),z.globalstrict && z.strict !== !1 && (z.strict = !0)
        }

        function ba(a, b) {
            var c;
            for (c in b)_(b, c) && (a[c] = b[c])
        }

        function _(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        }

        function $() {
        }

        "use strict";
        var a,b = {"<":!0,"<=":!0,"==":!0,"===":!0,"!==":!0,"!=":!0,">":!0,">=":!0,"+":!0,"-":!0,"*":!0,"/":!0,"%":!0},c = {asi:!0,bitwise:!0,boss:!0,browser:!0,couch:!0,curly:!0,debug:!0,devel:!0,eqeqeq:!0,eqnull:!0,es5:!0,evil:!0,expr:!0,forin:!0,globalstrict:!0,immed:!0,jquery:!0,latedef:!0,laxbreak:!0,loopfunc:!0,mootools:!0,newcap:!0,noarg:!0,node:!0,noempty:!0,nonew:!0,nomen:!0,onevar:!0,passfail:!0,plusplus:!0,prototypejs:!0,regexdash:!0,regexp:!0,rhino:!0,undef:!0,shadow:!0,strict:!0,sub:!0,supernew:!0,trailing:!0,white:!0,wsh:!0},e = {ArrayBuffer:!1,ArrayBufferView:!1,addEventListener:!1,applicationCache:!1,blur:!1,clearInterval:!1,clearTimeout:!1,close:!1,closed:!1,DataView:!1,defaultStatus:!1,document:!1,event:!1,FileReader:!1,Float32Array:!1,Float64Array:!1,focus:!1,frames:!1,getComputedStyle:!1,HTMLElement:!1,history:!1,Int16Array:!1,Int32Array:!1,Int8Array:!1,Image:!1,length:!1,localStorage:!1,location:!1,moveBy:!1,moveTo:!1,name:!1,navigator:!1,onbeforeunload:!0,onblur:!0,onerror:!0,onfocus:!0,onload:!0,onresize:!0,onunload:!0,open:!1,openDatabase:!1,opener:!1,Option:!1,parent:!1,print:!1,removeEventListener:!1,resizeBy:!1,resizeTo:!1,screen:!1,scroll:!1,scrollBy:!1,scrollTo:!1,setInterval:!1,setTimeout:!1,status:!1,top:!1,Uint16Array:!1,Uint32Array:!1,Uint8Array:!1,WebSocket:!1,window:!1,Worker:!1,XMLHttpRequest:!1,XPathEvaluator:!1,XPathException:!1,XPathExpression:!1,XPathNamespace:!1,XPathNSResolver:!1,XPathResult:!1},f = {require:!1,respond:!1,getRow:!1,emit:!1,send:!1,start:!1,sum:!1,log:!1,exports:!1,module:!1},g = {alert:!1,confirm:!1,console:!1,Debug:!1,opera:!1,prompt:!1},h = {"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"/":"\\/","\\":"\\\\"},i,j = ["closure","exception","global","label","outer","unused","var"],k,l,m,n,o,p,q = {$:!1,jQuery:!1},r,s,t,u,v = {$:!1,$$:!1,Assets:!1,Browser:!1,Chain:!1,Class:!1,Color:!1,Cookie:!1,Core:!1,Document:!1,DomReady:!1,DOMReady:!1,Drag:!1,Element:!1,Elements:!1,Event:!1,Events:!1,Fx:!1,Group:!1,Hash:!1,HtmlTable:!1,Iframe:!1,IframeShim:!1,InputValidator:!1,instanceOf:!1,Keyboard:!1,Locale:!1,Mask:!1,MooTools:!1,Native:!1,Options:!1,OverText:!1,Request:!1,Scroller:!1,Slick:!1,Slider:!1,Sortables:!1,Spinner:!1,Swiff:!1,Tips:!1,Type:!1,typeOf:!1,URI:!1,Window:!1},w,x = {__filename:!1,__dirname:!1,exports:!1,Buffer:!1,GLOBAL:!1,global:!1,module:!1,process:!1,require:!1},y,z,A,B,C,D = {$:!1,$$:!1,$A:!1,$F:!1,$H:!1,$R:!1,$break:!1,$continue:!1,$w:!1,Abstract:!1,Ajax:!1,Class:!1,Enumerable:!1,Element:!1,Event:!1,Field:!1,Form:!1,Hash:!1,Insertion:!1,ObjectRange:!1,PeriodicalExecuter:!1,Position:!1,Prototype:!1,Selector:!1,Template:!1,Toggle:!1,Try:!1,Autocompleter:!1,Builder:!1,Control:!1,Draggable:!1,Draggables:!1,Droppables:!1,Effect:!1,Sortable:!1,SortableObserver:!1,Sound:!1,Scriptaculous:!1},E = {defineClass:!1,deserialize:!1,gc:!1,help:!1,load:!1,loadClass:!1,print:!1,quit:!1,readFile:!1,readUrl:!1,runCommand:!1,seal:!1,serialize:!1,spawn:!1,sync:!1,toint32:!1,version:!1},F,G,H,I = {Array:!1,Boolean:!1,Date:!1,decodeURI:!1,decodeURIComponent:!1,encodeURI:!1,encodeURIComponent:!1,Error:!1,eval:!1,EvalError:!1,Function:!1,hasOwnProperty:!1,isFinite:!1,isNaN:!1,JSON:!1,Math:!1,Number:!1,Object:!1,parseInt:!1,parseFloat:!1,RangeError:!1,ReferenceError:!1,RegExp:!1,String:!1,SyntaxError:!1,TypeError:!1,URIError:!1},J = {E:!0,LN2:!0,LN10:!0,LOG2E:!0,LOG10E:!0,MAX_VALUE:!0,MIN_VALUE:!0,NEGATIVE_INFINITY:!0,PI:!0,POSITIVE_INFINITY:!0,SQRT1_2:!0,SQRT2:!0},K,L = {},M,N,O,P,Q = {ActiveXObject:!0,Enumerator:!0,GetObject:!0,ScriptEngine:!0,ScriptEngineBuildVersion:!0,ScriptEngineMajorVersion:!0,ScriptEngineMinorVersion:!0,VBArray:!0,WSH:!0,WScript:!0},R = /@cc|<\/?|script|\]\s*\]|<\s*!|&lt/i,S = /[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/,T = /^\s*([(){}\[.,:;'"~\?\]#@]|==?=?|\/(\*(jshint|jslint|members?|global)?|=|\/)?|\*[\/=]?|\+(?:=|\++)?|-(?:=|-+)?|%=?|&[&=]?|\|[|=]?|>>?>?=?|<([\/=!]|\!(\[|--)?|<=?)?|\^=?|\!=?=?|[a-zA-Z_$][a-zA-Z0-9_$]*|[0-9]+([xX][0-9a-fA-F]+|\.[0-9]*)?([eE][+\-]?[0-9]+)?)/,U = /[\u0000-\u001f&<"\/\\\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/,V = /[\u0000-\u001f&<"\/\\\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,W = /\*\/|\/\*/,X = /^([a-zA-Z_$][a-zA-Z0-9_$]*)$/,Y = /^(?:javascript|jscript|ecmascript|vbscript|mocha|livescript)\s*:/i,Z = /^\s*\/\*\s*falls\sthrough\s*\*\/\s*$/;
        typeof Array.isArray != "function" && (Array.isArray = function(a) {
            return Object.prototype.toString.apply(a) === "[object Array]"
        }),typeof Object.create != "function" && (Object.create = function(a) {
            $.prototype = a;
            return new $
        }),typeof Object.keys != "function" && (Object.keys = function(a) {
            var b = [],c;
            for (c in a)_(a, c) && b.push(c);
            return b
        }),typeof String.prototype.entityify != "function" && (String.prototype.entityify = function() {
            return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }),typeof String.prototype.isAlpha != "function" && (String.prototype.isAlpha = function() {
            return this >= "a" && this <= "z￿" || this >= "A" && this <= "Z￿"
        }),typeof String.prototype.isDigit != "function" && (String.prototype.isDigit = function() {
            return this >= "0" && this <= "9"
        }),typeof String.prototype.supplant != "function" && (String.prototype.supplant = function(a) {
            return this.replace(/\{([^{}]*)\}/g, function(b, c) {
                var d = a[c];
                return typeof d == "string" || typeof d == "number" ? d : b
            })
        }),typeof String.prototype.name != "function" && (String.prototype.name = function() {
            return X.test(this) ? this : U.test(this) ? '"' + this.replace(V, function(a) {
                var b = h[a];
                return b ? b : "\\u" + ("0000" + a.charCodeAt().toString(16)).slice(-4)
            }) + '"' : '"' + this + '"'
        });
        var bh = function() {
            function f(d, e) {
                var f,g;
                d === "(color)" || d === "(range)" ? g = {type:d} : d === "(punctuator)" || d === "(identifier)" && _(L, e) ? g = L[e] || L["(error)"] : g = L[d],g = Object.create(g),(d === "(string)" || d === "(range)") && Y.test(e) && be("Script URL.", c, b),d === "(identifier)" && (g.identifier = !0,e === "__iterator__" || e === "__proto__" ? bg("Reserved name '{a}'.", c, b, e) : z.nomen && (e.charAt(0) === "_" || e.charAt(e.length - 1) === "_") && be("Unexpected {a} in '{b}'.", c, b, "dangling '_'", e)),g.value = e,g.line = c,g.character = a,g.from = b,f = g.id,f !== "(endline)" && (B = f && ("(,=:[!&|?{};".indexOf(f.charAt(f.length - 1)) >= 0 || f === "return"));
                return g
            }

            function e() {
                var b,e;
                if (c >= r.length)return!1;
                a = 1,d = r[c],c += 1,b = d.search(/ \t/),b >= 0 && be("Mixed spaces and tabs.", c, b + 1),d = d.replace(/\t/g, M),b = d.search(S),b >= 0 && be("Unsafe character.", c, b),z.maxlen && z.maxlen < d.length && be("Line too long.", c, d.length),e = d.search(/\s+$/),z.trailing && ~e && be("Trailing whitespace.", c, e);
                return!0
            }

            var a,b,c,d;
            return{init:function(a) {
                typeof a == "string" ? r = a.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n") : r = a,r[0] && r[0].substr(0, 2) == "#!" && (r[0] = ""),c = 0,e(),b = 1
            },range:function(e, g) {
                var h,i = "";
                b = a,d.charAt(0) !== e && bg("Expected '{a}' and instead saw '{b}'.", c, a, e, d.charAt(0));
                for (; ;) {
                    d = d.slice(1),a += 1,h = d.charAt(0);
                    switch (h) {
                        case"":
                            bg("Missing '{a}'.", c, a, h);
                            break;
                        case g:
                            d = d.slice(1),a += 1;
                            return f("(range)", i);
                        case"\\":
                            be("Unexpected '{a}'.", c, a, h)
                    }
                    i += h
                }
            },token:function() {
                function t(g) {
                    function k(b) {
                        var e = parseInt(d.substr(i + 1, b), 16);
                        i += b,e >= 32 && e <= 126 && e !== 34 && e !== 92 && e !== 39 && be("Unnecessary escapement.", c, a),a += b,h = String.fromCharCode(e)
                    }

                    var h,i,j = "";
                    p && g !== '"' && be("Strings must use doublequote.", c, a),i = 0;
                    for (; ;) {
                        while (i >= d.length)i = 0,e() || bg("Unclosed string.", c, b);
                        h = d.charAt(i);
                        if (h === g) {
                            a += 1,d = d.substr(i + 1);
                            return f("(string)", j, g)
                        }
                        if (h < " ") {
                            if (h === "\n" || h === "\r")break;
                            be("Control character in string: {a}.", c, a + i, d.slice(0, i))
                        } else if (h === "\\") {
                            i += 1,a += 1,h = d.charAt(i);
                            switch (h) {
                                case"\\":
                                case'"':
                                case"/":
                                    break;
                                case"'":
                                    p && be("Avoid \\'.", c, a);
                                    break;
                                case"b":
                                    h = "\b";
                                    break;
                                case"f":
                                    h = "\f";
                                    break;
                                case"n":
                                    h = "\n";
                                    break;
                                case"r":
                                    h = "\r";
                                    break;
                                case"t":
                                    h = "\t";
                                    break;
                                case"u":
                                    k(4);
                                    break;
                                case"v":
                                    p && be("Avoid \\v.", c, a),h = "";
                                    break;
                                case"x":
                                    p && be("Avoid \\x-.", c, a),k(2);
                                    break;
                                default:
                                    be("Bad escapement.", c, a)
                            }
                        }
                        j += h,a += 1,i += 1
                    }
                }

                function s(c) {
                    var e = c.exec(d),f;
                    if (e) {
                        n = e[0].length,f = e[1],h = f.charAt(0),d = d.substr(n),b = a + n - f.length,a += n;
                        return f
                    }
                }

                var g,h,i,j,k,l,m,n,o,q,r;
                for (; ;) {
                    if (!d)return f(e() ? "(endline)" : "(end)", "");
                    r = s(T);
                    if (!r) {
                        r = "",h = "";
                        while (d && d < "!")d = d.substr(1);
                        d && bg("Unexpected '{a}'.", c, a, d.substr(0, 1))
                    } else {
                        if (h.isAlpha() || h === "_" || h === "$")return f("(identifier)", r);
                        if (h.isDigit()) {
                            isFinite(Number(r)) || be("Bad number '{a}'.", c, a, r),d.substr(0, 1).isAlpha() && be("Missing space after '{a}'.", c, a, r),h === "0" && (j = r.substr(1, 1),j.isDigit() ? N.id !== "." && be("Don't use extra leading zeros '{a}'.", c, a, r) : p && (j === "x" || j === "X") && be("Avoid 0x-. '{a}'.", c, a, r)),r.substr(r.length - 1) === "." && be("A trailing decimal point can be confused with a dot '{a}'.", c, a, r);
                            return f("(number)", r)
                        }
                        switch (r) {
                            case'"':
                            case"'":
                                return t(r);
                            case"//":
                                G && be("Unexpected comment.", c, a),d = "",N.comment = !0;
                                break;
                            case"/*":
                                G && be("Unexpected comment.", c, a);
                                for (; ;) {
                                    m = d.search(W);
                                    if (m >= 0)break;
                                    e() || bg("Unclosed comment.", c, a)
                                }
                                a += m + 2,d.substr(m, 1) === "/" && bg("Nested comment.", c, a),d = d.substr(m + 2),N.comment = !0;
                                break;
                            case"/*members":
                            case"/*member":
                            case"/*jshint":
                            case"/*jslint":
                            case"/*global":
                            case"*/":
                                return{value:r,type:"special",line:c,character:a,from:b};
                            case"":
                                break;
                            case"/":
                                N.id === "/=" && bg("A regular expression literal can be confused with '/='.", c, b);
                                if (B) {
                                    k = 0,i = 0,n = 0;
                                    for (; ;) {
                                        g = !0,h = d.charAt(n),n += 1;
                                        switch (h) {
                                            case"":
                                                bg("Unclosed regular expression.", c, b);
                                                return;
                                            case"/":
                                                k > 0 && be("Unescaped '{a}'.", c, b + n, "/"),h = d.substr(0, n - 1),q = {g:!0,i:!0,m:!0};
                                                while (q[d.charAt(n)] === !0)q[d.charAt(n)] = !1,n += 1;
                                                a += n,d = d.substr(n),q = d.charAt(0),(q === "/" || q === "*") && bg("Confusing regular expression.", c, b);
                                                return f("(regexp)", h);
                                            case"\\":
                                                h = d.charAt(n),h < " " ? be("Unexpected control character in regular expression.", c, b + n) : h === "<" && be("Unexpected escaped character '{a}' in regular expression.", c, b + n, h),n += 1;
                                                break;
                                            case"(":
                                                k += 1,g = !1;
                                                if (d.charAt(n) === "?") {
                                                    n += 1;
                                                    switch (d.charAt(n)) {
                                                        case":":
                                                        case"=":
                                                        case"!":
                                                            n += 1;
                                                            break;
                                                        default:
                                                            be("Expected '{a}' and instead saw '{b}'.", c, b + n, ":", d.charAt(n))
                                                    }
                                                } else i += 1;
                                                break;
                                            case"|":
                                                g = !1;
                                                break;
                                            case")":
                                                k === 0 ? be("Unescaped '{a}'.", c, b + n, ")") : k -= 1;
                                                break;
                                            case" ":
                                                q = 1;
                                                while (d.charAt(n) === " ")n += 1,q += 1;
                                                q > 1 && be("Spaces are hard to count. Use {{a}}.", c, b + n, q);
                                                break;
                                            case"[":
                                                h = d.charAt(n),h === "^" && (n += 1,z.regexp ? be("Insecure '{a}'.", c, b + n, h) : d.charAt(n) === "]" && bg("Unescaped '{a}'.", c, b + n, "^")),q = !1,h === "]" && (be("Empty class.", c, b + n - 1),q = !0);
                                                klass:do{
                                                    h = d.charAt(n),n += 1;
                                                    switch (h) {
                                                        case"[":
                                                        case"^":
                                                            be("Unescaped '{a}'.", c, b + n, h),q = !0;
                                                            break;
                                                        case"-":
                                                            q ? q = !1 : (be("Unescaped '{a}'.", c, b + n, "-"),q = !0);
                                                            break;
                                                        case"]":
                                                            !q && !z.regexdash && be("Unescaped '{a}'.", c, b + n - 1, "-");
                                                            break klass;
                                                        case"\\":
                                                            h = d.charAt(n),h < " " ? be("Unexpected control character in regular expression.", c, b + n) : h === "<" && be("Unexpected escaped character '{a}' in regular expression.", c, b + n, h),n += 1,q = !0;
                                                            break;
                                                        case"/":
                                                            be("Unescaped '{a}'.", c, b + n - 1, "/"),q = !0;
                                                            break;
                                                        case"<":
                                                            q = !0;
                                                            break;
                                                        default:
                                                            q = !0
                                                    }
                                                } while (h);
                                                break;
                                            case".":
                                                z.regexp && be("Insecure '{a}'.", c, b + n, h);
                                                break;
                                            case"]":
                                            case"?":
                                            case"{":
                                            case"}":
                                            case"+":
                                            case"*":
                                                be("Unescaped '{a}'.", c, b + n, h)
                                        }
                                        if (g)switch (d.charAt(n)) {
                                            case"?":
                                            case"+":
                                            case"*":
                                                n += 1,d.charAt(n) === "?" && (n += 1);
                                                break;
                                            case"{":
                                                n += 1,h = d.charAt(n),(h < "0" || h > "9") && be("Expected a number and instead saw '{a}'.", c, b + n, h),n += 1,o = +h;
                                                for (; ;) {
                                                    h = d.charAt(n);
                                                    if (h < "0" || h > "9")break;
                                                    n += 1,o = +h + o * 10
                                                }
                                                l = o;
                                                if (h === ",") {
                                                    n += 1,l = Infinity,h = d.charAt(n);
                                                    if (h >= "0" && h <= "9") {
                                                        n += 1,l = +h;
                                                        for (; ;) {
                                                            h = d.charAt(n);
                                                            if (h < "0" || h > "9")break;
                                                            n += 1,l = +h + l * 10
                                                        }
                                                    }
                                                }
                                                d.charAt(n) !== "}" ? be("Expected '{a}' and instead saw '{b}'.", c, b + n, "}", h) : n += 1,d.charAt(n) === "?" && (n += 1),o > l && be("'{a}' should not be greater than '{b}'.", c, b + n, o, l)
                                        }
                                    }
                                    h = d.substr(0, n - 1),a += n,d = d.substr(n);
                                    return f("(regexp)", h)
                                }
                                return f("(punctuator)", r);
                            case"#":
                                return f("(punctuator)", r);
                            default:
                                return f("(punctuator)", r)
                        }
                    }
                }
            }}
        }();
        bB("(number)", function() {
            return this
        }),bB("(string)", function() {
            return this
        }),L["(identifier)"] = {type:"(identifier)",lbp:0,identifier:!0,nud:function() {
            var b = this.value,c = F[b],d;
            typeof c == "function" ? c = undefined : typeof c == "boolean" && (d = i,i = k[0],bi(b, "var"),c = i,i = d);
            if (i === c)switch (i[b]) {
                case"unused":
                    i[b] = "var";
                    break;
                case"unction":
                    i[b] = "function",this["function"] = !0;
                    break;
                case"function":
                    this["function"] = !0;
                    break;
                case"label":
                    bd("'{a}' is a statement label.", N, b)
            } else if (i["(global)"])a != "typeof" && a != "delete" && z.undef && typeof A[b] != "boolean" && bd("'{a}' is not defined.", N, b),bT(N); else switch (i[b]) {
                case"closure":
                case"function":
                case"var":
                case"unused":
                    bd("'{a}' used out of scope.", N, b);
                    break;
                case"label":
                    bd("'{a}' is a statement label.", N, b);
                    break;
                case"outer":
                case"global":
                    break;
                default:
                    if (c === !0)i[b] = !0; else if (c === null)bd("'{a}' is not allowed.", N, b),bT(N); else if (typeof c != "object")a != "typeof" && a != "delete" && z.undef ? bd("'{a}' is not defined.", N, b) : i[b] = !0,bT(N); else switch (c[b]) {
                        case"function":
                        case"unction":
                            this["function"] = !0,c[b] = "closure",i[b] = c["(global)"] ? "global" : "outer";
                            break;
                        case"var":
                        case"unused":
                            c[b] = "closure",i[b] = c["(global)"] ? "global" : "outer";
                            break;
                        case"closure":
                        case"parameter":
                            i[b] = c["(global)"] ? "global" : "outer";
                            break;
                        case"label":
                            bd("'{a}' is a statement label.", N, b)
                    }
            }
            return this
        },led:function() {
            bf("Expected an operator and instead saw '{a}'.", w, w.value)
        }},bB("(regexp)", function() {
            return this
        }),bw("(endline)"),bw("(begin)"),bw("(end)").reach = !0,bw("</").reach = !0,bw("<!"),bw("<!--"),bw("-->"),bw("(error)").reach = !0,bw("}").reach = !0,bw(")"),bw("]"),bw('"').reach = !0,bw("'").reach = !0,bw(";"),bw(":").reach = !0,bw(","),bw("#"),bw("@"),bC("else"),bC("case").reach = !0,bC("catch"),bC("default").reach = !0,bC("finally"),bD("arguments", function(a) {
            K && i["(global)"] && bd("Strict violation.", a)
        }),bD("eval"),bD("false"),bD("Infinity"),bD("NaN"),bD("null"),bD("this", function(a) {
            K && (i["(statement)"] && i["(name)"].charAt(0) > "Z" || i["(global)"]) && bd("Strict violation.", a)
        }),bD("true"),bD("undefined"),bH("=", "assign", 20),bH("+=", "assignadd", 20),bH("-=", "assignsub", 20),bH("*=", "assignmult", 20),bH("/=", "assigndiv", 20).nud = function() {
            bf("A regular expression literal can be confused with '/='.")
        },bH("%=", "assignmod", 20),bJ("&=", "assignbitand", 20),bJ("|=", "assignbitor", 20),bJ("^=", "assignbitxor", 20),bJ("<<=", "assignshiftleft", 20),bJ(">>=", "assignshiftright", 20),bJ(">>>=", "assignshiftrightunsigned", 20),bE("?", function(a, b) {
            b.left = a,b.right = bm(10),bl(":"),b["else"] = bm(10);
            return b
        }, 30),bE("||", "or", 40),bE("&&", "and", 50),bI("|", "bitor", 70),bI("^", "bitxor", 80),bI("&", "bitand", 90),bF("==", function(a, b) {
            var c = z.eqnull && (a.value == "null" || b.value == "null");
            !c && z.eqeqeq ? bd("Expected '{a}' and instead saw '{b}'.", this, "===", "==") : bG(a) ? bd("Use '{a}' to compare with '{b}'.", this, "===", a.value) : bG(b) && bd("Use '{a}' to compare with '{b}'.", this, "===", b.value);
            return this
        }),bF("==="),bF("!=", function(a, b) {
            z.eqeqeq ? bd("Expected '{a}' and instead saw '{b}'.", this, "!==", "!=") : bG(a) ? bd("Use '{a}' to compare with '{b}'.", this, "!==", a.value) : bG(b) && bd("Use '{a}' to compare with '{b}'.", this, "!==", b.value);
            return this
        }),bF("!=="),bF("<"),bF(">"),bF("<="),bF(">="),bI("<<", "shiftleft", 120),bI(">>", "shiftright", 120),bI(">>>", "shiftrightunsigned", 120),bE("in", "in", 120),bE("instanceof", "instanceof", 120),bE("+", function(a, b) {
            var c = bm(130);
            if (a && c && a.id === "(string)" && c.id === "(string)") {
                a.value += c.value,a.character = c.character,Y.test(a.value) && bd("JavaScript URL.", a);
                return a
            }
            b.left = a,b.right = c;
            return b
        }, 130),bA("+", "num"),bA("+++", function() {
            bd("Confusing pluses."),this.right = bm(150),this.arity = "unary";
            return this
        }),bE("+++", function(a) {
            bd("Confusing pluses."),this.left = a,this.right = bm(130);
            return this
        }, 130),bE("-", "sub", 130),bA("-", "neg"),bA("---", function() {
            bd("Confusing minuses."),this.right = bm(150),this.arity = "unary";
            return this
        }),bE("---", function(a) {
            bd("Confusing minuses."),this.left = a,this.right = bm(130);
            return this
        }, 130),bE("*", "mult", 140),bE("/", "div", 140),bE("%", "mod", 140),bK("++", "postinc"),bA("++", "preinc"),L["++"].exps = !0,bK("--", "postdec"),bA("--", "predec"),L["--"].exps = !0,bA("delete",
            function() {
                var a = bm(0);
                (!a || a.id !== "." && a.id !== "[") && bd("Variables should not be deleted."),this.first = a;
                return this
            }).exps = !0,bA("~", function() {
            z.bitwise && bd("Unexpected '{a}'.", this, "~"),bm(150);
            return this
        }),bA("!", function() {
            this.right = bm(150),this.arity = "unary",b[this.right.id] === !0 && bd("Confusing use of '{a}'.", this, "!");
            return this
        }),bA("typeof", "typeof"),bA("new", function() {
            var a = bm(155),b;
            if (a && a.id !== "function")if (a.identifier) {
                a["new"] = !0;
                switch (a.value) {
                    case"Object":
                        bd("Use the object literal notation {}.", N);
                        break;
                    case"Number":
                    case"String":
                    case"Boolean":
                    case"Math":
                    case"JSON":
                        bd("Do not use {a} as a constructor.", N, a.value);
                        break;
                    case"Function":
                        z.evil || bd("The Function constructor is eval.");
                        break;
                    case"Date":
                    case"RegExp":
                        break;
                    default:
                        a.id !== "function" && (b = a.value.substr(0, 1),z.newcap && (b < "A" || b > "Z") && bd("A constructor name should start with an uppercase letter.", N))
                }
            } else a.id !== "." && a.id !== "[" && a.id !== "(" && bd("Bad constructor.", N); else z.supernew || bd("Weird construction. Delete 'new'.", this);
            bn(N, w),w.id !== "(" && !z.supernew && bd("Missing '()' invoking a constructor."),this.first = a;
            return this
        }),L["new"].exps = !0,bA("void").exps = !0,bE(".", function(a, b) {
            bn(C, N),bo();
            var c = bM();
            typeof c == "string" && bS(c),b.left = a,b.right = c,z.noarg && a && a.value === "arguments" && (c === "callee" || c === "caller") ? bd("Avoid arguments.{a}.", a, c) : !z.evil && a && a.value === "document" && (c === "write" || c === "writeln") && bd("document.write can be a form of eval.", a),!z.evil && (c === "eval" || c === "execScript") && bd("eval is evil.");
            return b
        }, 160, !0),bE("(",
            function(a, b) {
                C.id !== "}" && C.id !== ")" && bo(C, N),bp(),z.immed && !a.immed && a.id === "function" && bd("Wrap an immediate function invocation in parentheses to assist the reader in understanding that the expression is the result of a function, and not the function itself.");
                var c = 0,d = [];
                a && a.type === "(identifier)" && a.value.match(/^[A-Z]([A-Z0-9_$]*[a-z][A-Za-z0-9_$]*)?$/) && a.value !== "Number" && a.value !== "String" && a.value !== "Boolean" && a.value !== "Date" && (a.value === "Math" ? bd("Math is not a function.", a) : z.newcap && bd("Missing 'new' prefix when invoking a constructor.", a));
                if (w.id !== ")")for (; ;) {
                    d[d.length] = bm(10),c += 1;
                    if (w.id !== ",")break;
                    bu()
                }
                bl(")"),bp(C, N),typeof a == "object" && (a.value === "parseInt" && c === 1 && bd("Missing radix parameter.", a),z.evil || (a.value === "eval" || a.value === "Function" || a.value === "execScript" ? bd("eval is evil.", a) : d[0] && d[0].id === "(string)" && (a.value === "setTimeout" || a.value === "setInterval") && bd("Implied eval is evil. Pass a function instead of a string.", a)),!a.identifier && a.id !== "." && a.id !== "[" && a.id !== "(" && a.id !== "&&" && a.id !== "||" && a.id !== "?" && bd("Bad invocation.", a)),b.left = a;
                return b
            }, 155, !0).exps = !0,bA("(", function() {
            bp(),w.id === "function" && (w.immed = !0);
            var a = bm(0);
            bl(")", this),bp(C, N),z.immed && a.id === "function" && (w.id === "(" ? bd("Move the invocation into the parens that contain the function.", w) : bd("Do not wrap function literals in parens unless they are to be immediately invoked.", this));
            return a
        }),bE("[", function(a, b) {
            bo(C, N),bp();
            var c = bm(0),d;
            c && c.type === "(string)" && (!z.evil && (c.value === "eval" || c.value === "execScript") && bd("eval is evil.", b),bS(c.value),!z.sub && X.test(c.value) && (d = L[c.value],(!d || !d.reserved) && bd("['{a}'] is better written in dot notation.", c, c.value))),bl("]", b),bp(C, N),b.left = a,b.right = c;
            return b
        }, 160, !0),bA("[", function() {
            var a = N.line !== w.line;
            this.first = [],a && (o += z.indent,w.from === o + z.indent && (o += z.indent));
            while (w.id !== "(end)") {
                while (w.id === ",")bd("Extra comma."),bl(",");
                if (w.id === "]")break;
                a && N.line !== w.line && bs(),this.first.push(bm(10));
                if (w.id !== ",")break;
                bu();
                if (w.id === "]" && !z.es5) {
                    bd("Extra comma.", N);
                    break
                }
            }
            a && (o -= z.indent,bs()),bl("]", this);
            return this
        }, 160),function(a) {
            a.nud = function() {
                var a,b,c,d,e,f = {},g;
                a = N.line !== w.line,a && (o += z.indent,w.from === o + z.indent && (o += z.indent));
                for (; ;) {
                    if (w.id === "}")break;
                    a && bs();
                    if (w.value === "get" && bk().id !== ":")bl("get"),z.es5 || bf("get/set are ES5 features."),c = bU(),c || bf("Missing property name."),g = w,bn(N, w),b = bW(),!z.loopfunc && i["(loopage)"] && bd("Don't make functions within a loop.", g),e = b["(params)"],e && bd("Unexpected parameter '{a}' in get {b} function.", g, e[0], c),bn(N, w),bl(","),bs(),bl("set"),d = bU(),c !== d && bf("Expected {a} and instead saw {b}.", N, c, d),g = w,bn(N, w),b = bW(),e = b["(params)"],(!e || e.length !== 1 || e[0] !== "value") && bd("Expected (value) in set {a} function.", g, c); else {
                        c = bU();
                        if (typeof c != "string")break;
                        bl(":"),bq(N, w),bm(10)
                    }
                    f[c] === !0 && bd("Duplicate member '{a}'.", w, c),f[c] = !0,bS(c);
                    if (w.id === ",")bu(),w.id === "," ? bd("Extra comma.", N) : w.id === "}" && !z.es5 && bd("Extra comma.", N); else break
                }
                a && (o -= z.indent,bs()),bl("}", this);
                return this
            },a.fud = function() {
                bf("Expected to see a statement and instead saw a block.", N)
            }
        }(bw("{"));
        var bX = bx("var", function(a) {
            var b,c,d;
            i["(onevar)"] && z.onevar ? bd("Too many var statements.") : i["(global)"] || (i["(onevar)"] = !0),this.first = [];
            for (; ;) {
                bq(N, w),b = bM(),i["(global)"] && A[b] === !1 && bd("Redefinition of '{a}'.", N, b),bi(b, "unused");
                if (a)break;
                c = N,this.first.push(N),w.id === "=" && (bq(N, w),bl("="),bq(N, w),w.id === "undefined" && bd("It is not necessary to initialize '{a}' to 'undefined'.", N, b),bk(0).id === "=" && w.identifier && bf("Variable {a} was not declared correctly.", w, w.value),d = bm(0),c.first = d);
                if (w.id !== ",")break;
                bu()
            }
            return this
        });
        bX.exps = !0,by("function", function() {
            n && bd("Function declarations should not be placed in blocks. Use a function expression or move the statement to the top of the outer function.", N);
            var a = bM();
            bn(N, w),bi(a, "unction"),bW(a, !0),w.id === "(" && w.line === N.line && bf("Function declarations are not invocable. Wrap the whole function invocation in parens.");
            return this
        }),bA("function", function() {
            var a = bL();
            a ? bn(N, w) : bq(N, w),bW(a),!z.loopfunc && i["(loopage)"] && bd("Don't make functions within a loop.");
            return this
        }),by("if", function() {
            var a = w;
            bl("("),bq(this, a),bp(),bm(20),w.id === "=" && (z.boss || bd("Expected a conditional expression and instead saw an assignment."),bl("="),bm(20)),bl(")", a),bp(C, N),bR(!0, !0),w.id === "else" && (bq(N, w),bl("else"),w.id === "if" || w.id === "switch" ? bO(!0) : bR(!0, !0));
            return this
        }),by("try", function() {
            var a,b,c;
            bR(!1),w.id === "catch" && (bl("catch"),bq(N, w),bl("("),c = F,F = Object.create(c),b = w.value,w.type !== "(identifier)" ? bd("Expected an identifier and instead saw '{a}'.", w, b) : bi(b, "exception"),bl(),bl(")"),bR(!1),a = !0,F = c);
            if (w.id === "finally")bl("finally"),bR(!1); else {
                a || bf("Expected '{a}' and instead saw '{b}'.", w, "catch", w.value);
                return this
            }
        }),by("while",
            function() {
                var a = w;
                i["(breakage)"] += 1,i["(loopage)"] += 1,bl("("),bq(this, a),bp(),bm(20),w.id === "=" && (z.boss || bd("Expected a conditional expression and instead saw an assignment."),bl("="),bm(20)),bl(")", a),bp(C, N),bR(!0, !0),i["(breakage)"] -= 1,i["(loopage)"] -= 1;
                return this
            }).labelled = !0,bC("with"),by("switch",
            function() {
                var a = w,b = !1;
                i["(breakage)"] += 1,bl("("),bq(this, a),bp(),this.condition = bm(20),bl(")", a),bp(C, N),bq(N, w),a = w,bl("{"),bq(N, w),o += z.indent,this.cases = [];
                for (; ;)switch (w.id) {
                    case"case":
                        switch (i["(verb)"]) {
                            case"break":
                            case"case":
                            case"continue":
                            case"return":
                            case"switch":
                            case"throw":
                                break;
                            default:
                                Z.test(r[w.line - 2]) || bd("Expected a 'break' statement before 'case'.", N)
                        }
                        bs(-z.indent),bl("case"),this.cases.push(bm(20)),b = !0,bl(":"),i["(verb)"] = "case";
                        break;
                    case"default":
                        switch (i["(verb)"]) {
                            case"break":
                            case"continue":
                            case"return":
                            case"throw":
                                break;
                            default:
                                Z.test(r[w.line - 2]) || bd("Expected a 'break' statement before 'default'.", N)
                        }
                        bs(-z.indent),bl("default"),b = !0,bl(":");
                        break;
                    case"}":
                        o -= z.indent,bs(),bl("}", a),(this.cases.length === 1 || this.condition.id === "true" || this.condition.id === "false") && bd("This 'switch' should be an 'if'.", this),i["(breakage)"] -= 1,i["(verb)"] = undefined;
                        return;
                    case"(end)":
                        bf("Missing '{a}'.", w, "}");
                        return;
                    default:
                        if (b)switch (N.id) {
                            case",":
                                bf("Each value should have its own case label.");
                                return;
                            case":":
                                bQ();
                                break;
                            default:
                                bf("Missing ':' on a case clause.", N)
                        } else bf("Expected '{a}' and instead saw '{b}'.", w, "case", w.value)
                }
            }).labelled = !0,bx("debugger",
            function() {
                z.debug || bd("All 'debugger' statements should be removed.");
                return this
            }).exps = !0,function() {
            var a = bx("do", function() {
                i["(breakage)"] += 1,i["(loopage)"] += 1,this.first = bR(!0),bl("while");
                var a = w;
                bq(N, a),bl("("),bp(),bm(20),w.id === "=" && (z.boss || bd("Expected a conditional expression and instead saw an assignment."),bl("="),bm(20)),bl(")", a),bp(C, N),i["(breakage)"] -= 1,i["(loopage)"] -= 1;
                return this
            });
            a.labelled = !0,a.exps = !0
        }(),by("for",
            function() {
                var a,b = w;
                i["(breakage)"] += 1,i["(loopage)"] += 1,bl("("),bq(this, b),bp();
                if (bk(w.id === "var" ? 1 : 0).id === "in") {
                    if (w.id === "var")bl("var"),bX.fud.call(bX, !0); else {
                        switch (i[w.value]) {
                            case"unused":
                                i[w.value] = "var";
                                break;
                            case"var":
                                break;
                            default:
                                bd("Bad for in variable '{a}'.", w, w.value)
                        }
                        bl()
                    }
                    bl("in"),bm(20),bl(")", b),a = bR(!0, !0),z.forin && (a.length > 1 || typeof a[0] != "object" || a[0].value !== "if") && bd("The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype.", this),i["(breakage)"] -= 1,i["(loopage)"] -= 1;
                    return this
                }
                if (w.id !== ";")if (w.id === "var")bl("var"),bX.fud.call(bX); else for (; ;) {
                    bm(0, "for");
                    if (w.id !== ",")break;
                    bu()
                }
                bt(N),bl(";"),w.id !== ";" && (bm(20),w.id === "=" && (z.boss || bd("Expected a conditional expression and instead saw an assignment."),bl("="),bm(20))),bt(N),bl(";"),w.id === ";" && bf("Expected '{a}' and instead saw '{b}'.", w, ")", ";");
                if (w.id !== ")")for (; ;) {
                    bm(0, "for");
                    if (w.id !== ",")break;
                    bu()
                }
                bl(")", b),bp(C, N),bR(!0, !0),i["(breakage)"] -= 1,i["(loopage)"] -= 1;
                return this
            }).labelled = !0,bx("break",
            function() {
                var a = w.value;
                i["(breakage)"] === 0 && bd("Unexpected '{a}'.", w, this.value),bt(this),w.id !== ";" && N.line === w.line && (i[a] !== "label" ? bd("'{a}' is not a statement label.", w, a) : F[a] !== i && bd("'{a}' is out of scope.", w, a),this.first = w,bl()),bN("break");
                return this
            }).exps = !0,bx("continue",
            function() {
                var a = w.value;
                i["(breakage)"] === 0 && bd("Unexpected '{a}'.", w, this.value),bt(this),w.id !== ";" ? N.line === w.line && (i[a] !== "label" ? bd("'{a}' is not a statement label.", w, a) : F[a] !== i && bd("'{a}' is out of scope.", w, a),this.first = w,bl()) : i["(loopage)"] || bd("Unexpected '{a}'.", w, this.value),bN("continue");
                return this
            }).exps = !0,bx("return",
            function() {
                bt(this),w.id === "(regexp)" && bd("Wrap the /regexp/ literal in parens to disambiguate the slash operator."),w.id !== ";" && !w.reach && (bq(N, w),this.first = bm(20)),bN("return");
                return this
            }).exps = !0,bx("throw",
            function() {
                bt(this),bq(N, w),this.first = bm(20),bN("throw");
                return this
            }).exps = !0,bC("class"),bC("const"),bC("enum"),bC("export"),bC("extends"),bC("import"),bC("super"),bC("let"),bC("yield"),bC("implements"),bC("interface"),bC("package"),bC("private"),bC("protected"),bC("public"),bC("static");
        var bZ = function(a, b, c) {
            var e,f,g;
            d.errors = [],A = Object.create(I),ba(A, c || {});
            if (b) {
                e = b.predef;
                if (e)if (Array.isArray(e))for (f = 0; f < e.length; f += 1)A[e[f]] = !0; else if (typeof e == "object") {
                    g = Object.keys(e);
                    for (f = 0; f < g.length; f += 1)A[g[f]] = !!e[g]
                }
                z = b
            } else z = {};
            z.indent = z.indent || 4,z.maxerr = z.maxerr || 50,M = "";
            for (f = 0; f < z.indent; f += 1)M += " ";
            o = 1,l = Object.create(A),F = l,i = {"(global)":!0,"(name)":"(global)","(scope)":F,"(breakage)":0,"(loopage)":0},k = [i],O = [],G = !1,H = null,t = {},u = null,m = {},n = !1,s = [],p = !1,P = 0,bh.init(a),B = !0,K = !1,C = N = w = L["(begin)"],bb();
            try {
                bl();
                switch (w.id) {
                    case"{":
                    case"[":
                        z.laxbreak = !0,p = !0,bY();
                        break;
                    default:
                        w.value === "use strict" && (z.globalstrict || bd('Use the function form of "use strict".'),bP()),bQ("lib")
                }
                bl("(end)")
            } catch(h) {
                h && d.errors.push({reason:h.message,line:h.line || w.line,character:h.character || w.from}, null)
            }
            return d.errors.length === 0
        };
        bZ.data = function() {
            var a = {functions:[]},b,c,d = [],e,f,g,h = [],i,l = [],n;
            bZ.errors.length && (a.errors = bZ.errors),p && (a.json = !0);
            for (i in m)_(m, i) && d.push({name:i,line:m[i]});
            d.length > 0 && (a.implieds = d),O.length > 0 && (a.urls = O),c = Object.keys(F),c.length > 0 && (a.globals = c);
            for (f = 1; f < k.length; f += 1) {
                e = k[f],b = {};
                for (g = 0; g < j.length; g += 1)b[j[g]] = [];
                for (i in e)_(e, i) && i.charAt(0) !== "(" && (n = e[i],n === "unction" && (n = "unused"),Array.isArray(b[n]) && (b[n].push(i),n === "unused" && l.push({name:i,line:e["(line)"],"function":e["(name)"]})));
                for (g = 0; g < j.length; g += 1)b[j[g]].length === 0 && delete b[j[g]];
                b.name = e["(name)"],b.param = e["(params)"],b.line = e["(line)"],b.last = e["(last)"],a.functions.push(b)
            }
            l.length > 0 && (a.unused = l),h = [];
            for (i in t)if (typeof t[i] == "number") {
                a.member = t;
                break
            }
            return a
        },bZ.report = function(a) {
            function o(a, b) {
                var c,d,e;
                if (b) {
                    m.push("<div><i>" + a + "</i> "),b = b.sort();
                    for (d = 0; d < b.length; d += 1)b[d] !== e && (e = b[d],m.push((c ? ", " : "") + e),c = !0);
                    m.push("</div>")
                }
            }

            var b = bZ.data(),c = [],d,e,f,g,h,i,j,k = "",l,m = [],n;
            if (b.errors || b.implieds || b.unused) {
                f = !0,m.push("<div id=errors><i>Error:</i>");
                if (b.errors)for (h = 0; h < b.errors.length; h += 1)d = b.errors[h],d && (e = d.evidence || "",m.push("<p>Problem" + (isFinite(d.line) ? " at line " + d.line + " character " + d.character : "") + ": " + d.reason.entityify() + "</p><p class=evidence>" + (e && (e.length > 80 ? e.slice(0, 77) + "..." : e).entityify()) + "</p>"));
                if (b.implieds) {
                    n = [];
                    for (h = 0; h < b.implieds.length; h += 1)n[h] = "<code>" + b.implieds[h].name + "</code>&nbsp;<i>" + b.implieds[h].line + "</i>";
                    m.push("<p><i>Implied global:</i> " + n.join(", ") + "</p>")
                }
                if (b.unused) {
                    n = [];
                    for (h = 0; h < b.unused.length; h += 1)n[h] = "<code><u>" + b.unused[h].name + "</u></code>&nbsp;<i>" + b.unused[h].line + "</i> <code>" + b.unused[h]["function"] + "</code>";
                    m.push("<p><i>Unused variable:</i> " + n.join(", ") + "</p>")
                }
                b.json && m.push("<p>JSON: bad.</p>"),m.push("</div>")
            }
            if (!a) {
                m.push("<br><div id=functions>"),b.urls && o("URLs<br>", b.urls, "<br>"),b.json && !f ? m.push("<p>JSON: good.</p>") : b.globals ? m.push("<div><i>Global</i> " + b.globals.sort().join(", ") + "</div>") : m.push("<div><i>No new global variables introduced.</i></div>");
                for (h = 0; h < b.functions.length; h += 1)g = b.functions[h],m.push("<br><div class=function><i>" + g.line + "-" + g.last + "</i> " + (g.name || "") + "(" + (g.param ? g.param.join(", ") : "") + ")</div>"),o("<big><b>Unused</b></big>", g.unused),o("Closure", g.closure),o("Variable", g["var"]),o("Exception", g.exception),o("Outer", g.outer),o("Global", g.global),o("Label", g.label);
                if (b.member) {
                    c = Object.keys(b.member);
                    if (c.length) {
                        c = c.sort(),k = "<br><pre id=members>/*members ",j = 10;
                        for (h = 0; h < c.length; h += 1)i = c[h],l = i.name(),j + l.length > 72 && (m.push(k + "<br>"),k = "    ",j = 1),j += l.length + 2,b.member[i] === 1 && (l = "<i>" + l + "</i>"),h < c.length - 1 && (l += ", "),k += l;
                        m.push(k + "<br>*/</pre>")
                    }
                    m.push("</div>")
                }
            }
            return m.join("")
        },bZ.jshint = bZ,bZ.edition = "2011-04-16";
        return bZ
    }();
    typeof b == "object" && b && (b.JSHINT = d)
}),define("ace/narcissus/jsparse", ["require","exports","module","ace/narcissus/jslex","ace/narcissus/jsdefs"], function(require, exports, module) {
    function parseStdin(a, b) {
        for (; ;)try {
            var c = new lexer.Tokenizer(a, "stdin", b.value),d = Script(c, !1);
            b.value = c.lineno;
            return d
        } catch(e) {
            if (!c.unexpectedEOF)throw e;
            var f = readline();
            if (!f)throw e;
            a += "\n" + f
        }
    }

    function parse(a, b, c) {
        var d = new lexer.Tokenizer(a, b, c),e = Script(d, !1);
        if (!d.done)throw d.newSyntaxError("Syntax error");
        return e
    }

    function PrimaryExpression(a, b) {
        var c,d,e = a.get(!0);
        switch (e) {
            case FUNCTION:
                c = FunctionDefinition(a, b, !1, EXPRESSED_FORM);
                break;
            case LEFT_BRACKET:
                c = new Node(a, {type:ARRAY_INIT});
                while ((e = a.peek(!0)) !== RIGHT_BRACKET) {
                    if (e === COMMA) {
                        a.get(),c.push(null);
                        continue
                    }
                    c.push(AssignExpression(a, b));
                    if (e !== COMMA && !a.match(COMMA))break
                }
                c.children.length === 1 && a.match(FOR) && (d = new Node(a, {type:ARRAY_COMP,expression:c.children[0],tail:ComprehensionTail(a, b)}),c = d),a.mustMatch(RIGHT_BRACKET);
                break;
            case LEFT_CURLY:
                var f,g;
                c = new Node(a, {type:OBJECT_INIT});
                object_init:if (!a.match(RIGHT_CURLY)) {
                    do{
                        e = a.get();
                        if (a.token.value !== "get" && a.token.value !== "set" || a.peek() !== IDENTIFIER) {
                            switch (e) {
                                case IDENTIFIER:
                                case NUMBER:
                                case STRING:
                                    f = new Node(a, {type:IDENTIFIER});
                                    break;
                                case RIGHT_CURLY:
                                    if (b.ecma3OnlyMode)throw a.newSyntaxError("Illegal trailing ,");
                                    break object_init;
                                default:
                                    if (a.token.value in definitions.keywords) {
                                        f = new Node(a, {type:IDENTIFIER});
                                        break
                                    }
                                    throw a.newSyntaxError("Invalid property name")
                            }
                            if (a.match(COLON))d = new Node(a, {type:PROPERTY_INIT}),d.push(f),d.push(AssignExpression(a, b)),c.push(d); else {
                                if (a.peek() !== COMMA && a.peek() !== RIGHT_CURLY)throw a.newSyntaxError("missing : after property");
                                c.push(f)
                            }
                        } else {
                            if (b.ecma3OnlyMode)throw a.newSyntaxError("Illegal property accessor");
                            c.push(FunctionDefinition(a, b, !0, EXPRESSED_FORM))
                        }
                    } while (a.match(COMMA));
                    a.mustMatch(RIGHT_CURLY)
                }
                break;
            case LEFT_PAREN:
                c = ParenExpression(a, b),a.mustMatch(RIGHT_PAREN),c.parenthesized = !0;
                break;
            case LET:
                c = LetBlock(a, b, !1);
                break;
            case NULL:
            case THIS:
            case TRUE:
            case FALSE:
            case IDENTIFIER:
            case NUMBER:
            case STRING:
            case REGEXP:
                c = new Node(a);
                break;
            default:
                throw a.newSyntaxError("missing operand")
        }
        return c
    }

    function ArgumentList(a, b) {
        var c,d;
        c = new Node(a, {type:LIST});
        if (a.match(RIGHT_PAREN, !0))return c;
        do{
            d = AssignExpression(a, b);
            if (d.type === YIELD && !d.parenthesized && a.peek() === COMMA)throw a.newSyntaxError("Yield expression must be parenthesized");
            if (a.match(FOR)) {
                d = GeneratorExpression(a, b, d);
                if (c.children.length > 1 || a.peek(!0) === COMMA)throw a.newSyntaxError("Generator expression must be parenthesized")
            }
            c.push(d)
        } while (a.match(COMMA));
        a.mustMatch(RIGHT_PAREN);
        return c
    }

    function MemberExpression(a, b, c) {
        var d,e,f,g;
        a.match(NEW) ? (d = new Node(a),d.push(MemberExpression(a, b, !1)),a.match(LEFT_PAREN) && (d.type = NEW_WITH_ARGS,d.push(ArgumentList(a, b)))) : d = PrimaryExpression(a, b);
        while ((g = a.get()) !== END) {
            switch (g) {
                case DOT:
                    e = new Node(a),e.push(d),a.mustMatch(IDENTIFIER),e.push(new Node(a));
                    break;
                case LEFT_BRACKET:
                    e = new Node(a, {type:INDEX}),e.push(d),e.push(Expression(a, b)),a.mustMatch(RIGHT_BRACKET);
                    break;
                case LEFT_PAREN:
                    if (c) {
                        e = new Node(a, {type:CALL}),e.push(d),e.push(ArgumentList(a, b));
                        break
                    }
                    ;
                default:
                    a.unget();
                    return d
            }
            d = e
        }
        return d
    }

    function UnaryExpression(a, b) {
        var c,d,e;
        switch (e = a.get(!0)) {
            case DELETE:
            case VOID:
            case TYPEOF:
            case NOT:
            case BITWISE_NOT:
            case PLUS:
            case MINUS:
                e === PLUS ? c = new Node(a, {type:UNARY_PLUS}) : e === MINUS ? c = new Node(a, {type:UNARY_MINUS}) : c = new Node(a),c.push(UnaryExpression(a, b));
                break;
            case INCREMENT:
            case DECREMENT:
                c = new Node(a),c.push(MemberExpression(a, b, !0));
                break;
            default:
                a.unget(),c = MemberExpression(a, b, !0),a.tokens[a.tokenIndex + a.lookahead - 1 & 3].lineno === a.lineno && (a.match(INCREMENT) || a.match(DECREMENT)) && (d = new Node(a, {postfix:!0}),d.push(c),c = d)
        }
        return c
    }

    function MultiplyExpression(a, b) {
        var c,d;
        c = UnaryExpression(a, b);
        while (a.match(MUL) || a.match(DIV) || a.match(MOD))d = new Node(a),d.push(c),d.push(UnaryExpression(a, b)),c = d;
        return c
    }

    function AddExpression(a, b) {
        var c,d;
        c = MultiplyExpression(a, b);
        while (a.match(PLUS) || a.match(MINUS))d = new Node(a),d.push(c),d.push(MultiplyExpression(a, b)),c = d;
        return c
    }

    function ShiftExpression(a, b) {
        var c,d;
        c = AddExpression(a, b);
        while (a.match(LSH) || a.match(RSH) || a.match(URSH))d = new Node(a),d.push(c),d.push(AddExpression(a, b)),c = d;
        return c
    }

    function RelationalExpression(a, b) {
        var c,d,e = b.update({inForLoopInit:!1});
        c = ShiftExpression(a, e);
        while (a.match(LT) || a.match(LE) || a.match(GE) || a.match(GT) || !b.inForLoopInit && a.match(IN) || a.match(INSTANCEOF))d = new Node(a),d.push(c),d.push(ShiftExpression(a, e)),c = d;
        return c
    }

    function EqualityExpression(a, b) {
        var c,d;
        c = RelationalExpression(a, b);
        while (a.match(EQ) || a.match(NE) || a.match(STRICT_EQ) || a.match(STRICT_NE))d = new Node(a),d.push(c),d.push(RelationalExpression(a, b)),c = d;
        return c
    }

    function BitwiseAndExpression(a, b) {
        var c,d;
        c = EqualityExpression(a, b);
        while (a.match(BITWISE_AND))d = new Node(a),d.push(c),d.push(EqualityExpression(a, b)),c = d;
        return c
    }

    function BitwiseXorExpression(a, b) {
        var c,d;
        c = BitwiseAndExpression(a, b);
        while (a.match(BITWISE_XOR))d = new Node(a),d.push(c),d.push(BitwiseAndExpression(a, b)),c = d;
        return c
    }

    function BitwiseOrExpression(a, b) {
        var c,d;
        c = BitwiseXorExpression(a, b);
        while (a.match(BITWISE_OR))d = new Node(a),d.push(c),d.push(BitwiseXorExpression(a, b)),c = d;
        return c
    }

    function AndExpression(a, b) {
        var c,d;
        c = BitwiseOrExpression(a, b);
        while (a.match(AND))d = new Node(a),d.push(c),d.push(BitwiseOrExpression(a, b)),c = d;
        return c
    }

    function OrExpression(a, b) {
        var c,d;
        c = AndExpression(a, b);
        while (a.match(OR))d = new Node(a),d.push(c),d.push(AndExpression(a, b)),c = d;
        return c
    }

    function ConditionalExpression(a, b) {
        var c,d;
        c = OrExpression(a, b);
        if (a.match(HOOK)) {
            d = c,c = new Node(a, {type:HOOK}),c.push(d),c.push(AssignExpression(a, b.update({inForLoopInit:!1})));
            if (!a.match(COLON))throw a.newSyntaxError("missing : after ?");
            c.push(AssignExpression(a, b))
        }
        return c
    }

    function AssignExpression(a, b) {
        var c,d;
        if (a.match(YIELD, !0))return ReturnOrYield(a, b);
        c = new Node(a, {type:ASSIGN}),d = ConditionalExpression(a, b);
        if (!a.match(ASSIGN))return d;
        switch (d.type) {
            case OBJECT_INIT:
            case ARRAY_INIT:
                d.destructuredNames = checkDestructuring(a, b, d);
            case IDENTIFIER:
            case DOT:
            case INDEX:
            case CALL:
                break;
            default:
                throw a.newSyntaxError("Bad left-hand side of assignment")
        }
        c.assignOp = a.token.assignOp,c.push(d),c.push(AssignExpression(a, b));
        return c
    }

    function Expression(a, b) {
        var c,d;
        c = AssignExpression(a, b);
        if (a.match(COMMA)) {
            d = new Node(a, {type:COMMA}),d.push(c),c = d;
            do{
                d = c.children[c.children.length - 1];
                if (d.type === YIELD && !d.parenthesized)throw a.newSyntaxError("Yield expression must be parenthesized");
                c.push(AssignExpression(a, b))
            } while (a.match(COMMA))
        }
        return c
    }

    function ParenExpression(a, b) {
        var c = Expression(a, b.update({inForLoopInit:b.inForLoopInit && a.token.type === LEFT_PAREN}));
        if (a.match(FOR)) {
            if (c.type === YIELD && !c.parenthesized)throw a.newSyntaxError("Yield expression must be parenthesized");
            if (c.type === COMMA && !c.parenthesized)throw a.newSyntaxError("Generator expression must be parenthesized");
            c = GeneratorExpression(a, b, c)
        }
        return c
    }

    function HeadExpression(a, b) {
        var c = MaybeLeftParen(a, b),d = ParenExpression(a, b);
        MaybeRightParen(a, c);
        if (c === END && !d.parenthesized) {
            var e = a.peek();
            if (e !== LEFT_CURLY && !definitions.isStatementStartCode[e])throw a.newSyntaxError("Unparenthesized head followed by unbraced body")
        }
        return d
    }

    function ComprehensionTail(a, b) {
        var c,d,e,f,g;
        c = new Node(a, {type:COMP_TAIL});
        do{
            d = new Node(a, {type:FOR_IN,isLoop:!0}),a.match(IDENTIFIER) && (a.token.value === "each" ? d.isEach = !0 : a.unget()),g = MaybeLeftParen(a, b);
            switch (a.get()) {
                case LEFT_BRACKET:
                case LEFT_CURLY:
                    a.unget(),d.iterator = DestructuringExpression(a, b);
                    break;
                case IDENTIFIER:
                    d.iterator = f = new Node(a, {type:IDENTIFIER}),f.name = f.value,d.varDecl = e = new Node(a, {type:VAR}),e.push(f),b.parentScript.varDecls.push(f);
                    break;
                default:
                    throw a.newSyntaxError("missing identifier")
            }
            a.mustMatch(IN),d.object = Expression(a, b),MaybeRightParen(a, g),c.push(d)
        } while (a.match(FOR));
        a.match(IF) && (c.guard = HeadExpression(a, b));
        return c
    }

    function GeneratorExpression(a, b, c) {
        return new Node(a, {type:GENERATOR,expression:c,tail:ComprehensionTail(a, b)})
    }

    function DestructuringExpression(a, b, c) {
        var d = PrimaryExpression(a, b);
        d.destructuredNames = checkDestructuring(a, b, d, c);
        return d
    }

    function checkDestructuring(a, b, c, d) {
        if (c.type === ARRAY_COMP)throw a.newSyntaxError("Invalid array comprehension left-hand side");
        if (c.type === ARRAY_INIT || c.type === OBJECT_INIT) {
            var e = {},f,g,h,i,j,k = c.children;
            for (var l = 0,m = k.length; l < m; l++) {
                if (!(f = k[l]))continue;
                f.type === PROPERTY_INIT ? (j = f.children,i = j[1],h = j[0].value) : c.type === OBJECT_INIT ? (i = f,h = f.value) : (i = f,h = l);
                if (i.type === ARRAY_INIT || i.type === OBJECT_INIT)e[h] = checkDestructuring(a, b, i, d); else {
                    if (d && i.type !== IDENTIFIER)throw a.newSyntaxError("missing name in pattern");
                    e[h] = i
                }
            }
            return e
        }
    }

    function LetBlock(a, b, c) {
        var d,e;
        d = new Node(a, {type:LET_BLOCK,varDecls:[]}),a.mustMatch(LEFT_PAREN),d.variables = Variables(a, b, d),a.mustMatch(RIGHT_PAREN),c && a.peek() !== LEFT_CURLY && (e = new Node(a, {type:SEMICOLON,expression:d}),c = !1),c ? d.block = Block(a, b) : d.expression = AssignExpression(a, b);
        return d
    }

    function Variables(a, b, c) {
        var d,e,f,g,h,i;
        i = a.token.type;
        switch (i) {
            case VAR:
            case CONST:
                h = b.parentScript;
                break;
            case LET:
                h = b.parentBlock;
                break;
            case LEFT_PAREN:
                i = LET,h = c
        }
        d = new Node(a, {type:i,destructurings:[]});
        do{
            i = a.get();
            if (i === LEFT_BRACKET || i === LEFT_CURLY) {
                a.unget();
                var j = DestructuringExpression(a, b, !0);
                e = new Node(a, {type:IDENTIFIER,name:j,readOnly:d.type === CONST}),d.push(e),pushDestructuringVarDecls(e.name.destructuredNames, h),d.destructurings.push({exp:j,decl:e});
                if (b.inForLoopInit && a.peek() === IN)continue;
                a.mustMatch(ASSIGN);
                if (a.token.assignOp)throw a.newSyntaxError("Invalid variable initialization");
                e.initializer = AssignExpression(a, b);
                continue
            }
            if (i !== IDENTIFIER)throw a.newSyntaxError("missing variable name");
            e = new Node(a, {type:IDENTIFIER,name:a.token.value,readOnly:d.type === CONST}),d.push(e),h.varDecls.push(e);
            if (a.match(ASSIGN)) {
                if (a.token.assignOp)throw a.newSyntaxError("Invalid variable initialization");
                e.initializer = AssignExpression(a, b)
            }
        } while (a.match(COMMA));
        return d
    }

    function FunctionDefinition(a, b, c, d) {
        var e,f = new Node(a, {params:[]});
        f.type !== FUNCTION && (f.type = f.value === "get" ? GETTER : SETTER);
        if (a.match(IDENTIFIER))f.name = a.token.value; else if (c)throw a.newSyntaxError("missing function identifier");
        var g = new StaticContext(null, null, !0, !1, NESTING_TOP);
        a.mustMatch(LEFT_PAREN);
        if (!a.match(RIGHT_PAREN)) {
            do switch (a.get()) {
                case LEFT_BRACKET:
                case LEFT_CURLY:
                    a.unget(),f.params.push(DestructuringExpression(a, g));
                    break;
                case IDENTIFIER:
                    f.params.push(a.token.value);
                    break;
                default:
                    throw a.newSyntaxError("missing formal parameter")
            } while (a.match(COMMA));
            a.mustMatch(RIGHT_PAREN)
        }
        e = a.get(),e !== LEFT_CURLY && a.unget();
        if (e !== LEFT_CURLY) {
            f.body = AssignExpression(a, g);
            if (f.body.isGenerator)throw a.newSyntaxError("Generator returns a value")
        } else f.body = Script(a, !0);
        e === LEFT_CURLY && a.mustMatch(RIGHT_CURLY),f.end = a.token.end,f.functionForm = d,d === DECLARED_FORM && b.parentScript.funDecls.push(f);
        return f
    }

    function ReturnOrYield(a, b) {
        var c,d,e = a.token.type,f,g = b.parentScript;
        if (e === RETURN) {
            if (!b.inFunction)throw a.newSyntaxError("Return not in function")
        } else {
            if (!b.inFunction)throw a.newSyntaxError("Yield not in function");
            g.isGenerator = !0
        }
        c = new Node(a, {value:undefined}),f = a.peek(!0),f !== END && f !== NEWLINE && f !== SEMICOLON && f !== RIGHT_CURLY && (e !== YIELD || f !== e && f !== RIGHT_BRACKET && f !== RIGHT_PAREN && f !== COLON && f !== COMMA) ? e === RETURN ? (c.value = Expression(a, b),g.hasReturnWithValue = !0) : c.value = AssignExpression(a, b) : e === RETURN && (g.hasEmptyReturn = !0);
        if (g.hasReturnWithValue && g.isGenerator)throw a.newSyntaxError("Generator returns a value");
        return c
    }

    function MagicalSemicolon(a) {
        var b;
        if (a.lineno === a.token.lineno) {
            b = a.peekOnSameLine();
            if (b !== END && b !== NEWLINE && b !== SEMICOLON && b !== RIGHT_CURLY)throw a.newSyntaxError("missing ; before statement")
        }
        a.match(SEMICOLON)
    }

    function Statement(a, b) {
        var c,d,e,f,g,h,i,j = a.get(!0),k,l,m;
        switch (j) {
            case FUNCTION:
                return FunctionDefinition(a, b, !0, b.nesting !== NESTING_TOP ? STATEMENT_FORM : DECLARED_FORM);
            case LEFT_CURLY:
                e = new Node(a, blockInit()),Statements(a, b.update({parentBlock:e}).pushTarget(e).nest(NESTING_SHALLOW), e),a.mustMatch(RIGHT_CURLY);
                return e;
            case IF:
                e = new Node(a),e.condition = HeadExpression(a, b),l = b.pushTarget(e).nest(NESTING_DEEP),e.thenPart = Statement(a, l),e.elsePart = a.match(ELSE) ? Statement(a, l) : null;
                return e;
            case SWITCH:
                e = new Node(a, {cases:[],defaultIndex:-1}),e.discriminant = HeadExpression(a, b),l = b.pushTarget(e).nest(NESTING_DEEP),a.mustMatch(LEFT_CURLY);
                while ((j = a.get()) !== RIGHT_CURLY) {
                    switch (j) {
                        case DEFAULT:
                            if (e.defaultIndex >= 0)throw a.newSyntaxError("More than one switch default");
                        case CASE:
                            f = new Node(a),j === DEFAULT ? e.defaultIndex = e.cases.length : f.caseLabel = Expression(a, l, COLON);
                            break;
                        default:
                            throw a.newSyntaxError("Invalid switch case")
                    }
                    a.mustMatch(COLON),f.statements = new Node(a, blockInit());
                    while ((j = a.peek(!0)) !== CASE && j !== DEFAULT && j !== RIGHT_CURLY)f.statements.push(Statement(a, l));
                    e.cases.push(f)
                }
                return e;
            case FOR:
                e = new Node(a, LOOP_INIT),a.match(IDENTIFIER) && (a.token.value === "each" ? e.isEach = !0 : a.unget()),b.parenFreeMode || a.mustMatch(LEFT_PAREN),l = b.pushTarget(e).nest(NESTING_DEEP),m = b.update({inForLoopInit:!0}),(j = a.peek()) !== SEMICOLON && (j === VAR || j === CONST ? (a.get(),f = Variables(a, m)) : j === LET ? (a.get(),a.peek() === LEFT_PAREN ? f = LetBlock(a, m, !1) : (m.parentBlock = e,e.varDecls = [],f = Variables(a, m))) : f = Expression(a, m));
                if (f && a.match(IN)) {
                    e.type = FOR_IN,e.object = Expression(a, m);
                    if (f.type === VAR || f.type === LET) {
                        h = f.children;
                        if (h.length !== 1 && f.destructurings.length !== 1)throw new SyntaxError("Invalid for..in left-hand side", a.filename, f.lineno);
                        f.destructurings.length > 0 ? e.iterator = f.destructurings[0] : e.iterator = h[0],e.varDecl = f
                    } else {
                        if (f.type === ARRAY_INIT || f.type === OBJECT_INIT)f.destructuredNames = checkDestructuring(a, m, f);
                        e.iterator = f
                    }
                } else {
                    e.setup = f,a.mustMatch(SEMICOLON);
                    if (e.isEach)throw a.newSyntaxError("Invalid for each..in loop");
                    e.condition = a.peek() === SEMICOLON ? null : Expression(a, m),a.mustMatch(SEMICOLON),k = a.peek(),e.update = (b.parenFreeMode ? k === LEFT_CURLY || definitions.isStatementStartCode[k] : k === RIGHT_PAREN) ? null : Expression(a, m)
                }
                b.parenFreeMode || a.mustMatch(RIGHT_PAREN),e.body = Statement(a, l);
                return e;
            case WHILE:
                e = new Node(a, {isLoop:!0}),e.condition = HeadExpression(a, b),e.body = Statement(a, b.pushTarget(e).nest(NESTING_DEEP));
                return e;
            case DO:
                e = new Node(a, {isLoop:!0}),e.body = Statement(a, b.pushTarget(e).nest(NESTING_DEEP)),a.mustMatch(WHILE),e.condition = HeadExpression(a, b);
                if (!b.ecmaStrictMode) {
                    a.match(SEMICOLON);
                    return e
                }
                break;
            case BREAK:
            case CONTINUE:
                e = new Node(a),l = b.pushTarget(e),a.peekOnSameLine() === IDENTIFIER && (a.get(),e.label = a.token.value),e.target = e.label ? l.labeledTargets.find(function(a) {
                    return a.labels.has(e.label)
                }) : l.defaultTarget;
                if (!e.target)throw a.newSyntaxError("Invalid " + (j === BREAK ? "break" : "continue"));
                if (!e.target.isLoop && j === CONTINUE)throw a.newSyntaxError("Invalid continue");
                break;
            case TRY:
                e = new Node(a, {catchClauses:[]}),e.tryBlock = Block(a, b);
                while (a.match(CATCH)) {
                    f = new Node(a),g = MaybeLeftParen(a, b);
                    switch (a.get()) {
                        case LEFT_BRACKET:
                        case LEFT_CURLY:
                            a.unget(),f.varName = DestructuringExpression(a, b, !0);
                            break;
                        case IDENTIFIER:
                            f.varName = a.token.value;
                            break;
                        default:
                            throw a.newSyntaxError("missing identifier in catch")
                    }
                    if (a.match(IF)) {
                        if (b.ecma3OnlyMode)throw a.newSyntaxError("Illegal catch guard");
                        if (e.catchClauses.length && !e.catchClauses.top().guard)throw a.newSyntaxError("Guarded catch after unguarded");
                        f.guard = Expression(a, b)
                    }
                    MaybeRightParen(a, g),f.block = Block(a, b),e.catchClauses.push(f)
                }
                a.match(FINALLY) && (e.finallyBlock = Block(a, b));
                if (!e.catchClauses.length && !e.finallyBlock)throw a.newSyntaxError("Invalid try statement");
                return e;
            case CATCH:
            case FINALLY:
                throw a.newSyntaxError(definitions.tokens[j] + " without preceding try");
            case THROW:
                e = new Node(a),e.exception = Expression(a, b);
                break;
            case RETURN:
                e = ReturnOrYield(a, b);
                break;
            case WITH:
                e = new Node(a),e.object = HeadExpression(a, b),e.body = Statement(a, b.pushTarget(e).nest(NESTING_DEEP));
                return e;
            case VAR:
            case CONST:
                e = Variables(a, b);
                break;
            case LET:
                a.peek() === LEFT_PAREN ? e = LetBlock(a, b, !0) : e = Variables(a, b);
                break;
            case DEBUGGER:
                e = new Node(a);
                break;
            case NEWLINE:
            case SEMICOLON:
                e = new Node(a, {type:SEMICOLON}),e.expression = null;
                return e;
            default:
                if (j === IDENTIFIER) {
                    j = a.peek();
                    if (j === COLON) {
                        d = a.token.value;
                        if (b.allLabels.has(d))throw a.newSyntaxError("Duplicate label");
                        a.get(),e = new Node(a, {type:LABEL,label:d}),e.statement = Statement(a, b.pushLabel(d).nest(NESTING_SHALLOW)),e.target = e.statement.type === LABEL ? e.statement.target : e.statement;
                        return e
                    }
                }
                e = new Node(a, {type:SEMICOLON}),a.unget(),e.expression = Expression(a, b),e.end = e.expression.end
        }
        MagicalSemicolon(a);
        return e
    }

    function Block(a, b) {
        a.mustMatch(LEFT_CURLY);
        var c = new Node(a, blockInit());
        Statements(a, b.update({parentBlock:c}).pushTarget(c), c),a.mustMatch(RIGHT_CURLY);
        return c
    }

    function Statements(a, b, c) {
        try {
            while (!a.done && a.peek(!0) !== RIGHT_CURLY)c.push(Statement(a, b))
        } catch(d) {
            a.done && (a.unexpectedEOF = !0);
            throw d
        }
    }

    function MaybeRightParen(a, b) {
        b === LEFT_PAREN && a.mustMatch(RIGHT_PAREN)
    }

    function MaybeLeftParen(a, b) {
        return b.parenFreeMode ? a.match(LEFT_PAREN) ? LEFT_PAREN : END : a.mustMatch(LEFT_PAREN).type
    }

    function scriptInit() {
        return{type:SCRIPT,funDecls:[],varDecls:[],modDecls:[],impDecls:[],expDecls:[],loadDeps:[],hasEmptyReturn:!1,hasReturnWithValue:!1,isGenerator:!1}
    }

    function blockInit() {
        return{type:BLOCK,varDecls:[]}
    }

    function tokenString(a) {
        var b = definitions.tokens[a];
        return/^\W/.test(b) ? definitions.opTypeNames[b] : b.toUpperCase()
    }

    function Node(a, b) {
        var c = a.token;
        c ? (this.type = c.type,this.value = c.value,this.lineno = c.lineno,this.start = c.start,this.end = c.end) : this.lineno = a.lineno,this.tokenizer = a,this.children = [];
        for (var d in b)this[d] = b[d]
    }

    function Script(a, b) {
        var c = new Node(a, scriptInit()),d = new StaticContext(c, c, b, !1, NESTING_TOP);
        Statements(a, d, c);
        return c
    }

    function StaticContext(a, b, c, d, e) {
        this.parentScript = a,this.parentBlock = b,this.inFunction = c,this.inForLoopInit = d,this.nesting = e,this.allLabels = new Stack,this.currentLabels = new Stack,this.labeledTargets = new Stack,this.defaultTarget = null,definitions.options.ecma3OnlyMode && (this.ecma3OnlyMode = !0),definitions.options.parenFreeMode && (this.parenFreeMode = !0)
    }

    function pushDestructuringVarDecls(a, b) {
        for (var c in a) {
            var d = a[c];
            d.type === IDENTIFIER ? b.varDecls.push(d) : pushDestructuringVarDecls(d, b)
        }
    }

    var lexer = require("ace/narcissus/jslex"),definitions = require("ace/narcissus/jsdefs");
    const StringMap = definitions.StringMap,Stack = definitions.Stack;
    eval(definitions.consts);
    const NESTING_TOP = 0,NESTING_SHALLOW = 1,NESTING_DEEP = 2;
    StaticContext.prototype = {ecma3OnlyMode:!1,parenFreeMode:!1,update:function(a) {
        var b = {};
        for (var c in a)b[c] = {value:a[c],writable:!0,enumerable:!0,configurable:!0};
        return Object.create(this, b)
    },pushLabel:function(a) {
        return this.update({currentLabels:this.currentLabels.push(a),allLabels:this.allLabels.push(a)})
    },pushTarget:function(a) {
        var b = a.isLoop || a.type === SWITCH;
        if (this.currentLabels.isEmpty())return b ? this.update({defaultTarget:a}) : this;
        a.labels = new StringMap,this.currentLabels.forEach(function(b) {
            a.labels.set(b, !0)
        });
        return this.update({currentLabels:new Stack,labeledTargets:this.labeledTargets.push(a),defaultTarget:b ? a : this.defaultTarget})
    },nest:function(a) {
        var b = Math.max(this.nesting, a);
        return b !== this.nesting ? this.update({nesting:b}) : this
    }},definitions.defineProperty(Array.prototype, "top", function() {
        return this.length && this[this.length - 1]
    }, !1, !1, !0);
    var Np = Node.prototype = {};
    Np.constructor = Node,Np.toSource = Object.prototype.toSource,Np.push = function(a) {
        a !== null && (a.start < this.start && (this.start = a.start),this.end < a.end && (this.end = a.end));
        return this.children.push(a)
    },Node.indentLevel = 0,Np.toString = function() {
        var a = [];
        for (var b in this)this.hasOwnProperty(b) && b !== "type" && b !== "target" && a.push({id:b,value:this[b]});
        a.sort(function(a, b) {
            return a.id < b.id ? -1 : 1
        });
        const c = "    ";
        var d = ++Node.indentLevel,e = "{\n" + c.repeat(d) + "type: " + tokenString(this.type);
        for (b = 0; b < a.length; b++)e += ",\n" + c.repeat(d) + a[b].id + ": " + a[b].value;
        d = --Node.indentLevel,e += "\n" + c.repeat(d) + "}";
        return e
    },Np.getSource = function() {
        return this.tokenizer.source.slice(this.start, this.end)
    };
    const LOOP_INIT = {isLoop:!0};
    definitions.defineGetter(Np, "filename", function() {
        return this.tokenizer.filename
    }),definitions.defineProperty(String.prototype, "repeat", function(a) {
        var b = "",c = this + b;
        while (--a >= 0)b += c;
        return b
    }, !1, !1, !0);
    const DECLARED_FORM = 0,EXPRESSED_FORM = 1,STATEMENT_FORM = 2;
    exports.parse = parse,exports.parseStdin = parseStdin,exports.Node = Node,exports.DECLARED_FORM = DECLARED_FORM,exports.EXPRESSED_FORM = EXPRESSED_FORM,exports.STATEMENT_FORM = STATEMENT_FORM,exports.Tokenizer = lexer.Tokenizer,exports.FunctionDefinition = FunctionDefinition
}),define("ace/narcissus/jslex", ["require","exports","module","ace/narcissus/jsdefs"], function(require, exports, module) {
    function Tokenizer(a, b, c) {
        this.cursor = 0,this.source = String(a),this.tokens = [],this.tokenIndex = 0,this.lookahead = 0,this.scanNewlines = !1,this.unexpectedEOF = !1,this.filename = b || "",this.lineno = c || 1
    }

    var definitions = require("ace/narcissus/jsdefs");
    eval(definitions.consts);
    var opTokens = {};
    for (var op in definitions.opTypeNames) {
        if (op === "\n" || op === ".")continue;
        var node = opTokens;
        for (var i = 0; i < op.length; i++) {
            var ch = op[i];
            ch in node || (node[ch] = {}),node = node[ch],node.op = op
        }
    }
    Tokenizer.prototype = {get done() {
        return this.peek(!0) === END
    },get token() {
        return this.tokens[this.tokenIndex]
    },match:function(a, b) {
        return this.get(b) === a || this.unget()
    },mustMatch:function(a) {
        if (!this.match(a))throw this.newSyntaxError("Missing " + definitions.tokens[a].toLowerCase());
        return this.token
    },peek:function(a) {
        var b,c;
        this.lookahead ? (c = this.tokens[this.tokenIndex + this.lookahead & 3],b = this.scanNewlines && c.lineno !== this.lineno ? NEWLINE : c.type) : (b = this.get(a),this.unget());
        return b
    },peekOnSameLine:function(a) {
        this.scanNewlines = !0;
        var b = this.peek(a);
        this.scanNewlines = !1;
        return b
    },skip:function() {
        var a = this.source;
        for (; ;) {
            var b = a[this.cursor++],c = a[this.cursor];
            if (b === "\n" && !this.scanNewlines)this.lineno++; else if (b === "/" && c === "*") {
                this.cursor++;
                for (; ;) {
                    b = a[this.cursor++];
                    if (b === undefined)throw this.newSyntaxError("Unterminated comment");
                    if (b === "*") {
                        c = a[this.cursor];
                        if (c === "/") {
                            this.cursor++;
                            break
                        }
                    } else b === "\n" && this.lineno++
                }
            } else if (b === "/" && c === "/") {
                this.cursor++;
                for (; ;) {
                    b = a[this.cursor++];
                    if (b === undefined)return;
                    if (b === "\n") {
                        this.lineno++;
                        break
                    }
                }
            } else if (b !== " " && b !== "\t") {
                this.cursor--;
                return
            }
        }
    },lexExponent:function() {
        var a = this.source,b = a[this.cursor];
        if (b === "e" || b === "E") {
            this.cursor++,ch = a[this.cursor++];
            if (ch === "+" || ch === "-")ch = a[this.cursor++];
            if (ch < "0" || ch > "9")throw this.newSyntaxError("Missing exponent");
            do ch = a[this.cursor++]; while (ch >= "0" && ch <= "9");
            this.cursor--;
            return!0
        }
        return!1
    },lexZeroNumber:function(a) {
        var b = this.token,c = this.source;
        b.type = NUMBER,a = c[this.cursor++];
        if (a === ".") {
            do a = c[this.cursor++]; while (a >= "0" && a <= "9");
            this.cursor--,this.lexExponent(),b.value = parseFloat(b.start, this.cursor)
        } else if (a === "x" || a === "X") {
            do a = c[this.cursor++]; while (a >= "0" && a <= "9" || a >= "a" && a <= "f" || a >= "A" && a <= "F");
            this.cursor--,b.value = parseInt(c.substring(b.start, this.cursor))
        } else if (a >= "0" && a <= "7") {
            do a = c[this.cursor++]; while (a >= "0" && a <= "7");
            this.cursor--,b.value = parseInt(c.substring(b.start, this.cursor))
        } else this.cursor--,this.lexExponent(),b.value = 0
    },lexNumber:function(a) {
        var b = this.token,c = this.source;
        b.type = NUMBER;
        var d = !1;
        do a = c[this.cursor++],a === "." && !d && (d = !0,a = c[this.cursor++]); while (a >= "0" && a <= "9");
        this.cursor--;
        var e = this.lexExponent();
        d = d || e;
        var f = c.substring(b.start, this.cursor);
        b.value = d ? parseFloat(f) : parseInt(f)
    },lexDot:function(a) {
        var b = this.token,c = this.source,d = c[this.cursor];
        if (d >= "0" && d <= "9") {
            do a = c[this.cursor++]; while (a >= "0" && a <= "9");
            this.cursor--,this.lexExponent(),b.type = NUMBER,b.value = parseFloat(b.start, this.cursor)
        } else b.type = DOT,b.assignOp = null,b.value = "."
    },lexString:function(ch) {
        var token = this.token,input = this.source;
        token.type = STRING;
        var hasEscapes = !1,delim = ch;
        if (input.length <= this.cursor)throw this.newSyntaxError("Unterminated string literal");
        while ((ch = input[this.cursor++]) !== delim) {
            if (this.cursor == input.length)throw this.newSyntaxError("Unterminated string literal");
            if (ch === "\\") {
                hasEscapes = !0;
                if (++this.cursor == input.length)throw this.newSyntaxError("Unterminated string literal")
            }
        }
        token.value = hasEscapes ? eval(input.substring(token.start, this.cursor)) : input.substring(token.start + 1, this.cursor - 1)
    },lexRegExp:function(ch) {
        var token = this.token,input = this.source;
        token.type = REGEXP;
        do{
            ch = input[this.cursor++];
            if (ch === "\\")this.cursor++; else if (ch === "[") {
                do{
                    if (ch === undefined)throw this.newSyntaxError("Unterminated character class");
                    ch === "\\" && this.cursor++,ch = input[this.cursor++]
                } while (ch !== "]")
            } else if (ch === undefined)throw this.newSyntaxError("Unterminated regex")
        } while (ch !== "/");
        do ch = input[this.cursor++]; while (ch >= "a" && ch <= "z");
        this.cursor--,token.value = eval(input.substring(token.start, this.cursor))
    },lexOp:function(a) {
        var b = this.token,c = this.source,d = opTokens[a],e = c[this.cursor];
        e in d && (d = d[e],this.cursor++,e = c[this.cursor],e in d && (d = d[e],this.cursor++,e = c[this.cursor]));
        var f = d.op;
        definitions.assignOps[f] && c[this.cursor] === "=" ? (this.cursor++,b.type = ASSIGN,b.assignOp = definitions.tokenIds[definitions.opTypeNames[f]],f += "=") : (b.type = definitions.tokenIds[definitions.opTypeNames[f]],b.assignOp = null),b.value = f
    },lexIdent:function(a) {
        var b = this.token,c = this.source;
        do a = c[this.cursor++]; while (a >= "a" && a <= "z" || a >= "A" && a <= "Z" || a >= "0" && a <= "9" || a === "$" || a === "_");
        this.cursor--;
        var d = c.substring(b.start, this.cursor);
        b.type = definitions.keywords[d] || IDENTIFIER,b.value = d
    },get:function(a) {
        var b;
        while (this.lookahead) {
            --this.lookahead,this.tokenIndex = this.tokenIndex + 1 & 3,b = this.tokens[this.tokenIndex];
            if (b.type !== NEWLINE || this.scanNewlines)return b.type
        }
        this.skip(),this.tokenIndex = this.tokenIndex + 1 & 3,b = this.tokens[this.tokenIndex],b || (this.tokens[this.tokenIndex] = b = {});
        var c = this.source;
        if (this.cursor === c.length)return b.type = END;
        b.start = this.cursor,b.lineno = this.lineno;
        var d = c[this.cursor++];
        if (d >= "a" && d <= "z" || d >= "A" && d <= "Z" || d === "$" || d === "_")this.lexIdent(d); else if (a && d === "/")this.lexRegExp(d); else if (d in opTokens)this.lexOp(d); else if (d === ".")this.lexDot(d); else if (d >= "1" && d <= "9")this.lexNumber(d); else if (d === "0")this.lexZeroNumber(d); else if (d === '"' || d === "'")this.lexString(d); else if (this.scanNewlines && d === "\n")b.type = NEWLINE,b.value = "\n",this.lineno++; else throw this.newSyntaxError("Illegal token");
        b.end = this.cursor;
        return b.type
    },unget:function() {
        if (++this.lookahead === 4)throw"PANIC: too much lookahead!";
        this.tokenIndex = this.tokenIndex - 1 & 3
    },newSyntaxError:function(a) {
        var b = new SyntaxError(a, this.filename, this.lineno);
        b.source = this.source,b.lineno = this.lineno,b.cursor = this.lookahead ? this.tokens[this.tokenIndex + this.lookahead & 3].start : this.cursor;
        return b
    }},exports.Tokenizer = Tokenizer
}),define("ace/narcissus/jsdefs", ["require","exports","module"], function(a, b, c) {
    function y(a) {
        this.elts = a || null
    }

    function x() {
        this.table = Object.create(null, {}),this.size = 0
    }

    function v() {
        return undefined
    }

    function u(a) {
        return{getOwnPropertyDescriptor:function(b) {
            var c = Object.getOwnPropertyDescriptor(a, b);
            c.configurable = !0;
            return c
        },getPropertyDescriptor:function(b) {
            var c = s(a, b);
            c.configurable = !0;
            return c
        },getOwnPropertyNames:function() {
            return Object.getOwnPropertyNames(a)
        },defineProperty:function(b, c) {
            Object.defineProperty(a, b, c)
        },"delete":function(b) {
            return delete a[b]
        },fix:function() {
            return Object.isFrozen(a) ? t(a) : undefined
        },has:function(b) {
            return b in a
        },hasOwn:function(b) {
            return{}.hasOwnProperty.call(a, b)
        },get:function(b, c) {
            return a[c]
        },set:function(b, c, d) {
            a[c] = d;
            return!0
        },enumerate:function() {
            var b = [];
            for (m in a)b.push(m);
            return b
        },keys:function() {
            return Object.keys(a)
        }}
    }

    function t(a) {
        var b = {};
        for (var c in Object.getOwnPropertyNames(a))b[c] = Object.getOwnPropertyDescriptor(a, c);
        return b
    }

    function s(a, b) {
        while (a) {
            if ({}.hasOwnProperty.call(a, b))return Object.getOwnPropertyDescriptor(a, b);
            a = Object.getPrototypeOf(a)
        }
    }

    function r(a) {
        return typeof a == "function" && a.toString().match(/\[native code\]/)
    }

    function q(a, b, c, d, e, f) {
        Object.defineProperty(a, b, {value:c,writable:!e,configurable:!d,enumerable:!f})
    }

    function p(a, b, c, d, e) {
        Object.defineProperty(a, b, {get:c,configurable:!d,enumerable:!e})
    }

    b.options = {version:185},function() {
        b.hostGlobal = this
    }();
    var d = ["END","\n",";",",","=","?",":","CONDITIONAL","||","&&","|","^","&","==","!=","===","!==","<","<=",">=",">","<<",">>",">>>","+","-","*","/","%","!","~","UNARY_PLUS","UNARY_MINUS","++","--",".","[","]","{","}","(",")","SCRIPT","BLOCK","LABEL","FOR_IN","CALL","NEW_WITH_ARGS","INDEX","ARRAY_INIT","OBJECT_INIT","PROPERTY_INIT","GETTER","SETTER","GROUP","LIST","LET_BLOCK","ARRAY_COMP","GENERATOR","COMP_TAIL","IDENTIFIER","NUMBER","STRING","REGEXP","break","case","catch","const","continue","debugger","default","delete","do","else","false","finally","for","function","if","in","instanceof","let","new","null","return","switch","this","throw","true","try","typeof","var","void","yield","while","with"],e = ["break","const","continue","debugger","do","for","if","return","switch","throw","try","var","yield","while","with"],f = {"\n":"NEWLINE",";":"SEMICOLON",",":"COMMA","?":"HOOK",":":"COLON","||":"OR","&&":"AND","|":"BITWISE_OR","^":"BITWISE_XOR","&":"BITWISE_AND","===":"STRICT_EQ","==":"EQ","=":"ASSIGN","!==":"STRICT_NE","!=":"NE","<<":"LSH","<=":"LE","<":"LT",">>>":"URSH",">>":"RSH",">=":"GE",">":"GT","++":"INCREMENT","--":"DECREMENT","+":"PLUS","-":"MINUS","*":"MUL","/":"DIV","%":"MOD","!":"NOT","~":"BITWISE_NOT",".":"DOT","[":"LEFT_BRACKET","]":"RIGHT_BRACKET","{":"LEFT_CURLY","}":"RIGHT_CURLY","(":"LEFT_PAREN",")":"RIGHT_PAREN"},g = {"__proto__":null},h = {},i = "const ";
    for (var j = 0,k = d.length; j < k; j++) {
        j > 0 && (i += ", ");
        var l = d[j],m;
        /^[a-z]/.test(l) ? (m = l.toUpperCase(),g[l] = j) : m = /^\W/.test(l) ? f[l] : l,i += m + " = " + j,h[m] = j,d[l] = j
    }
    i += ";";
    var n = {"__proto__":null};
    for (j = 0,k = e.length; j < k; j++)n[g[e[j]]] = !0;
    var o = ["|","^","&","<<",">>",">>>","+","-","*","/","%"];
    for (j = 0,k = o.length; j < k; j++)l = o[j],o[l] = d[l];
    var w = {}.hasOwnProperty;
    x.prototype = {has:function(a) {
        return w.call(this.table, a)
    },set:function(a, b) {
        w.call(this.table, a) || this.size++,this.table[a] = b
    },get:function(a) {
        return this.table[a]
    },getDef:function(a, b) {
        w.call(this.table, a) || (this.size++,this.table[a] = b());
        return this.table[a]
    },forEach:function(a) {
        var b = this.table;
        for (var c in b)a.call(this, c, b[c])
    },toString:function() {
        return"[object StringMap]"
    }},y.prototype = {push:function(a) {
        return new y({top:a,rest:this.elts})
    },top:function() {
        if (!this.elts)throw new Error("empty stack");
        return this.elts.top
    },isEmpty:function() {
        return this.top === null
    },find:function(a) {
        for (var b = this.elts; b; b = b.rest)if (a(b.top))return b.top;
        return null
    },has:function(a) {
        return Boolean(this.find(function(b) {
            return b === a
        }))
    },forEach:function(a) {
        for (var b = this.elts; b; b = b.rest)a(b.top)
    }},b.tokens = d,b.opTypeNames = f,b.keywords = g,b.isStatementStartCode = n,b.tokenIds = h,b.consts = i,b.assignOps = o,b.defineGetter = p,b.defineProperty = q,b.isNativeCode = r,b.makePassthruHandler = u,b.noPropFound = v,b.StringMap = x,b.Stack = y
})