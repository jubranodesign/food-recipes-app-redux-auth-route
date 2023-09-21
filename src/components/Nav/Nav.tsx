import { Link, useLocation } from "react-router-dom";
import { INav } from "../../model/INav";
import './Nav.css'

export default function Nav(props: { links: INav[] | undefined }) {
    const location = useLocation();

    return (
        <div>
            <nav className="NavBar">
                {props.links?.map((curr) => (<Link key={curr.id} className={curr.url === location.pathname ? 'nav-item active' : 'nav-item'} to={curr.url}> {curr.name} </Link>))}
            </nav>
        </div>
    )
}
