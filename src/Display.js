import React from "react";

const Display = (props) => {

// 7. create object destrutur for dog variable
// this is allows us to use a variable instead of props
const {dogs} = props

  // 7.
  const loaded = () => (
    <div style={{textAlign: "center"}}>
      {/* 8 dogs.map here is coming from the variable dogs (which is object destrutured) */}
      {dogs.map((dog) => (
        <article>
          {/* 9 we use dog.xxxxx because dog is just the param we used in the map function..could be element, item, etc. anything */}
          <img src={dog.img} />
          <h1>{dog.name}</h1>
          <h3>{dog.age}</h3>
          <button onClick={() => {
            props.selectDog(dog) /*bc we're in a map, we know the "dog" to update when we click the edit button is the dog passing passed through in this instance/round of mapping*/
            props.history.push('/edit') /*Push back to display page after clicking on edit button (changes the url back to just "/") / history a method found within router props */
          }}>Edit</button>
          <button onClick={() => {
            props.deleteDog(dog)
          }}>Delete</button>
        </article>
      ))}
    </div>
  )

  // 10 back in App.js dogs was just an initial array
  // when the API call ends, it should be array filled with dogs
  // we need to use a ternary operator incase the "API" data isn't fully loaded yet..
  // below is ternary operator saying if the array of dogs has a length great than 0 (aka if there are dogs actually in the array at this moment), then run the above loaded() function to load the {dogs} (aka dogs props) on the page as we wrote out above, otherwise if the dogs array is empty for a few seconds (or just empty bc something isn't working), then just write an h1 on the screen that says loading...
  return dogs.length > 0 ? loaded() : <h1>LOADING...</h1>
};

export default Display;
