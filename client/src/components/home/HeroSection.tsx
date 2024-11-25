export default function HeroSection() {
  return (
    <section className="text-center py-16 bg-white rounded-lg shadow-sm">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Discover Authentic Luxury Fashion
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Shop pre-owned designer bags, shoes, and clothing at amazing prices
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="/products"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Shop Now
        </a>
        <a
          href="/sell"
          className="bg-white text-black px-6 py-3 rounded-lg border border-black hover:bg-gray-50 transition"
        >
          Start Selling
        </a>
      </div>
    </section>
  )
}