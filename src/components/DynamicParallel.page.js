import { useQueries } from "react-query"
import axios from "axios"

const fetchSuperheros = (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`);
}

const DynamicParallelPage = ({heroIds}) => {
    const queryResult = useQueries(
        heroIds.map( id => {
            return {
                queryKey: ['super-hero', id],
                queryFn: () => fetchSuperheros(id)
            }
        })
    )
        
    console.log(queryResult);
    return (
    <div>DynamicParallelPage</div>
  )
}

export default DynamicParallelPage