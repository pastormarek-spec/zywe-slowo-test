import { createBrowserRouter, Outlet, useParams } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import { I18nProvider } from './i18n'
import { Header } from './components/Header'
import { LangGate } from './pages/LangGate'
import { Home } from './pages/Home'
import { CategoryPage } from './pages/CategoryPage'
import { SearchPage } from './pages/SearchPage'
import { Reader } from './pages/Reader'
import { About } from './pages/About'

registerSW({ immediate: true })

function LangLayout() {
  const { lang = 'pl' } = useParams()
  return (
    <I18nProvider lang={lang}>
      <div className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-6">
          <Outlet />
        </main>
      </div>
    </I18nProvider>
  )
}

export const router = createBrowserRouter(
  [
    { path: '/', element: <LangGate /> },
    {
      path: '/:lang',
      element: <LangLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'c/:category', element: <CategoryPage /> },
        { path: 'search', element: <SearchPage /> },
        { path: 's/:id', element: <Reader /> },
        { path: 'about', element: <About /> }
      ]
    }
  ],
  { basename: import.meta.env.BASE_URL }
)
