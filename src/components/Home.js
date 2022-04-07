import IndexPlaces from "./places/IndexPlaces"
import { Link } from 'react-router-dom'

const linkStyle = {
	color: 'white',
	textDecoration: 'none'
}

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
					<h2 className="home-text-header"><Link to='/sign-in' style={linkStyle}>ENTER</Link></h2>
					<p className="home-description-one">Discover<br></br> Haunted<br></br> Locales</p>
					<p className="home-description-two">Add<br></br> Your<br></br> Findings</p>
					<p className="home-description-three">Share<br></br> Your<br></br> Story</p>
					<img className="home-image" src="https://i.imgur.com/DJHccXS.jpg"></img>
					{/* <IndexPlaces msgAlert={props.msgAlert}/> */}
				{/* </div>
			</div> */}
		</>
	)
}

export default Home
