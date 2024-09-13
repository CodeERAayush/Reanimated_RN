module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./<custom-folder>/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  presets: ['module:@react-native/babel-preset'],
  
  plugins: [
    "nativewind/babel",
    'react-native-reanimated/plugin',
  ],
};
