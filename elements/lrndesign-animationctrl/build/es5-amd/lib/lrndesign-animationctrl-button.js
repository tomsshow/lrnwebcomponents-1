define([
  "../node_modules/@polymer/polymer/polymer-legacy.js",
  "@polymer/paper-button/paper-button.js",
  "../node_modules/@lrnwebcomponents/lrn-icons/lrn-icons.js"
], function(_polymerLegacy) {
  "use strict";
  function _templateObject_fa0df980e70611e88ac23bfd25a79b74() {
    var data = babelHelpers.taggedTemplateLiteral([
      '\n    <style>\n      :host {\n        display: block;\n      }\n      paper-button {\n        @apply --animationctrl-button;\n      }\n    </style>\n    <paper-button raised="" id="[[name]]">\n      [[name]] \n      <template is="dom-if" if="[[icon]]">\n        <lrn-icon icon="[[icon]]"></lrn-icon>\n      </template>\n    </paper-button>\n'
    ]);
    _templateObject_fa0df980e70611e88ac23bfd25a79b74 = function() {
      return data;
    };
    return data;
  }
  (0, _polymerLegacy.Polymer)({
    _template: (0, _polymerLegacy.html)(
      _templateObject_fa0df980e70611e88ac23bfd25a79b74()
    ),
    is: "lrndesign-animationctrl-button",
    properties: { name: String, icon: String },
    ready: function ready() {
      var root = this;
      root.shadowRoot
        .querySelector("paper-button")
        .addEventListener("click", function(e) {
          e.preventDefault();
          root.fire("lrndesign-animationctrl-click", { button: root.name });
        });
    }
  });
});