import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { useState } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { nanoid } from 'nanoid'

import { defaultContext, ThemeContext } from './utils/ThemeContext';
import { store, persistor } from './store'

import { Header } from "./components/Header/Header"
import { MainPage } from './pages/MainPage'
import { ProfilePage } from './pages/ProfilePage'
import { AboutWithConnect } from './pages/AboutPage'
import { ChatsPage } from './pages/ChatsPage/ChatsPage'
import { ChatList } from './components/ChatsList/ChatList'
import { Articles } from './pages/Articles'

export function App() {
  const [theme, setTheme] = useState(defaultContext.theme)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      {/* <Header /> */}
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeContext.Provider value={{
            theme,
            toggleTheme
          }}>
            <Routes>
              <Route path='/' element={<Header />}>
                <Route index element={<MainPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/about' element={<AboutWithConnect />} />
                <Route path='chats'>
                  <Route index element={<ChatList />} />
                  <Route
                    path=':chatId'
                    element={<ChatsPage />}
                  />
                </Route>
                <Route path='articles' element={<Articles />} />
              </Route>
              <Route path='*' element={<h2>404 Page not FOUND</h2>} />
            </Routes>
          </ThemeContext.Provider>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App