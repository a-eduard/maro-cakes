import { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Education } from '@/components/education'

export const metadata: Metadata = {
  title: 'Обучение кондитерскому искусству | MarO Батуми',
  description: 'Мастер-классы по современным десертам, тортам и выпечке в Батуми. Групповое и индивидуальное обучение.',
}

export default function EducationPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      
      {/* Используем отступ сверху, чтобы шапка не перекрывала контент */}
      <main className="flex-1 pt-12 md:pt-24">
  <Education isDetailedView={true} />
</main>

      <SiteFooter />
    </div>
  )
}