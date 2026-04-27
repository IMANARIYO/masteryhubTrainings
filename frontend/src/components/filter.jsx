import React, { useState } from 'react'

const Filter = () => {
  const [isCliked, SetIsCliked] = useState(false)
  const [numberClicked, SetNumberClicked] = useState(0)
  function handleClick () {
    SetIsCliked(!isCliked)
    SetNumberClicked(numberClicked + 1)
  }
  return (
    <div>
      {isCliked &&
        <span>
          i have to occur only if the burtton is clikced {numberClicked}
        </span>}

      <button onClick={() => handleClick()}>Click me </button>
    </div>
  )
}

export default Filter
