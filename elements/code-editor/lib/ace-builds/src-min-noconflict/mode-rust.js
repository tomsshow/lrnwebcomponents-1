ace.define(
  "ace/mode/rust_highlight_rules",
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
      s = /\\(?:[nrt0'"\\]|x[\da-fA-F]{2}|u\{[\da-fA-F]{6}\})/.source,
      o = function() {
        (this.$rules = {
          start: [
            {
              token: "variable.other.source.rust",
              regex: "'[a-zA-Z_][a-zA-Z0-9_]*(?![\\'])"
            },
            {
              token: "string.quoted.single.source.rust",
              regex: "'(?:[^'\\\\]|" + s + ")'"
            },
            {
              stateName: "bracketedComment",
              onMatch: function(e, t, n) {
                return (
                  n.unshift(this.next, e.length - 1, t),
                  "string.quoted.raw.source.rust"
                );
              },
              regex: /r#*"/,
              next: [
                {
                  onMatch: function(e, t, n) {
                    var r = "string.quoted.raw.source.rust";
                    return (
                      e.length >= n[1]
                        ? (e.length > n[1] && (r = "invalid"),
                          n.shift(),
                          n.shift(),
                          (this.next = n.shift()))
                        : (this.next = ""),
                      r
                    );
                  },
                  regex: /"#*/,
                  next: "start"
                },
                { defaultToken: "string.quoted.raw.source.rust" }
              ]
            },
            {
              token: "string.quoted.double.source.rust",
              regex: '"',
              push: [
                {
                  token: "string.quoted.double.source.rust",
                  regex: '"',
                  next: "pop"
                },
                { token: "constant.character.escape.source.rust", regex: s },
                { defaultToken: "string.quoted.double.source.rust" }
              ]
            },
            {
              token: [
                "keyword.source.rust",
                "text",
                "entity.name.function.source.rust"
              ],
              regex: "\\b(fn)(\\s+)([a-zA-Z_][a-zA-Z0-9_]*)"
            },
            { token: "support.constant", regex: "\\b[a-zA-Z_][\\w\\d]*::" },
            {
              token: "keyword.source.rust",
              regex:
                "\\b(?:abstract|alignof|as|become|box|break|catch|continue|const|crate|default|do|dyn|else|enum|extern|for|final|if|impl|in|let|loop|macro|match|mod|move|mut|offsetof|override|priv|proc|pub|pure|ref|return|self|sizeof|static|struct|super|trait|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\\b"
            },
            {
              token: "storage.type.source.rust",
              regex:
                "\\b(?:Self|isize|usize|char|bool|u8|u16|u32|u64|u128|f16|f32|f64|i8|i16|i32|i64|i128|str|option|either|c_float|c_double|c_void|FILE|fpos_t|DIR|dirent|c_char|c_schar|c_uchar|c_short|c_ushort|c_int|c_uint|c_long|c_ulong|size_t|ptrdiff_t|clock_t|time_t|c_longlong|c_ulonglong|intptr_t|uintptr_t|off_t|dev_t|ino_t|pid_t|mode_t|ssize_t)\\b"
            },
            { token: "variable.language.source.rust", regex: "\\bself\\b" },
            { token: "comment.line.doc.source.rust", regex: "//!.*$" },
            { token: "comment.line.double-dash.source.rust", regex: "//.*$" },
            {
              token: "comment.start.block.source.rust",
              regex: "/\\*",
              stateName: "comment",
              push: [
                {
                  token: "comment.start.block.source.rust",
                  regex: "/\\*",
                  push: "comment"
                },
                {
                  token: "comment.end.block.source.rust",
                  regex: "\\*/",
                  next: "pop"
                },
                { defaultToken: "comment.block.source.rust" }
              ]
            },
            {
              token: "keyword.operator",
              regex: /\$|[-=]>|[-+%^=!&|<>]=?|[*/](?![*/])=?/
            },
            { token: "punctuation.operator", regex: /[?:,;.]/ },
            { token: "paren.lparen", regex: /[\[({]/ },
            { token: "paren.rparen", regex: /[\])}]/ },
            {
              token: "constant.language.source.rust",
              regex: "\\b(?:true|false|Some|None|Ok|Err)\\b"
            },
            {
              token: "support.constant.source.rust",
              regex:
                "\\b(?:EXIT_FAILURE|EXIT_SUCCESS|RAND_MAX|EOF|SEEK_SET|SEEK_CUR|SEEK_END|_IOFBF|_IONBF|_IOLBF|BUFSIZ|FOPEN_MAX|FILENAME_MAX|L_tmpnam|TMP_MAX|O_RDONLY|O_WRONLY|O_RDWR|O_APPEND|O_CREAT|O_EXCL|O_TRUNC|S_IFIFO|S_IFCHR|S_IFBLK|S_IFDIR|S_IFREG|S_IFMT|S_IEXEC|S_IWRITE|S_IREAD|S_IRWXU|S_IXUSR|S_IWUSR|S_IRUSR|F_OK|R_OK|W_OK|X_OK|STDIN_FILENO|STDOUT_FILENO|STDERR_FILENO)\\b"
            },
            {
              token: "meta.preprocessor.source.rust",
              regex: "\\b\\w\\(\\w\\)*!|#\\[[\\w=\\(\\)_]+\\]\\b"
            },
            {
              token: "constant.numeric.source.rust",
              regex: /\b(?:0x[a-fA-F0-9_]+|0o[0-7_]+|0b[01_]+|[0-9][0-9_]*(?!\.))(?:[iu](?:size|8|16|32|64|128))?\b/
            },
            {
              token: "constant.numeric.source.rust",
              regex: /\b(?:[0-9][0-9_]*)(?:\.[0-9][0-9_]*)?(?:[Ee][+-][0-9][0-9_]*)?(?:f32|f64)?\b/
            }
          ]
        }),
          this.normalizeRules();
      };
    (o.metaData = {
      fileTypes: ["rs", "rc"],
      foldingStartMarker:
        "^.*\\bfn\\s*(\\w+\\s*)?\\([^\\)]*\\)(\\s*\\{[^\\}]*)?\\s*$",
      foldingStopMarker: "^\\s*\\}",
      name: "Rust",
      scopeName: "source.rust"
    }),
      r.inherits(o, i),
      (t.RustHighlightRules = o);
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
    "ace/mode/rust",
    [
      "require",
      "exports",
      "module",
      "ace/lib/oop",
      "ace/mode/text",
      "ace/mode/rust_highlight_rules",
      "ace/mode/folding/cstyle"
    ],
    function(e, t, n) {
      "use strict";
      var r = e("../lib/oop"),
        i = e("./text").Mode,
        s = e("./rust_highlight_rules").RustHighlightRules,
        o = e("./folding/cstyle").FoldMode,
        u = function() {
          (this.HighlightRules = s),
            (this.foldingRules = new o()),
            (this.$behaviour = this.$defaultBehaviour);
        };
      r.inherits(u, i),
        function() {
          (this.lineCommentStart = "//"),
            (this.blockComment = { start: "/*", end: "*/", nestable: !0 }),
            (this.$quotes = { '"': '"' }),
            (this.$id = "ace/mode/rust");
        }.call(u.prototype),
        (t.Mode = u);
    }
  );
(function() {
  ace.require(["ace/mode/rust"], function(m) {
    if (typeof module == "object" && typeof exports == "object" && module) {
      module.exports = m;
    }
  });
})();
