/* jumly-0.1.5-2 2014-03-12T14:04:24Z */
(function() {
    var JUMLY, core, exported, self, __indexOf = [].indexOf || function(item) {
        for (var i = 0, l = this.length; l > i; i++)
            if (i in this && this[i] === item) return i;
        return -1
    };
    core = {}, core._to_id = function(that) {
        return that.constructor === jQuery ? that.attr("id") : that.toLowerCase().replace(/[^a-zA-Z0-9_]/g, "-")
    }, core._to_ref = function(s) {
        return s.match(/^[0-9].*/) ? "_" + s : s.replace(/^[0-9]|-/g, "_")
    }, core.kindof = function(that) {
        var ctor, toName;
        return null === that ? "Null" : void 0 === that ? "Undefined" : (ctor = that.constructor, toName = function(f) {
            return __indexOf.call(f, "name") >= 0 ? f.name : ("" + f).replace(/^function\s+([^\(]*)[\S\s]+$/im, "$1")
        }, "function" == typeof ctor ? toName(ctor) : tc)
    }, core._normalize = function(that) {
        var a, id, it, keys, mods, name, p;
        switch (core.kindof(that)) {
            case "String":
                return {
                    id: core._to_id(that),
                    name: that
                };
            case "Object":
                break;
            default:
                if (that && that.constructor === jQuery) return id = core._to_id(that), name = that.find(".name"), null != id || name.length > 0 ? {
                    id: id,
                    name: name.html() ? name.html() : void 0
                } : void 0;
                throw console.error("Cannot recognize kind:", that), new Error("Cannot recognize kind: '" + core.kindof(that) + "'")
        }
        if (keys = function() {
                var _results;
                _results = [];
                for (p in that) _results.push(p);
                return _results
            }(), keys.length > 1) return that;
        if (id = keys[0], it = that[keys[0]], "String" === core.kindof(it)) return {
            id: id,
            name: it
        };
        if (keys = function() {
                var _results;
                _results = [];
                for (p in it) _results.push(p);
                return _results
            }(), keys.length > 1) return $.extend({}, it, {
            id: core._to_id(id),
            name: id
        });
        switch (name = keys[0], mods = it[keys[0]], core.kindof(mods)) {
            case "Object":
                return $.extend({
                    id: id,
                    name: name
                }, mods);
            case "Array":
            case "Function":
                return a = {
                    id: core._to_id(id),
                    name: id
                }, a[name] = mods, a
        }
    }, core.env = {
        is_node: "undefined" != typeof module && "undefined" != typeof module.exports
    }, JUMLY = {
        env: core.env
    }, self = {}, core.env.is_node ? (global.JUMLY = JUMLY, module.exports = core, self.require = JUMLY.require = require) : (window.JUMLY = JUMLY, exported = {
        core: core,
        "node-jquery": {},
        "./jasmine-matchers": {}
    }, JUMLY.require = function(name) {
        if (void 0 === name || null === name) throw new Error("" + name + " was not properly given");
        return exported[name] || console.warn("not found:", name), exported[name]
    }, self.require = JUMLY.require, core.exports = function(func, name) {
        return exported[func.name || name] = func
    }), core.env.is_node || $(window).on("DOMContentLoaded", function() {
        return JUMLY.scan()
    })
}).call(this),
    function() {
        var SVG_NS, core, g2d, self, to_polar_from_cartesian;
        to_polar_from_cartesian = function(src, dst) {
            var dx, dy;
            return dx = dst.left - src.left, dy = dst.top - src.top, {
                offset: {
                    left: src.left,
                    top: src.top
                },
                radius: Math.sqrt(dx * dx + dy * dy),
                declination: Math.atan(dy / dx),
                quadrants: {
                    x: 0 !== dx ? dx / Math.abs(dx) : 1,
                    y: 0 !== dy ? dy / Math.abs(dy) : 1
                }
            }
        }, self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, SVG_NS = "http://www.w3.org/2000/svg", g2d = {
            svg: {
                create: function(tagname) {
                    return "undefined" == typeof document ? $("<" + tagname + ">")[0] : document.createElementNS(SVG_NS, tagname)
                },
                attrs: function(n, attrs) {
                    var p;
                    for (p in attrs) n.setAttribute(p, attrs[p]);
                    return n
                },
                "new": function(tagname, attrs) {
                    var e;
                    return e = this.create(tagname), this.attrs(e, attrs)
                }
            }
        }, core = self.require("core"), core.env.is_node ? module.exports = g2d : core.exports(g2d, "jquery.g2d")
    }.call(this),
    function() {
        var core, self, utils, _choose;
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, $.fn.outerBottom = function() {
            return this.offset().top + this.outerHeight() - 1
        }, _choose = function(nodes, ef, cmpf) {
            return $.map(nodes, ef).sort(cmpf)[0]
        }, utils = {
            max: function(nodes, ef) {
                return _choose(nodes, ef, function(a, b) {
                    return b - a
                })
            },
            min: function(nodes, ef) {
                return _choose(nodes, ef, function(a, b) {
                    return a - b
                })
            },
            mostLeftRight: function(objs, margin) {
                return {
                    left: this.min(objs, function(e) {
                        return $(e).offset().left - (margin ? parseInt($(e).css("margin-left")) : 0)
                    }),
                    right: this.max(objs, function(e) {
                        var t;
                        return t = $(e).offset().left + $(e).outerWidth() + (margin ? parseInt($(e).css("margin-right")) : 0), 0 > t - 1 ? 0 : t - 1
                    }),
                    width: function() {
                        return null != this.right && null != this.left ? this.right - this.left + 1 : 0
                    }
                }
            },
            mostTopBottom: function(objs, margin) {
                return {
                    top: this.min(objs, function(e) {
                        return $(e).offset().top - (margin ? parseInt($(e).css("margin-top")) : 0)
                    }),
                    bottom: this.max(objs, function(e) {
                        var t;
                        return t = $(e).offset().top + $(e).outerHeight() + (margin ? parseInt($(e).css("margin-bottom")) : 0), 0 > t - 1 ? 0 : t - 1
                    }),
                    height: function() {
                        return null != this.top && null != this.bottom ? this.bottom - this.top + 1 : 0
                    }
                }
            }
        }, core = self.require("core"), core.env.is_node ? module.exports = utils : core.exports(utils, "jquery.ext")
    }.call(this),
    function() {
        var HTMLElement, core, self;
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, HTMLElement = function() {
            function HTMLElement(args, f) {
                var cls, me, root;
                cls = HTMLElement.to_css_name(this.constructor.name), me = $.extend(this, root = $("<div>").addClass(cls)), "function" == typeof f && f(me), args && me.find(".name").text(args), me.data("_self", me)
            }
            return HTMLElement.to_css_name = function(s) {
                return (s.match(/Diagram$/) ? s.replace(/Diagram$/, "-Diagram") : s.match(/NoteElement/) ? s.replace(/Element$/, "") : s.replace(/^[A-Z][a-z]+/, "")).toLowerCase()
            }, HTMLElement
        }(), HTMLElement.prototype.preferred_width = function() {
            return this.find("> *:eq(0)").outerWidth()
        }, core = self.require("core"), core.env.is_node ? module.exports = HTMLElement : core.exports(HTMLElement)
    }.call(this),
    function() {
        var Diagram, HTMLElement, core, self, __hasProp = {}.hasOwnProperty,
            __extends = function(child, parent) {
                function ctor() {
                    this.constructor = child
                }
                for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
                return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
            };
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, HTMLElement = self.require("HTMLElement"), core = self.require("core"), Diagram = function(_super) {
            function Diagram() {
                Diagram.__super__.constructor.call(this), this.addClass("diagram")
            }
            return __extends(Diagram, _super), Diagram
        }(HTMLElement), Diagram.prototype._var = function(varname, e) {
            return eval("" + varname + " = e")
        }, Diagram.prototype._reg_by_ref = function(id, obj) {
            var exists, ref;
            if (exists = function(id) {
                    return $("#" + id).length > 0
                }, ref = core._to_ref(id), this[ref]) throw new Error("Already exists for '" + ref + "'");
            if (exists(id, this)) throw new Error("Element which has same ID(" + id + ") already exists in the document.");
            return this[ref] = obj, ref
        }, core.env.is_node ? module.exports = Diagram : core.exports(Diagram)
    }.call(this),
    function() {
        var CoffeeScript, DiagramBuilder, core, self;
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, DiagramBuilder = function() {
            function DiagramBuilder() {}
            return DiagramBuilder
        }(), core = self.require("core"), CoffeeScript = core.env.is_node ? require("coffee-script") : window.CoffeeScript, DiagramBuilder.prototype.build = function(script) {
            return function() {
                return eval(CoffeeScript.compile(script))
            }.apply(this, []), this._diagram
        }, DiagramBuilder.prototype.diagram = function() {
            return this._diagram
        }, DiagramBuilder.prototype._refer = function(ref, adv) {
            var id, r;
            return id = core._normalize(adv.by).id, this._diagram._reg_by_ref(id, ref), r = core._to_ref(id), this._diagram._var(r, ref)
        }, core.env.is_node ? module.exports = DiagramBuilder : core.exports(DiagramBuilder)
    }.call(this),
    function() {
        var DiagramLayout, core, self;
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, DiagramLayout = function() {
            function DiagramLayout() {}
            return DiagramLayout
        }(), DiagramLayout.prototype.layout = function(diagram) {
            return this.diagram = diagram, "function" == typeof this._layout ? this._layout() : void 0
        }, core = self.require("core"), core.env.is_node ? module.exports = DiagramLayout : core.exports(DiagramLayout)
    }.call(this),
    function() {
        var HorizontalSpacing, core, root, self;
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, HorizontalSpacing = function() {
            function HorizontalSpacing(a, b) {
                $.extend(this, $("<span>")), this.data("left", a), this.data("right", b), this.addClass("horizontal"), this.addClass("spacing")
            }
            return HorizontalSpacing
        }(), HorizontalSpacing.prototype.apply = function() {
            var a, b;
            return a = this.data("left").data("_self"), b = this.data("right").data("_self"), a.after(this), this.offset({
                left: a.offset().left + a.preferred_width(),
                top: a.offset().top
            }), b.offset({
                left: this.offset().left + this.outerWidth()
            })
        }, root = {
            HorizontalSpacing: HorizontalSpacing
        }, core = self.require("core"), core.env.is_node ? module.exports = root : core.exports(root, "HTMLElementLayout")
    }.call(this),
    function() {
        var HTMLElement, NoteElement, core, self, __hasProp = {}.hasOwnProperty,
            __extends = function(child, parent) {
                function ctor() {
                    this.constructor = child
                }
                for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
                return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
            };
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, HTMLElement = self.require("HTMLElement"), NoteElement = function(_super) {
            function NoteElement(args, attrs) {
                NoteElement.__super__.constructor.call(this, args, function(me) {
                    return me.append($("<div>").addClass("name"))
                }), attrs && this.css(attrs.css)
            }
            return __extends(NoteElement, _super), NoteElement
        }(HTMLElement), core = self.require("core"), core.env.is_node ? module.exports = NoteElement : core.exports(NoteElement)
    }.call(this),
    function() {
        var Position, PositionLeft, PositionLeftRight, PositionRightLeft, PositionTop, core, self, _ref, _ref1, _ref2, _ref3, __hasProp = {}.hasOwnProperty,
            __extends = function(child, parent) {
                function ctor() {
                    this.constructor = child
                }
                for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
                return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
            };
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, Position = function() {
            function Position(attrs) {
                this.attrs = attrs, this.div = $("<div>").addClass(this.attrs.css).css({
                    position: "absolute"
                })
            }
            return Position
        }(), Position.prototype._coordinate = function(target) {
            return this.attrs.coordinate ? this.attrs.coordinate.append(this.div) : target.after(this.div)
        }, PositionRightLeft = function(_super) {
            function PositionRightLeft() {
                return _ref = PositionRightLeft.__super__.constructor.apply(this, arguments)
            }
            return __extends(PositionRightLeft, _super), PositionRightLeft
        }(Position), PositionLeftRight = function(_super) {
            function PositionLeftRight() {
                return _ref1 = PositionLeftRight.__super__.constructor.apply(this, arguments)
            }
            return __extends(PositionLeftRight, _super), PositionLeftRight
        }(Position), PositionLeft = function(_super) {
            function PositionLeft() {
                return _ref2 = PositionLeft.__super__.constructor.apply(this, arguments)
            }
            return __extends(PositionLeft, _super), PositionLeft
        }(Position), PositionTop = function(_super) {
            function PositionTop() {
                return _ref3 = PositionTop.__super__.constructor.apply(this, arguments)
            }
            return __extends(PositionTop, _super), PositionTop
        }(Position), PositionRightLeft.prototype.apply = function() {
            var src;
            return src = this.attrs.src, this._coordinate(src), this.div.offset({
                left: src.offset().left + src.outerWidth()
            }), this.attrs.dst.offset({
                left: this.div.offset().left + this.div.outerWidth()
            })
        }, PositionLeftRight.prototype.apply = function() {
            var dst, src;
            return src = this.attrs.src, dst = this.attrs.dst, this._coordinate(src), this.div.offset({
                left: src.offset().left - this.div.outerWidth()
            }), this.attrs.dst.offset({
                left: this.div.offset().left - this.attrs.dst.outerWidth()
            })
        }, PositionLeft.prototype.apply = function() {
            var dst;
            return dst = this.attrs.dst, this._coordinate(dst), this.attrs.dst.offset({
                left: this.div.offset().left + this.div.outerWidth()
            })
        }, PositionTop.prototype.apply = function() {
            var dst;
            return dst = this.attrs.dst, this._coordinate(dst), this.attrs.dst.offset({
                top: this.div.offset().top + this.div.outerHeight()
            })
        }, Position.RightLeft = PositionRightLeft, Position.LeftRight = PositionLeftRight, Position.Left = PositionLeft, Position.Top = PositionTop, core = self.require("core"), core.env.is_node ? module.exports = Position : core.exports(Position)
    }.call(this),
    function() {
        var HTMLElement, MESSAGE_STYLE, Relationship, core, cssAsInt, g2d, self, __hasProp = {}.hasOwnProperty,
            __extends = function(child, parent) {
                function ctor() {
                    this.constructor = child
                }
                for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
                return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
            };
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, HTMLElement = self.require("HTMLElement"), g2d = self.require("jquery.g2d"), Relationship = function(_super) {
            function Relationship(args, opts) {
                this.src = opts.src, this.dst = opts.dst, Relationship.__super__.constructor.call(this, args, function(me) {
                    var svg;
                    return me.addClass("relationship").append(svg = $("<svg width='0' height='0'>").addClass("icon")).append($("<div>").addClass("name")), svg[0].appendChild(g2d.svg.create("line")), me
                })
            }
            return __extends(Relationship, _super), Relationship
        }(HTMLElement), MESSAGE_STYLE = {
            width: 1,
            base: 6,
            height: 10,
            lineWidth: 1.5,
            shape: "dashed",
            pattern: [8, 8],
            strokeStyle: "gray",
            fillStyle: "gray",
            lineJoin: "round"
        }, Math.sign = function(x) {
            return 0 === x ? 0 : x > 0 ? 1 : -1
        }, cssAsInt = function(node, name) {
            var a;
            return a = node.css(name), a ? parseInt(a) : 0
        }, Relationship.prototype._point = function(obj) {
            var dh, dv, margin_left, margin_top, s;
            return margin_left = cssAsInt($("body"), "margin-left"), margin_top = cssAsInt($("body"), "margin-top"), s = obj.offset(), dh = -cssAsInt(obj, "margin-left") - margin_left, dv = -cssAsInt(obj, "margin-top") - margin_top, {
                left: s.left + obj.outerWidth() / 2 + dh,
                top: s.top + obj.outerHeight() / 2 + dv
            }
        }, Relationship.prototype._rect = function(p, q) {
            var a, b, h, hs, l, vs, w;
            return a = {
                left: Math.min(p.left, q.left),
                top: Math.min(p.top, q.top)
            }, b = {
                left: Math.max(p.left, q.left),
                top: Math.max(p.top, q.top)
            }, w = b.left - a.left + 1, h = b.top - a.top + 1, hs = Math.sign(q.left - p.left), vs = Math.sign(q.top - p.top), l = Math.sqrt(w * w + h * h), {
                left: a.left,
                top: a.top,
                width: w,
                height: h,
                hsign: hs,
                vsign: vs,
                hunit: hs * w / l,
                vunit: vs * h / l
            }
        }, Relationship.prototype.render = function() {
            var aa, bb, cc, cr, dd, p, q, r, s, t;
            return p = this._point(this.src), q = this._point(this.dst), r = this._rect(p, q), cr = 2, aa = r.hunit * this.dst.outerWidth() / cr, bb = r.vunit * this.dst.outerHeight() / cr, cc = r.hunit * this.src.outerWidth() / cr, dd = r.vunit * this.src.outerHeight() / cr, s = {
                x: p.left - r.left + cc,
                y: p.top - r.top + dd
            }, t = {
                x: q.left - r.left - aa,
                y: q.top - r.top - bb
            }, this.width(r.width), this.height(r.height), this.offset({
                left: r.left,
                top: r.top
            }), this.find("svg").attr({
                width: r.width,
                height: r.height
            }).find("line").attr({
                x1: s.x,
                y1: s.y,
                x2: t.x,
                y2: t.y
            })
        }, core = self.require("core"), core.env.is_node ? module.exports = Relationship : core.exports(Relationship)
    }.call(this),
    function() {
        var HTMLElement, SequenceLifeline, core, self, __hasProp = {}.hasOwnProperty,
            __extends = function(child, parent) {
                function ctor() {
                    this.constructor = child
                }
                for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
                return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
            };
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, HTMLElement = self.require("HTMLElement"), SequenceLifeline = function(_super) {
            function SequenceLifeline(_object) {
                this._object = _object, self = this, SequenceLifeline.__super__.constructor.call(this, null, function(me) {
                    return me.append($("<div>").addClass("line")).width(self._object.width())
                })
            }
            return __extends(SequenceLifeline, _super), SequenceLifeline
        }(HTMLElement), core = self.require("core"), core.env.is_node ? module.exports = SequenceLifeline : core.exports(SequenceLifeline)
    }.call(this),
    function() {
        var HTMLElement, MESSAGE_STYLE, STEREOTYPE_STYLES, SequenceMessage, ahead, core, g2d, self, to_points, _determine_primary_stereotype, _g2d, __hasProp = {}.hasOwnProperty,
            __extends = function(child, parent) {
                function ctor() {
                    this.constructor = child
                }
                for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
                return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
            };
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, HTMLElement = self.require("HTMLElement"), SequenceMessage = function(_super) {
            function SequenceMessage(_iact, _actee) {
                this._iact = _iact, this._actee = _actee, SequenceMessage.__super__.constructor.call(this, null, function(me) {
                    return me.append($("<svg class='arrow' width='0' height='0'>")).append($("<div>").addClass("name"))
                })
            }
            return __extends(SequenceMessage, _super), SequenceMessage
        }(HTMLElement), SequenceMessage.prototype._lineToNextOccurr = function(svg) {
            var dstll, srcll;
            return srcll = this._srcOccurr(), dstll = this._dstOccurr(), this._toLine(srcll, dstll, svg)
        }, SequenceMessage.prototype._toLine = function(src, dst, svg) {
            var e, y;
            return e = !this.parent().hasClass("lost") && this.isTowardLeft() ? {
                src: {
                    x: src.offset().left - this.offset().left
                },
                dst: {
                    x: dst.outerWidth()
                }
            } : {
                src: {
                    x: src.outerWidth()
                },
                dst: {
                    x: dst.offset().left - src.offset().left
                }
            }, y = svg.outerHeight() / 2, e.src.y = y, e.dst.y = y, e
        }, SequenceMessage.prototype._srcOccurr = function() {
            return this.parents(".occurrence:eq(0)").self()
        }, SequenceMessage.prototype._dstOccurr = function() {
            return (this.hasClass("return") ? this.prev(".occurrence") : $("~ .occurrence", this)).self()
        }, SequenceMessage.prototype._prefferedCanvas = function() {
            return this.find("svg:eq(0)").attr({
                width: this.width(),
                height: this.height()
            })
        }, SequenceMessage.prototype._toCreateLine = function(svg) {
            var e, outerRight, src;
            return e = this._toLine(this._srcOccurr(), this._dstOccurr()._actor, svg), this.isTowardLeft() && (src = this._srcOccurr(), outerRight = function(it) {
                return it.offset().left + it.outerWidth()
            }, e.dst.x = outerRight(src._actor) - src.offset().left), e
        }, SequenceMessage.prototype._findOccurr = function(actee) {
            var occurr;
            return occurr = null, this.parents(".occurrence").each(function(i, e) {
                return e = $(e).data("_self"), e._actor === actee ? occurr = e : void 0
            }), occurr
        }, MESSAGE_STYLE = {
            width: 1,
            base: 6,
            height: 10,
            lineWidth: 1.5,
            shape: "line2",
            pattern: [8, 8],
            strokeStyle: "gray",
            fillStyle: "gray"
        }, STEREOTYPE_STYLES = {
            create: {
                shape: "dashed"
            },
            asynchronous: {
                shape: "line"
            },
            synchronous: {
                shape: "line2",
                fillStyle: "gray"
            },
            destroy: {
                shape: "line2",
                fillStyle: "gray"
            }
        }, _determine_primary_stereotype = function(jqnode) {
            var e, _i, _len, _ref;
            for (_ref = ["create", "asynchronous", "synchronous", "destroy"], _i = 0, _len = _ref.length; _len > _i; _i++)
                if (e = _ref[_i], jqnode.hasClass(e)) return e
        }, to_points = function(vals) {
            return vals.map(function(e) {
                return "" + e[0] + "," + e[1]
            }).join(" ")
        }, _g2d = self.require("jquery.g2d"), ahead = function(svg, sign, q) {
            var dx, dy, e;
            return dx = 10 * sign, dy = 6, e = _g2d.svg["new"]("polyline", {
                "class": "head",
                points: to_points([
                    [q.x + dx, q.y - dy],
                    [q.x, q.y],
                    [q.x + dx, q.y + dy]
                ])
            }), svg.appendChild(e), e = _g2d.svg["new"]("polyline", {
                "class": "closed",
                points: to_points([
                    [q.x + dx, q.y + (dy + 1)],
                    [q.x + dx, q.y - (dy + 1)]
                ])
            }), svg.appendChild(e)
        }, g2d = {
            arrow: function(svg, p, q) {
                var e;
                return e = _g2d.svg["new"]("line", {
                    x1: p.x,
                    y1: p.y,
                    x2: q.x,
                    y2: q.y
                }), svg[0].appendChild(e), ahead(svg[0], -1 * Math.sign(q.x - p.x), q)
            }
        }, SequenceMessage.prototype.repaint = function() {
            var a, arrow, e, gap, line, llw, newdst, newsrc, rcx, rey, shape, svg;
            return shape = STEREOTYPE_STYLES[_determine_primary_stereotype(this)], arrow = jQuery.extend({}, MESSAGE_STYLE, shape), svg = this._prefferedCanvas(), this.hasClass("self") ? (gap = 2, rcx = this.width() - (gap + 4), rey = this.height() - (arrow.height / 2 + 4), llw = this._dstOccurr().outerWidth(), e = _g2d.svg["new"]("polyline", {
                points: to_points([
                    [llw / 2 + gap, gap],
                    [rcx, gap],
                    [rcx, rey],
                    [llw + gap, rey]
                ])
            }), svg[0].appendChild(e), ahead(svg[0], 1, {
                x: llw + gap,
                y: rey
            }), this) : (this.hasClass("create") ? line = this._toCreateLine(svg) : this._actee ? (newsrc = this._findOccurr(this._actee), newdst = this._dstOccurr(), line = this._toLine(newsrc, newdst, svg)) : line = this._lineToNextOccurr(svg), this.hasClass("reverse") && (a = line.src, line.src = line.dst, line.dst = a, arrow.shape = "dashed"), g2d.arrow(svg, line.src, line.dst, arrow), this)
        }, SequenceMessage.prototype.isToward = function(dir) {
            var actee, actor;
            return actor = this._iact._actor._actor, actee = this._iact._actee._actor, "right" === dir ? actor.isLeftAt(actee) : "left" === dir ? actor.isRightAt(actee) : void 0
        }, SequenceMessage.prototype.isTowardRight = function() {
            return this.isToward("right")
        }, SequenceMessage.prototype.isTowardLeft = function() {
            return this.isToward("left")
        }, SequenceMessage.prototype._to_be_creation = function() {
            var dst, line_width, shift_downward, src;
            return src = this._srcOccurr(), dst = this._dstOccurr(), line_width = function(msg) {
                var l;
                return l = msg._toLine(src, dst._actor, msg), Math.abs(l.src.x - l.dst.x)
            }, shift_downward = function(msg) {
                var mt, obj;
                return obj = dst._actor, obj.offset({
                    top: msg.offset().top - obj.height() / 3
                }), mt = parseInt(dst.css("margin-top")), dst.offset({
                    top: obj.outerBottom() + mt
                })
            }, this.outerWidth(line_width(this) + src.outerWidth() - 1), shift_downward(this)
        }, core = self.require("core"), core.env.is_node ? module.exports = SequenceMessage : core.exports(SequenceMessage)
    }.call(this),
    function() {
        var HTMLElement, SequenceInteraction, SequenceMessage, core, self, __hasProp = {}.hasOwnProperty,
            __extends = function(child, parent) {
                function ctor() {
                    this.constructor = child
                }
                for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
                return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
            };
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, HTMLElement = self.require("HTMLElement"), SequenceInteraction = function(_super) {
            function SequenceInteraction(_actor, _actee) {
                this._actor = _actor, this._actee = _actee, self = this, SequenceInteraction.__super__.constructor.call(this, null, function(me) {
                    return me.append(new SequenceMessage(self))
                })
            }
            return __extends(SequenceInteraction, _super), SequenceInteraction
        }(HTMLElement), SequenceInteraction.prototype.interact = function(obj) {
            return this.awayfrom().interact(obj)
        }, SequenceInteraction.prototype.forward = function() {
            return this.toward()
        }, SequenceInteraction.prototype.to = function(func) {
            var occurrs, tee, tor;
            return occurrs = this.gives(".occurrence"), tee = occurrs.as(".actee"), tor = occurrs.as(".actor"), func(tee, tor)
        }, SequenceInteraction.prototype.forwardTo = function() {
            return this.gives(".occurrence").as(".actee")
        }, SequenceInteraction.prototype.backwardTo = function() {
            return this.gives(".occurrence").as(".actor")
        }, SequenceInteraction.prototype.toward = function() {
            return this.forwardTo()
        }, SequenceInteraction.prototype.awayfrom = function(obj) {
            var e, _i, _len, _ref;
            if (!obj) return this.backwardTo();
            for (_ref = this.parents(".occurrence").not(".activated"), _i = 0, _len = _ref.length; _len > _i; _i++)
                if (e = _ref[_i], e = $(e).self(), (null != e ? e.gives(".participant") : void 0) === obj) return e;
            return obj.activate()
        }, SequenceInteraction.prototype._compose_ = function() {
            var actee, dst, errmsg, msg, newdst, rmsg, src, that, w, x;
            if (that = this, src = this._actor, dst = this._actee, msg = that.find("> .message").data("_self"), this.isToSelf()) return void this._buildSelfInvocation(src, dst, msg);
            if (w = src.offset().left - (dst.offset().left + $(".occurrence:eq(0)", that).width()), this.hasClass("lost") ? msg.height(dst.outerHeight()) : msg.isTowardLeft() && (w = dst.offset().left - (src.offset().left + $(".occurrence:eq(0)", that).width())), msg.width(Math.abs(w)).offset({
                    left: Math.min(src.offset().left, dst.offset().left)
                }).repaint(), rmsg = $("> .message.return:last", that).data("_self")) {
                if (x = msg.offset().left, actee = rmsg._actee) {
                    if (newdst = rmsg._findOccurr(actee), !newdst) throw errmsg = "SemanticError: it wasn't able to reply back to '" + actee.find(".name").text() + "' which is missing", new Error(errmsg);
                    w = dst.offset().left - newdst.offset().left, x = Math.min(dst.offset().left, newdst.offset().left)
                }
                return rmsg.width(Math.abs(w)).offset({
                    left: x
                }).addClass("reverse").repaint()
            }
        }, SequenceInteraction.prototype._buildSelfInvocation = function(a, b, msg) {
            var arrow, dx, dy, w;
            return w = this.find(".occurrence:eq(0)").outerWidth(), dx = 2 * w, dy = 1 * w, b.css({
                top: 0 + dy
            }), this.css({
                "padding-bottom": dy
            }), msg.css({
                top: 0
            }).width(b.width() + dx).height(b.offset().top - msg.offset().top + dy + w / 8).offset({
                left: b.offset().left
            }), msg.addClass("self"), msg.repaint(), arrow = msg.find(".arrow"), msg.find(".name").offset({
                left: arrow.offset().left + arrow.outerWidth(),
                top: arrow.offset().top
            })
        }, SequenceMessage = self.require("SequenceMessage"), SequenceInteraction.prototype.reply = function(p) {
            var a, name;
            return this.addClass("reply"), a = new SequenceMessage(this, null != p ? p[".actee"] : void 0).addClass("return").insertAfter(this.children(".occurrence:eq(0)")), name = function(it) {
                return (null != it ? it.name : void 0) ? it.name : $(p).find(".name:eq(0)").text()
            }, $(a).find(".name:eq(0)").text(name(p)), this
        }, SequenceInteraction.prototype.fragment = function() {
            var SequenceFragment, frag;
            return SequenceFragment = self.require("SequenceFragment"), frag = new SequenceFragment, frag.enclose(this)
        }, SequenceInteraction.prototype.isToSelf = function() {
            var a, b;
            return a = this._actor, b = this._actee, a && b ? a._actor === b._actor : !1
        }, SequenceInteraction.prototype.is_to_itself = function() {
            return this.isToSelf()
        }, core = self.require("core"), core.env.is_node ? module.exports = SequenceInteraction : core.exports(SequenceInteraction)
    }.call(this),
    function() {
        var HTMLElement, SequenceInteraction, SequenceOccurrence, core, self, utils, __hasProp = {}.hasOwnProperty,
            __extends = function(child, parent) {
                function ctor() {
                    this.constructor = child
                }
                for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
                return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
            };
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, HTMLElement = self.require("HTMLElement"), utils = self.require("jquery.ext"), SequenceOccurrence = function(_super) {
            function SequenceOccurrence(_actor) {
                this._actor = _actor, SequenceOccurrence.__super__.constructor.call(this)
            }
            return __extends(SequenceOccurrence, _super), SequenceOccurrence
        }(HTMLElement), core = self.require("core"), SequenceInteraction = self.require("SequenceInteraction"), SequenceOccurrence.prototype.interact = function(actor, acts) {
            var SequenceFragment, alt, iact, occurr;
            if (".lost" === (null != acts ? acts.stereotype : void 0)) occurr = (new SequenceOccurrence).addClass("icon"), iact = new SequenceInteraction(this, occurr), iact.addClass("lost");
            else if (".destroy" === (null != acts ? acts.stereotype : void 0));
            else {
                if (".alt" === (null != actor ? actor.stereotype : void 0)) return SequenceFragment = self.require("SequenceFragment"), alt = new SequenceFragment("alt"), alt.alter(this, acts), this;
                occurr = new SequenceOccurrence(actor), iact = new SequenceInteraction(this, occurr)
            }
            return actor === iact._actor._actor && iact.addClass("self"), iact.append(occurr).appendTo(this), iact
        }, SequenceOccurrence.prototype.create = function(objsrc) {
            var SequenceParticipant, iact, obj;
            return SequenceParticipant = self.require("SequenceParticipant"), obj = new SequenceParticipant(objsrc.name).addClass("created-by"), this._actor.parent().append(obj), iact = this.interact(obj).addClass("creating").find(".message").addClass("create").end()
        }, SequenceOccurrence.prototype._move_horizontally = function() {
            var left;
            return this.parent().hasClass("lost") ? (offset({
                left: utils.mostLeftRight(this.parents(".diagram").find(".participant")).right
            }), this) : (left = this.is_on_another() ? this._parent_occurr().offset().left : this._actor.offset().left + (this._actor.preferred_width() - this.width()) / 2, left += this.width() * this._shift_to_parent() / 2, this.offset({
                left: left
            }))
        }, SequenceOccurrence.prototype.is_on_another = function() {
            return !(null === this._parent_occurr())
        }, SequenceOccurrence.prototype._parent_occurr = function() {
            var i, occurrs, _i, _ref;
            if (occurrs = this.parents(".occurrence"), 0 === occurrs.length) return null;
            for (i = _i = 0, _ref = occurrs.length - 1; _ref >= 0 ? _ref >= _i : _i >= _ref; i = _ref >= 0 ? ++_i : --_i)
                if (this._actor === $(occurrs[i]).data("_self")._actor) return $(occurrs[i]).data("_self");
            return null
        }, SequenceOccurrence.prototype._shift_to_parent = function() {
            var a;
            return this.is_on_another() ? (a = this.parent().find(".message:eq(0)").data("_self"), void 0 === a ? 0 : a.isTowardRight() ? -1 : a.isTowardLeft() ? 1 : 1) : 0
        }, SequenceOccurrence.prototype.preceding = function(obj) {
            var f;
            return (f = function(ll) {
                var a;
                return a = jumly(ll.parents(".occurrence:eq(0)"))[0], a ? a.gives(".participant") === obj ? a : f(a) : null
            })(this)
        }, SequenceOccurrence.prototype.destroy = function(actee) {
            var occur;
            return occur = this.interact(actee).data("_self")._actee, occur.is_on_another() && (occur = occur._parent_occurr()), $("<div>").addClass("stop").append($("<div>").addClass("icon").addClass("square").addClass("cross")).insertAfter(occur), occur
        }, core.env.is_node ? module.exports = SequenceOccurrence : core.exports(SequenceOccurrence)
    }.call(this),
    function() {
        var HTMLElement, SequenceInteraction, SequenceOccurrence, SequenceParticipant, core, self, __hasProp = {}.hasOwnProperty,
            __extends = function(child, parent) {
                function ctor() {
                    this.constructor = child
                }
                for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
                return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
            };
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, HTMLElement = self.require("HTMLElement"), SequenceParticipant = function(_super) {
            function SequenceParticipant(args) {
                SequenceParticipant.__super__.constructor.call(this, args, function(me) {
                    return me.append($("<div>").addClass("name"))
                })
            }
            return __extends(SequenceParticipant, _super), SequenceParticipant
        }(HTMLElement), core = self.require("core"), SequenceOccurrence = self.require("SequenceOccurrence"), SequenceInteraction = self.require("SequenceInteraction"), SequenceParticipant.prototype.activate = function() {
            var iact, occurr;
            return occurr = new SequenceOccurrence(this), iact = new SequenceInteraction(null, occurr), iact.addClass("activated"), iact.find(".message").remove(), iact.append(occurr), this.parent().append(iact), occurr
        }, SequenceParticipant.prototype.isLeftAt = function(a) {
            return this.offset().left < a.offset().left
        }, SequenceParticipant.prototype.isRightAt = function(a) {
            return a.offset().left + a.width() < this.offset().left
        }, SequenceParticipant.prototype.iconify = function(fixture, styles) {
            var canvas, container, render, size, _ref, _this = this;
            return "function" != typeof fixture && (fixture = $.jumly.icon["." + fixture] || $.jumly.icon[".actor"]), canvas = $("<canvas>").addClass("icon"), container = $("<div>").addClass("icon-container"), this.addClass("iconified").prepend(container.append(canvas)), _ref = fixture(canvas[0], styles), size = _ref.size, styles = _ref.styles, container.css({
                height: size.height
            }), render = function() {
                var name;
                return name = _this.find(".name"), styles.fillStyle = name.css("background-color"), styles.strokeStyle = name.css("border-top-color"), fixture(canvas[0], styles)
            }, this.renderIcon = function() {
                return render()
            }, this
        }, SequenceParticipant.prototype.lost = function() {
            return this.activate().interact(null, {
                stereotype: ".lost"
            })
        }, core.env.is_node ? module.exports = SequenceParticipant : core.exports(SequenceParticipant)
    }.call(this),
    function() {
        var HTMLElement, SequenceFragment, core, self, __hasProp = {}.hasOwnProperty,
            __extends = function(child, parent) {
                function ctor() {
                    this.constructor = child
                }
                for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
                return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
            };
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, HTMLElement = self.require("HTMLElement"), SequenceFragment = function(_super) {
            function SequenceFragment(args) {
                SequenceFragment.__super__.constructor.call(this, args, function(me) {
                    return me.append($("<div>").addClass("header").append($("<div>").addClass("name")).append($("<div>").addClass("condition")))
                })
            }
            return __extends(SequenceFragment, _super), SequenceFragment
        }(HTMLElement), SequenceFragment.prototype.enclose = function(_) {
            var a, b, i, _i, _ref;
            if (null == _ || 0 === _.length) throw "SequenceFragment::enclose arguments are empty.";
            if (_.length > 1)
                for (a = $(_[0]).parent()[0], i = _i = 1, _ref = _.length - 1; _ref >= 1 ? _ref >= _i : _i >= _ref; i = _ref >= 1 ? ++_i : --_i)
                    if (b = $(_[i]).parent()[0], a !== b) throw {
                        message: "different parent",
                        nodes: [a, b]
                    };
            return void 0 === _.parent ? this : (this.swallow(_), this)
        }, SequenceFragment.prototype.alter = function(occurr, acts) {
            var alt, name, nodes;
            alt = this, alt.addClass("alt").find(".condition").remove(), occurr.append(alt);
            for (name in acts) nodes = acts[name](), 0 !== nodes.length && (alt.append($("<div>").addClass("condition").html(name)), alt.append(nodes), alt.append($("<div>").addClass("divider")));
            return alt.find(".divider:last").remove(), alt
        }, core = self.require("core"), core.env.is_node ? module.exports = SequenceFragment : core.exports(SequenceFragment)
    }.call(this),
    function() {
        var HTMLElement, SequenceRef, core, self, utils, __hasProp = {}.hasOwnProperty,
            __extends = function(child, parent) {
                function ctor() {
                    this.constructor = child
                }
                for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
                return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
            };
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, HTMLElement = self.require("HTMLElement"), utils = self.require("jquery.ext"), SequenceRef = function(_super) {
            function SequenceRef(args) {
                SequenceRef.__super__.constructor.call(this, args, function(div) {
                    return div.append($("<div>").addClass("header").append($("<div>").addClass("tag").html("ref"))).append($("<div>").addClass("name"))
                })
            }
            return __extends(SequenceRef, _super), SequenceRef
        }(HTMLElement), SequenceRef.prototype.preferred_left_and_width = function() {
            var alt, d, dh, diag, dl, iact, it, l, left, lines, most, objs, occurr, occurs, r, right, w;
            return occurr = this.parents(".occurrence:eq(0)"), 1 === occurr.length ? (w = occurr.outerWidth(), right = occurr.offset().left + w, {
                left: right - w / 2
            }) : (diag = this.parents(".sequence-diagram:eq(0)"), iact = this.prevAll(".interaction:eq(0)"), 0 === iact.length ? (lines = $(".lifeline .line", diag), most = utils.mostLeftRight(lines), most.width = most.width(), most) : (objs = diag.find(".participant"), 0 === objs.length ? {} : 1 === objs.length ? (it = objs.filter(":eq(0)"), w = parseInt(this.css("min-width") || this.css("max-width") || this.css("width")), l = it.offset().left - (w - it.outerWidth()) / 2, (dl = l - it.offset().left) < 0 && (this.css({
                "margin-left": dl
            }), diag.css({
                "margin-left": -dl
            })), {
                left: "auto"
            }) : 1 === (alt = this.parents(".alt:eq(0)")).length ? (left = alt.parents(".occurrence"), l = left.offset().left + left.outerWidth() - 1, r = utils.max(this.parent().find(".occurrence"), function(e) {
                return $(e).offset().left + $(e).outerWidth() / 2
            }), d = left.outerWidth() / 2 - 1, {
                left: l - d,
                width: r - l
            }) : (dh = diag.self().find(".occurrence:eq(0)").width(), occurs = iact.find(".occurrence"), most = utils.mostLeftRight(occurs), most.left -= dh, most.width = most.width(), most)))
        }, core = self.require("core"), core.env.is_node ? module.exports = SequenceRef : core.exports(SequenceRef)
    }.call(this),
    function() {
        var Diagram, HTMLElement, SequenceDiagram, core, jumly, prefs_, self, __hasProp = {}.hasOwnProperty,
            __extends = function(child, parent) {
                function ctor() {
                    this.constructor = child
                }
                for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
                return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
            };
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, HTMLElement = self.require("HTMLElement"), jumly = $.jumly, jQuery.fn.swallow = function(_, f) {
            return f = f || jQuery.fn.append, 1 === _.length ? 0 === _.index() ? _.parent().prepend(this) : this.insertAfter(_.prev()) : 0 === _.index() ? this.prependTo($(_[0]).parent()) : this.insertBefore(_[0]), this.append(_.detach()), this
        }, Diagram = self.require("Diagram"), SequenceDiagram = function(_super) {
            function SequenceDiagram() {
                SequenceDiagram.__super__.constructor.call(this)
            }
            return __extends(SequenceDiagram, _super), SequenceDiagram
        }(Diagram), SequenceDiagram.prototype.gives = function(query) {
            var e, f;
            return e = this.find(query), f = jumly.lang._of(e, query), {
                of: f
            }
        }, prefs_ = {
            WIDTH: null,
            HEIGHT: 50
        }, SequenceDiagram.prototype.$ = function(sel) {
            return jumly($(sel, this))
        }, SequenceDiagram.prototype.$0 = function(typesel) {
            return this.$(typesel)[0]
        }, core = self.require("core"), core.env.is_node ? module.exports = SequenceDiagram : core.exports(SequenceDiagram)
    }.call(this),
    function() {
        var DiagramBuilder, NoteElement, SequenceDiagram, SequenceDiagramBuilder, SequenceFragment, SequenceParticipant, SequenceRef, core, self, __hasProp = {}.hasOwnProperty,
            __extends = function(child, parent) {
                function ctor() {
                    this.constructor = child
                }
                for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
                return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
            };
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, core = self.require("core"), DiagramBuilder = self.require("DiagramBuilder"), SequenceDiagram = self.require("SequenceDiagram"), SequenceParticipant = self.require("SequenceParticipant"), SequenceRef = self.require("SequenceRef"), SequenceFragment = self.require("SequenceFragment"), SequenceDiagramBuilder = function(_super) {
            function SequenceDiagramBuilder(_diagram, _occurr) {
                this._diagram = _diagram, this._occurr = _occurr, SequenceDiagramBuilder.__super__.constructor.call(this), null == this._diagram && (this._diagram = new SequenceDiagram)
            }
            return __extends(SequenceDiagramBuilder, _super), SequenceDiagramBuilder
        }(DiagramBuilder), SequenceDiagramBuilder.prototype._curr_occurr = function() {
            return this._occurr
        }, SequenceDiagramBuilder.prototype._curr_actor = function() {
            return this._occurr._actor
        }, SequenceDiagramBuilder.prototype.found = function(sth, callback) {
            var actor;
            return actor = this._find_or_create(sth), actor.addClass("found"), this._occurr = actor.activate(), null != callback && callback.apply(this, [this]), this._occurr = null, this
        }, SequenceDiagramBuilder.prototype._find_or_create = function(sth) {
            var a, obj, r;
            if (a = core._normalize(sth), r = core._to_ref(a.id), "function" == typeof this._diagram[r]) throw new Error("Reserved word '" + r + "'");
            if (this._diagram[r]) return this._diagram[r];
            switch (obj = new SequenceParticipant(sth), this._diagram._reg_by_ref(a.id, obj), this._diagram.append(obj), typeof sth) {
                case "string":
                    this._diagram._var(r, obj);
                    break;
                case "object":
                    this._diagram._var(core._to_ref(a.id), obj);
                    break;
                default:
                    throw console.error("It must be string or object for", eth), new Error("Unrecognized argument: " + e)
            }
            return obj
        }, SequenceDiagramBuilder.prototype.message = function(a, b, c) {
            var actee, actname, callback, e, iact, it, msg, norm, stereotype;
            if (actname = a, "string" != typeof a || "function" != typeof b && void 0 !== b)
                if ("string" == typeof a && "string" == typeof b) "function" == typeof c ? (actee = this._find_or_create(b), callback = c) : void 0 === c && (actee = this._find_or_create(b), callback = null);
                else if ("object" == typeof a && "string" == typeof b) {
                actee = this._find_or_create(b), callback = c;
                for (e in a) switch (e) {
                    case "asynchronous":
                        actname = a[e], stereotype = "asynchronous"
                }
            } else {
                if ("string" != typeof a || "object" != typeof b) throw msg = "invalid arguments", console.error("SequenceDiagramBuilder::message", msg, a, b, c), new Error(msg, a, b, c);
                norm = JUMLY.Identity.normalize(b), actee = this._find_or_create(norm), callback = c
            } else actee = this._curr_actor(), callback = b;
            return iact = this._curr_occurr().interact(actee), iact.find(".name").text(actname).end().find(".message").addClass(stereotype), it = new SequenceDiagramBuilder(this._diagram, iact._actee), null != callback && callback.apply(it, []), it
        }, SequenceDiagramBuilder.prototype.create = function(a, b, c) {
            var actee, async, callback, ctxt, e, iact, id, name, norm, occurr;
            return "string" == typeof a && "function" == typeof b ? (name = null, actee = a, callback = b) : "string" == typeof a && "string" == typeof b && "function" == typeof c ? (name = a, actee = b, callback = c) : "string" == typeof a && void 0 === b ? (name = null, actee = a, callback = null) : "object" == typeof a && (e = core._normalize(a), actee = e.name, async = null != a.asynchronous, "function" == typeof b && (callback = b)), "string" == typeof a ? id = core._to_id(actee) : (norm = core._normalize(a), id = norm.id, actee = norm.name), iact = this._curr_occurr().create({
                id: id,
                name: actee
            }), name && iact.name(name), async && iact.find(".message:eq(0)").addClass("asynchronous"), occurr = iact._actee, ctxt = new SequenceDiagramBuilder(this._diagram, occurr), null != callback && callback.apply(ctxt, []), this._var(id, occurr._actor), this._diagram._reg_by_ref(id, occurr._actor), ctxt
        }, SequenceDiagramBuilder.prototype._var = function(varname, refobj) {
            var ref;
            return ref = core._to_ref(varname), this._diagram._var(ref, refobj)
        }, SequenceDiagramBuilder.prototype.destroy = function(a) {
            return this._curr_occurr().destroy(this._find_or_create(a)), null
        }, SequenceDiagramBuilder.prototype.reply = function(a, b) {
            var f, n, obj, ref;
            return obj = b, "string" == typeof b && (ref = core._to_ref(core._to_id(b)), this._diagram[ref] && (obj = this._diagram[ref])), f = function(occur, n) {
                return occur.is_on_another() ? f(occur._parent_occurr(), n + 1) : n
            }, n = f(this._curr_occurr(), 0), this._curr_occurr().parents(".interaction:eq(" + n + ")").data("_self").reply({
                name: a,
                ".actee": obj
            }), null
        }, SequenceDiagramBuilder.prototype.ref = function(a) {
            var occur, ref;
            return occur = this._curr_occurr(), ref = new SequenceRef(a), occur ? occur.append(ref) : this.diagram().append(ref), this._refer(ref, {
                by: a
            }), ref
        }, SequenceDiagramBuilder.prototype.lost = function() {
            return this._curr_occurr.lost(), null
        }, SequenceDiagramBuilder.prototype.fragment = function(nctx) {
            var ctx, frag, name;
            for (name in nctx) return ctx = nctx[name], frag = this._fragment(ctx, {
                label: name
            }), void this._refer(frag, {
                by: name
            })
        }, SequenceDiagramBuilder.prototype.loop = function(a) {
            var last;
            return last = [].slice.apply(arguments).pop(), $.isFunction(last) ? this._fragment(last, {
                kind: "loop",
                label: "Loop"
            }, a) : void 0
        }, SequenceDiagramBuilder.prototype._fragment = function(last, opts, desc) {
            var frag, kids, newones;
            return kids = this._curr_occurr().find("> *"), last.apply(this, []), newones = this._curr_occurr().find("> *").not(kids), newones.length > 0 && (frag = new SequenceFragment, opts.kind && frag.addClass(opts.kind), frag.enclose(newones), frag.find(".name:first").html(opts.label)), "string" == typeof desc && frag.find("> .header > .condition").html(desc), frag
        }, SequenceDiagramBuilder.prototype.alt = function(ints) {
            var iacts, name, _new_act;
            iacts = {}, self = this;
            for (name in ints) {
                if ("function" != typeof ints[name]) break;
                _new_act = function(name, act) {
                    return function() {
                        var nodes, _;
                        return nodes = [], _ = function(it) {
                            var node;
                            return node = (null != it ? it.constructor : void 0) === SequenceDiagramBuilder ? it._curr_occurr().parent(".interaction:eq(0)") : it, nodes.push(node)
                        }, act.apply({
                            _curr_actor: function() {
                                return self._curr_actor.apply(self, arguments)
                            },
                            message: function() {
                                return _(self.message.apply(self, arguments))
                            },
                            loop: function() {
                                return _(self.loop.apply(self, arguments))
                            },
                            ref: function() {
                                return _(self.ref.apply(self, arguments))
                            }
                        }), nodes
                    }
                }, iacts[name] = _new_act(name, ints[name])
            }
            return this._curr_occurr().interact({
                stereotype: ".alt"
            }, iacts), this
        }, SequenceDiagramBuilder.prototype.reactivate = function(a, b, c) {
            var e, occurr;
            return a.constructor === this.constructor ? (e = a._curr_occurr.parents(".interaction:eq(0)"), this._curr_actor().activate().append(e), a) : (occurr = this._curr_actor().activate(), this._occurr = occurr, this.message(a, b, c))
        }, SequenceDiagramBuilder.prototype.css = function(styles) {
            return this._diagram.css(styles)
        }, SequenceDiagramBuilder.prototype.find = function(selector) {
            return this._diagram.find(selector)
        }, NoteElement = self.require("NoteElement"), SequenceDiagramBuilder.prototype.note = function(text, opts) {
            var note;
            return note = new NoteElement(text, opts), this._curr_occurr().append(note)
        }, SequenceDiagramBuilder.prototype.compose = function(opts) {
            return "function" == typeof opts ? opts(this._diagram) : null != opts && opts.append(this._diagram), this._diagram.compose(opts)
        }, SequenceDiagramBuilder.prototype.preferences = function() {
            return this._diagram.preferences.apply(this._diagram, arguments)
        }, core.env.is_node ? module.exports = SequenceDiagramBuilder : core.exports(SequenceDiagramBuilder)
    }.call(this),
    function() {
        var DiagramLayout, HTMLElementLayout, SequenceDiagramLayout, SequenceLifeline, core, self, utils, _, _ref, __hasProp = {}.hasOwnProperty,
            __extends = function(child, parent) {
                function ctor() {
                    this.constructor = child
                }
                for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
                return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
            };
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, DiagramLayout = self.require("DiagramLayout"), utils = self.require("jquery.ext"), $.fn.self = function() {
            return this.data("_self")
        }, $.fn.selfEach = function(f) {
            return this.each(function(i, e) {
                if (e = $(e).self(), null == e) throw new Error("_self have nothing ", e);
                return f(e), this
            })
        }, SequenceDiagramLayout = function(_super) {
            function SequenceDiagramLayout() {
                return _ref = SequenceDiagramLayout.__super__.constructor.apply(this, arguments)
            }
            return __extends(SequenceDiagramLayout, _super), SequenceDiagramLayout
        }(DiagramLayout), SequenceDiagramLayout.prototype._q = function(sel) {
            return $(sel, this.diagram)
        }, SequenceDiagramLayout.prototype._layout = function() {
            var l, ml, mr, objs, occurs, r;
            return objs = $(".participant:eq(0) ~ .participant", this.diagram), $(".participant:eq(0)", this.diagram).after(objs), this.align_objects_horizontally(), this._q(".occurrence").each(function(i, e) {
                return $(e).data("_self")._move_horizontally()
            }), this._q(".occurrence .interaction").selfEach(function(e) {
                return e._compose_()
            }), this.generate_lifelines_and_align_horizontally(), this.pack_refs_horizontally(), this.pack_fragments_horizontally(), this._q(".create.message").selfEach(function(e) {
                return e._to_be_creation()
            }), this.align_lifelines_vertically(), this.align_lifelines_stop_horizontally(), this.rebuild_asynchronous_self_calling(), this.render_icons(), occurs = this.diagram.find(".occurrence"), ml = occurs.sort(function(e) {
                return $(e).offset().left
            }), mr = occurs.sort(function(e) {
                return $(e).offset().left + $(e).outerWidth() - 1
            }), $(ml[0]).addClass("leftmost"), $(mr[mr.length - 1]).addClass("rightmost"), objs = this.diagram.find(".participant"), l = utils.min(objs, function(e) {
                return $(e).offset().left
            }), r = utils.max(objs, function(e) {
                return $(e).offset().left + $(e).outerWidth() - 1
            }), this.diagram.width(r - l + 1)
        }, HTMLElementLayout = self.require("HTMLElementLayout"), _ = function(opts) {
            return ("undefined" != typeof navigator && null !== navigator ? navigator.userAgent.match(/.*(WebKit).*/) : void 0) ? opts.webkit : ("undefined" != typeof navigator && null !== navigator ? navigator.userAgent.match(/.*(Gecko).*/) : void 0) ? opts.gecko : opts.webkit
        }, $.fn.pickup2 = function(f0, f1, f2) {
            var prev, _this = this;
            return 0 === this.length ? this : (f0(prev = $(this[0])), 1 === this.length ? this : this.slice(1).each(function(i, curr) {
                return curr = $(curr), null != f2 && i + 1 === _this.length - 1 ? f2(prev, curr, i + 1) : f1(prev, curr, i + 1), prev = curr
            }))
        }, SequenceDiagramLayout.prototype.align_objects_horizontally = function() {
            var f0, f1;
            return f0 = function(a) {
                return a.css("left") === _({
                    webkit: "auto",
                    gecko: "0px"
                }) ? a.css({
                    left: 0
                }) : void 0
            }, f1 = function(a, b) {
                var spacing;
                return b.css("left") === _({
                    webkit: "auto",
                    gecko: "0px"
                }) ? (spacing = new HTMLElementLayout.HorizontalSpacing(a, b), spacing.apply()) : void 0
            }, this._q(".participant").pickup2(f0, f1)
        }, SequenceLifeline = self.require("SequenceLifeline"), SequenceDiagramLayout.prototype.generate_lifelines_and_align_horizontally = function() {
            var diag;
            return diag = this.diagram, $(".participant", this.diagram).each(function(i, e) {
                var a, obj;
                return obj = $(e).data("_self"), a = new SequenceLifeline(obj), a.offset({
                    left: obj.offset().left
                }), a.width(obj.preferred_width()), diag.append(a)
            })
        }, SequenceDiagramLayout.prototype.pack_refs_horizontally = function() {
            return this._q(".ref").selfEach(function(ref) {
                var idx, not_defined, parent, pw;
                return pw = ref.preferred_left_and_width(), ref.offset({
                    left: pw.left
                }), idx = ref.index(), parent = ref.parent(), ref.detach(), not_defined = "0px" === ref.css("width"), 0 === idx ? parent.prepend(ref) : ref.insertAfter(parent.find("> *:eq(" + (idx - 1) + ")")), ref.width(not_defined ? pw.width : parseInt(ref.css("width")))
            })
        }, SequenceDiagramLayout.prototype.pack_fragments_horizontally = function() {
            var fixwidth, fragments, left, most;
            return fragments = $("> .fragment", this.diagram), fragments.length > 0 && (most = utils.mostLeftRight(this._q(".participant")), left = fragments.offset().left, fragments.width(most.right - left + (most.left - left))), fixwidth = function(fragment) {
                var msg;
                return most = utils.mostLeftRight($(".occurrence, .message, .fragment", fragment).not(".return, .lost")), fragment.width(most.width() - (fragment.outerWidth() - fragment.width())), msg = fragment.find("> .interaction > .message").data("_self"), (null != msg ? msg.isTowardLeft() : void 0) ? fragment.offset({
                    left: most.left
                }).find("> .interaction > .occurrence").each(function(i, occurr) {
                    return occurr = occurr.data("_self"), occurr._move_horizontally().prev().offset({
                        left: occurr.offset().left
                    })
                }) : void 0
            }, this._q(".occurrence > .fragment").selfEach(fixwidth).parents(".occurrence > .fragment").selfEach(fixwidth)
        }, SequenceDiagramLayout.prototype.align_lifelines_vertically = function() {
            var a, b, iters, last, mh, min, nodes;
            return nodes = this.diagram.find(".interaction, > .ref"), 0 !== nodes.length ? (nodes.filter(".ref").length > 0 ? (last = nodes.filter(":last"), mh = last.offset().top + last.outerHeight() - nodes.filter(":first").offset().top) : 1 === (iters = this.diagram.find("> .interaction")).length ? mh = iters.filter(":eq(0)").height() : (a = iters.filter(":eq(0)"), b = iters.filter(":last"), mh = b.offset().top + b.height() - 1 - a.offset().top), min = utils.min(this.diagram.find(".participant"), function(e) {
                return $(e).offset().top
            }), this._q(".lifeline").each(function(i, e) {
                var dh, mt, ot;
                return a = $(e).data("_self"), a.offset({
                    left: a._object.offset().left
                }), ot = Math.ceil(a._object.offset().top), dh = ot - min, a.height(mh - dh + 16), mt = a.offset().top - (ot + a._object.outerHeight()), a.css({
                    "margin-top": "-" + mt + "px"
                })
            })) : void 0
        }, SequenceDiagramLayout.prototype.align_lifelines_stop_horizontally = function() {
            return $(".stop", this.diagram).each(function(i, e) {
                var occurr;
                return e = $(e), occurr = e.prev(".occurrence"), e.offset({
                    left: occurr.offset().left
                })
            })
        }, SequenceDiagramLayout.prototype.rebuild_asynchronous_self_calling = function() {
            return this.diagram.find(".message.asynchronous").parents(".interaction:eq(0)").each(function(i, e) {
                var iact, msg, occurr, prev;
                return e = $(e).self(), e.isToSelf() ? (iact = e.addClass("activated").addClass("asynchronous"), prev = iact.parents(".interaction:eq(0)"), iact.insertAfter(prev), occurr = iact.css("padding-bottom", 0).find("> .occurrence").self()._move_horizontally().css("top", 0), msg = iact.find(".message").self(), msg.css("z-index", -1).offset({
                    left: occurr.offset().left,
                    top: prev.find(".occurrence").outerBottom() - msg.height() / 3
                })) : void 0
            })
        }, SequenceDiagramLayout.prototype.render_icons = function() {
            return this._q(".participant").selfEach(function(e) {
                return "function" == typeof e.renderIcon ? e.renderIcon() : void 0
            })
        }, core = self.require("core"), core.env.is_node ? module.exports = SequenceDiagramLayout : core.exports(SequenceDiagramLayout)
    }.call(this),
    function() {
        var HTMLElement, IconElement, blue, ce, core, drop_shadow, g2d, green, ne, ns, red, sa, self, svg_g, to_d, _STYLES, _actor, _controller, _entity, _render, _view, __hasProp = {}.hasOwnProperty,
            __extends = function(child, parent) {
                function ctor() {
                    this.constructor = child
                }
                for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
                return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
            };
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, _STYLES = {
            lineWidth: 1.5,
            fillStyle: "white",
            strokeStyle: "gray",
            shadowBlur: 12,
            shadowColor: "rgba(0,0,0,0.22)",
            shadowOffsetX: 8,
            shadowOffsetY: 5
        }, ns = "http://www.w3.org/2000/svg", g2d = self.require("jquery.g2d"), ce = g2d.svg.create, sa = g2d.svg.attrs, ne = function(n, attrs) {
            return sa(ce(n), attrs)
        }, red = green = blue = .66, drop_shadow = function() {
            var blur, matrix, merge, mnBlur, mnSrc, offset, shadow2;
            return shadow2 = ne("filter", {
                id: "dropshadow",
                width: "200%",
                height: "200%"
            }), matrix = ne("feColorMatrix", {
                type: "matrix",
                values: "0 0 0 " + red + " 0    0 0 0 " + green + " 0    0 0 0 " + blue + " 0    0 0 0 1 0"
            }), blur = ne("feGaussianBlur", {
                stdDeviation: 2.5,
                result: "coloreBlur"
            }), offset = ne("feOffset", {
                dx: 8,
                dy: 5,
                result: "coloreBlur"
            }), merge = ne("feMerge"), mnBlur = ne("feMergeNode", {
                "in": "coloreBlur"
            }), mnSrc = ne("feMergeNode", {
                "in": "SourceGraphic"
            }), merge.appendChild(mnBlur), merge.appendChild(mnSrc), shadow2.appendChild(matrix), shadow2.appendChild(blur), shadow2.appendChild(offset), shadow2.appendChild(merge), shadow2
        }, to_d = function(d) {
            return d.map(function(e) {
                return "" + e[0] + e[1] + "," + e[2]
            }).join("")
        }, svg_g = function(svg) {
            var g;
            return svg.appendChild(drop_shadow()), g = sa(ce("g"), {
                style: "filter:url(#dropshadow)"
            }), svg.appendChild(g), g
        }, _actor = function(svg, styles) {
            var d, dh, dv, e, exth, g, lw, r, r2, ret;
            return r = styles.radius || 12, r2 = 2 * r, exth = .25 * r, lw = Math.round(styles.lineWidth), g = svg_g(svg), g.appendChild(ne("circle", {
                cx: lw + r,
                cy: lw + r,
                r: r
            })), dh = 3 * lw, dv = .77 * r2, d = [
                ["M", 0, r2 + lw + exth],
                ["l", lw + r2 + lw, 0],
                ["M", lw + r, r2 + lw],
                ["l", 0, .35 * r2],
                ["l", -r, dv],
                ["m", r, -dv],
                ["l", r, dv]
            ], e = ne("path", {
                d: to_d(d)
            }), g.appendChild(e), ret = {
                size: {
                    width: lw + r2 + lw,
                    height: lw + 2 * r2 + lw
                }
            }
        }, _view = function(svg, styles) {
            var d, e, extw, g, lw, r, r2, ret;
            return r = styles.radius || 16, r2 = 2 * r, extw = .4 * r, lw = styles.lineWidth, g = svg_g(svg), g.appendChild(ne("circle", {
                cx: lw + r + extw,
                cy: lw + r,
                r: r
            })), d = [
                ["M", lw, r],
                ["l", extw, 0],
                ["M", lw, 0],
                ["l", 0, r2]
            ], e = ce("path"), e.setAttribute("d", to_d(d)), g.appendChild(e), ret = {
                size: {
                    width: lw + r2 + extw + lw,
                    height: lw + r2 + lw
                }
            }
        }, _controller = function(svg, styles) {
            var d, dy, e, effectext, exth, g, lh, lw, r, r2, ret, x0, x1, y0;
            return r = styles.radius || 16, r2 = 2 * r, exth = .4 * r, lw = lh = styles.lineWidth, dy = 0, effectext = 0, g = svg_g(svg), g.appendChild(ne("circle", {
                cx: lw + r,
                cy: lw + r + exth,
                r: r
            })), x0 = lw + .8 * r, x1 = lw + 1.2 * r, y0 = lh + exth, d = [
                ["M", x0, y0],
                ["L", x1, lh + exth / 4],
                ["M", x0, y0],
                ["L", x1, lh + 7 * exth / 4]
            ], e = ne("path", {
                d: to_d(d)
            }), g.appendChild(e), ret = {
                size: {
                    width: lw + r2 + lw + effectext,
                    height: lw + r2 + lw + effectext + exth
                }
            }
        }, _entity = function(svg, styles) {
            var d, e, exth, g, lw, r, r2, ret;
            return r = styles.radius || 16, r2 = 2 * r, exth = .4 * r, lw = styles.lineWidth, g = svg_g(svg), g.appendChild(ne("circle", {
                cx: lw + r,
                cy: lw + r,
                r: r
            })), d = [
                ["M", lw + r, r2],
                ["L", lw + r, r2 + exth],
                ["M", 0, r2 + exth],
                ["L", r2 + lw, r2 + exth]
            ], e = ne("path", {
                d: to_d(d)
            }), g.appendChild(e), ret = {
                size: {
                    width: lw + r2 + lw,
                    height: lw + r2 + exth + lw
                }
            }
        }, _render = function(svg, renderer, args) {
            var dh, dw, paths, size, styles, _ref;
            return styles = $.extend({}, _STYLES, args), _ref = renderer(svg, styles), size = _ref.size, paths = _ref.paths, dw = (styles.shadowOffsetX || 0) + (styles.shadowBlur / 2 || 0), dh = (styles.shadowOffsetY || 0) + (styles.shadowBlur / 2 || 0), $(svg).attr({
                width: size.width + dw,
                height: size.height + dh,
                "data-actual-width": size.width,
                "data-actual-height": size.height
            })
        }, core = self.require("core"), HTMLElement = self.require("HTMLElement"), IconElement = function(_super) {
            function IconElement(args, opts) {
                var idname;
                idname = core._normalize(args), IconElement.__super__.constructor.call(this, args, function(me) {
                    var div, svg;
                    return svg = $("<svg width='0' height='0'>"), me.addClass("icon").addClass(opts.kind).append(div = $("<div>").append(svg)).append($("<div>").addClass("name").append(idname.name)), IconElement.renderer(opts.kind)(svg[0]), div.css({
                        height: svg.data("actual-height")
                    })
                })
            }
            return __extends(IconElement, _super), IconElement.renderer = function(type) {
                var r;
                return r = {
                        actor: _actor,
                        view: _view,
                        controller: _controller,
                        entity: _entity
                    },
                    function(svg, styles) {
                        return _render(svg, r[type], styles)
                    }
            }, IconElement
        }(HTMLElement), core.env.is_node ? module.exports = IconElement : core.exports(IconElement)
    }.call(this),
    function() {
        var Diagram, IconElement, RobustnessDiagram, core, self, _ref, __hasProp = {}.hasOwnProperty,
            __extends = function(child, parent) {
                function ctor() {
                    this.constructor = child
                }
                for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
                return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
            };
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, Diagram = self.require("Diagram"), IconElement = self.require("IconElement"), RobustnessDiagram = function(_super) {
            function RobustnessDiagram() {
                return _ref = RobustnessDiagram.__super__.constructor.apply(this, arguments)
            }
            return __extends(RobustnessDiagram, _super), RobustnessDiagram
        }(Diagram), core = self.require("core"), RobustnessDiagram.prototype._node_of = function(n, k) {
            var e, id, ref;
            return id = core._to_id(n), ref = core._to_ref(id), this[ref] ? this[ref] : (e = new IconElement(n, {
                kind: k
            }), this._reg_by_ref(id, e), e)
        }, core.env.is_node ? module.exports = RobustnessDiagram : core.exports(RobustnessDiagram)
    }.call(this),
    function() {
        var DiagramBuilder, IconElement, Relationship, RobustnessDiagram, RobustnessDiagramBuilder, core, self, __hasProp = {}.hasOwnProperty,
            __extends = function(child, parent) {
                function ctor() {
                    this.constructor = child
                }
                for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
                return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
            };
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, DiagramBuilder = self.require("DiagramBuilder"), RobustnessDiagram = self.require("RobustnessDiagram"), IconElement = self.require("IconElement"), Relationship = self.require("Relationship"), RobustnessDiagramBuilder = function(_super) {
            function RobustnessDiagramBuilder(_diagram) {
                this._diagram = _diagram, RobustnessDiagramBuilder.__super__.constructor.call(this), null == this._diagram && (this._diagram = new RobustnessDiagram)
            }
            return __extends(RobustnessDiagramBuilder, _super), RobustnessDiagramBuilder
        }(DiagramBuilder), RobustnessDiagramBuilder.prototype.build = function(src) {
            var _this = this;
            return src.data ? src.find("*[data-kind]").each(function(e) {
                return e = $(e), _this._diagram.append(new IconElement(e.text(), {
                    kind: $(e).data("kind")
                }))
            }) : RobustnessDiagramBuilder.__super__.build.call(this, src), this._diagram
        }, core = self.require("core"), RobustnessDiagramBuilder.prototype._node = function(opt, kind) {
            var a, b, f, k;
            if ("string" == typeof opt) return this._diagram.append(a = this._diagram._node_of(opt, kind)), a;
            if ("object" == typeof opt)
                for (k in opt)
                    if ("function" == typeof(f = opt[k])) return a = this._diagram._node_of(k, kind), b = f.apply(this, []), this._diagram.append(a).append(b), this._diagram.append(new Relationship("", {
                        src: a,
                        dst: b
                    })), a;
            throw "unexpected: " + typeof opt
        }, RobustnessDiagramBuilder.prototype.actor = function(opt) {
            return this._node(opt, "actor")
        }, RobustnessDiagramBuilder.prototype.view = function(opt) {
            return this._node(opt, "view")
        }, RobustnessDiagramBuilder.prototype.controller = function(opt) {
            return this._node(opt, "controller")
        }, RobustnessDiagramBuilder.prototype.entity = function(opt) {
            return this._node(opt, "entity")
        }, core = self.require("core"), core.env.is_node ? module.exports = RobustnessDiagramBuilder : core.exports(RobustnessDiagramBuilder)
    }.call(this),
    function() {
        var DiagramLayout, RobustnessDiagramLayout, core, self, utils, _ref, __hasProp = {}.hasOwnProperty,
            __extends = function(child, parent) {
                function ctor() {
                    this.constructor = child
                }
                for (var key in parent) __hasProp.call(parent, key) && (child[key] = parent[key]);
                return ctor.prototype = parent.prototype, child.prototype = new ctor, child.__super__ = parent.prototype, child
            };
        self = {
            require: "undefined" != typeof module && "undefined" != typeof module.exports ? require : JUMLY.require
        }, DiagramLayout = self.require("DiagramLayout"), utils = self.require("jquery.ext"), RobustnessDiagramLayout = function(_super) {
            function RobustnessDiagramLayout() {
                return _ref = RobustnessDiagramLayout.__super__.constructor.apply(this, arguments)
            }
            return __extends(RobustnessDiagramLayout, _super), RobustnessDiagramLayout
        }(DiagramLayout), RobustnessDiagramLayout.prototype._layout = function() {
            var elems, mlr, mtb, p;
            return elems = this.diagram.find(".element"), p = this.diagram.offset(), p.left += 2 * parseInt(this.diagram.css("padding-left")), p.top += 2 * parseInt(this.diagram.css("padding-top")), elems.each(function(i, e) {
                return $(e).css({
                    position: "absolute"
                }).offset({
                    left: p.left + i % 3 * 120,
                    top: p.top + i / 3 * 100
                })
            }), mlr = utils.mostLeftRight(elems, !0), mtb = utils.mostTopBottom(elems, !0), this.diagram.width(mlr.width()).height(mtb.height()), this.diagram.find(".relationship").each(function(i, e) {
                return $(e).data("_self").render()
            })
        }, core = self.require("core"), core.env.is_node ? module.exports = RobustnessDiagramLayout : core.exports(RobustnessDiagramLayout)
    }.call(this),
    function() {
        var _is_script, _mkey, _opts, _t2l, _to_meta, _type, _val;
        _type = "text/jumly+sequence", _t2l = {
            "text/jumly+sequence": {
                builder: "SequenceDiagramBuilder",
                layout: "SequenceDiagramLayout"
            },
            "text/jumly+robustness": {
                builder: "RobustnessDiagramBuilder",
                layout: "RobustnessDiagramLayout"
            }
        }, JUMLY._compile = function(code, type) {
            if (null == type && (type = _type), !_t2l[type]) throw "unknown type: " + type;
            return (new(JUMLY.require(_t2l[type].builder))).build(code)
        }, JUMLY._layout = function(doc, type) {
            if (null == type && (type = _type), !_t2l[type]) throw "unknown type: " + type;
            return (new(JUMLY.require(_t2l[type].layout))).layout(doc)
        }, _to_meta = function($src) {
            var meta;
            if (meta = $src.data(_mkey), void 0 === meta) $src.data(_mkey, meta = {});
            else if ("string" == typeof meta) $src.data(_mkey, meta = {
                type: meta
            });
            else if ("object" != typeof meta) throw "unknown type: " + typeof meta;
            return _is_script($src[0]) && (meta.type = $src.attr("type")), meta
        }, _is_script = function(n) {
            return "script" === n.nodeName.toLowerCase()
        }, _val = function(s) {
            switch (s[0].nodeName.toLowerCase()) {
                case "textarea":
                case "input":
                    return s.val();
                default:
                    return s.text()
            }
        }, _mkey = "jumly", JUMLY.eval = function($src, opts) {
            var d, meta;
            if (meta = _to_meta($src), d = this._compile(_val($src), meta.type), "function" == typeof opts) opts(d, $src);
            else {
                if ("object" != typeof opts) throw "no idea to place a new diagram.";
                if (!opts.into) throw "missing `into`";
                $(opts.into).html(d)
            }
            return this._layout(d, meta.type), $.extend(meta, {
                dst: d
            }), d.data(_mkey, {
                src: $src
            })
        }, _opts = {
            finder: function($n) {
                var e, filter, nodes, _i, _len, _results;
                for (nodes = $n.find("script, *[data-jumly]"), filter = function(n) {
                        var _ref;
                        return _is_script(n) ? null != (_ref = $(n).attr("type")) ? _ref.match(/text\/jumly\+.*/) : void 0 : !0
                    }, _results = [], _i = 0, _len = nodes.length; _len > _i; _i++) e = nodes[_i], filter(e) && _results.push(e);
                return _results
            },
            placer: function(d, $e) {
                return $e.after(d)
            }
        }, JUMLY.scan = function(scope, opts) {
            var $e, dst, e, p, _i, _len, _ref, _ref1, _results;
            for (null == scope && (scope = document), p = $.extend({}, _opts, opts), _ref = p.finder($(scope)), _results = [], _i = 0, _len = _ref.length; _len > _i; _i++) e = _ref[_i], $e = $(e), _results.push((dst = null != (_ref1 = $e.data(_mkey)) ? _ref1.dst : void 0) ? p.synchronize ? JUMLY.eval($e, {
                into: dst
            }) : void 0 : JUMLY.eval($e, p.placer));
            return _results
        }
    }.call(this);