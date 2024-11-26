import SearchBar from './SearchBar'

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Существующие элементы шапки */}
          <div className="w-full max-w-md mx-4">
            <SearchBar />
          </div>
          {/* Остальные элементы */}
        </div>
      </div>
    </header>
  )
} 