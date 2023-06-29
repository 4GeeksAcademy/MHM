import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import context from "react-bootstrap/esm/AccordionContext";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-custom">
			<Link className="navbar-brand" to="/mainpage">
				<img
					className="navbar-image"
					src="https://cdn11.bigcommerce.com/s-dl22izwaan/images/stencil/1280x1280/products/1048/18975/2215_1k__02095.1625592307.jpg?c=1"
					alt="Navbar Logo"
				/>
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<Link className="nav-link" to="/meditation">
							Meditation
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/resource">
							Resource
						</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/journal">
							Journal
						</Link>
					</li>
				</ul>
			</div>

		</nav>
	);
};
