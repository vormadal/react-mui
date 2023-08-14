# vormadal/react-mui

This library contains a collection of hooks and components that I have found useful in my React projects.

# Installation

Using npm

```
npm install @vormadal/react-mui
```

This library is intended to be used with the following libraries:

1. react-router-dom
2. @mui/material
3. @mui/icons-material
4. @emotion/react
5. @emotion/styles

# Components

## Toaster

## Loading

The `<Loading />` component is used when you want to show a spinner while data is loading.
The component works very well with the `useData` hook where the hook values can be forwarded to the `<Loading />` component.  
As long as there is no data the `children` will not be rendered. 
This way you don't have to check if `data` is defined or not.

### Example

```javascript
function MyComponent(){
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

## ProtectedRoute

# Hooks

## useData

## useRequest

## useToast

# Jest references

Jest getting started

Jest config when using typescript (also use babel)
https://kulshekhar.github.io/ts-jest/docs/getting-started/installation/#jest-config-file
