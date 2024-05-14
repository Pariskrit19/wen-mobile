import React from 'react'
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native'

const NotificationSkeleton = () => (
  <ContentLoader
    speed={1.5}
    interval={0.1}
    width={1000}
    height={129}
    viewBox="0 0 1000 129"
    backgroundColor="#d1d1d1"
    foregroundColor="#a6a6a6"
    animate={true}
  >
    <Rect x="20" y="13" rx="3" ry="3" width="96" height="19" />
    <Rect x="106" y="56" rx="3" ry="3" width="230" height="20" />
    <Circle cx="56" cy="83" r="30" />
    <Rect x="106" y="83" rx="3" ry="3" width="125" height="15" />
    <Rect x="106" y="107" rx="3" ry="3" width="60" height="14" />
  </ContentLoader>
)

export default NotificationSkeleton
