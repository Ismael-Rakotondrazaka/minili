import { ref, computed } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

export default {
  setup() {
    /*
      Unmodified
    */

    const ERROR_MESSAGES = {
      GENERAL_ERROR: "Your request can't be processed. Please try again.",
      MINIFY_ERROR: "There is an error when minifying your link.",
      REVERSE_ERROR: "The long version of your link is not found.",
    };

    const APP_URL = "https://minili.onrender.com";
    const API_ENTRY_POINT = "https://minili.onrender.com/api/v1";
    const APP_HOST = "minili.onrender.com";

    /*
      links
    */
    const inputLink = ref("");
    const outputLink = ref("");

    function resetOutputLink() {
      outputLink.value = "";
    }

    /*
      minify
    */
    const minifyProcessing = ref(false);

    function startMinify() {
      minifyProcessing.value = true;
    }

    function stopMinify() {
      minifyProcessing.value = false;
    }

    async function minify() {
      if (!isProcessing.value && inputLink.value !== "") {
        try {
          startMinify();
          resetOutputLink();
          resetErrors();

          const response = await fetch(`${API_ENTRY_POINT}/links`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
              link: inputLink.value,
            }),
          });

          if (!response.ok) {
            throw new Error(response.statusText);
          }

          const data = (await response.json()).data;

          outputLink.value = data.short;

          stopMinify();
        } catch (error) {
          stopMinify();
          errors.value.minify = ERROR_MESSAGES.MINIFY_ERROR;
        }
      }
    }

    /*
      reverse
    */

    const reverseProcessing = ref(false);

    function startReverse() {
      reverseProcessing.value = true;
    }

    function stopReverse() {
      reverseProcessing.value = false;
    }

    async function reverse() {
      if (!isProcessing.value && inputLink.value !== "") {
        try {
          startReverse();
          resetOutputLink();
          resetErrors();

          const splitted = inputLink.value.split("/");

          // we get http://domain.com/avcdefg or domain.com/abcdefg as inputLink
          if (
            !(
              (splitted.length === 4 && splitted[2] === APP_HOST) ||
              (splitted.length === 2 && splitted[0] === APP_HOST)
            )
          ) {
            throw new Error();
          }

          const short = splitted[splitted.length - 1];

          const response = await fetch(`${API_ENTRY_POINT}/links/${short}`, {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(response.statusText);
          }

          const data = (await response.json()).data;

          outputLink.value = data.long;

          stopReverse();
        } catch (error) {
          stopReverse();
          errors.value.reverse = ERROR_MESSAGES.REVERSE_ERROR;
        }
      }
    }

    /*
      errors
    */

    const errors = ref({
      minify: null,
      reverse: null,
    });

    const hasError = computed(() => {
      for (const key in errors.value) {
        if (Object.hasOwnProperty.call(errors.value, key)) {
          const element = errors.value[key];
          if (element) {
            return true;
          }
        }
      }
      return false;
    });

    const errorsToShow = computed(() => {
      let result = [];
      for (const key in errors.value) {
        if (Object.hasOwnProperty.call(errors.value, key)) {
          const element = errors.value[key];
          if (element) {
            result.push(element);
          }
        }
      }
      return result;
    });

    /* 
      copy
    */
    function copy(text) {
      navigator.clipboard.writeText(text);
    }

    /*
      Commons
    */
    function resetErrors() {
      for (const key in errors.value) {
        if (Object.hasOwnProperty.call(errors.value, key)) {
          errors.value[key] = null;
        }
      }
    }

    const isProcessing = computed(
      () => minifyProcessing.value || reverseProcessing.value
    );

    return {
      /*
        links
      */
      inputLink,
      outputLink,

      /*
        minify
      */
      minify,
      minifyProcessing,

      /*
        reverse
      */
      reverse,
      reverseProcessing,

      /*
        errors
      */

      errors,
      hasError,
      errorsToShow,

      /* 
        copy
      */
      copy,
    };
  },

  template: `
    <TheHeader />
    <div class="px-3 min-h-screen my-16">
      <div
        class="flex flex-row mb-5 flex-wrap items-center justify-center py-5 md:flex-nowrap gap-x-5 md:gap-x-20 lg:gap-x-32 gap-y-5"
      >
        <img src="/images/minili-illustration.svg" alt="" class="w-full md:w-1/2 max-w-md" />
        <div class="w-full max-w-md md:w-1/2">
          <h1 class="text-3xl font-bold">Minify your link</h1>
          <p>
            minili is a web application that create a short version of any link.
            You can use the minified link and you will be redirected automatically to the long version.
          </p>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center px-3">
        <h1 class="mb-5 text-lg font-semibold">Write your link here</h1>
        <div class="w-full max-w-md">
          <form
            action=""
            class="flex flex-col items-center justify-center gap-5"
            @submit.prevent=""
          >
            <div class="w-full">
              <CustomInput
                placeholder="https://example.com/a/very/long/link?q=this_is_your_world"
                class="mb-1"
                @update-model="(newValue) => (inputLink = newValue.trim())"
              />
              <div v-if="hasError" class="text-red-500">
                <div>Oops !</div>
                <ul>
                  <li
                    v-for="(error, key) in errorsToShow"
                    :key="key"
                    class="list-disc"
                  >
                    {{ error }}
                  </li>
                </ul>
              </div>
            </div>
  
            <div v-if="outputLink" class="flex flex-col items-center w-full">
              <div class="w-7 h-7">
                <img src="/images/down-arrow.svg" alt="" />
              </div>
              <div
                class="flex flex-row flex-wrap items-center gap-3 md:flex-nowrap"
              >
                <div class="w-full text-xl whitespace-nowrap">{{ outputLink }}</div>
  
                <button
                  @click="copy(outputLink)"
                  :variant="'outlined'"
                  class="inline-block px-4 py-2 font-semibold uppercase rounded-md shadow-md transition border hover:scale-110"
                >
                  <span>
                    Copy
                  </span>
                </button>
  
                <a
                  :href="outputLink"
                  class="inline-block px-4 py-2 font-semibold uppercase rounded-md text-black bg-green-400 rounded-md shadow-md transition hover:scale-110"
                  >Go</a
                >
              </div>
            </div>
  
            <div class="relative flex flex-row items-center gap-3 flex-nowrap">
              <CustomButton @click="minify">
                <span class="">Minify</span>
              </CustomButton>
              <div
                v-if="minifyProcessing"
                class="absolute rounded-full w-7 -right-10 h-7 animate-spin"
              >
                <img
                  src="/images/spinner.svg"
                  alt=""
                  class="w-full h-full"
                />
              </div>
            </div>
  
            <div class="relative flex flex-row items-center gap-3 flex-nowrap">
              <CustomButton @click="reverse" :variant="'outlined'">
                <span class="">Reverse</span>
              </CustomButton>
  
              <div
                v-if="reverseProcessing"
                class="absolute rounded-full w-7 -right-10 h-7 animate-spin"
              >
                <img
                  src="/images/spinner.svg"
                  alt=""
                  class="w-full h-full"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
};
