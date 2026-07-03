import { SiteHeader } from '@/components/site-header'
import { Gallery } from '@/components/gallery'
import { About } from '@/components/about'
import { Bestsellers } from '@/components/bestsellers'
import { Education } from '@/components/education'
import { Reviews } from '@/components/reviews'
import { SiteFooter } from '@/components/site-footer'
import { BoxLines } from '@/components/box-lines'

export default function Page() {
  return (
    <div className="relative">
      {/* Faint pastry-box ribbon lines — quiet background rhythm only */}
      <BoxLines className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.07]" />

      <SiteHeader />
      <main className="overflow-hidden">
        <Gallery />
        <About />
        <Bestsellers />
        <Education />
        <Reviews />
      </main>
      <SiteFooter />
    </div>
  )
}