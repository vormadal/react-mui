# @vormadal/react-mui

A library containing a collection of hooks and components (using [MUI](https://mui.com/)) that I frequently need in my React projects.

- [Release notes](#release-notes)
- [Installation](#installation)
- [Components](#components)
  1.  [Toaster](#toaster)
  2.  [Loading](#loading)
  3.  [Navigation](#navigation)
  4.  [ProtectedRoute](#protectedroute)
- [Hooks](#hooks)
  1.  [useData](#usedata)
  2.  [useRequest](#userequest)
  3.  [useToast](#usetoast)

# Release notes

See the release notes [here](https://github.com/vormadal/react-mui/releases)

# Installation

Using npm

```bash
npm install @vormadal/react-mui
```

If you are starting a new project you can install peer dependencies with this command

```bash
npm install react-router-dom @mui/material @mui/icons-material @emotion/react @emotion/styles
```

# Components

All the components are using [MUI](https://mui.com/) and most of the custom styles are directly copied from the MUI examples.

## Toaster

This is the UI used when using the [useToast](#usetoast) hook.
For the toaster to work you will also need to wrap your application in the ToastProvider.

### Example

```javascript
import { ToastProvider, Toaster } from '@vormadal/react-mui'
function App() {
  return (
    <ToastProvider>
      <>
        <Toaster />
        {/* other content */}
      </>
    </ToastProvider>
  )
}
```

### Props

Neither the Toaster or the ToastProvider have any props

## Loading

The `<Loading />` component is used when you want to show a spinner while data is loading.
The component works very well with the `useData` hook where the hook values can be forwarded to the `<Loading />` component.  
As long as there is no data the `children` will not be rendered.
This way you don't have to check if `data` is defined or not.

### Example

```javascript
import {useData, Loading } from '@vormadal/react-mui'
function App(){
    // result is an object containing 'loading', 'data' and 'error'
    const [result] = useData(() => /* make api call and return response */)
    return (<Loading {...result}>
        {/* data is the content of the value returned from the function passed to the useData hook */}
        {(data) => <div>{data.id}</div>}
      </Loading>)
}
```

### Props

| Name        | Type     | Description                                                                                                                                                    | default   | required |
| ----------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| loading     | boolean  | If **true** and `data` has no value a spinner is shown                                                                                                         | false     | no       |
| error       | string   | Shows an alert containing this error message                                                                                                                   | ''        | no       |
| data        | any      | the data which will be passed to the `children` function when loading is complete                                                                              | undefined | no       |
| showReloads | boolean  | If **true** the spinner will be shown everytime `loading` is **true**.                                                                                         | false     | no       |
| retry       | function | If specified, the alert will show a `retry` button which when clicked will run this function                                                                   | undefined | no       |
| children    | function | A function which returns the child elements to be rendered. The `data` will be passed as argument. This function will only be called when `data` contains data | undefined | no       |

## Navigation

A responsive navigation bar which can be configured to use drawer or just a simple menu.

### Example

```javascript
import { Navigation } from '@vormadal/react-mui'
function App() {
  return (
    <Navigation
      title="Demo App"
      drawer
      pages={[{ name: 'Page 1', path: '/page-1' }]}
    >
      {/** when using 'drawer' the rest of the app should be wrapped in the navigation.
        Otherwise the drawer might hide information You don't want to hide. */}
      {/** rest of the app */}
    </Navigation>
  )
}
```

### Props

| Name          | Type                    | Description                                                                                 | default   | required |
| ------------- | ----------------------- | ------------------------------------------------------------------------------------------- | --------- | -------- |
| title         | string                  | The app title shown in the middle of the navigation bar                                     | undefined | no       |
| Icon          | component               | A component which has an sx props. For best results you should only provide icons from MUI  | undefined | no       |
| pages         | [PageLink](#pagelink)[] | A list of the links you want to show in the menu or drawer                                  | []        | no       |
| avatarOptions | [PageLink](#pagelink)[] | A list of the links you want to show on the avatar (only visible when `isLoggedIn` is true) | []        | no       |
| user          | [UserInfo](#userinfo)   | The information used for the avatar like image and name                                     | undefined | no       |
| isLoggedIn    | boolean                 | If **true** avatar and `pages` specified as protected are shown                             | false     | no       |
| drawer        | boolean                 | If **true** a drawer is used for the burger menu instead of a simple menu.                  | false     | no       |
| drawerWidth   | number                  | The width of the drawer when open                                                           | 240       | no       |
| children      | node                    |                                                                                             | undefined | no       |

#### PageLink

| Name      | Type    | Description                                                                                                                                                               | default   | required |
| --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| name      | string  | The name or label shown in menu or drawer of the navigation bar                                                                                                           |           | yes      |
| path      | string  | The link the user is navigated to when clicking the item in menu or drawer. **Note:** Currently only relative links are supported                                         |           | yes      |
| protected | boolean | If **true** this link will be hidden when the user is not logged in.                                                                                                      | false     | no       |
| divider   | boolean | **Not used** Only applies to drawers allowing to add dividers between links. The divider will be added below this link, thus the `name` and `path` will still be required | false     | no       |
| icon      | node    | When using drawer you can specify an icon which will be shown to the left of the link                                                                                     | undefined | no       |

#### UserInfo

Information used when showing the avatar in the navigation bar

| Name     | Type   | Description                                                                      | default | required |
| -------- | ------ | -------------------------------------------------------------------------------- | ------- | -------- |
| name     | string | The name of the user. This will be used for the avatar if there is no `imageUrl` | ''      | no       |
| imageUrl | string | The image to show in the avatar                                                  | ''      | no       |

## ProtectedRoute

Hides the child routes if the user is not logged in

### Example

```javascript
import { ProtectedRoute } from '@vormadal/react-mui'
// other imports

function App(){
  const [isLoggedIn] = useState()
  return (
    <Routes>
      <Route path="not-protected" element={/* Some element */} />
      <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
        <Route path="protected-route-1" element={/** Some element */} />
        <Route path="protected-route-2" element={/** Some element */} />
      </Route>
    </Routes>
  )
}
```

### Props

| Name       | Type    | Description                                                                                                    | default | required |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| children   | node    | The components to be rendered if user is logged in                                                             |         | no       |
| isLoggedIn | boolean | If **false** the user will be redirected to '/' with the current location in the **returnUrl** query parameter | false   | no       |

# Hooks

## useData

The useData hook can be used to make it easier to handle loading and error state when fetching data from an API.
The hook takes a function and an optional argument array as a parameter which will be forwarded to the data function.
The hook returns an array with three values:

1. an object containing `loading` and `error` state and `data` which is loaded by the provided function.
2. a function which allows you to trigger reloads, with or without updated arguments
3. a function which allows you to set the data value directly.

### Example

```javascript
import { useData, Loading } from '@vormadal/react-mui'
// other imports
interface Props {
  query?: string
  date?: Date
}
function App({query, date}: Props){
  // simpleResult is an object which contains loading, error and data
  const [simpleResult] = useData(() => "simple data"/** fetc data from API */)
  // the update function can be used to reload data with default params or with new values if provided
  const [advancedResult, update] = useData((query, date) => `query=${query}, date=${date}` /** fetc data from API using query and date */, [query, date])
  return (
    <>
    <Loading {...simpleResult}>
      {simpleData => <div>{simpleData}</div>}
    </Loading>
    <Loading {...advancedData}>
      {advancedData => <div>{advancedData}</div>}
    </Loading>
    </>
  )
}
```

## useRequest

The `useRequest` is similar to the [useData](#usedata) hook with the main difference that is only used for submitting data.
The hook takes no parameters. An array with exactly two values is returned:

1. object with the `loading` and `error` state
2. a function which is used to wrap the submit request

### Example

```javascript
import { useRequest, Loading } from '@vormadal/react-mui'
// other imports

function App() {
  const [state, send] = useRequest()
  const submit = async () => {
    const {data, success} = await send(() => /** call api with some data */)
    if(success){
      // do something with data
    }
    else{
      // optionally do something with error or just let the Loading component show the error
    }
  }
  return (
    <>
      <button onClick={submit}>Submit</button>
      <Loading {...state} />
    </>
  )
}
```

## useToast

Is used to show different temporary messages to the user which will be removed after a certain amount of time.
The hook requires you to have added the [ToastProvider and Toaster](#toaster) component.
The hook returns a function with different functions used to show different styled messages.

### Example

```javascript
import { useToast, ToastProvider, Toaster } from '@vormadal/react-mui'

function App() {
  const toast = useToast()

  useEffect(() => {
    toast.success('hello world')
  }, [])
  return (
    <ToastProvider>
      <Toaster />
    </ToastProvider>
  )
}
```
