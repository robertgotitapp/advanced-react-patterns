// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

// 🐨 create your ToggleContext context here
const ToggleContext = React.createContext()
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 remove all this 💣 and instead return <ToggleContext.Provider> where
  // the value is an object that has `on` and `toggle` on it.
  return (
    <ToggleContext.Provider value={{
      on,
      toggle
    }}>
      {children}
    </ToggleContext.Provider>
  )
}

const useToggle = () => {
  const context = React.useContext(ToggleContext)
  if (!context) {
    throw new Error('Please use this within ToggleContext provider') 
  }
  return context
}


function ToggleOn({children}) {
  const context = useToggle()
  return context.on ? children : null
}

function ToggleOff({children}) {
  const context = useToggle()
  return context.on ? null : children
}

function ToggleButton({...props}) {
  const context = useToggle()
  return <Switch on={context.on} onClick={context.toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
