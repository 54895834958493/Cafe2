import React,{useState,useEffect} from 'react';
import { deleteTypeByName,getTypes } from '../../../../services/typesAPI';
import './DeleteType.scss';



const DeleteType = () => {
  const [allTypes,setAllTypes] = useState([]);
  const [candidateToDelete,setCandidateToDelete] = useState('');


  useEffect(()=>{
      getTypes()
        .then(types => setAllTypes(types))
        .catch(error => console.error(error));
  },[]);


  const deleteType = (typeName) => {
    deleteTypeByName(typeName)
      .then(() => {
        alert(`Тип ${typeName} успешно удален`);
        setAllTypes(allTypes => allTypes?.filter(({name}) => name !== typeName));
      })
      .catch(error => alert(error?.response?.data?.message?.message));
  }
  const renderAllTypes = () => (
      allTypes?.map(({name},index)=>(
        <option key={index} value={name}>{name}</option>
      ))
  )
  const handleSubmit = (event) => {
    event.preventDefault();
    deleteType(candidateToDelete);
  }

  return (

    <form onSubmit={handleSubmit} className='delete-type-wrapper'>
        <h1 className='manage-name-title'>Удалить тип</h1>
            <label className="delete-type-blocks">
                <p className='type-name'>
                  Выберите тип для удаления
                </p>
                <select 
                  className='select-type-wrapper' 
                  value={candidateToDelete} 
                  onChange={(e) => setCandidateToDelete(e.target.value)}>

                  <option value="">Выберите...</option>

                  {
                    renderAllTypes()
                  }

                </select>
             
            </label>


        

            <button 
              onClick={handleSubmit}
              type="submit"
              className='button-to-delete'
            >
              Удалить
            </button>
    </form>
  )
}

export default DeleteType