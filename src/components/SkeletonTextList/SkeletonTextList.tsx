import { Skeleton } from '@mui/material'
import React from 'react'

interface SkeletonTextListProps {
  length: number
  width: number
}

export default function SkeletonTextList(props: SkeletonTextListProps) {
  return (
    <div>
      {new Array(props.length).fill(null).map((_, index) => {
        return <Skeleton key={index} width={props.width} variant="text" />
      })}
    </div>
  )
}
