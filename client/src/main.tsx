import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainRouter from './Routing/Router.tsx'
import { ToastContainer } from 'react-toastify'
import { ShopProvider } from './context/useShopContext.tsx'
import { QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <ShopProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer rtl position='bottom-right' />
        <MainRouter />
      </QueryClientProvider>
    </ShopProvider>
  // {/* </StrictMode> */}
  ,
)
