import React, {useState} from 'react';
import useFetchJob from './useFetchJob';
import {Container} from 'react-bootstrap';
import Job from './Job';
import JobPagination from './JobPagination';
import SearchForm from './SearchForm';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs , loading , error, hasNextPage} = useFetchJob(params, page);

  function handleParamChange(e){
    const param = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams(prevParams=>{
      return{ ...prevParams, [param]: value}
    })
  }

  return (
    <div className="App">
      <Container className='my-4'>
        <h1 className='mb-4'>Find a Job</h1>
        <SearchForm params={params} onParamChange={handleParamChange} />
        <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
        {loading && <h1>loading...</h1>}
        {error && <h1>error. try refreshing</h1>}
        {jobs.map(job => {
          return <Job key={job.id} job={job} hasNextPage={hasNextPage}/>
        })}
        <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      </Container>
    </div>
  );
}

export default App;
