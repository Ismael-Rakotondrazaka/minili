const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

function aboutPage(req, res, next) {
  try {
    return res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/x-icon" href="https://minili.onrender.com/favicon.ico"/>

      <!-- Primary Meta Tags -->
      <title>minili | About</title>
      <meta name="title" content="minili | About">
      <meta name="description" content="minili is a web application that create a short version of any link. You can use the minified link and you will be redirected automatically to the long version.">
      
      <!-- Open Graph / Facebook -->
      <meta property="og:type" content="website">
      <meta property="og:url" content="https://minili.onrender.com/pages/about">
      <meta property="og:title" content="minili | About">
      <meta property="og:description" content="minili is a web application that create a short version of any link. You can use the minified link and you will be redirected automatically to the long version.">
      <meta property="og:image" content="https://minili.onrender.com/images/minili-illustration.svg">
      
      <!-- Twitter -->
      <meta property="twitter:card" content="summary_large_image">
      <meta property="twitter:url" content="https://minili.onrender.com/pages/about">
      <meta property="twitter:title" content="minili | Minify your link">
      <meta property="twitter:description" content="minili is a web application that create a short version of any link. You can use the minified link and you will be redirected automatically to the long version.">
      <meta property="twitter:image" content="https://minili.onrender.com/images/minili-illustration.svg">
  
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"> 
      <link rel="stylesheet" href="https://minili.onrender.com/styles/index.css"/>

      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
      <noscript>
        <h1>minili needs JavaScript to work properly. Please, enable it and refresh the page.</h1>
      </noscript>
    
      <div id="app"></div>
  
      <script type="module">
        import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
  
        import AboutView from "/vue/views/AboutView.js";
  
        const app = createApp(AboutView);
  
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
  `);
  } catch (error) {
    next(error);
  }
}

module.exports = aboutPage;
