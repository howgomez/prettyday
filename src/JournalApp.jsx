import { AppRouter } from './router/AppRouter'
import { AppTheme } from './theme'
import './styles.css'
export const JournalApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  )
}
