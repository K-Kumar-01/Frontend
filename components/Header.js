import React from 'react';
import Link from 'next/link';

const Header = () => {
	return (
		<nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
			<div className="container">
				<a className="navbar-brand" href="#">
					Titan Read
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<Link href="/articles">
								<a>Articles</a>
							</Link>
						</li>
						<li className="nav-item">
							<Link href="/membership">
								<a>Subscribe</a>
							</Link>
						</li>
						<li className="nav-item">
							<Link href="/signup">
								<button className={`btn`}>Get Started</button>
							</Link>
						</li>
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdown"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								User Icon Here
							</a>
							<div className="dropdown-menu" aria-labelledby="navbarDropdown">
								<a className="dropdown-item" href="#">
									Profile
								</a>
								<a className="dropdown-item" href="#">
									My Posts
								</a>
								<div className="dropdown-divider"></div>
								<a className="dropdown-item" href="#">
									Logout
								</a>
							</div>
						</li>
					</ul>
					{/* <form className="form-inline my-2 my-lg-0">
						<input
							className="form-control mr-sm-2"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<button className="btn btn-outline-success my-2 my-sm-0" type="submit">
							Search
						</button>
					</form> */}
				</div>
			</div>
		</nav>
	);
};

export default Header;
