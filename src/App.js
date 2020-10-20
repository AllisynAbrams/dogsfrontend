import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {
	// 1. url variable for backend server
  // const url = 'http://localhost:4500';
  const url = 'https://dogsbackend-aa.herokuapp.com';

	// 2. make instance of state to hold all the dogs
	const [dogs, setDogs] = React.useState([]);
	// 11. empty dog for the FORM (i.e. empty shell for what the form can hold and we can also use this to change state to emptyDog/reset form to blank and start over again)
	const emptyDog = {
		name: '',
		age: 0,
		img: '',
	};

	// 15 make instance of state to hold just the seleted dog [to update]
	const [selectedDog, setSelectedDog] = React.useState(emptyDog);

	// 3. function to fetch dogs
	const getDogs = () => {
		fetch(url + '/dog')
			// first .then changes response to json
			.then((response) => response.json())
			//  second .then allows us to use the data now that it's in json
			.then((data) => {
				setDogs(data);
			});
	};

	// 4. initial "fetch" of dogs to get dogs on page load
	React.useEffect(() => getDogs(), []);
	// 5. check the server/browers to to use inspector tools, components, app, and then you can see hooks and State

	//  12. handleCreate function for creating new dogs
	// when we hit submit on the form, this function is going to run (ie receive info from the new dog object through passing it in through parameter)
	// then empty object will hold what we wnt to put in the new object
	//            passing new object from the form inputs
	const handleCreate = (newDog) => {
		fetch(url + '/dog/', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(
				newDog
			) /*stringify takes a javascrip object and turns it into a json string (json string {"first": "allisyn"} vs javscript string {first: "allisyn}*/,
    }).then((response) => getDogs()); /*whenever we call the getDogs() it's because we want to refresh the state so page rerenders to updated dogs array*/
    
		// ^^^  post request will hapepn, it will be turned into json formaet, and then another request will be made to get list of dogs, including the new dog that was just created
	};


// 16. handleUpdate function to update a dog when form is clicked
const handleUpdate = (dog) => {
	fetch(url + '/dog/' + dog._id, {
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dog),
	}).then((response) => getDogs());
	// ^^^  post request will hapepn, it will be turned into json formaet, and then another request will be made to get list of dogs, including the updates on the dog that was just udpated
}

// 17. select dog which selects a dog
const selectDog = (dog) => {
  setSelectedDog(dog)
}

// 20. deleteDog function to delete a dog
const deleteDog = (dog) => {
  fetch(url + '/dog/' + dog._id, {
    method: "delete"
  })
  .then((response) => getDogs())
}
// pass down to DISPLAY route 



	return (
		<div className='App'>
			<h1>DOG LISTING SITE</h1>
			<hr />
			{/* 14. create a button that links to the /create route*/}
			<Link to='/create'>
				<button>Add Dog</button>
			</Link>
			<main>
				<Switch>
					{/* .6 added dogs={dogs} to pass down the data as a prop to Display component! ..last thing in <Display/> */}
					<Route
          // 18. pass down selectDog to Display route
						exact
						path='/'
						render={(rp) => <Display {...rp} dogs={dogs} selectDog={selectDog}
            deleteDog={deleteDog}/>}
					/>
					<Route
						exact
						path='/create'
						render={(rp) => (
							// 13. passed in the {emptyDog} object  and {handleCreate} function
							<Form
								{...rp}
								label='create'
								dog={emptyDog}
								handleSubmit={handleCreate}
							/>
						)}
					/>
					<Route
          // 19. pass down selectedDog and handleUpdate functions
						exact
						path='/edit'
						render={(rp) => (
							<Form {...rp} label='update' dog={selectedDog} handleSubmit={handleUpdate} />
						)}
					/>
				</Switch>
			</main>
		</div>
	);
}

export default App;
