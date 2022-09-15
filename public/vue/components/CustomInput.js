import { ref } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

export default {
  setup() {
    const input = ref("");

    return {
      input,
    };
  },

  template: `
    <input
      @input="$emit('update-model', input)"
      v-model="input"
      class="w-full px-3 py-4 outline-none text-black rounded-md ring-4 text-lg"
    />
  `,
};
