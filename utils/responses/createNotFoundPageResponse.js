const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

function createNotFoundPageResponse(link) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/x-icon" href="${process.env.APP_URL}/favicon.ico"/>
  
      <!-- Primary Meta Tags -->
      <title>minili | Minify your link</title>
      <meta name="title" content="minili | Minify your link">
      <meta name="description" content="minili is a web application that create a short version of any link. You can use the minified link and you will be redirected automatically to the long version.">
      
      <!-- Open Graph / Facebook -->
      <meta property="og:type" content="website">
      <meta property="og:url" content="${link}">
      <meta property="og:title" content="minili | Minify your link">
      <meta property="og:description" content="minili is a web application that create a short version of any link. You can use the minified link and you will be redirected automatically to the long version.">
      <meta property="og:image" content="${process.env.APP_URL}/images/minili-illustration.svg">
      
      <!-- Twitter -->
      <meta property="twitter:card" content="summary_large_image">
      <meta property="twitter:url" content="${link}">
      <meta property="twitter:title" content="minili | Minify your link">
      <meta property="twitter:description" content="minili is a web application that create a short version of any link. You can use the minified link and you will be redirected automatically to the long version.">
      <meta property="twitter:image" content="${process.env.APP_URL}/images/minili-illustration.svg">
  
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"> 
      <link rel="stylesheet" href="${process.env.APP_URL}/styles/index.css"/>

      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
      <noscript>
        <h1>minili needs JavaScript to work properly. Please, enable it and refresh the page.</h1>
      </noscript>
    
      <div id="app"></div>
  
      <script type="module">
        import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
    
        const app = createApp({
          template: \`
            <TheHeader />
            <div class="py-10 px-3 min-h-screen my-16">
              <div
                class="flex flex-row flex-wrap items-center justify-center py-5 md:flex-nowrap gap-x-5 md:gap-x-20 lg:gap-x-32 gap-y-5"
              >
                <img src="/images/logo-minili-broken.svg" alt="" class="w-full md:w-1/2 max-w-md" />
                <div class="w-full max-w-md md:w-1/2">
                  <h1 class="text-2xl font-bold">Broken link</h1>
                  <p>
                    Looks like the link <a class="text-lg text-sky-400 hover:underline" href="${link}">${link}</a> is broken.
                  </p>
                </div>
              </div>
            </div>
          \`
        });
  
        import components from "${process.env.APP_URL}/vue/components/index.js";
  
        for (const key in components) {
          if (Object.hasOwnProperty.call(components, key)) {
            app.component(key, components[key]);
          }
        }
  
        app.mount("#app");
      </script>
    </body>
  </html>
  
    `;
}

module.exports = createNotFoundPageResponse;
