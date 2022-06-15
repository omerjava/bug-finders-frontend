# Hack Your Film Project

This project is developed in order to improve React skills.

In Hack Your Film project,

- user can see all films in small info cards, when he/she visits the website
- user can make a search entering film name and/or letters
- user can select a film category and see all films in that category
- user can click to any film card to see details about that film
- user can return back to main page by clicking Hack Your Film headline in the top
  - or by using search/select options

Technical details:

HTML

- `<input type="text"/>` tag and `<select>`,`<option>` tags are used to receive user input
- user input is taken in `header` component

CSS

- media queries are used to provide responsiveness of website such as `@media only screen and (max-width: 400px) {}`
- CSS Grid is used in some components such as in `filmList` to ensure orderly look: `display: grid; grid-template-columns: auto auto auto; justify-content: center; gap: 20px;`
- CSS Flex is used in many cases such as in `header` component `display: flex; flex-direction: row; justify-content: space-between;`

JavaScript and React

- there are 6 components: `header, footer, film, filmList, card, bigCard`.
- `header` and `footer` component are rendered always.
- `card` component is part of `filmList` of component, so it is rendered whenever `filmList` is rendered
- `bigCard` component is part of `film` of component, so it is rendered whenever `film` is rendered
- in first load of page, `filmList` component is rendered together with `header` and `footer`
- if user click to any film card, `film` component is rendered together with `header` and `footer`
- if user click to `Hack Your Film` headline or make any search or select a category, `filmList` component is rendered together with `header` and `footer`
- useState() and useEffect() hooks are used to get user input and update page according to user's choice
- when local states are not enough, useContext() hook is used to meet the global state need
- a separate context folder is created and `AllContext` object has been created and hold in a file there
- global states are created in App.js since it is the highest level component `const [film, setFilm] = useState([]); const [filmList, setFilmList] = useState([]); const [filmDetails, setFilmDetails] = useState(false);`
- `<AllContext.Provider value={{ film, setFilm, filmList, setFilmList, filmDetails, setFilmDetails, }} > </AllContext.Provider>` components in the App.js wrapped by the Context Provider.
- global states are declared inside the value.

Reference:

- [Helpful resource for useContext()](https://www.youtube.com/watch?v=sP7ANcTpJr8&t=575s)

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
