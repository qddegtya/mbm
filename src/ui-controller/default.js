// default ui
export default (MixBlendMode) => {
  const mbm = MixBlendMode({
    backgroundColor: "#000000",
    enabled: false,
  });

  return {
    render() {
      const SwitchWidget = `<div id="mbm-default-ui-controller"><div id="switch"></div></div>`;
    },
  };
};
