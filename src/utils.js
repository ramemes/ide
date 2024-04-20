export const changeVerticalHeight = (e, height, setHeight) => {
  const y = e.clientY
  const initialHeight = parseInt(height, 10)

  const mouseMoveHandler = (e) => {
    const dy = e.clientY-y
    const newHeight = initialHeight + dy
    setHeight(newHeight)
  }

  const mouseUpHandler = () => {
    document.removeEventListener('mouseup', mouseUpHandler)
    document.removeEventListener('mousemove', mouseMoveHandler)
  }

  document.addEventListener('mousemove', mouseMoveHandler)
  document.addEventListener('mouseup', mouseUpHandler)

}

