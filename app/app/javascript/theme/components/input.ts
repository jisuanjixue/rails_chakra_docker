const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px) translateX(-10px)",
};

const labelStyle = {
  top: 0,
  left: 0,
  zIndex: 2,
  position: "absolute",
  pointerEvents: "none",
  mx: 3,
  px: 1,
  my: 2,
};

export const inputStyles = {
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
                backgroundColor: "white",
              },
            },
            label: {
              backgroundColor: "gray.30",
              ...labelStyle,
            },
          },
        },
        editfloating: {
          container: {
            _focusWithin: {
              label: {
                backgroundColor: "white",
              },
            },
            label: {
              backgroundColor: "white",
              ...labelStyle,
              ...activeLabelStyles,
            },
          },
        },
      },
    },
  },
};
