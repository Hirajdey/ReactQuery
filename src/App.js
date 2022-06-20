import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import './App.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import HomePage  from './components/Home.page'
import RQSuperHeroesPage from './components/RQSuperheros.page'
import SuperHeroesPage from './components/Superheros.page'
import RQSuperheroPage from './components/RQSuperhero.page'
import ParallelQueriesPage from './components/ParallelQueries.page'
import DynamicParallelPage from './components/DynamicParallel.page'
import DependentQueriesPage from './components/DependentQueries.page'
import { PaginatedQueriesPage } from './components/PaginatedQueries.page'
import { InfiniteQueriesPage } from './components/InfiniteQueries.page'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/rq-infinite' element={<InfiniteQueriesPage/>}/>
            <Route path='/rq-paginated' element={<PaginatedQueriesPage/>}/>
            <Route path='/rq-dependent' element={<DependentQueriesPage email='deyhiraj@gmail.com'/>}/>            
            <Route path='/rq-dynamic-parallel' element={<DynamicParallelPage heroIds={[1, 3]}/>}/>
            <Route path='/rq-parallel' element={<ParallelQueriesPage/>}/>
            <Route path='/rq-super-heroes/:heroId' element={<RQSuperheroPage/>}/>
            <Route path='/super-heroes' element={<SuperHeroesPage />}/>
            <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />}/>
            <Route path='/' element={<HomePage />}/>
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position={'bottom-left'}/>
    </QueryClientProvider>
  )
}

export default App