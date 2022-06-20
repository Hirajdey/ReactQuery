import { useState } from "react";
import { Link } from "react-router-dom";  
import { useAddSuperHeroData, useSuperHeroesData } from "../hooks/useSuperHeroesData";

const Rqsuperheros = () => {
  const [name, setName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');
  
	const onSuccess = (data) => {
		console.log('Perform side effect after data fetching', data);
	}

	const onError = (error) => {
		console.log('Perform side efffect after encountering error', error);
	}
	
  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError);

  const { mutate: addHero, isLoading: isAddHeroLoading, isError: isAddHeroError, error: addHeroError  } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    const hero = {name, alterEgo}
    addHero(hero)
  }

  if(isLoading || isFetching){ 
    return <h2>Loading...</h2>
  }

  if(isError){
    return <h2>{error.message}</h2>
  }

  return (
      <>
        <h2>Rqsuperheros</h2>
        <div>
          <input
            type='text'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type='text'
            value={alterEgo}
            onChange={e => setAlterEgo(e.target.value)}
          />
          <button onClick={handleAddHeroClick}>Add Hero</button>
        </div>

        <button onClick={refetch}>OnClick Fetch Data</button>
        {data?.map(hero => (
            <div key={hero.name}>
              <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
            </div>
        ))}
				{/* {
					data.map(heroName => {
						return <div key={heroName}>{heroName}</div>
					})
				} */}
      </>
  )
}

export default Rqsuperheros