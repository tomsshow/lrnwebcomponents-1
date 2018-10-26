!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("@polymer/polymer/polymer-legacy.js"),require("@polymer/neon-animation/neon-animation-behavior.js"),require("@polymer/polymer/lib/legacy/polymer.dom.js"),require("@polymer/polymer/lib/utils/async.js"),require("@polymer/neon-animation/neon-animation-runner-behavior.js")):"function"==typeof define&&define.amd?define(["@polymer/polymer/polymer-legacy.js","@polymer/neon-animation/neon-animation-behavior.js","@polymer/polymer/lib/legacy/polymer.dom.js","@polymer/polymer/lib/utils/async.js","@polymer/neon-animation/neon-animation-runner-behavior.js"],t):t(e.polymerLegacy_js,e.neonAnimationBehavior_js,e.polymer_dom_js,e.async,e.neonAnimationRunnerBehavior_js)}(this,function(e,t,n,a,i){"use strict";var o=document.createElement("div");o.setAttribute("style","display: none;"),o.innerHTML='<iron-iconset-svg size="24" name="datepicker">\n<svg><defs>\n<g id="chevron-left"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></g>\n<g id="chevron-right"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></g>\n</defs></svg>\n</iron-iconset-svg>',document.head.appendChild(o),e.Polymer({is:"datepicker-slide-from-left-animation",behaviors:[t.NeonAnimationBehavior],configure:function(e){var t=e.node;return e.transformOrigin?this.setPrefixedProperty(t,"transformOrigin",e.transformOrigin):this.setPrefixedProperty(t,"transformOrigin","0 50%"),this._effect=new KeyframeEffect(t,[{offset:0,transform:"translateX(-100%)",opacity:0},{offset:.5,transform:"translateX(-40%)",opacity:0},{offset:.8,transform:"translateX(-20%)",opacity:.6},{offset:1,transform:"none",opacity:1}],this.timingFromConfig(e)),this._effect}}),e.Polymer({is:"datepicker-slide-from-right-animation",behaviors:[t.NeonAnimationBehavior],configure:function(e){var t=e.node;return e.transformOrigin?this.setPrefixedProperty(t,"transformOrigin",e.transformOrigin):this.setPrefixedProperty(t,"transformOrigin","0 50%"),this._effect=new KeyframeEffect(t,[{offset:0,transform:"translateX(100%)",opacity:0},{offset:.5,transform:"translateX(40%)",opacity:0},{offset:.8,transform:"translateX(20%)",opacity:.6},{offset:1,transform:"none",opacity:1}],this.timingFromConfig(e)),this._effect}});var r=document.createElement("div");r.setAttribute("style","display: none;"),r.innerHTML='<dom-module id="app-datepicker">\n  <template strip-whitespace="">\n    <style>\n      :host {\n        display: block;\n        position: relative;\n        box-sizing: border-box;\n\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none;\n        background: var(--app-datepicker-bg, #fafafa);\n\n        @apply --app-datepicker;\n      }\n\n      * {\n        box-sizing: border-box;\n      }\n\n      .datepicker {\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n        -ms-flex-direction: column;\n        -webkit-flex-direction: column;\n        flex-direction: column;\n\n        position: relative;\n        width: 300px;\n        height: 384px;\n        max-height: 384px;\n      }\n      .datepicker.with-buttons {\n        height: 431px;\n        max-height: 431px;\n      }\n\n      iron-selector.selected-fulldate {\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n        -ms-flex-direction: column;\n        -webkit-flex-direction: column;\n        flex-direction: column;\n\n        min-height: 84px;\n        padding: 8px 16px;\n        color: var(--app-datepicker-selection-color, #b2dfdb);\n        background-color: var(--app-datepicker-selection-bg, #009688);\n      }\n      .selected-year.iron-selected,\n      .selected-date.iron-selected {\n        color: var(--app-datepicker-iron-selected, #fefefe);\n      }\n      .selected-year {\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n        -ms-flex-direction: row;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n        -ms-flex-align: center;\n        -webkit-align-items: center;\n        align-items: center;\n\n        font-size: 14px;\n        font-weight: 800;\n        height: 34px;\n\n        @apply --app-datepicker-selected-year;\n      }\n      .selected-date {\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n        -ms-flex-direction: row;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n        -ms-flex-align: center;\n        -webkit-align-items: center;\n        align-items: center;\n        -ms-flex: 1 1 auto;\n        -webkit-flex: 1 1 auto;\n        flex: 1 1 auto;\n\n        font-size: 32px;\n        font-weight: 800;\n\n        @apply --app-datepicker-selected-date;\n      }\n      .selected-year:hover,\n      .selected-date > div:hover {\n        cursor: pointer;\n      }\n\n      neon-animated-pages.fullcalendar {\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n        -ms-flex-direction: column;\n        -webkit-flex-direction: column;\n        flex-direction: column;\n\n        width: 100%;\n        height: 100%;\n        overflow: hidden;\n        color: var(--app-datepicker-calendar-color, #000);\n        background-color: var(--app-datepicker-calendar-bg, #fafafa);\n      }\n      .navigator {\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n        -ms-flex-direction: row;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n        -ms-flex-align: center;\n        -webkit-align-items: center;\n        align-items: center;\n        -ms-flex-pack: center;\n        -webkit-justify-content: center;\n        justify-content: center;\n\n        max-height: 46px;\n        padding: 3px 10px;\n        position: relative;\n        margin-top: 8px;\n      }\n      .nav-month-year {\n        -ms-flex: 1 1 auto;\n        -webkit-flex: 1 1 auto;\n        flex: 1 1 auto;\n\n        font-size: 14px;\n        font-weight: 500;\n        text-align: center;\n\n        @apply --app-datepicker-nav-month-year;\n      }\n      .days-of-week {\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n        -ms-flex-direction: row;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n        -ms-flex-align: center;\n        -webkit-align-items: center;\n        align-items: center;\n        -ms-flex-pack: center;\n        -webkit-justify-content: center;\n        justify-content: center;\n\n        color: var(--app-datepicker-weekdays-color, #848484);\n        font-size: 12px;\n\n        @apply --app-datepicker-days-of-week;\n      }\n      .each-days-of-week {\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n        -ms-flex-direction: row;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n        -ms-flex-align: center;\n        -webkit-align-items: center;\n        align-items: center;\n        -ms-flex-pack: center;\n        -webkit-justify-content: center;\n        justify-content: center;\n\n        padding: 13px;\n        max-height: 32px;\n        width: 41px;\n      }\n      .days-of-month {\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n        -ms-flex-direction: row;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n        -ms-flex-wrap: wrap;\n        -webkit-flex-wrap: wrap;\n        flex-wrap: wrap;\n        -ms-flex-pack: center;\n        -webkit-justify-content: center;\n        justify-content: center;\n\n        font-size: 13px;\n\n        @apply --app-datepicker-days-of-month;\n      }\n      .each-days-of-month {\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n        -ms-flex-direction: row;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n        -ms-flex-align: center;\n        -webkit-align-items: center;\n        align-items: center;\n        -ms-flex-pack: center;\n        -webkit-justify-content: center;\n        justify-content: center;\n\n        position: relative;\n        height: 35px;\n        width: 35px;\n        margin-left: 3px;\n        margin-right: 3px;\n      }\n      div > .days-of-month > .each-days-of-month.chosen-days-of-month {\n        border-radius: 50%;\n        background-color: var(--app-datepicker-selected-day-bg, #009688);\n        color: var(--app-datepicker-selected-day-color, #fff);\n      }\n      .days-of-month > .each-days-of-month.is-today {\n        color: var(--app-datepicker-today-color, #009688);\n      }\n      .days-of-month > .each-days-of-month.is-disabled-day {\n        color: var(--app-datepicker-disabled-color, #9e9e9e);\n      }\n\n\n      /* outline: none for non-selectable and disabled days */\n      .days-of-month > .each-days-of-month.is-disabled-day,\n      .days-of-month > .each-days-of-month.is-non-selectable {\n        outline: none;\n      }\n      /* Date hover styling */\n      .days-of-month > .each-days-of-month:hover:not(.is-disabled-day):not(.is-non-selectable):not(.chosen-days-of-month),\n      .days-of-month > .each-days-of-month:focus:not(.is-disabled-day):not(.is-non-selectable):not(.chosen-days-of-month) {\n        color: var(--app-datepicker-date-hover-color, #f5f5f5);\n        background-color: var(--app-datepicker-date-hover-background-color, #80cbc4);\n        border-radius: 50%;\n        cursor: pointer;\n      }\n      :host(.dark-theme) .days-of-month >  .each-days-of-month:hover:not(.is-disabled-day):not(.is-non-selectable):not(.chosen-days-of-month),\n      :host(.dark-theme) .days-of-month >  .each-days-of-month:focus:not(.is-disabled-day):not(.is-non-selectable):not(.chosen-days-of-month) {\n        color: var(--app-datepicker-date-hover-color, #777);\n        background-color: var(--app-datepicker-date-hover-background-color, #b2dfdb);\n      }\n      :host(.goog-theme) .days-of-month > .each-days-of-month:hover:not(.is-disabled-day):not(.is-non-selectable):not(.chosen-days-of-month),\n      :host(.goog-theme) .days-of-month > .each-days-of-month:focus:not(.is-disabled-day):not(.is-non-selectable):not(.chosen-days-of-month) {\n        color: var(--app-datepicker-date-hover-color, #f5f5f5);\n        background-color: var(--app-datepicker-date-hover-background-color, #e57373);\n      }\n\n      /* Focus ring styling - replace outline with background-color */\n      .each-list-of-years:focus,\n      .each-days-of-month:focus {\n        outline: 0;\n      }\n      .each-list-of-years:focus,\n      .each-list-of-years:hover,\n      .each-list-of-years.is-selected:focus,\n      .each-list-of-years.is-selected:hover {\n        font-weight: 700;\n        background-color: var(--app-datepicker-year-hover-background-color, #e0e0e0);\n\n        @apply --app-datepicker-year-hover;\n      }\n      :host(.dark-theme) .each-list-of-years:focus,\n      :host(.dark-theme) .each-list-of-years:hover,\n      :host(.dark-theme) .each-list-of-years.is-selected:focus,\n      :host(.dark-theme) .each-list-of-years.is-selected:hover {\n        font-weight: 700;\n        background-color: var(--app-datepicker-year-hover-background-color, #616161);\n\n        @apply --app-datepicker-year-hover;\n      }\n      :host(.goog-theme) .each-list-of-years:focus,\n      :host(.goog-theme) .each-list-of-years:hover,\n      :host(.goog-theme) .each-list-of-years.is-selected:focus,\n      :host(.goog-theme) .each-list-of-years.is-selected:hover {\n        font-weight: 700;\n        background-color: var(--app-datepicker-year-hover-background-color, #424242);\n\n        @apply --app-datepicker-year-hover;\n      }\n\n      .each-list-of-years {\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n        -ms-flex-direction: row;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n        -ms-flex-align: center;\n        -webkit-align-items: center;\n        align-items: center;\n        -ms-flex-pack: center;\n        -webkit-justify-content: center;\n        justify-content: center;\n\n        height: 64px;\n        font-size: 16px;\n\n        @apply --app-datepicker-each-list-of-years;\n      }\n      .each-list-of-years:hover {\n        cursor: pointer;\n      }\n      .each-list-of-years.is-selected {\n        font-size: 24px;\n        font-weight: 700;\n        color: var(--app-datepicker-selected-year-color, #009688);\n        background-color: var(--app-datepicker-selected-year-bg);\n\n        @apply --app-datepicker-selected-each-list-of-years;\n      }\n\n      /* paper-icon-button */\n      paper-icon-button {\n        color: var(--app-datepicker-icon-button-color, #737373);\n        --paper-icon-button-ink-color: var(--app-datepicker-icon-button-ink-color, #737373);\n      }\n\n      /* content tag selector */\n      .buttons {\n        display: -ms-flexbox;\n        display: -webkit-flex;\n        display: flex;\n        -ms-flex-direction: row;\n        -webkit-flex-direction: row;\n        flex-direction: row;\n        -ms-flex-pack: end;\n        -webkit-justify-content: flex-end;\n        justify-content: flex-end;\n\n        color: var(--app-datepicker-button-color, #009688);\n        position: relative;\n        padding: 8px 8px 8px 24px;\n        margin: 0;\n        font-size: 12px;\n        font-weight: 500;\n\n        --paper-button-ink-color: var(--app-datepicker-button-ink-color, #737373);\n\n        @apply --app-datepicker-buttons;\n      }\n\n      /* will-change: transform, however lag on the first time */\n      .nav-month-year,\n      .days-of-week,\n      .days-of-month {\n        will-change: transform;\n        -webkit-transform: translate3d(0px, 0px, 0px);\n                transform: translate3d(0px, 0px, 0px);\n        -webkit-backface-visibility: hidden;\n                backface-visibility: hidden;\n      }\n\n      iron-list {\n        --iron-list-items-container: {\n          -webkit-transform: translate3d(0px, 0px, 0px);\n          transform: translate3d(0px, 0px, 0px);\n          -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n        };\n      }\n\n      /* landscape */\n      @media all and (orientation: landscape) {\n        :host(.horizontal-view) #dp.datepicker,\n        :host(:not(.vertical-view)) #dp.datepicker {\n          display: -ms-flexbox;\n          display: -webkit-flex;\n          display: flex;\n          -ms-flex-direction: row;\n          -webkit-flex-direction: row;\n          flex-direction: row;\n\n          width: 512px;\n          height: 241px;\n        }\n        :host(.horizontal-view) #dp.datepicker.with-buttons,\n        :host(:not(.vertical-view)) #dp.datepicker.with-buttons {\n          height: 288px;\n        }\n        :host(.horizontal-view) iron-selector.selected-fulldate,\n        :host(:not(.vertical-view)) iron-selector.selected-fulldate {\n          /* Fixed for IE11, Edge */\n          min-width: 164px;\n          width: calc(100% / 3 + 48px);\n          max-width: 164px;\n          height: 100%;\n        }\n        :host(:not(.vertical-view)) .selected-date {\n          display: -ms-flexbox;\n          display: -webkit-flex;\n          display: flex;\n          -ms-flex-direction: column;\n          -webkit-flex-direction: column;\n          flex-direction: column;\n          -ms-flex-align: start;\n          -webkit-align-items: flex-start;\n          align-items: flex-start;\n          -ms-flex-pack: start;\n          -webkit-justify-content: flex-start;\n          justify-content: flex-start;\n        }\n        /* Fix for IE11 */\n        :host(:not(.vertical-view)) .selected-date > div {\n          width: 100%;\n          word-wrap: break-word;\n        }\n        /* Hack for Edge 12+ */\n        @supports (-ms-accelerator:true) {\n          :host(:not(.vertical-view)) .selected-date > div {\n            white-space: pre-wrap;\n          }\n        }\n\n        :host(.horizontal-view) neon-animated-pages.fullcalendar,\n        :host(:not(.vertical-view)) neon-animated-pages.fullcalendar {\n          height: 100%;\n        }\n        :host(.horizontal-view) .calendar-view,\n        :host(:not(.vertical-view)) .calendar-view {\n          padding-bottom: 0;\n        }\n        :host(.horizontal-view) .navigator,\n        :host(:not(.vertical-view)) .navigator {\n          padding: 2px 10px;\n          margin-top: 0;\n        }\n        :host(.horizontal-view) .each-days-of-week,\n        :host(:not(.vertical-view)) .each-days-of-week {\n          width: calc(100% / 7 - 20px);\n          padding: 0;\n          margin-left: 10px;\n          margin-right: 10px;\n        }\n        :host(:not(.vertical-view)) .days-of-month {\n          margin-top: 8px;\n        }\n        :host(.horizontal-view) .each-days-of-month,\n        :host(:not(.vertical-view)) .each-days-of-month {\n          height: 29px;\n          margin-left: 10px;\n          margin-right: 10px;\n          width: calc(100% / 7 - 20px);\n        }\n      }\n      /* End of landscape @media */\n\n      /* dark-theme */\n      :host(.dark-theme) {\n        background-color: var(--app-datepicker-bg, #424242);\n      }\n      :host(.dark-theme) iron-selector.selected-fulldate {\n        color: var(--app-datepicker-selection-color, #9e9e9e);\n        background-color: var(--app-datepicker-selection-bg, #555);\n      }\n      :host(.dark-theme) .selected-year.iron-selected,\n      :host(.dark-theme) .selected-date.iron-selected {\n        color: var(--app-datepicker-iron-selected, #f5f5f5);\n      }\n      :host(.dark-theme) neon-animated-pages.fullcalendar {\n        color: var(--app-datepicker-calendar-color, #f5f5f5);\n        background-color: var(--app-datepicker-calendar-bg, #424242);\n      }\n      :host(.dark-theme) .days-of-week {\n        color: var(--app-datepicker-weekdays-color, #7c7c7c);\n      }\n      :host(.dark-theme) div > .days-of-month > .each-days-of-month.chosen-days-of-month {\n        color: var(--app-datepicker-selected-day-color, #555);\n        background-color: var(--app-datepicker-selected-day-bg, #80cbc4);\n      }\n      :host(.dark-theme) .days-of-month > .each-days-of-month.is-today {\n        color: var(--app-datepicker-today-color, #80cbc4);\n      }\n      :host(.dark-theme) .days-of-month > .each-days-of-month.is-disabled-day {\n        color: var(--app-datepicker-disabled-color, #ffff00);\n      }\n      :host(.dark-theme) .each-list-of-years.is-selected {\n        background-color: var(--app-datepicker-selected-year-bg, rgba(0, 0, 0, 0));\n        color: var(--app-datepicker-selected-year-color, #80cbc4);\n        font-size: 26px;\n        font-weight: 500;\n      }\n      :host(.dark-theme) paper-icon-button {\n        color: var(--app-datepicker-icon-button-color, #ffff00);\n        --paper-icon-button-ink-color: var(--app-datepicker-icon-button-ink-color, #212121);\n      }\n      :host(.dark-theme) ::slotted(paper-button) {\n        color: var(--app-datepicker-button-color, #80cbc4);\n        --paper-button-ink-color: var(--app-datepicker-button-ink-color, #bcbcbc);\n      }\n\n      /* goog theme */\n      :host(.goog-theme) {\n        background-color: var(--app-datepicker-bg, #212121);\n      }\n\n      :host(.goog-theme) iron-selector.selected-fulldate {\n        color: var(--app-datepicker-selection-color, #fff);\n        background-color: var(--app-datepicker-selection-bg, #212121);\n      }\n      :host(.goog-theme) .selected-year.iron-selected,\n      :host(.goog-theme) .selected-date.iron-selected {\n        color: var(--app-datepicker-iron-selected, #DA4336);\n      }\n      :host(.goog-theme) neon-animated-pages.fullcalendar {\n        color: var(--app-datepicker-calendar-color, #fff);\n        background-color: var(--app-datepicker-calendar-bg, #212121);\n      }\n      :host(.goog-theme) .days-of-week {\n        color: var(--app-datepicker-weekdays-color, #9e9e9e);\n      }\n      :host(.goog-theme) div > .days-of-month > .each-days-of-month.chosen-days-of-month {\n        color: var(--app-datepicker-selected-day-color, #fff);\n        background-color: var(--app-datepicker-selected-day-bg, #DA4336);\n      }\n      :host(.goog-theme) .days-of-month > .each-days-of-month.is-today {\n        color: var(--app-datepicker-today-color, #DA4336);\n      }\n      :host(.goog-theme) .days-of-month > .each-days-of-month.is-disabled-day {\n        color: var(--app-datepicker-disabled-color, #646464);\n      }\n      :host(.goog-theme) .each-list-of-years.is-selected {\n        background-color: var(--app-datepicker-selected-year-bg, rgba(0, 0, 0, 0));\n        color: var(--app-datepicker-selected-year-color, #DA4336);\n        font-size: 26px;\n        font-weight: 500;\n      }\n      :host(.goog-theme) paper-icon-button {\n        color: var(--app-datepicker-icon-button-color, #DA4336);\n        --paper-icon-button-ink-color: var(--app-datepicker-icon-button-ink-color, #616161);\n      }\n      :host(.goog-theme) ::slotted(paper-button) {\n        color: var(--app-datepicker-button-color, #DA4336);\n        --paper-button-ink-color: var(--app-datepicker-button-ink-color, #616161);\n      }\n    </style>\n\n    <div id="dp" class="datepicker">\n      <iron-selector class="selected-fulldate" selected="{{_activeView}}" attr-for-selected="view" on-selected-changed="_onIronSelectorSelectedChanged" fallback-selection="calendar">\n        <div id="showSelectedYear" class="selected-year" tabindex="0" view="year" aria-label="year view">\n          [[_showSelectedYear]]\n        </div>\n        <div class="selected-date" view="calendar" tabindex="0">\n          <div aria-label="calendar view">[[_shortSelectedDate]]</div>\n        </div>\n      </iron-selector>\n\n      <neon-animated-pages class="fullcalendar" selected="[[_activeView]]" attr-for-selected="view" entry-animation="[[pageEntryAnimation]]" exit-animation="[[pageExitAnimation]]" on-neon-animation-finish="_onAnimationFinish">\n        <div class="calendar-view" view="calendar">\n          <div class="navigator">\n            <paper-icon-button icon="datepicker:chevron-left" on-tap="_decrementMonth" noink="[[noAnimation]]"></paper-icon-button>\n            <div id="navMonthYear" class="nav-month-year">\n              [[_activeMonthYear]]\n            </div>\n            <paper-icon-button icon="datepicker:chevron-right" on-tap="_incrementMonth" noink="[[noAnimation]]"></paper-icon-button>\n          </div>\n\n          <div id="daysOfWeek" class="days-of-week">\n            <template is="dom-repeat" items="[[_daysOfWeek]]" index-as="index" strip-whitespace="">\n              <div class="each-days-of-week">\n                [[item]]\n              </div>\n            </template>\n          </div>\n\n          <div id="daysOfMonth" class="days-of-month" on-tap="_chooseDaysOfMonth">\n            <template is="dom-repeat" items="[[_daysOfMonth]]" index-as="index" strip-whitespace="">\n              <div class$="each-days-of-month[[_isToday(item.index, _activeYear, _activeMonth)]][[_isEmptyDate(item.index)]][[_isChosenDaysOfMonth(item.index, _selectedYear, _selectedMonth, _selectedDate)]][[_isDisableDays(index, firstDayOfWeek, minDate, maxDate, item.index, _shiftedDisableDays.*, disableDates.*)]]" index="[[index]]" date="[[item.index]]" tabindex$="[[_shouldTabIndex(index, firstDayOfWeek, minDate, maxDate, item.index, _shiftedDisableDays.*, disableDates.*)]]" aria-disabled$="[[_shouldAriaDisabled(index, firstDayOfWeek, minDate, maxDate, item.index, _shiftedDisableDays.*, disableDates.*)]]" aria-label$="[[item.index]]">\n                [[item.date]]\n              </div>\n            </template>\n          </div>\n\n          <div class="buttons">\n            <slot name="dismiss-button"></slot>\n            <slot name="confirm-button"></slot>\n          </div>\n        </div>\n\n        <template is="dom-if" if="[[_isListRendered]]" restamp="true" on-dom-change="_onListRendered" strip-whitespace="">\n          <iron-list id="listOfYears" items="[[_listOfYears]]" view="year" on-neon-animation-finish="_onAnimationFinish" selection-enabled="">\n            <template strip-whitespace="">\n              <div class$="each-list-of-years[[_isListOfYearsSelected(_selectedYear, item.year)]]" tabindex$="[[tabIndex]]" aria-label$="[[item.year]]" label$="[[item.year]]" on-tap="_goCalendar" on-keydown="_goCalendar">\n                [[item.year]]\n              </div>\n            </template>\n          </iron-list>\n        </template>\n      </neon-animated-pages>\n\n    </div>\n  </template>\n\n  \n</dom-module>',document.head.appendChild(r),e.Polymer({is:"app-datepicker",behaviors:[i.NeonAnimationRunnerBehavior],properties:{locale:{type:String,value:function(){return window.Intl&&window.Intl&&window.Intl.DateTimeFormat&&window.Intl.DateTimeFormat().resolvedOptions&&window.Intl.DateTimeFormat().resolvedOptions().locale||"en-US"}},view:String,theme:String,firstDayOfWeek:{type:Number,value:0},disableDays:{type:Array,value:function(){return[6,0]}},disableDates:{type:Array,value:function(){return[]}},minDate:{type:String,value:"1000/00/01"},maxDate:{type:String,value:"9999/99/99"},format:{type:String,value:"yyyy/mm/dd"},date:{type:String,notify:!0,readOnly:!0},inputDate:String,noAnimation:Boolean,pageEntryAnimation:String,pageExitAnimation:String,showLongDate:{type:Boolean,value:!1},invalidDate:{type:Boolean,notify:!0,readOnly:!0},autoUpdateDate:{type:Boolean,value:!1},alwaysResetSelectedDateOnDialogClose:Boolean,_monthNames:{type:Array,value:function(){return["January","February","March","April","May","June","July","August","September","October","November","December"]}},_shiftedDisableDays:{type:Array,value:[6,0]},_activeMonthYear:String,_shortSelectedDate:String,_showSelectedYear:String,_daysOfWeek:Array,_daysOfMonth:Array,_listOfYears:Array,_activeView:{type:String,value:"calendar"},_activeYear:{type:Number,value:function(){return(new Date).getFullYear()}},_activeMonth:{type:Number,value:function(){return(new Date).getMonth()}},_isIncrementMonth:Boolean,_isDecrementMonth:Boolean,_selectedYear:{type:Number,value:function(){return(new Date).getFullYear()}},_selectedMonth:{type:Number,value:function(){return(new Date).getMonth()}},_selectedDate:{type:Number,value:function(){return(new Date).getDate()}},_chosenDaysOfMonth:{type:Number,value:function(){return(new Date).getDate()}},_isListRendered:{type:Boolean,value:!1},_isSelectedDateConfirmed:Boolean,_format:{type:Object,value:function(){return{y:"yyyy",m:"mm",d:"dd",s1:"/",s2:"/"}}}},observers:["_computeDaysOfMonth(_activeYear, _activeMonth, firstDayOfWeek, locale)","_computeSeparateFormat(format)","_computeShowLongDate(showLongDate, locale)","_updateToReflectExternalChange(inputDate)","_updateThemeColor(theme)","_updateDatepickerView(view)","_computeDaysOfWeek(firstDayOfWeek, locale)","_computeActiveMonthYear(_activeYear, _activeMonth, locale)","_computeShortSelectedDate(_selectedYear, _selectedMonth, _selectedDate, locale)","_computeShowSelectedYear(_selectedYear, locale)","_computeShiftedDisableDays(firstDayOfWeek, disableDays.*)"],attached:function(){this.noAnimation||(this.set("animationConfig",{incrementEntry:[{name:"slide-from-right-animation",node:this.$.daysOfWeek},{name:"slide-from-right-animation",node:this.$.daysOfMonth},{name:"datepicker-slide-from-right-animation",node:this.$.navMonthYear}],decrementEntry:[{name:"slide-from-left-animation",node:this.$.daysOfWeek},{name:"slide-from-left-animation",node:this.$.daysOfMonth},{name:"datepicker-slide-from-left-animation",node:this.$.navMonthYear}]}),this.set("pageEntryAnimation","fade-in-animation"),this.set("pageExitAnimation","fade-out-animation"));var e=this.getEffectiveChildren();if(e&&e.length>0){for(var t=0;t<e.length;t++)e[t].hasAttribute("dialog-confirm")&&(e[t].addEventListener("tap",this._updateBindDate.bind(this)),e[t].addEventListener("transitionend",this._updateBindDate.bind(this))),this._updateDistributedButtonInkColorCustomProp(e[t],"#737373");this.$.dp.classList.add("with-buttons")}else this.$.dp.classList.remove("with-buttons");this.fire("app-datepicker-attached")},_computeDaysOfMonth:function(e,t,n,a){if(window.Intl){var i=new Date(e,t,1).getDay(),o=[],r=new Date(e,t+1,0).getDate();n>0&&n<7&&(i=(i-=n)<0?7+i:i),a=a||window.Intl&&window.Intl.DateTimeFormat&&window.Intl.DateTimeFormat().resolvedOptions&&window.Intl.DateTimeFormat().resolvedOptions().locale||"en-US";for(var s=window.Intl&&window.Intl.DateTimeFormat?new window.Intl.DateTimeFormat(a,{timeZone:"UTC",day:"numeric"}).format:function(e){return e.getDate()},l=0,d=1-i;l<42;l++,d++){var c=s(Date.UTC(e,t,d)),h={date:"",index:""};l>=i&l<i+r&&(h.date=c,h.index=d),o.push(h)}this.set("_chosenDaysOfMonth",this._computeChosenDaysOfMonth(o,this._selectedDate)),this.set("_daysOfMonth",o)}},_computeShiftedDisableDays:function(e,t){e=e>0&&e<7?e:0;var n=this.disableDays.map(function(t){return(t-=e)<0?7+t:t});this.set("_shiftedDisableDays",n)},_incrementMonth:function(e){this.debounce("_incrementMonth",function(){this.set("_isIncrementMonth",!0),window.requestAnimationFrame(function(){var e=this._activeMonth;++e%12==0&&this._activeYear++,this.set("_activeMonth",e%12),this.noAnimation||(this.cancelAnimation(),this.playAnimation("incrementEntry")),this.set("_isIncrementMonth",!1)}.bind(this))},100)},_decrementMonth:function(e){this.debounce("_decrementMonth",function(){this.set("_isDecrementMonth",!0),window.requestAnimationFrame(function(){var e=this._activeMonth;--e<0&&(this._activeYear--,e=11),this.set("_activeMonth",e),this.noAnimation||(this.cancelAnimation(),this.playAnimation("decrementEntry")),this.set("_isDecrementMonth",!1)}.bind(this))},100)},_computeActiveMonthYear:function(e,t,n){if(window.Intl){n=n||window.Intl&&window.Intl.DateTimeFormat&&window.Intl.DateTimeFormat().resolvedOptions&&window.Intl.DateTimeFormat().resolvedOptions().locale||"en-US";var a=new window.Intl.DateTimeFormat(n,{timeZone:"UTC",month:"short",year:"numeric"}).format(Date.UTC(e,t,1));this.set("_activeMonthYear",a)}},_computeShortSelectedDate:function(e,t,n,a){if(window.Intl){a=a||window.Intl&&window.Intl.DateTimeFormat&&window.Intl.DateTimeFormat().resolvedOptions&&window.Intl.DateTimeFormat().resolvedOptions().locale||"en-US";var i=new window.Intl.DateTimeFormat(a,{timeZone:"UTC",weekday:"short",month:"short",day:"numeric"}).format(Date.UTC(e,t,n));this.set("_shortSelectedDate",i),this.autoUpdateDate&&this.enforceDateChange()}},_computeShowSelectedYear:function(e,t){if(window.Intl){t=t||window.Intl&&window.Intl.DateTimeFormat&&window.Intl.DateTimeFormat().resolvedOptions&&window.Intl.DateTimeFormat().resolvedOptions().locale||"en-US";var n=new window.Intl.DateTimeFormat(t,{timeZone:"UTC",year:"numeric"}).format(Date.UTC(e,0,1));this.set("_showSelectedYear",n)}},_chooseDaysOfMonth:function(e){var t=e.target;t&&this._isNumber(t.date)&&!t.classList.contains("is-disabled-day")&&(this.set("_chosenDaysOfMonth",t.index),this.set("_selectedYear",this._activeYear),this.set("_selectedDate",t.date),this.set("_selectedMonth",this._activeMonth))},_isToday:function(e,t,n){var a=new Date,i=e===a.getDate()&&t===a.getFullYear()&&n===a.getMonth();return i?" is-today":""},_isEmptyDate:function(e){return this._isNumber(e)?"":" is-non-selectable"},_isChosenDaysOfMonth:function(e,t,n,a){var i=this._chosenDaysOfMonth>=0&&this._activeYear===t&&this._activeMonth===n&&e===a;return i?" chosen-days-of-month":""},_isDisableDays:function(e,t,n,a,i){var o=!1,r=!1,s=!1,l=this._shiftedDisableDays.some(function(t){return t===e%7});if(this._isNumber(i)){var d=this._convertDateStringToDateObject(n),c=this._convertDateStringToDateObject(a),h=new Date(this._activeYear,this._activeMonth,i);d&&(o=h.getTime()<d.getTime()),c&&(r=h.getTime()>c.getTime()),s=this.disableDates&&this.disableDates.length&&this.disableDates.some(function(e){var t=this._convertDateStringToDateObject(e);return t&&h.getTime()===t.getTime()}.bind(this))}return l||s||o||r?" is-disabled-day is-non-selectable":""},_isListOfYearsSelected:function(e,t){return+e==+t?" is-selected":""},_computeDaysOfWeek:function(e,t){var n=["S","M","T","W","T","F","S"];e=e>0&&e<7?e:0;if(t&&window.Intl){n=[];for(var a=new Date,i=a.getDate()-a.getDay(),o=new window.Intl.DateTimeFormat(t,{timeZone:"UTC",weekday:"narrow"}).format,r=null,s=0;s<7;s++)r=Date.UTC(a.getFullYear(),a.getMonth(),i+s),n.push(o(r))}var l=n.slice(e),d=n.slice(0,e),c=Array.prototype.concat(l,d);this.set("_daysOfWeek",c)},_computeChosenDaysOfMonth:function(e,t){for(var n=e.length,a=0;a<n;a++)if(a>=0&&e[a].index===t)return a},_convertDateStringToDateObject:function(e){var t=e instanceof Date||"string"!=typeof e?e:new Date(e);return"Invalid Date"!==t.toDateString()?t:null},_updateList:function(e){for(var t=[],n=1900;n<=2100;n++)t.push({year:n});this.set("_listOfYears",t)},_onAnimationFinish:function(e){var t=this,n=e.detail;if(n&&"IRON-LIST"===n.toPage.tagName){var i=this._updateListScroller(n.toPage);a.microTask.run(function(){n.toPage._focusPhysicalItem(i)})}else a.microTask.run(function(){t.$.showSelectedYear.focus()})},_updateListScroller:function(e){var t=this,i=n.dom(e.root).querySelector("#items").getBoundingClientRect().height||12863.994140625,o=Math.floor(i/201*(this._activeYear-1900-2))+1;return!this.$.dp.classList.contains("with-buttons")&&window.matchMedia("(orientation: landscape)").matches&&(o=Math.floor(i/201*(this._activeYear-1900-1))+1),a.microTask.run(function(){e.scroll(0,o),e.selectItem(t._activeYear-1900)}),this._activeYear-1900},_onIronSelectorSelectedChanged:function(e){"year"===e.detail.value&&(this._isListRendered?this.noAnimation&&this._updateListScroller(this.shadowRoot.querySelector("#listOfYears")):(this._updateList(),this.set("_isListRendered",!0)))},_onListRendered:function(e){var t=this;e.target.if&&this.noAnimation&&a.microTask.run(function(){t._updateListScroller(t.shadowRoot.querySelector("#listOfYears"))})},_goCalendar:function(e){if("keydown"!==e.type||13===e.keyCode){var t=e.model.item.year;this.set("_activeYear",t),this.set("_selectedYear",t),this.shadowRoot.querySelector("#listOfYears").selectItem(t-1900),this.set("_activeView","calendar")}},_computeSeparateFormat:function(e){var t=/^(yyyy|yy|m{1,4}|d{1,2}|do)\W+(yyyy|yy|m{1,4}|d{1,2}|do)\W+(yyyy|yy|m{1,4}|d{1,2}|do)$/g.exec(e),n={},a=[];if(null!==t){a.push(t[1]),a.push(t[2]),a.push(t[3]);for(var i,o=0;o<3;o++)(i=a[o]).indexOf("y")>=0?n.y=i:i.indexOf("m")>=0?n.m=i:i.indexOf("d")>=0&&(n.d=i)}"d"in n&&"m"in n&&"y"in n&&this.set("_format",n),n=null},_bindSelectedFulldate:function(e,t,n,a){if(this.showLongDate)return this._computeShowLongDate(this.showLongDate,this.locale,!0);var i=e,o=this._monthNames[t],r=n,s=this.format;if("yy"===a.y&&(i=e%100),"mmm"===a.m?o=o.slice(0,3):"mm"===a.m?o=this._padStart(t+1,2,"0"):"m"===a.m&&(o=t+1),"do"===a.d){var l=r%10,d=l>3?"th":["th","st","nd","rd"][l];11!==r&&12!=r&&13!==r||(d="th"),r+=d}else"dd"===a.d&&(r=this._padStart(r,2,"0"));return s=(s=(s=s.replace(a.y,i)).replace(a.m,o)).replace(a.d,r)},_updateBindDate:function(e){this.debounce("_updateBindDate",function(){var t=e.type;if("tap"===t&&this.set("_isSelectedDateConfirmed",!0),("transitionend"===t||this.noAnimation)&&this._isSelectedDateConfirmed){var n=this._selectedYear,a=this._selectedMonth,i=this._selectedDate,o=this._format,r=this._bindSelectedFulldate(n,a,i,o);this._setDate(r),this.set("_isSelectedDateConfirmed",!1),this.alwaysResetSelectedDateOnDialogClose&&this.resetDate()}},1)},_computeShowLongDate:function(e,t,n){if(window.Intl&&this._selectedDate&&void 0!==this._selectedDate){var a=this._selectedDate,i=Date.UTC(this._selectedYear,this._selectedMonth,a);if(e){t=t||window.Intl&&window.Intl.DateTimeFormat&&window.Intl.DateTimeFormat().resolvedOptions&&window.Intl.DateTimeFormat().resolvedOptions().locale||"en-US";var o={timeZone:"UTC",weekday:this.showLongDate?"short":void 0,year:"numeric",month:this.showLongDate?"short":"2-digit",day:"2-digit"};if(i=new window.Intl.DateTimeFormat(t,o).format(i),n)return i;window.navigator.msManipulationViewsEnabled&&(t||""===t)&&(i=decodeURIComponent(encodeURIComponent(i).replace(/\%E2\%80\%8[0-9A-F]/gi,""))),this._setDate(i)}else{if(i=this._bindSelectedFulldate(this._selectedYear,this._selectedMonth,a,this._format),n)return i;this._setDate(i)}}},_updateToReflectExternalChange:function(e){if(this.showLongDate&&this.locale.indexOf("en")<0)this._setInvalidDate(!0);else{var t=this.showLongDate,n=0,a=0,i=function(e,t){var n={valid:!1,result:""};if(t){var a=e.split(", ");if(a.length>2){a=a[1].split(" ").join("/")+", "+a[2];var i=new Date(a);return"Invalid Date"===i.toString()?n:{valid:!0,result:i}}return n}var o=/^(\d{4})\W+(\d{1,2})\W+(\d{1,2})$/i.exec(e),r=/^(\d{4})[ ](\w+)[ ](\d{1,2})$/i.exec(e);if(null===o&&null===r)return n;var s=null;return null===o?s=new Date(r[1]+" "+r[2]+" "+r[3]):null===r&&(s=new Date(+o[1],+o[2]-1,+o[3])),{valid:!0,result:s}}(e,t);if(i.valid){if(this.alwaysResetSelectedDateOnDialogClose)return;var o=new Date(i.result);n=o.getFullYear(),a=o.getMonth();this._setInvalidDate(!1),this.set("_activeYear",n),this.set("_activeMonth",a),this.set("_selectedYear",n),this.set("_selectedMonth",a),this.set("_selectedDate",o.getDate())}else this.set("_selectedDate",this._selectedDate||(new Date).getDate()),this._computeShowLongDate(t,this.locale),this._setInvalidDate(!0)}},enforceDateChange:function(){this._setInvalidDate(!1),this._computeShowLongDate(this.showLongDate,this.locale)},resetDate:function(){if(!this._isSelectedDateConfirmed){var e=new Date,t=e.getFullYear(),n=e.getMonth(),a=e.getDate();this.set("_activeYear",t),this.set("_activeMonth",n),this.set("_selectedYear",t),this.set("_selectedMonth",n),this.set("_selectedDate",a),this._setInvalidDate(!1)}},_shouldTabIndex:function(e,t,n,a,i){var o=this._isDisableDays(e,t,n,a,i);return i&&i>=0&&!o?0:-1},_shouldAriaDisabled:function(e,t,n,a,i){var o=this._isDisableDays(e,t,n,a,i);return!(i&&i>=0&&!o)},_padStart:function(e,t,n){return(n+e).slice(-t)},_isNumber:function(e){return"number"==typeof e||!isNaN(parseFloat(e))&&isFinite(e)},_updateThemeColor:function(e){var t=["dark-theme","light-theme","goog-theme"],a=t.indexOf(e),i=n.dom(this).querySelectorAll("paper-button"),o=i.length,r=["#bcbcbc","#737373","#616161"][a];a>=0?(t.splice(a,1),this.toggleClass(t[0],!1,this),this.toggleClass(t[1],!1,this),this.toggleClass(e,!0,this)):(this.toggleClass("dark-theme",!1,this),this.toggleClass("light-theme",!1,this),this.toggleClass("goog-theme",!1,this));for(var s=0;s<o;s++)this._updateDistributedButtonInkColorCustomProp(i[s],r||"#737373");this.updateStyles()},_updateDatepickerView:function(e){this.toggleClass("horizontal-view","horizontal"===e,this),this.toggleClass("vertical-view","vertical"===e,this)},_updateDistributedButtonInkColorCustomProp:function(e,t){e.updateStyles({"--paper-button-ink-color":t})}})});
//# sourceMappingURL=app-datepicker.umd.js.map
