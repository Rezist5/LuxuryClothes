import FeaturedProducts from '@/components/home/FeaturedProducts'
import CategoryGrid from '../components/categories/CategoryGrid'
import HeroSection from '../components/home/HeroSection'

export default function Home() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
    </div>
  )
}