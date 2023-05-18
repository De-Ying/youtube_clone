# Youtube Clone Reactjs & Tailwind CSS 

## Extension VSCode

Use extension [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) to install Tailwind CSS IntelliSense

## Dependencies commands

```bash
npm i @tailwindcss/line-clamp axios js-abbreviation-number react-player moment
npm i react-router-dom react-icons
```

## Installed NPM Packages

[Tailwindcss/line-clamp](https://www.npmjs.com/package/@tailwindcss/line-clamp)
[Axios](https://www.npmjs.com/package/axios-react)
[React Player](https://www.npmjs.com/package/react-player)
[JS Abbreviation Number](https://www.npmjs.com/package/js-abbreviation-number)
[Moment](https://www.npmjs.com/package/moment)
[React Router DOM](https://www.npmjs.com/package/react-router-dom)
[React Icons](https://www.npmjs.com/package/react-icons)

## Setup Tailwindcss

#### Install Tailwind CSS

```bash
npm install -D tailwindcss
npx tailwindcss init
```

#### Configure your template paths

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
```

#### Add the Tailwind directives to your CSS

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## In this project you will know

- React 18 và các tính năng mới nhất của nó
- Phản ứng các thành phần chức năng và khả năng tái sử dụng của chúng
- React hook và quản lý state
- Cách sử dụng API ngữ cảnh
- Xây dựng giao diện người dùng nhanh chóng với Tailwind CSS
- Phương pháp đáp ứng đầu tiên trên thiết bị di động
- Lấy dữ liệu từ Rapid API
- Lập trình chức năng thông qua các phương thức tiện ích
- Cách sử dụng Axios trong ứng dụng phản ứng
