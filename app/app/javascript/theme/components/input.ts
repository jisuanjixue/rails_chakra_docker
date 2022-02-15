const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px) translateX(-10px)",
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
              },
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
            },
          },
        },
      },
    },
  },
};