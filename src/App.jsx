import { useState } from 'react'

function App() {
  const [timeinmin, settimeinmin] = useState(null)
  const [timeinday, settimeinday] = useState(null)
  const [query, setQuery] = useState('')
  const [coverId, setCoverId] = useState(null)

  async function findbook() {
    const res = await fetch(`https://openlibrary.org/search.json?title=${query}&fields=title,author_name,number_of_pages_median,first_publish_year,cover_i`)
    const data = await res.json()
    const book = data.docs[0]
    const pages = book.number_of_pages_median || 300
    const time = pages * 2
    const days = time / 45
    settimeinmin(time)
    settimeinday(days)
    setCoverId(book.cover_i)
  }

  return (
    <div className="min-h-screen  flex flex-col items-center pt-16 px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      <div className="bg-white rounded-2xl shadow border border-gray-200 p-8 w-full max-w-md">
        <img src="bookvel.png" className="max-h-[100px]"></img>
        <p className="text-gray-400 text-center text-sm mb-6">Find out how long a book will take to read</p>
        <div className="flex gap-2">
          <input
            className="flex-1 border border-gray-200 rounded-lg p-2 text-sm outline-none"
            placeholder="Search a book..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={findbook} className="bg-blue-500 text-white rounded-lg px-4 text-sm font-semibold">
            Search
          </button>
        </div>
      </div>

      {timeinmin && (
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-6 w-full max-w-md mt-4 flex gap-4 items-start">
          {coverId && <img src={`https://covers.openlibrary.org/b/id/${coverId}-M.jpg`} className="rounded-lg w-24 shadow" />}
          <div>
            <p className="text-gray-700 font-semibold text-lg mb-1">{Math.round(timeinmin)} min</p>
            <p className="text-gray-400 text-sm">or {Math.round(timeinday)} days at 45 min/day</p>
          </div>
        </div>
      )}

    </div>
  )
}

export default App