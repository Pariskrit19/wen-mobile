import React from 'react'

const useIsDropdownMargin = () => {
  const [isMargin, setIsMargin] = React.useState<boolean>(false)
  const handleOutsideMargin = () => {
    setIsMargin((prev) => !prev)
  }
  return { isMargin, handleOutsideMargin }
}

export default useIsDropdownMargin
