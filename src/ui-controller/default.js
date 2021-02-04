// default ui
export default (MixBlendMode) => {
  const mbm = MixBlendMode({
    backgroundColor: "#000000",
    enabled: false,
  });

  return {
    render() {
      const Registry = RegMixBlendMode._Singleton(
        // eslint-disable-next-line
        () => document.createElement("div"),
        (ele) => {
          ele.id = "mbm-switch";

          // eslint-disable-next-line
          document.body.appendChild(ele);
        },
        (ele) => {
          // eslint-disable-next-line
          ele && document.body.removeChild(ele);
        }
      );

      const SwitchWidget = Registry.create();
    },
  };
};
