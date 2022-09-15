export default {
  props: {
    variant: {
      default: "solid",
      type: String,
    },
  },

  setup(props) {
    function getClass() {
      const VARIANT_CLASS = {
        solid: "bg-sky-300 text-black border-sky-500",
        outlined: "bg-white",
      };

      return VARIANT_CLASS[props.variant];
    }

    return {
      getClass,
    };
  },

  template: `
    <button
      class="inline-block px-4 py-2 font-semibold uppercase border-2 rounded-md hover:scale-110 shadow-md transition"
      :class="getClass()"
    >
      <slot />
    </button>
  `,
};
