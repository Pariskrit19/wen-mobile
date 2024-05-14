import React from 'react'
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native'

const LogtimesSkeleton = () => (
  <ContentLoader
    speed={1.5}
    interval={0.1}
    animate={true}
    width={1000}
    height={100}
    viewBox="0 0 950 100"
    backgroundColor="#d1d1d1"
    foregroundColor="#a6a6a6"
  >
    <Rect x="16" y="28" rx="4" ry="4" width="125" height="22" />
    <Rect x="16" y="62" rx="4" ry="4" width="107" height="19" />
    <Rect x="188" y="62" rx="4" ry="4" width="104" height="19" />
  </ContentLoader>
)

export default LogtimesSkeleton
