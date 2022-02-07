const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      producer: colors.red,
      distributor: colors.orange,
      organizer: colors.yellow,
      transporter: colors.green,
      vendor: colors.blue,
      warehouse: colors.purple,
      white: colors.white,
      grey: colors.grey,
      slate: colors.slate
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
