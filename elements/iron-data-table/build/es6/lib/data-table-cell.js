import {
  html,
  Polymer
} from "../node_modules/@polymer/polymer/polymer-legacy.js";
import * as async from "../node_modules/@polymer/polymer/lib/utils/async.js";
import "./data-table-templatizer-behavior.js";
Polymer({
  _template: html`
    <style>
      :host {
        flex: 1 0 100px;
        padding: 0 24px 0 24px;
        min-height: 10px; /* Prevent iron-list from looping when item height is really small */
        height: 48px;
        display: flex;
        align-items: center;
        overflow: hidden;
        transition: flex-basis 200ms, flex-grow 200ms;
      }

      :host([header]) {
        height: 56px;
      }

      :host([hidden]) {
        display: none;
      }
    </style>
    <slot></slot>
`,
  is: "data-table-cell",
  behaviors: [saulis.DataTableTemplatizerBehavior],
  properties: {
    alignRight: Boolean,
    column: Object,
    flex: Number,
    header: Boolean,
    hidden: Boolean,
    order: Number,
    template: Object,
    width: String,
    beforeBind: {
      type: Object,
      value: function() {
        return function() {};
      }
    }
  },
  observers: [
    "_beforeBind(beforeBind, column.*, index, item.*, expanded, selected)",
    "_beforeBindHeader(beforeBind, column.*)",
    "_alignRightChanged(alignRight)",
    "_columnChanged(_instance, column)",
    "_columnPathChanged(_instance, column.*)",
    "_flexChanged(flex)",
    "_hiddenChanged(hidden)",
    "_orderChanged(order)",
    "_widthChanged(width)"
  ],
  attached: function() {
    if (!(void 0).useNativeShadow) {
      window.StyleTransformer.dom(
        this,
        "iron-data-table",
        this._scopeCssViaAttr,
        !0
      );
      if (this.domHost) {
        window.StyleTransformer.dom(
          this,
          this.domHost.tagName.toLowerCase(),
          this._scopeCssViaAttr,
          !1
        );
      }
    }
  },
  _alignRightChanged: function(alignRight) {
    this.style.flexDirection = alignRight ? "row-reverse" : "row";
  },
  _beforeBind: function(beforeBind, column, index, item, expanded, selected) {
    var data = {
      column: column.base,
      index: index,
      item: item.base,
      expanded: expanded,
      selected: selected
    };
    beforeBind(data, this);
  },
  _beforeBindHeader: function(beforeBind, column) {
    if (this.header) {
      var data = { column: column.base };
      beforeBind(data, this);
    }
  },
  _hiddenChanged: function(hidden) {
    this.toggleAttribute("hidden", hidden);
  },
  _orderChanged: function(order) {
    this.style.order = order;
  },
  _flexChanged: function(flex) {
    this.style.flexGrow = flex;
  },
  _widthChanged: function(width) {
    this.style.flexBasis = width;
  },
  _columnChanged: function(instance, column) {
    instance.column = column;
  },
  _columnPathChanged: function(instance, column) {
    async.microTask.run(() => {
      this._parentProps = this._parentProps || {};
      instance.notifyPath(column.path, column.value);
    });
  }
});