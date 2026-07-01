import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { Directions } from '@/components/directions'
import { Bestsellers } from '@/components/bestsellers'
import { Gallery } from '@/components/gallery'
import { SiteFooter } from '@/components/site-footer'
import { BoxLines } from '@/components/box-lines'
import Image from 'next/image';

export default function Page() {
  return (
    <div className="relative">
      {/* Faint pastry-box ribbon lines — quiet background rhythm only */}
      <BoxLines className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.07]" />

      <SiteHeader />
      <main>
        <Hero />
        <Directions />
        <Bestsellers />
        <Gallery />
      </main>
      <SiteFooter />
    </div>
  )
}
