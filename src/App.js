import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sign from "./Components/SignIn";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Reset from "./Components/Reset";
import Events from "./Pages/EventsPage";
import Weather from "./Pages/WeatherPage";
import Settings from "./Pages/SettingsPage";
import { React, Fragment } from "react";
import Home from "./Pages/Home";
import Links from "./Pages/Links";
import Calendar from "./Pages/Calendar";
import Layout from "./Pages/Layouts";


export default function App() {
	return (
		<Router className="division">
			<Fragment>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sign" element={<Sign />} />;
					<Route
						path="/dash"
						element={<Dashboard title="Dashboard" />}
					/>
					<Route path="/register" element={<Register />} />
					<Route path="/reset" element={<Reset />} />
					<Route
						path="/events"
						element={<Events title="Manage Events" />}
					/>

					<Route path="/settings" element={<Settings />}></Route>
				
					{/* <Route path="/links" element={<Links />} /> */}
					<Route
						path="/links"
						element={<Links title="Links" />}
					/>

					<Route path="/layout" element={<Layout />} />;
					<Route path="/weather" element={<Weather />} />;
					<Route path="/calendar" element={<Calendar />} />

				</Routes>
			</Fragment>
		</Router>
	);
}
