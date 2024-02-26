# ТЕХ. ЗАДАНИЕ: ФОРМА РЕДАКТИРОВАНИЯ ПОЛЬЗОВАТЕЛЕЙ (Vue + Vuelidate)

> **Примечание:** Этот проект НЕ требует постоянных обновлений кода.

> **Статус Проекта:**
> 🟩 Активен / Актуален.

## 📑Содержание

1. [Цели и Задачи](#-цели-и-задачи)
2. [Основная Работа](#основная-работа)

   a) [Основное окно](#форма-создания-клиента)
   b) [Валидация данных](#валидация-данных)

   - [Ограничения на поля данных](#ограничения-на-поля-данных)
   - [Примеры Валидации](#примеры-валидации)

   c) [Прочие действия](#прочие-действия)

3. [Стек технологий](#-стек-технологий)
4. [Установка](#-установка)

---

# ❗ Цели и задачи

Цели:

- На Vue2 или Vue3 сделать форму редактирования пользователя в соответствии с макетом Figma ([Ссылка на макет](https://www.figma.com/file/i4tbilaDopDkNzj1ytjWDW/%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5?type=design&node-id=0-1&mode=design)).

Задачи:

- Поля отмеченные (\*) являются обязательными и должны быть провалидированы по соотв правилу перед отправкой.
- Написать сервер, например на основе Express или любого другого аналога.
- Получить статичный список должностей с сервера.
- Все поля не прошедшие валидацию должны быть подсвечены в форме в соотв с макетом.
- В качестве css-библиотеки использовать goodt-css-framework. Верстка должна быть адаптивной, с использованием относительных размеров и только на базе указанного фреймворка.
- Верстка должна быть универсальной с возможностью произвольного изменения контента.

Дополнительное задание:

- Отправлять форму на сервер, где валидировать поля и возвращать или 200 если все ок, или ошибку с приложенным списком неправильных полей.
- Поля СНИЛС, email и телефон должны валидироваться по индивидуальным правила, остальные по общим правилам.

Результат оформить в виде публичного репозитория.

---

# Основная работа

Макет содержит следующие поля:

- Имя.
- Фамилия.
- Отчество.
- СНИЛС.
- Должность (Выпадающее Меню).
- Телефон.
- Электронная Почта.

Также у макета есть две кнопки: кнопка "Отмена" для закрытия окна и кнопка для отправки отредактированных данных.

Также можно закрыть окно, нажав на иконку "X" в правом верхнем углу окна.

![Макет]()

## Основное окно

Ниже представлен результат вёрстки макета Figma:

![Результат вёрстки]()

## Валидация данных

Валидация осуществляется с помощью Vue-библиотеки "Vuelidate".

```cmd
npm install @vuelidate/core @vuelidate/validators
```

Затем нужно в файле <code>main.ts</code> импортировать Vuelidate:

```ts
import { createApp } from "vue";
import App from "./App.vue";
import VuelidatePlugin from "@vuelidate/core";

createApp(App).use(VuelidatePlugin).mount("#app");
```

Также необходимо будет обозначить rules для каждого из полей.

### Ограничения на поля данных

> 👀 Список всех встроенных валидаторов (validators) можно найти [здесь](https://vuelidate-next.netlify.app/validators.html).

В данной форме есть следующие rules для валидации полей:

| Поле              | required? | Другие ограницения                                                                                                                                                                       |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Имя               | +         | —                                                                                                                                                                                        |
| Фамилия           | +         | —                                                                                                                                                                                        |
| Отчество          | —         | —                                                                                                                                                                                        |
| СНИЛС             | —         | Встроенные валидаторы "numeric", "minLength" и "maxLength". В этом поле должно быть ровно 11 символов, и все они должны быть цифрами.                                                    |
| Должность         | +         | —                                                                                                                                                                                        |
| Телефон           | +         | Встроенные валидаторы "numeric", "minLength" и "maxLength". В этом поле должно быть ровно 11 символов, и все они должны быть цифрами. Формат номера телефона: 11 цифр (без "+" вначале). |
| Электронная Почта | +         | Встроенный валидатор "email"                                                                                                                                                             |

Упрощённый код для задания _rules_ для полей формы:

```ts
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  numeric,
} from "@vuelidate/validators";

// ...

const formData = {
  name: ref(""),
  surname: ref(""),
  secondName: ref(""),
  snils: ref(""),
  job: ref<string | undefined>(""),
  phone: ref(""),
  email: ref(""),
};

const rules = {
  name: { required },
  surname: { required },
  secondName: {},
  snils: { numeric, maxLength: maxLength(11), minLength: minLength(11) },
  job: { minLength: minLength(1) },
  phone: {
    required,
    numeric,
    maxLength: maxLength(11),
    minLength: minLength(11),
  },
  email: { required, email },
};

const $v = useVuelidate(rules, formData);

// ...

return {
  formData,
  $v,
  // ...
};
```

### Примеры Валидации

> ❗ **ВАЖНО**: для поля "Должность" не получилось сделать валидацию данных. Vuelidate всегда считает это поле корректным, даже если оно пустое.

Для начала нужно открыть DevTools браузера, потому что сообщения о статусе валидации отображаются здесь.

Валидация происходит не только на сервере, как требует задание, но и на клиенте:

```ts
// ...
const submitForm = async () => {
  // ...

  const InvalidFields = [];

  if ($v.value.$silentErrors.length == 0) {
    console.log("✅Форма валидна, можно отправлять данные!");
  } else {
    console.log("❌Форма содержит ошибки валидации!");

    const Fields = [
      "name",
      "surname",
      "secondName",
      "snils",
      "job",
      "phone",
      "email",
    ];

    for (const field of Fields) {
      if ($v.value[field]?.$silentErrors.length > 0) {
        InvalidFields.push(field);
      }
    }
  }

  try {
    const response = await axios.post("/validateData", InvalidFields);
    console.log("Ответ от сервера:", response.data);
  } catch (error) {
    console.error("Ошибка при отправке POST-запроса:", error);
  }
};
```

Если ВСЕ поля успешно проходят валидацию, то <code>\$v.value.$silentErrors</code> будет иметь length>0 (то есть, ошибки присутствуют).

Если есть некоторые поля, не прошедшие валидацию, то формируется массив с именами полей (имя, фамилия и тд.). Затем, используя HTTP-клиент **axios**. Axios асинхронно отправляет данные на сервер (POST-запрос на адрес "/validateData"), чтобы их провалидировать.

На сервере это выглядит так:

```js
import express from "express";

const router = express.Router();
router.use(express.json());

router.use("*", async (req, res, next) => {
  // Получение должностей с сервера
  if (req.originalUrl == "/getJobs") {
    return res.json({ jobs: ["Должность №1", "Должность №2", "Должность №3"] });
  }
  // ...
  if (req.originalUrl == "/validateData") {
    const InvalidFields = req.body;

    if (InvalidFields.length === 0) {
      return res.json({ message: "Данные формы валидны" });
    } else {
      return res.json({
        error: `❌Форма содержит ошибки валидации! (поля: ${InvalidFields})`,
      });
    }
  }

  res.render("../src/views/index.html.ejs");
});
```

Отправка пустой формы:

![Валидация №1]()

Отправка частично заполненной формы:

![Валидация №2]()

Отправка правильно заполненной формы:

![Валидация №3]()

Если поле не проходит валидацию, то подпись (label) этого поля станет красного цвета. Как только поле проходит валидацию, подпись снова станет синего цвета. По умолчанию подписи окрашены синим цветом.

Форма с красными подписями для не корректно заполненных полей:

![Валидация №4]()

## Прочие действия

Это не обязательный функционал.

Если нажать на "" в правом верхнем углу окна, то:

![Событие "close"]()

Если нажать на кнопку "Отмена", то:

![Событие "cancel"]()

---

# 💻 Стек технологий

В проекте был использован следующий стек технологий:

- [HTML](https://developer.mozilla.org/ru/docs/Learn/HTML/Introduction_to_HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Less.js](https://lesscss.org)
- [goodt-framework-css](https://goodt-css-next.netlify.app/#/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Typescript](https://www.typescriptlang.org)
- [Git](https://git-scm.com/)
- [Vue.js](https://vuejs.org)
- [Vuelidate](https://vuelidate.js.org)
- [Vite.js](https://vitejs.dev)
- [Express.js](https://expressjs.com)

---

# ⏬ Установка

Клонируем удалённый репозиторий на локальную машину:

```markdown
git clone https://github.com/Nico-kun123/user-edit-form
```

Устанавливаем все необходимые компоненты:

```markdown
npm install
```

❗ Для того, чтобы запустить проект в режиме development, нужно запустить скрипт **dev** и открыть <code>http://localhost:3000</code> в своём браузере.

Содержание <code>package.json</code>:

```json
{
  "name": "user-edit-form",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "set NODE_ENV=dev && concurrently 'npm:dev:frontend' 'npm:dev:backend'",
    "dev:frontend": "set NODE_ENV=dev && vite",
    "dev:backend": "set NODE_ENV=dev && nodemon server/index.js",
    "build": "vue-tsc && vite build",
    "build-only": "vite build",
    "start": "set NODE_ENV=production && set PORT=3001 && node server/index.js",
    "preview": "set NODE_ENV=production && vite preview",
    "type-check": "vue-tsc --build --force"
  },
  "dependencies": {
    "@vuelidate/core": "^2.0.3",
    "@vuelidate/validators": "^2.0.4",
    "axios": "^1.6.7",
    "ejs": "^3.1.9",
    "express": "^4.18.2",
    "goodt-framework-css": "^2.0.13",
    "vue": "^3.4.15",
    "vue-router": "^4.3.0"
  },
  "devDependencies": {
    "@tsconfig/node20": "^20.1.2",
    "@types/express": "^4.17.21",
    "@types/node": "^20.11.10",
    "@types/vuelidate": "^0.7.21",
    "@vitejs/plugin-vue": "^5.0.3",
    "@vue/tsconfig": "^0.5.1",
    "concurrently": "^8.2.2",
    "less": "^4.2.0",
    "less-loader": "^12.2.0",
    "nodemon": "^3.1.0",
    "npm-run-all2": "^6.1.1",
    "typescript": "~5.3.0",
    "vite": "^5.0.11",
    "vue-tsc": "^1.8.27",
    "vuelidate": "^0.7.7"
  }
}
```

В проекте есть следующие разделы:

- **dependencies**: Это пакеты, необходимые для работы приложения.
- **devDependencies**: Это пакеты, которые нужны только для разработки и тестирования приложения. Они не будут включены в окончательную сборку приложения.

В проекте есть следующие скрипты:

- **dev**: Этот скрипт используется для запуска приложения в режиме разработки. Он использует concurrently, чтобы одновременно запустить фронтенд (с помощью vite) и бэкенд (с помощью nodemon). set NODE_ENV=dev устанавливает переменную окружения NODE_ENV в значение "dev".
- **dev:frontend**: Этот скрипт используется для запуска только фронтенда в режиме разработки с помощью vite.
- **dev:backend**: Этот скрипт используется для запуска только бэкенда в режиме разработки с помощью nodemon.
- **build**: Этот скрипт используется для сборки приложения в режиме production. Он выполняет компиляцию TypeScript с помощью vue-tsc и затем собирает фронтенд с помощью vite build.
- **build-only**: Этот скрипт используется для сборки фронтенда без предварительной компиляции TypeScript.
- build:theme: Этот скрипт используется для сборки темы с помощью пользовательского скрипта theme.js.
- **start**: Этот скрипт используется для запуска приложения в режиме production. Он устанавливает переменные окружения NODE_ENV и PORT и затем запускает ваш серверный код.
- **preview**: Этот скрипт используется для предварительного просмотра вашего приложения в производственном режиме с помощью vite preview.
- **type-check**: Этот скрипт используется для проверки типов TypeScript приложении с помощью vue-tsc.

---

## Автор

Кудрявцев Николай (Электронная почта: nicolay.kudryavtsev@gmail.com)
