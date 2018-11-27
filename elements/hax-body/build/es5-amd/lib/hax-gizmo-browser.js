define([
  "../node_modules/@polymer/polymer/polymer-legacy.js",
  "../node_modules/@polymer/polymer/lib/utils/async.js",
  "../node_modules/@polymer/iron-list/iron-list.js",
  "../node_modules/@polymer/paper-input/paper-input.js",
  "../node_modules/@lrnwebcomponents/grafitto-filter/grafitto-filter.js",
  "../node_modules/@lrnwebcomponents/dropdown-select/dropdown-select.js",
  "../node_modules/@lrnwebcomponents/simple-colors/simple-colors.js",
  "./hax-gizmo-browser-item.js"
], function(
  _polymerLegacy,
  async,
  _ironList,
  _paperInput,
  _grafittoFilter,
  _dropdownSelect,
  _simpleColors,
  _haxGizmoBrowserItem
) {
  "use strict";
  async = babelHelpers.interopRequireWildcard(async);
  function _templateObject_9ab4c370f1e611e8b3a2e3a031c18fd0() {
    var data = babelHelpers.taggedTemplateLiteral([
      '\n    <style is="custom-style">\n      :host {\n        display: block;\n      }\n      hax-gizmo-browser-item {\n        margin: 10px;\n        -webkit-transition: .3s all linear;\n        transition: .3s all linear;\n      }\n      #ironlist {\n        min-height: 50vh;\n        margin: 0;\n      }\n      .title {\n        text-align: center;\n        padding: 16px 0;\n        margin: 0 64px 0 0;\n        font-size: 32px;\n        font-weight: bold;\n        color: var(--simple-colors-light-green-background1);\n        font-family: sans-serif;\n        text-transform: uppercase;\n        display: inline-flex;\n      }\n      dropdown-select {\n        color: #FFFFFF;\n        --paper-input-container-invalid-color: var(--simple-colors-red-foreground3);\n        --paper-input-container-input-color: #FFFFFF;\n        --paper-input-container-color: #FFFFFF;\n        --paper-input-container-focus-color: var(--simple-colors-light-green-background1);\n        --paper-listbox-color: #000000;\n      }\n      paper-item {\n        --secondary-text-color: #000000;\n        --primary-text-color: #000000;\n      }\n      paper-input {\n        color: #FFFFFF;\n        --paper-input-container-invalid-color: var(--simple-colors-red-foreground3);\n        --secondary-text-color: #FFFFFF;\n        --primary-text-color: #FFFFFF;\n        --paper-input-container-input-color: #FFFFFF;\n        --paper-input-container-color: #FFFFFF;\n        --paper-input-container-focus-color: var(--simple-colors-light-green-background1);\n      }\n      app-toolbar {\n        background-color: rgba(0,0,0,.5);\n      }\n      .toolbar-inner {\n        width: 100%;\n        display: inline-flex;\n      }\n    </style>\n    <app-toolbar>\n      <div class="toolbar-inner">\n        <h3 class="title">[[title]]</h3>\n        <dropdown-select id="filtertype" label="Filter by" value="title">\n          <paper-item value="title">Title</paper-item>\n        </dropdown-select>\n        <paper-input label="Filter" id="inputfilter" aria-controls="filter" value="" always-float-label=""></paper-input>\n      </div>\n    </app-toolbar>\n    <grafitto-filter id="filter" items="[[__gizmoList]]" like="" where="title" as="filtered">\n      <template>\n        <iron-list id="ironlist" items="[[filtered]]" as="gizmo" grid>\n          <template>\n            <div class="gizmo-container">\n              <hax-gizmo-browser-item index="[[gizmo.index]]" title="[[gizmo.title]]" tag="[[gizmo.tag]]" icon="[[gizmo.icon]]" image="[[gizmo.image]]" color="[[gizmo.color]]" author="[[gizmo.author]]" teaser="[[gizmo.teaser]]" description="[[gizmo.description]]" examples="[[gizmo.examples]]" status="[[gizmo.status]]"></hax-gizmo-browser-item>\n            </div>\n          </template>\n        </iron-list>\n      </template>\n    </grafitto-filter>\n'
    ]);
    _templateObject_9ab4c370f1e611e8b3a2e3a031c18fd0 = function _templateObject_9ab4c370f1e611e8b3a2e3a031c18fd0() {
      return data;
    };
    return data;
  }
  (0, _polymerLegacy.Polymer)({
    _template: (0, _polymerLegacy.html)(
      _templateObject_9ab4c370f1e611e8b3a2e3a031c18fd0()
    ),
    is: "hax-gizmo-browser",
    behaviors: [simpleColorsBehaviors],
    properties: {
      search: { type: String },
      title: { type: String, value: "Make" }
    },
    attached: function attached() {
      var _this = this;
      this.resetBrowser();
      this.shadowRoot
        .querySelector("#inputfilter")
        .addEventListener("value-changed", function(e) {
          _this.shadowRoot.querySelector("#filter").like = e.target.value;
        });
      this.shadowRoot
        .querySelector("#filtertype")
        .addEventListener("change", function(e) {
          _this.shadowRoot.querySelector("#inputfilter").value = "";
          _this.shadowRoot.querySelector("#filter").where = e.detail.value;
          _this.shadowRoot.querySelector("#filter").like = "";
        });
      document.body.addEventListener(
        "hax-store-property-updated",
        this._haxStorePropertyUpdated.bind(this)
      );
    },
    detached: function detached() {
      document.body.removeEventListener(
        "hax-store-property-updated",
        this._haxStorePropertyUpdated.bind(this)
      );
    },
    _haxStorePropertyUpdated: function _haxStorePropertyUpdated(e) {
      if (
        e.detail &&
        babelHelpers.typeof(e.detail.value) !==
          ("undefined" === typeof void 0
            ? "undefined"
            : babelHelpers.typeof(void 0)) &&
        e.detail.property
      ) {
        this.set(e.detail.property, e.detail.value);
      }
    },
    resetBrowser: function resetBrowser() {
      var _this2 = this;
      if (
        babelHelpers.typeof(this.$.filter) !==
        ("undefined" === typeof void 0
          ? "undefined"
          : babelHelpers.typeof(void 0))
      ) {
        async.microTask.run(function() {
          _this2.set("__gizmoList", window.HaxStore.instance.gizmoList);
          if (_this2.$.filter.shadowRoot.querySelector("#ironlist")) {
            _this2.$.filter.shadowRoot.querySelector("#ironlist").filtered =
              _this2.__gizmoList;
          }
          _this2.$.inputfilter.value = "";
          _this2.$.filtertype.value = "title";
          _this2.$.filter.value = "";
          _this2.$.filter.filter();
          _this2.$.filter.where = "title";
          _this2.$.filter.like = "";
          setTimeout(function() {
            if (_this2.$.filter.shadowRoot.querySelector("#ironlist")) {
              _this2.$.filter.shadowRoot
                .querySelector("#ironlist")
                .fire("iron-resize");
              window.dispatchEvent(new Event("resize"));
            }
          }, 100);
        });
      }
    }
  });
});