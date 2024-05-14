import React from 'react'
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native'

const CoworkerSkeleton = () => (
  <ContentLoader
    speed={1}
    interval={0.1}
    width={1000}
    height={90}
    viewBox="0 0 520 50"
    backgroundColor="#d1d1d1"
    foregroundColor="#a6a6a6"
    animate={true}
  >
    <Rect x="50" y="10" rx="3" ry="3" width="125" height="10" />
    <Rect x="50" y="32" rx="3" ry="3" width="79" height="10" />
    <Circle cx="20" cy="20" r="20" />
  </ContentLoader>
)

export default CoworkerSkeleton
