# vue-mars-ec

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Product API 診斷腳本

如果前端商品列表沒有顯示，你可以先用下面指令檢查是 API 回傳問題，還是前端渲染/過濾問題。

```sh
npm run test:product-api
```

可選參數（用 `--參數=值`）：

```sh
npm run test:product-api -- --category=Shoes --minPrice=100 --maxPrice=999 --pageNumber=0 --pageSize=12
```

可選環境變數：
- `API_BASE_URL`：預設 `http://localhost:8080`
- `API_JWT`：如果 API 需要登入 token，可透過這個變數帶入
