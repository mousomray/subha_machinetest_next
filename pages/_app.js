import Wrapper from "./Layout/Wrapper";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // For React Query

export default function App({ Component, pageProps }) {

  // Create Query Client For React Query
  const queryClient = new QueryClient()

  return (
    <>

      {/*Cover with QueryClientProvider*/}
      <QueryClientProvider client={queryClient}>
        <Wrapper>
          <Component>
            {pageProps}
          </Component>
        </Wrapper>
      </QueryClientProvider>

    </>
  )


}