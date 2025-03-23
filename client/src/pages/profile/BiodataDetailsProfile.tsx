import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'

const BiodataDetailsProfile = () => {
    const {id} = useParams<{id: string}>()

    const { data, isLoading, error } = useQuery({
        queryKey: ['BiodataDetailsProfile', id],
        queryFn: () => fetchBiodataDetail(id as string),
        enabled: !!id,
      });

      
  return (
    <div>BiodataDetailsProfile</div>
  )
}

export default BiodataDetailsProfile