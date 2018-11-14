define([
  "../node_modules/@polymer/polymer/polymer-legacy.js",
  "./paper-search-bar.js",
  "./paper-filter-dialog.js"
], function(_polymerLegacy) {
  "use strict";
  (0, _polymerLegacy.Polymer)({
    is: "paper-search-panel",
    properties: {
      search: { type: String, observer: "_onChangeRequest", notify: !0 },
      filters: Object,
      selectedFilters: {
        type: Object,
        observer: "_onChangeRequest",
        notify: !0,
        value: {}
      },
      items: Array,
      hasMore: { type: Boolean, value: !1 },
      loading: { type: Boolean, value: !1 },
      hideFilterButton: { type: Boolean, value: !1 },
      count: { type: Number, notify: !0, value: 20 },
      icon: { type: String, value: "search" },
      placeholder: { type: String, value: "Search" },
      noResultsText: { type: String, value: "No matching results found." },
      moreButton: { type: String, value: "More" },
      resetButton: String,
      saveButton: String,
      noValuesLabel: String,
      _hasItems: {
        type: Boolean,
        computed: "_computeHasItems(items)",
        value: !1
      }
    },
    getPaperSearchBarInstance: function getPaperSearchBarInstance() {
      return this.$.paperSearchBar;
    },
    _loadMore: function _loadMore() {
      this.count += 20;
      this._updateData();
    },
    _computeHasItems: function _computeHasItems(items) {
      return "undefined" !== typeof items && 0 < items.length;
    },
    _showNoResults: function _showNoResults(_hasItems, loading) {
      return !_hasItems && !loading;
    },
    _onChangeRequest: function _onChangeRequest(newValue, oldValue) {
      if ("undefined" !== typeof oldValue) {
        this.count = 20;
        this._updateData();
      }
    },
    _updateData: function _updateData() {
      this.fire("change-request-params");
    },
    _onFilter: function _onFilter() {
      this.$.filterDialog.open();
    },
    _onSearch: function _onSearch() {
      this.fire("search");
    },
    _getNrSelectedFilters: function _getNrSelectedFilters(selectedFilters) {
      if (0 >= Object.keys(selectedFilters).length) {
        return 0;
      }
      var nrSelectedFilters = Object.keys(selectedFilters)
        .map(function(key) {
          return selectedFilters[key].length;
        })
        .reduce(function(sum, value) {
          return sum + value;
        });
      return nrSelectedFilters;
    },
    _disableFilterButton: function _disableFilterButton(filters) {
      return !(filters && 0 < filters.length);
    }
  });
});