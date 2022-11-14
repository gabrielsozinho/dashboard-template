import dynamic from 'next/dynamic'

const LazyIndex = dynamic(() => import('../src/index'), { ssr: false })

export default function IndexPage() {
  return <LazyIndex />
}
