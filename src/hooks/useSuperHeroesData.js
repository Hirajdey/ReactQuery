import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes');
}

export const useSuperHeroesData = (onSuccess, onError) => {
   return useQuery(
        'super-heroes', 
        fetchSuperHeroes,
        {
            // cacheTime: 5000
            // staleTime: 30000
            // refetchOnMount: false   
            // refetchInterval: 1000,
            // refetchIntervalInBackground: true
            // enabled:false,
            onSuccess: onSuccess,
            onError: onError,
            select: (data) => {
                const supperHeroName = data.data.filter(hero => hero.name !== '');
                return supperHeroName;
            }
        }
    );
}

const addSuperHero = (hero) => {
    return axios.post('http://localhost:4000/superheroes', hero);
}

// Custom useMutation hook
export const useAddSuperHeroData = () => {
    const queryClient = useQueryClient()
  
    return useMutation(addSuperHero, {
      // onSuccess: data => {
      //   /** Query Invalidation Start */
      //   // queryClient.invalidateQueries('super-heroes')
      //   /** Query Invalidation End */
  
      //   /** Handling Mutation Response Start */
      // queryClient.setQueryData('super-heroes', oldQueryData => {
      //   return {
      //     ...oldQueryData,
      //     data: [...oldQueryData.data, data.data]
      //   }
      // })
      //   /** Handling Mutation Response Start */
      // },
      
      /**Optimistic Update Start */
      onMutate: async newHero => {
        await queryClient.cancelQueries('super-heroes')
        const previousHeroData = queryClient.getQueryData('super-heroes')
        queryClient.setQueryData('super-heroes', oldQueryData => {
          return {
            ...oldQueryData,
            data: [
              ...oldQueryData.data,
              { id: oldQueryData?.data?.length + 1, ...newHero }
            ]
          }
        })
        return { previousHeroData }
      },
      onError: (_err, _newTodo, context) => {
        queryClient.setQueryData('super-heroes', context.previousHeroData)
      },
      onSettled: () => {
        queryClient.invalidateQueries('super-heroes')
      }
      /**Optimistic Update End */
    })
  }