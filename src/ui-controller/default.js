// default ui
export default (MixBlendMode) => {
  const mbm = MixBlendMode({
    backgroundColor: "#FFFFFF",
    enabled: false,
  });

  return {
    render() {
      const Registry = MixBlendMode._Singleton(
        // eslint-disable-next-line
        () => document.createElement("button"),
        (ele) => {
          ele.id = "mbm-switch";
          ele.style.zIndex = mbm.izIndex();

          ele.innerText = "toggle";

          // eslint-disable-next-line
          document.body.appendChild(ele);
        },
        (ele) => {
          // eslint-disable-next-line
          ele && document.body.removeChild(ele);
        }
      );

      const SwitchWidget = Registry.create();

      SwitchWidget.addEventListener("click", () => {
        mbm.toggle();
      });
    },
  };
};
