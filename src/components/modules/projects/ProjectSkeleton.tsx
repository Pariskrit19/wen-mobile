import React from 'react'
import ContentLoader, { Rect, Circle, Path } from 'react-content-loader/native'

const ProjectSkeleton = () => (
  <ContentLoader
    speed={1.5}
    interval={0.1}
    width={1000}
    height={120}
    viewBox="0 0 1000 120"
    backgroundColor="#a6a6a6"
    foregroundColor="#d1d1d1"
    animate={true}
  >
    <Rect x="29" y="18" rx="6" ry="6" width="70" height="20" />
    <Rect x="280" y="24" rx="6" ry="6" width="50" height="11" />
    <Rect x="31" y="68" rx="6" ry="6" width="78" height="13" />
    <Rect x="32" y="89" rx="6" ry="6" width="78" height="13" />
    <Rect x="280" y="89" rx="6" ry="6" width="78" height="13" />
    <Rect x="31" y="44" rx="6" ry="6" width="130" height="16" />
    <Rect x="280" y="70" rx="6" ry="6" width="78" height="13" />
  </ContentLoader>
)

export default ProjectSkeleton
