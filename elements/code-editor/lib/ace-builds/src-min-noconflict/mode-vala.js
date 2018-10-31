ace.define(
  "ace/mode/vala_highlight_rules",
  [
    "require",
    "exports",
    "module",
    "ace/lib/oop",
    "ace/mode/text_highlight_rules"
  ],
  function(e, t, n) {
    "use strict";
    var r = e("../lib/oop"),
      i = e("./text_highlight_rules").TextHighlightRules,
      s = function() {
        (this.$rules = {
          start: [
            {
              token: [
                "meta.using.vala",
                "keyword.other.using.vala",
                "meta.using.vala",
                "storage.modifier.using.vala",
                "meta.using.vala",
                "punctuation.terminator.vala"
              ],
              regex: "^(\\s*)(using)\\b(?:(\\s*)([^ ;$]+)(\\s*)((?:;)?))?"
            },
            { include: "#code" }
          ],
          "#all-types": [
            { include: "#primitive-arrays" },
            { include: "#primitive-types" },
            { include: "#object-types" }
          ],
          "#annotations": [
            {
              token: [
                "storage.type.annotation.vala",
                "punctuation.definition.annotation-arguments.begin.vala"
              ],
              regex: "(@[^ (]+)(\\()",
              push: [
                {
                  token: "punctuation.definition.annotation-arguments.end.vala",
                  regex: "\\)",
                  next: "pop"
                },
                {
                  token: [
                    "constant.other.key.vala",
                    "text",
                    "keyword.operator.assignment.vala"
                  ],
                  regex: "(\\w*)(\\s*)(=)"
                },
                { include: "#code" },
                { token: "punctuation.seperator.property.vala", regex: "," },
                { defaultToken: "meta.declaration.annotation.vala" }
              ]
            },
            { token: "storage.type.annotation.vala", regex: "@\\w*" }
          ],
          "#anonymous-classes-and-new": [
            {
              token: "keyword.control.new.vala",
              regex: "\\bnew\\b",
              push_disabled: [
                {
                  token: "text",
                  regex: "(?<=\\)|\\])(?!\\s*{)|(?<=})|(?=;)",
                  TODO: "FIXME: regexp doesn't have js equivalent",
                  originalRegex: "(?<=\\)|\\])(?!\\s*{)|(?<=})|(?=;)",
                  next: "pop"
                },
                {
                  token: ["storage.type.vala", "text"],
                  regex: "(\\w+)(\\s*)(?=\\[)",
                  push: [
                    { token: "text", regex: "}|(?=;|\\))", next: "pop" },
                    {
                      token: "text",
                      regex: "\\[",
                      push: [
                        { token: "text", regex: "\\]", next: "pop" },
                        { include: "#code" }
                      ]
                    },
                    {
                      token: "text",
                      regex: "{",
                      push: [
                        { token: "text", regex: "(?=})", next: "pop" },
                        { include: "#code" }
                      ]
                    }
                  ]
                },
                {
                  token: "text",
                  regex: "(?=\\w.*\\()",
                  push: [
                    {
                      token: "text",
                      regex: "(?<=\\))",
                      TODO: "FIXME: regexp doesn't have js equivalent",
                      originalRegex: "(?<=\\))",
                      next: "pop"
                    },
                    { include: "#object-types" },
                    {
                      token: "text",
                      regex: "\\(",
                      push: [
                        { token: "text", regex: "\\)", next: "pop" },
                        { include: "#code" }
                      ]
                    }
                  ]
                },
                {
                  token: "meta.inner-class.vala",
                  regex: "{",
                  push: [
                    { token: "meta.inner-class.vala", regex: "}", next: "pop" },
                    { include: "#class-body" },
                    { defaultToken: "meta.inner-class.vala" }
                  ]
                }
              ]
            }
          ],
          "#assertions": [
            {
              token: [
                "keyword.control.assert.vala",
                "meta.declaration.assertion.vala"
              ],
              regex: "\\b(assert|requires|ensures)(\\s)",
              push: [
                {
                  token: "meta.declaration.assertion.vala",
                  regex: "$",
                  next: "pop"
                },
                {
                  token: "keyword.operator.assert.expression-seperator.vala",
                  regex: ":"
                },
                { include: "#code" },
                { defaultToken: "meta.declaration.assertion.vala" }
              ]
            }
          ],
          "#class": [
            {
              token: "meta.class.vala",
              regex:
                "(?=\\w?[\\w\\s]*(?:class|(?:@)?interface|enum|struct|namespace)\\s+\\w+)",
              push: [
                { token: "paren.vala", regex: "}", next: "pop" },
                { include: "#storage-modifiers" },
                { include: "#comments" },
                {
                  token: [
                    "storage.modifier.vala",
                    "meta.class.identifier.vala",
                    "entity.name.type.class.vala"
                  ],
                  regex:
                    "(class|(?:@)?interface|enum|struct|namespace)(\\s+)([\\w\\.]+)"
                },
                {
                  token: "storage.modifier.extends.vala",
                  regex: ":",
                  push: [
                    {
                      token: "meta.definition.class.inherited.classes.vala",
                      regex: "(?={|,)",
                      next: "pop"
                    },
                    { include: "#object-types-inherited" },
                    { include: "#comments" },
                    {
                      defaultToken:
                        "meta.definition.class.inherited.classes.vala"
                    }
                  ]
                },
                {
                  token: [
                    "storage.modifier.implements.vala",
                    "meta.definition.class.implemented.interfaces.vala"
                  ],
                  regex: "(,)(\\s)",
                  push: [
                    {
                      token:
                        "meta.definition.class.implemented.interfaces.vala",
                      regex: "(?=\\{)",
                      next: "pop"
                    },
                    { include: "#object-types-inherited" },
                    { include: "#comments" },
                    {
                      defaultToken:
                        "meta.definition.class.implemented.interfaces.vala"
                    }
                  ]
                },
                {
                  token: "paren.vala",
                  regex: "{",
                  push: [
                    { token: "paren.vala", regex: "(?=})", next: "pop" },
                    { include: "#class-body" },
                    { defaultToken: "meta.class.body.vala" }
                  ]
                },
                { defaultToken: "meta.class.vala" }
              ],
              comment: "attempting to put namespace in here."
            }
          ],
          "#class-body": [
            { include: "#comments" },
            { include: "#class" },
            { include: "#enums" },
            { include: "#methods" },
            { include: "#annotations" },
            { include: "#storage-modifiers" },
            { include: "#code" }
          ],
          "#code": [
            { include: "#comments" },
            { include: "#class" },
            {
              token: "text",
              regex: "{",
              push: [
                { token: "text", regex: "}", next: "pop" },
                { include: "#code" }
              ]
            },
            { include: "#assertions" },
            { include: "#parens" },
            { include: "#constants-and-special-vars" },
            { include: "#anonymous-classes-and-new" },
            { include: "#keywords" },
            { include: "#storage-modifiers" },
            { include: "#strings" },
            { include: "#all-types" }
          ],
          "#comments": [
            { token: "punctuation.definition.comment.vala", regex: "/\\*\\*/" },
            { include: "text.html.javadoc" },
            { include: "#comments-inline" }
          ],
          "#comments-inline": [
            {
              token: "punctuation.definition.comment.vala",
              regex: "/\\*",
              push: [
                {
                  token: "punctuation.definition.comment.vala",
                  regex: "\\*/",
                  next: "pop"
                },
                { defaultToken: "comment.block.vala" }
              ]
            },
            {
              token: [
                "text",
                "punctuation.definition.comment.vala",
                "comment.line.double-slash.vala"
              ],
              regex: "(\\s*)(//)(.*$)"
            }
          ],
          "#constants-and-special-vars": [
            {
              token: "constant.language.vala",
              regex: "\\b(?:true|false|null)\\b"
            },
            { token: "variable.language.vala", regex: "\\b(?:this|base)\\b" },
            {
              token: "constant.numeric.vala",
              regex:
                "\\b(?:0(?:x|X)[0-9a-fA-F]*|(?:[0-9]+\\.?[0-9]*|\\.[0-9]+)(?:(?:e|E)(?:\\+|-)?[0-9]+)?)(?:[LlFfUuDd]|UL|ul)?\\b"
            },
            {
              token: [
                "keyword.operator.dereference.vala",
                "constant.other.vala"
              ],
              regex:
                "((?:\\.)?)\\b([A-Z][A-Z0-9_]+)(?!<|\\.class|\\s*\\w+\\s*=)\\b"
            }
          ],
          "#enums": [
            {
              token: "text",
              regex: "^(?=\\s*[A-Z0-9_]+\\s*(?:{|\\(|,))",
              push: [
                { token: "text", regex: "(?=;|})", next: "pop" },
                {
                  token: "constant.other.enum.vala",
                  regex: "\\w+",
                  push: [
                    {
                      token: "meta.enum.vala",
                      regex: "(?=,|;|})",
                      next: "pop"
                    },
                    { include: "#parens" },
                    {
                      token: "text",
                      regex: "{",
                      push: [
                        { token: "text", regex: "}", next: "pop" },
                        { include: "#class-body" }
                      ]
                    },
                    { defaultToken: "meta.enum.vala" }
                  ]
                }
              ]
            }
          ],
          "#keywords": [
            {
              token: "keyword.control.catch-exception.vala",
              regex: "\\b(?:try|catch|finally|throw)\\b"
            },
            { token: "keyword.control.vala", regex: "\\?|:|\\?\\?" },
            {
              token: "keyword.control.vala",
              regex:
                "\\b(?:return|break|case|continue|default|do|while|for|foreach|switch|if|else|in|yield|get|set|value)\\b"
            },
            { token: "keyword.operator.vala", regex: "\\b(?:typeof|is|as)\\b" },
            {
              token: "keyword.operator.comparison.vala",
              regex: "==|!=|<=|>=|<>|<|>"
            },
            { token: "keyword.operator.assignment.vala", regex: "=" },
            {
              token: "keyword.operator.increment-decrement.vala",
              regex: "\\-\\-|\\+\\+"
            },
            {
              token: "keyword.operator.arithmetic.vala",
              regex: "\\-|\\+|\\*|\\/|%"
            },
            { token: "keyword.operator.logical.vala", regex: "!|&&|\\|\\|" },
            {
              token: "keyword.operator.dereference.vala",
              regex: "\\.(?=\\S)",
              originalRegex: "(?<=\\S)\\.(?=\\S)"
            },
            { token: "punctuation.terminator.vala", regex: ";" },
            { token: "keyword.operator.ownership", regex: "owned|unowned" }
          ],
          "#methods": [
            {
              token: "meta.method.vala",
              regex: "(?!new)(?=\\w.*\\s+)(?=[^=]+\\()",
              push: [
                { token: "paren.vala", regex: "}|(?=;)", next: "pop" },
                { include: "#storage-modifiers" },
                {
                  token: [
                    "entity.name.function.vala",
                    "meta.method.identifier.vala"
                  ],
                  regex: "([\\~\\w\\.]+)(\\s*\\()",
                  push: [
                    {
                      token: "meta.method.identifier.vala",
                      regex: "\\)",
                      next: "pop"
                    },
                    { include: "#parameters" },
                    { defaultToken: "meta.method.identifier.vala" }
                  ]
                },
                {
                  token: "meta.method.return-type.vala",
                  regex: "(?=\\w.*\\s+\\w+\\s*\\()",
                  push: [
                    {
                      token: "meta.method.return-type.vala",
                      regex: "(?=\\w+\\s*\\()",
                      next: "pop"
                    },
                    { include: "#all-types" },
                    { defaultToken: "meta.method.return-type.vala" }
                  ]
                },
                { include: "#throws" },
                {
                  token: "paren.vala",
                  regex: "{",
                  push: [
                    { token: "paren.vala", regex: "(?=})", next: "pop" },
                    { include: "#code" },
                    { defaultToken: "meta.method.body.vala" }
                  ]
                },
                { defaultToken: "meta.method.vala" }
              ]
            }
          ],
          "#namespace": [
            {
              token: "text",
              regex: "^(?=\\s*[A-Z0-9_]+\\s*(?:{|\\(|,))",
              push: [
                { token: "text", regex: "(?=;|})", next: "pop" },
                {
                  token: "constant.other.namespace.vala",
                  regex: "\\w+",
                  push: [
                    {
                      token: "meta.namespace.vala",
                      regex: "(?=,|;|})",
                      next: "pop"
                    },
                    { include: "#parens" },
                    {
                      token: "text",
                      regex: "{",
                      push: [
                        { token: "text", regex: "}", next: "pop" },
                        { include: "#code" }
                      ]
                    },
                    { defaultToken: "meta.namespace.vala" }
                  ]
                }
              ],
              comment:
                "This is not quite right. See the class grammar right now"
            }
          ],
          "#object-types": [
            {
              token: "storage.type.generic.vala",
              regex: "\\b(?:[a-z]\\w*\\.)*[A-Z]+\\w*<",
              push: [
                {
                  token: "storage.type.generic.vala",
                  regex: ">|[^\\w\\s,\\?<\\[()\\]]",
                  TODO: "FIXME: regexp doesn't have js equivalent",
                  originalRegex: ">|[^\\w\\s,\\?<\\[(?:[,]+)\\]]",
                  next: "pop"
                },
                { include: "#object-types" },
                {
                  token: "storage.type.generic.vala",
                  regex: "<",
                  push: [
                    {
                      token: "storage.type.generic.vala",
                      regex: ">|[^\\w\\s,\\[\\]<]",
                      next: "pop"
                    },
                    { defaultToken: "storage.type.generic.vala" }
                  ],
                  comment:
                    "This is just to support <>'s with no actual type prefix"
                },
                { defaultToken: "storage.type.generic.vala" }
              ]
            },
            {
              token: "storage.type.object.array.vala",
              regex: "\\b(?:[a-z]\\w*\\.)*[A-Z]+\\w*(?=\\[)",
              push: [
                {
                  token: "storage.type.object.array.vala",
                  regex: "(?=[^\\]\\s])",
                  next: "pop"
                },
                {
                  token: "text",
                  regex: "\\[",
                  push: [
                    { token: "text", regex: "\\]", next: "pop" },
                    { include: "#code" }
                  ]
                },
                { defaultToken: "storage.type.object.array.vala" }
              ]
            },
            {
              token: [
                "storage.type.vala",
                "keyword.operator.dereference.vala",
                "storage.type.vala"
              ],
              regex: "\\b(?:([a-z]\\w*)(\\.))*([A-Z]+\\w*\\b)"
            }
          ],
          "#object-types-inherited": [
            {
              token: "entity.other.inherited-class.vala",
              regex: "\\b(?:[a-z]\\w*\\.)*[A-Z]+\\w*<",
              push: [
                {
                  token: "entity.other.inherited-class.vala",
                  regex: ">|[^\\w\\s,<]",
                  next: "pop"
                },
                { include: "#object-types" },
                {
                  token: "storage.type.generic.vala",
                  regex: "<",
                  push: [
                    {
                      token: "storage.type.generic.vala",
                      regex: ">|[^\\w\\s,<]",
                      next: "pop"
                    },
                    { defaultToken: "storage.type.generic.vala" }
                  ],
                  comment:
                    "This is just to support <>'s with no actual type prefix"
                },
                { defaultToken: "entity.other.inherited-class.vala" }
              ]
            },
            {
              token: [
                "entity.other.inherited-class.vala",
                "keyword.operator.dereference.vala",
                "entity.other.inherited-class.vala"
              ],
              regex: "\\b(?:([a-z]\\w*)(\\.))*([A-Z]+\\w*)"
            }
          ],
          "#parameters": [
            { token: "storage.modifier.vala", regex: "final" },
            { include: "#primitive-arrays" },
            { include: "#primitive-types" },
            { include: "#object-types" },
            { token: "variable.parameter.vala", regex: "\\w+" }
          ],
          "#parens": [
            {
              token: "text",
              regex: "\\(",
              push: [
                { token: "text", regex: "\\)", next: "pop" },
                { include: "#code" }
              ]
            }
          ],
          "#primitive-arrays": [
            {
              token: "storage.type.primitive.array.vala",
              regex:
                "\\b(?:bool|byte|sbyte|char|decimal|double|float|int|uint|long|ulong|object|short|ushort|string|void|int8|int16|int32|int64|uint8|uint16|uint32|uint64)(?:\\[\\])*\\b"
            }
          ],
          "#primitive-types": [
            {
              token: "storage.type.primitive.vala",
              regex:
                "\\b(?:var|bool|byte|sbyte|char|decimal|double|float|int|uint|long|ulong|object|short|ushort|string|void|signal|int8|int16|int32|int64|uint8|uint16|uint32|uint64)\\b",
              comment:
                "var is not really a primitive, but acts like one in most cases"
            }
          ],
          "#storage-modifiers": [
            {
              token: "storage.modifier.vala",
              regex:
                "\\b(?:public|private|protected|internal|static|final|sealed|virtual|override|abstract|readonly|volatile|dynamic|async|unsafe|out|ref|weak|owned|unowned|const)\\b",
              comment: "Not sure about unsafe and readonly"
            }
          ],
          "#strings": [
            {
              token: "punctuation.definition.string.begin.vala",
              regex: '@"',
              push: [
                {
                  token: "punctuation.definition.string.end.vala",
                  regex: '"',
                  next: "pop"
                },
                {
                  token: "constant.character.escape.vala",
                  regex:
                    "\\\\.|%[\\w\\.\\-]+|\\$(?:\\w+|\\([\\w\\s\\+\\-\\*\\/]+\\))"
                },
                { defaultToken: "string.quoted.interpolated.vala" }
              ]
            },
            {
              token: "punctuation.definition.string.begin.vala",
              regex: '"',
              push: [
                {
                  token: "punctuation.definition.string.end.vala",
                  regex: '"',
                  next: "pop"
                },
                { token: "constant.character.escape.vala", regex: "\\\\." },
                {
                  token: "constant.character.escape.vala",
                  regex: "%[\\w\\.\\-]+"
                },
                { defaultToken: "string.quoted.double.vala" }
              ]
            },
            {
              token: "punctuation.definition.string.begin.vala",
              regex: "'",
              push: [
                {
                  token: "punctuation.definition.string.end.vala",
                  regex: "'",
                  next: "pop"
                },
                { token: "constant.character.escape.vala", regex: "\\\\." },
                { defaultToken: "string.quoted.single.vala" }
              ]
            },
            {
              token: "punctuation.definition.string.begin.vala",
              regex: '"""',
              push: [
                {
                  token: "punctuation.definition.string.end.vala",
                  regex: '"""',
                  next: "pop"
                },
                {
                  token: "constant.character.escape.vala",
                  regex: "%[\\w\\.\\-]+"
                },
                { defaultToken: "string.quoted.triple.vala" }
              ]
            }
          ],
          "#throws": [
            {
              token: "storage.modifier.vala",
              regex: "throws",
              push: [
                {
                  token: "meta.throwables.vala",
                  regex: "(?={|;)",
                  next: "pop"
                },
                { include: "#object-types" },
                { defaultToken: "meta.throwables.vala" }
              ]
            }
          ],
          "#values": [
            { include: "#strings" },
            { include: "#object-types" },
            { include: "#constants-and-special-vars" }
          ]
        }),
          this.normalizeRules();
      };
    (s.metaData = {
      comment:
        "Based heavily on the Java bundle's language syntax. TODO:\n* Closures\n* Delegates\n* Properties: Better support for properties.\n* Annotations\n* Error domains\n* Named arguments\n* Array slicing, negative indexes, multidimensional\n* construct blocks\n* lock blocks?\n* regex literals\n* DocBlock syntax highlighting. (Currently importing javadoc)\n* Folding rule for comments.\n",
      fileTypes: ["vala"],
      foldingStartMarker: "(\\{\\s*(//.*)?$|^\\s*// \\{\\{\\{)",
      foldingStopMarker: "^\\s*(\\}|// \\}\\}\\}$)",
      name: "Vala",
      scopeName: "source.vala"
    }),
      r.inherits(s, i),
      (t.ValaHighlightRules = s);
  }
),
  ace.define(
    "ace/mode/folding/cstyle",
    [
      "require",
      "exports",
      "module",
      "ace/lib/oop",
      "ace/range",
      "ace/mode/folding/fold_mode"
    ],
    function(e, t, n) {
      "use strict";
      var r = e("../../lib/oop"),
        i = e("../../range").Range,
        s = e("./fold_mode").FoldMode,
        o = (t.FoldMode = function(e) {
          e &&
            ((this.foldingStartMarker = new RegExp(
              this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)
            )),
            (this.foldingStopMarker = new RegExp(
              this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end)
            )));
        });
      r.inherits(o, s),
        function() {
          (this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/),
            (this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/),
            (this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/),
            (this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/),
            (this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/),
            (this._getFoldWidgetBase = this.getFoldWidget),
            (this.getFoldWidget = function(e, t, n) {
              var r = e.getLine(n);
              if (
                this.singleLineBlockCommentRe.test(r) &&
                !this.startRegionRe.test(r) &&
                !this.tripleStarBlockCommentRe.test(r)
              )
                return "";
              var i = this._getFoldWidgetBase(e, t, n);
              return !i && this.startRegionRe.test(r) ? "start" : i;
            }),
            (this.getFoldWidgetRange = function(e, t, n, r) {
              var i = e.getLine(n);
              if (this.startRegionRe.test(i))
                return this.getCommentRegionBlock(e, i, n);
              var s = i.match(this.foldingStartMarker);
              if (s) {
                var o = s.index;
                if (s[1]) return this.openingBracketBlock(e, s[1], n, o);
                var u = e.getCommentFoldRange(n, o + s[0].length, 1);
                return (
                  u &&
                    !u.isMultiLine() &&
                    (r
                      ? (u = this.getSectionRange(e, n))
                      : t != "all" && (u = null)),
                  u
                );
              }
              if (t === "markbegin") return;
              var s = i.match(this.foldingStopMarker);
              if (s) {
                var o = s.index + s[0].length;
                return s[1]
                  ? this.closingBracketBlock(e, s[1], n, o)
                  : e.getCommentFoldRange(n, o, -1);
              }
            }),
            (this.getSectionRange = function(e, t) {
              var n = e.getLine(t),
                r = n.search(/\S/),
                s = t,
                o = n.length;
              t += 1;
              var u = t,
                a = e.getLength();
              while (++t < a) {
                n = e.getLine(t);
                var f = n.search(/\S/);
                if (f === -1) continue;
                if (r > f) break;
                var l = this.getFoldWidgetRange(e, "all", t);
                if (l) {
                  if (l.start.row <= s) break;
                  if (l.isMultiLine()) t = l.end.row;
                  else if (r == f) break;
                }
                u = t;
              }
              return new i(s, o, u, e.getLine(u).length);
            }),
            (this.getCommentRegionBlock = function(e, t, n) {
              var r = t.search(/\s*$/),
                s = e.getLength(),
                o = n,
                u = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,
                a = 1;
              while (++n < s) {
                t = e.getLine(n);
                var f = u.exec(t);
                if (!f) continue;
                f[1] ? a-- : a++;
                if (!a) break;
              }
              var l = n;
              if (l > o) return new i(o, r, l, t.length);
            });
        }.call(o.prototype);
    }
  ),
  ace.define(
    "ace/mode/matching_brace_outdent",
    ["require", "exports", "module", "ace/range"],
    function(e, t, n) {
      "use strict";
      var r = e("../range").Range,
        i = function() {};
      (function() {
        (this.checkOutdent = function(e, t) {
          return /^\s+$/.test(e) ? /^\s*\}/.test(t) : !1;
        }),
          (this.autoOutdent = function(e, t) {
            var n = e.getLine(t),
              i = n.match(/^(\s*\})/);
            if (!i) return 0;
            var s = i[1].length,
              o = e.findMatchingBracket({ row: t, column: s });
            if (!o || o.row == t) return 0;
            var u = this.$getIndent(e.getLine(o.row));
            e.replace(new r(t, 0, t, s - 1), u);
          }),
          (this.$getIndent = function(e) {
            return e.match(/^\s*/)[0];
          });
      }.call(i.prototype),
        (t.MatchingBraceOutdent = i));
    }
  ),
  ace.define(
    "ace/mode/vala",
    [
      "require",
      "exports",
      "module",
      "ace/lib/oop",
      "ace/mode/text",
      "ace/tokenizer",
      "ace/mode/vala_highlight_rules",
      "ace/mode/folding/cstyle",
      "ace/mode/behaviour/cstyle",
      "ace/mode/folding/cstyle",
      "ace/mode/matching_brace_outdent"
    ],
    function(e, t, n) {
      "use strict";
      var r = e("../lib/oop"),
        i = e("./text").Mode,
        s = e("../tokenizer").Tokenizer,
        o = e("./vala_highlight_rules").ValaHighlightRules,
        u = e("./folding/cstyle").FoldMode,
        a = e("./behaviour/cstyle").CstyleBehaviour,
        f = e("./folding/cstyle").FoldMode,
        l = e("./matching_brace_outdent").MatchingBraceOutdent,
        c = function() {
          (this.HighlightRules = o),
            (this.$outdent = new l()),
            (this.$behaviour = new a()),
            (this.foldingRules = new f());
        };
      r.inherits(c, i),
        function() {
          (this.lineCommentStart = "//"),
            (this.blockComment = { start: "/*", end: "*/" }),
            (this.getNextLineIndent = function(e, t, n) {
              var r = this.$getIndent(t),
                i = this.getTokenizer().getLineTokens(t, e),
                s = i.tokens,
                o = i.state;
              if (s.length && s[s.length - 1].type == "comment") return r;
              if (e == "start" || e == "no_regex") {
                var u = t.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/);
                u && (r += n);
              } else if (e == "doc-start") {
                if (o == "start" || o == "no_regex") return "";
                var u = t.match(/^\s*(\/?)\*/);
                u && (u[1] && (r += " "), (r += "* "));
              }
              return r;
            }),
            (this.checkOutdent = function(e, t, n) {
              return this.$outdent.checkOutdent(t, n);
            }),
            (this.autoOutdent = function(e, t, n) {
              this.$outdent.autoOutdent(t, n);
            }),
            (this.$id = "ace/mode/vala");
        }.call(c.prototype),
        (t.Mode = c);
    }
  );
(function() {
  ace.require(["ace/mode/vala"], function(m) {
    if (typeof module == "object" && typeof exports == "object" && module) {
      module.exports = m;
    }
  });
})();
