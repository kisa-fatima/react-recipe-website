import React, { useEffect } from 'react'

const StartHere = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div>StartHere</div>
  )
}

export default StartHere;