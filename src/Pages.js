import React from 'react'

export default function Pages({ goToNextPage, goToPrevPage }) {
  return (
    <div>
      {goToPrevPage && <button onClick = {goToPrevPage}>Previous</button>}
      {goToNextPage && <button onClick = {goToNextPage}>Next</button>}
    </div>
  )
}
