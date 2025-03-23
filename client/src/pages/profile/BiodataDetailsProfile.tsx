import React from 'react'
import { useParams } from 'react-router-dom'

const BiodataDetailsProfile = () => {
    const {id} = useParams<{id: string}>()
  return (
    <div>BiodataDetailsProfile</div>
  )
}

export default BiodataDetailsProfile