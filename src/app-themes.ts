const BORDER_RADIUS = "4px";
export const light = {
  global: {
    colors: {
      background: "#FFFFFF",
      brand: "#E2432A",
      focus: "#DADADA",
      active: "#DADADA",
      selected: "#FC6D27",
      "accent-1": "#E2432A",
      "accent-2": "#FC6D27",
      "accent-3": "#FCA326",
    },
  },
  button: {
    border: {
      radius: BORDER_RADIUS,
    },
    size: {
      small: {
        border: {
          radius: BORDER_RADIUS,
        },
      },
      medium: {
        border: {
          radius: BORDER_RADIUS,
        },
      },
      large: {
        border: {
          radius: BORDER_RADIUS,
        },
      },
    },
  },
};

export const dark = {
  global: {
    colors: {
      ...light.global.colors,
      background: "#303030",
    },
  },
  button: {
    ...light.button,
  },
};
