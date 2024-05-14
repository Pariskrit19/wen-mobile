import React from 'react'
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native'

const LeavesSkeleton = () => (
  <ContentLoader
    speed={1.5}
    interval={0.1}
    width={1000}
    height={120}
    viewBox="0 0 1000 120"
    backgroundColor="#d1d1d1"
    foregroundColor="#a6a6a6"
    animate={true}
  >
    <Rect x="9" y="16" rx="3" ry="3" width="119" height="19" />
    <Rect x="9" y="49" rx="3" ry="3" width="97" height="19" />
    <Rect x="9" y="82" rx="3" ry="3" width="72" height="16" />
    <Rect x="263" y="16" rx="3" ry="3" width="84" height="16" />
  </ContentLoader>
)

export default LeavesSkeleton
