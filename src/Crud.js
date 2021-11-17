import React,{useState,useEffect} from 'react';
import Axios from 'axios' // allows you to make http requests to the backend

const Crud = () => {

  const [foodName, setFoodName] = useState('')
  const [days, setDays] = useState(0)
  const [foodList,setFoodList] = useState([])
  const [newFood,setNewFood] = useState([''])

  useEffect(()=>{
    Axios.get('http://localhost:4000/test/read').then((res)=>{
      console.log(res.data)
      setFoodList(res.data)
    })
  },[])

  const addToList = () => {
    Axios.post('http://localhost:4000/test/insert',{
      foodName: foodName,
      days: days
    })
  }

  const updateFood = (id) => {
    Axios.put('http://localhost:4000/test/update',{
      id:id,
      newFood: newFood
    })
  }

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:4000/test/delete/${id}`)
  }

    return (
        <div className="App">
      <h1> Crud app with mern</h1>

      <label>Food name: </label>
      <input type="text" onChange={(e) => {setFoodName(e.target.value)}}/>
      <label>Days since ate: </label> 
      <input type="number" onChange={(e) => {setDays(e.target.value)}}/>
      <button onClick={addToList}> Add to list</button>
      <h1>Food List</h1>
      {foodList.map((val,key)=>{
        return (
          <div key={key} className='food'>
            <h1>{val.foodName} - {val.days}</h1>
            <input type='text' placeholder='New Food Name' onChange={(e) => {setNewFood(e.target.value)}}/>
            <button onClick={()=>updateFood(val._id)}>update</button>
            <button onClick={()=>deleteFood(val._id)}>delete</button>
          </div>
        )
      })}
    </div>
    )
}

export default Crud
