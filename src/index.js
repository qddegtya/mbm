import DefaultUIController from './ui-controller/default';

let MBM_LAYER_ROOT_DEFAULT_STYLE = [
  ["backgroundColor", "transparent"],
  ["pointerEvents", "none"],
  ["position", "absolute"],
  ["width", "100%"],
  ["height", "100%"],
  ["top", "0"],
  ["left", "0"],
];

const ROOT_LAYER_ID = "@@a-mix-blend-mode-layer";

const IzIndex = (iv) => {
  let zIndex = iv;
  return () => {
    return ++zIndex;
  };
};

const izIndex = IzIndex(999999);

const Singleton = (c, a, d) => {
  let o = c();
  return {
    create() {
      a(o);
      return o;
    },
    remove() {
      o = null;
      d(o);
    },
  };
};

const Registry = Singleton(
  // eslint-disable-next-line
  () => document.createElement("div"),
  (ele) => {
    ele.id = ROOT_LAYER_ID;

    MBM_LAYER_ROOT_DEFAULT_STYLE.forEach(
      (cssValPair) => (ele.style[cssValPair[0]] = cssValPair[1])
    );

    // eslint-disable-next-line
    document.body.appendChild(ele);
  },
  (ele) => {
    // eslint-disable-next-line
    ele && document.body.removeChild(ele);
  }
);

const MixBlendMode = ({
  // color
  backgroundColor = "#000000",

  // blend mode
  mixBlendMode = "difference",

  // default zIndex
  zIndex = izIndex(),

  // default enable
  enable = false,
} = {}) => {
  MBM_LAYER_ROOT_DEFAULT_STYLE.push(
    ["mixBlendMode", mixBlendMode],
    ["zIndex", zIndex],
    ["backgroundColor", backgroundColor]
  );

  let MBM_LAYER_ROOT = Registry.create();
  let _showState = enable;

  MBM_LAYER_ROOT_DEFAULT_STYLE.push(["display", _showState ? "block" : "none"]);

  return {
    show() {
      MBM_LAYER_ROOT.style.display = "block";
      _showState = true;
    },
    hide() {
      MBM_LAYER_ROOT.style.display = "none";
      _showState = false;
    },

    toggle() {
      _showState ? this.hide() : this.show();
    },

    izIndex,
  };
};

// ui controller
MixBlendMode.UIController = (Controller) => {
  if (Controller && typeof Controller === 'function') {
    return Controller(MixBlendMode);
  }
  DefaultUIController(MixBlendMode);
}

export default MixBlendMode;
