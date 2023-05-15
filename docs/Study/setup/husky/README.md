---
title : husky setup  
date : 2023.05.15
---

# husky setup  
date : 2023.05.15

1. husky setup
```shell
yarn add -D husky
npx husky install
npx husky add .husky/pre-commit
```

2. lint-staged setup
```shell
yarn add -D lint-staged
```

.husky > pre-commit에 추가
```shell
yarn lint-staged
```

루트경로에 .lintstagedrc.json 파일 추가
```json
{
  "*.{ts,tsx,js,jsx}": ["yarn format", "yarn lint --fix", "yarn test"]
}
```
```json
//package.json
"scripts": {
    "test": "jest --config ./jest.config.mjs",
    "test:watch": "yarn run test -- --watch",
    "lint": "eslint .",
    "lint:fix": "eslint --fix",
    "format": "prettier --write './**/*.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc",
    "prepare": "husky install git config --global commit.template .gitmessage.txt"
}
```

3. 사용하지 않는 import문 자동 제거
```shell
yarn add -D eslint-plugin-unused-imports
```

eslintrc.json 파일에 추가
```json
"plugins": ["unused-imports"],
"rules": {
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
        "warn",
        {
            "vars": "all",
            "varsIgnorePattern": "^_",
            "args": "after-used",
            "argsIgnorePattern": "^_"
        }
    ]
}
```


## Reference
* [husky gkt hooks](https://typicode.github.io/husky/#/)
* [lint staged docs](https://github.com/okonet/lint-staged#readme)
* [eslint-plugin-unused-imports](https://www.npmjs.com/package/eslint-plugin-unused-imports)
* [Full Guide: Add Husky to your React Project](https://levelup.gitconnected.com/full-guide-add-husky-to-your-react-project-e049935f20d5)
