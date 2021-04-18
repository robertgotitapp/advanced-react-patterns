// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

const ToggleOn = ({on, children}) => on && children
const ToggleOff = ({on, children}) => !on && children
const ToggleButton = ({on, toggle}) => <Switch on={on} onClick={toggle}/>
const allowedTypes = [ToggleOn, ToggleOff, ToggleButton]

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 replace this with a call to React.Children.map and map each child in
  // props.children to a clone of that child with the props they need using
  // React.cloneElement.
  return React.Children.map(children, (child, index) => {
    if (allowedTypes.includes(child.type)) {
      const newChild = React.cloneElement(child, {
        on,
        toggle,
      })
      return newChild
    }
    return child
  })
}


function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <span>Hello</span>
        <ToggleButton />
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
