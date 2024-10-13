/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,vue}"
  ],
  theme: {
    extend: {
        fontFamily:{
          caveat: ["Caveat", 'cursive']
        },
        fontWeight:{ 
          regular: 400,
          medium: 450,
          semibold:550,
          bold: 600,
          extrabold: 700,

        },
        fontStyle:{
          normal: 'normal'
        },
      },
    },
  plugins: [],
}

