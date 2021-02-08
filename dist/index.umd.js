(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MixBlendMode = factory());
}(this, (function () { 'use strict';

  // default ui
  var DefaultUIController = (function (MixBlendMode) {
    var mbm = MixBlendMode({
      backgroundColor: "#FFFFFF",
      enabled: false
    });
    return {
      render: function render() {
        var Registry = MixBlendMode._Singleton( // eslint-disable-next-line
        function () {
          return document.createElement("button");
        }, function (ele) {
          ele.id = "mbm-switch";
          ele.style.zIndex = mbm.izIndex();
          ele.innerText = "toggle"; // eslint-disable-next-line

          document.body.appendChild(ele);
        }, function (ele) {
          // eslint-disable-next-line
          ele && document.body.removeChild(ele);
        });

        var SwitchWidget = Registry.create();
        SwitchWidget.addEventListener("click", function () {
          mbm.toggle();
        });
      }
    };
  });

  var MBM_LAYER_ROOT_DEFAULT_STYLE = [["backgroundColor", "transparent"], ["pointerEvents", "none"], ["position", "absolute"], ["width", "100%"], ["height", "100%"], ["top", "0"], ["left", "0"]];
  var ROOT_LAYER_ID = "@@a-mix-blend-mode-layer";

  var IzIndex = function IzIndex(iv) {
    var zIndex = iv;
    return function () {
      return ++zIndex;
    };
  };

  var izIndex = IzIndex(999999);

  var Singleton = function Singleton(c, a, d) {
    var o = c();
    return {
      create: function create() {
        a(o);
        return o;
      },
      remove: function remove() {
        o = null;
        d(o);
      }
    };
  };

  var Registry = Singleton( // eslint-disable-next-line
  function () {
    return document.createElement("div");
  }, function (ele) {
    ele.id = ROOT_LAYER_ID;
    MBM_LAYER_ROOT_DEFAULT_STYLE.forEach(function (cssValPair) {
      return ele.style[cssValPair[0]] = cssValPair[1];
    }); // eslint-disable-next-line

    document.body.appendChild(ele);
  }, function (ele) {
    // eslint-disable-next-line
    ele && document.body.removeChild(ele);
  });

  var MixBlendMode = function MixBlendMode() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$backgroundColor = _ref.backgroundColor,
        backgroundColor = _ref$backgroundColor === void 0 ? "#000000" : _ref$backgroundColor,
        _ref$mixBlendMode = _ref.mixBlendMode,
        mixBlendMode = _ref$mixBlendMode === void 0 ? "difference" : _ref$mixBlendMode,
        _ref$zIndex = _ref.zIndex,
        zIndex = _ref$zIndex === void 0 ? izIndex() : _ref$zIndex,
        _ref$enable = _ref.enable,
        enable = _ref$enable === void 0 ? false : _ref$enable;

    MBM_LAYER_ROOT_DEFAULT_STYLE.push(["mixBlendMode", mixBlendMode], ["zIndex", zIndex], ["backgroundColor", backgroundColor]);
    var _showState = enable;
    MBM_LAYER_ROOT_DEFAULT_STYLE.push(["display", _showState ? "block" : "none"]);
    var MBM_LAYER_ROOT = Registry.create();
    return {
      show: function show() {
        MBM_LAYER_ROOT.style.display = "block";
        _showState = true;
      },
      hide: function hide() {
        MBM_LAYER_ROOT.style.display = "none";
        _showState = false;
      },
      toggle: function toggle() {
        _showState ? this.hide() : this.show();
      },
      izIndex: izIndex
    };
  }; // ui controller


  MixBlendMode.UIController = function (Controller) {
    if (Controller && typeof Controller === "function") {
      return Controller(MixBlendMode);
    }

    return DefaultUIController(MixBlendMode);
  };

  MixBlendMode._Singleton = Singleton;

  return MixBlendMode;

})));
