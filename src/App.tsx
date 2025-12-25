import "./App.css";

function App() {
  return (
    <main className="min-h-screen bg-white p-8">
      <section className="mb-12">
        <h1 className="text-headline-1 text-brown-600 mb-8">Design System</h1>

        {/* Colors Section */}
        <section className="mb-12">
          <h2 className="text-headline-2 text-brown-600 mb-6">Colors</h2>

          {/* Base Colors */}
          <article className="mb-8">
            <h3 className="text-headline-3 text-brown-600 mb-4">Base</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col">
                <div className="w-24 h-24 rounded-lg bg-brown-600 border border-brown-300"></div>
                <p className="text-body-2 text-brown-600 mt-2">Brown 600</p>
                <p className="text-body-3 text-brown-400">#26231e</p>
              </div>
              <div className="flex flex-col">
                <div className="w-24 h-24 rounded-lg bg-brown-500 border border-brown-300"></div>
                <p className="text-body-2 text-brown-600 mt-2">Brown 500</p>
                <p className="text-body-3 text-brown-400">#434038</p>
              </div>
              <div className="flex flex-col">
                <div className="w-24 h-24 rounded-lg bg-brown-400 border border-brown-300"></div>
                <p className="text-body-2 text-brown-600 mt-2">Brown 400</p>
                <p className="text-body-3 text-brown-400">#75716b</p>
              </div>
              <div className="flex flex-col">
                <div className="w-24 h-24 rounded-lg bg-brown-300 border border-brown-400"></div>
                <p className="text-body-2 text-brown-600 mt-2">Brown 300</p>
                <p className="text-body-3 text-brown-400">#dad6d1</p>
              </div>
              <div className="flex flex-col">
                <div className="w-24 h-24 rounded-lg bg-brown-200 border border-brown-300"></div>
                <p className="text-body-2 text-brown-600 mt-2">Brown 200</p>
                <p className="text-body-3 text-brown-400">#efeeeb</p>
              </div>
              <div className="flex flex-col">
                <div className="w-24 h-24 rounded-lg bg-brown-100 border border-brown-300"></div>
                <p className="text-body-2 text-brown-600 mt-2">Brown 100</p>
                <p className="text-body-3 text-brown-400">#f9f8f6</p>
              </div>
              <div className="flex flex-col">
                <div className="w-24 h-24 rounded-lg bg-white border border-brown-300"></div>
                <p className="text-body-2 text-brown-600 mt-2">White</p>
                <p className="text-body-3 text-brown-400">#ffffff</p>
              </div>
            </div>
          </article>

          {/* Brand Colors */}
          <article>
            <h3 className="text-headline-3 text-brown-600 mb-4">Brand</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col">
                <div className="w-24 h-24 rounded-lg bg-brand-orange border border-brown-300"></div>
                <p className="text-body-2 text-brown-600 mt-2">Orange</p>
                <p className="text-body-3 text-brown-400">#f2b68c</p>
              </div>
              <div className="flex flex-col">
                <div className="w-24 h-24 rounded-lg bg-brand-green border border-brown-300"></div>
                <p className="text-body-2  text-brown-600  mt-2">Green</p>
                <p className="text-body-3 text-brown-400">#12b279</p>
              </div>
              <div className="flex flex-col">
                <div className="w-24 h-24 rounded-lg bg-brand-green-light border border-brown-300"></div>
                <p className="text-body-2 text-brown-600 mt-2">Green Light</p>
                <p className="text-body-3 text-brown-400">#d7f2e9</p>
              </div>
              <div className="flex flex-col">
                <div className="w-24 h-24 rounded-lg bg-brand-red border border-brown-300"></div>
                <p className="text-body-2 text-brown-600  mt-2">Red</p>
                <p className="text-body-3 text-brown-400">#eb5164</p>
              </div>
            </div>
          </article>
        </section>

        {/* Typography Section */}
        <section>
          <h2 className="text-headline-2 text-brown-600 mb-6">Fonts</h2>
          <div className="space-y-4">
            <article className="p-4 border-2 border-brand-green rounded-lg">
              <p className="text-headline-1 text-brown-600">Headline 1</p>
              <p className="text-body-3 text-brown-400 mt-1">
                2.5rem (40px) • Semibold (600)
              </p>
            </article>
            <article className="p-4 border border-brown-300 rounded-lg">
              <p className="text-headline-2 text-brown-600">Headline 2</p>
              <p className="text-body-3 text-brown-400 mt-1">
                2rem (32px) • Semibold (600)
              </p>
            </article>
            <article className="p-4 border border-brown-300 rounded-lg">
              <p className="text-headline-3 text-brown-600">Headline 3</p>
              <p className="text-body-3 text-brown-400 mt-1">
                1.5rem (24px) • Semibold (600)
              </p>
            </article>
            <article className="p-4 border border-brown-300 rounded-lg">
              <p className="text-headline-4 text-brown-600">Headline 4</p>
              <p className="text-body-3 text-brown-400 mt-1">
                1.25rem (20px) • Semibold (600)
              </p>
            </article>
            <article className="p-4 border border-brown-300 rounded-lg">
              <p className="text-body-1 text-brown-600">
                Body 1 - The quick brown fox jumps over the lazy dog
              </p>
              <p className="text-body-3 text-brown-400 mt-1">
                1rem (16px) • Regular (400)
              </p>
            </article>
            <article className="p-4 border border-brown-300 rounded-lg">
              <p className="text-body-2 text-brown-600">
                Body 2 - The quick brown fox jumps over the lazy dog
              </p>
              <p className="text-body-3 text-brown-400 mt-1">
                0.875rem (14px) • Regular (400)
              </p>
            </article>
            <article className="p-4 border border-brown-300 rounded-lg">
              <p className="text-body-3 text-brown-600">
                Body 3 - The quick brown fox jumps over the lazy dog
              </p>
              <p className="text-body-3 text-brown-400 mt-1">
                0.75rem (12px) • Regular (400)
              </p>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
