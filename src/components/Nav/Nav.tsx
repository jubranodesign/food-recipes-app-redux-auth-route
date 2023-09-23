import { Link, useLocation } from "react-router-dom";
import { INav } from "../../model/INav";
import './Nav.css'
import { useEffect, useState } from "react";

export default function Nav(props: { links: INav[] | undefined, isNavFixed?: boolean | false, position?: string | 'top' }) {
    const location = useLocation();
    const [navCss, setnavCss] = useState<string>('');

    useEffect(() => {

        if (props.isNavFixed) {
            if (props.position === 'top') {
                setnavCss('NavBar fixed top');
            } else {
                setnavCss('NavBar fixed bottom');
            }
        } else {
            setnavCss('NavBar')
        }

    }, [])

    return (
        <div>
            <nav className={navCss}>
                {props.links?.map((curr) => (<Link key={curr.id} className={curr.url === location.pathname ? 'nav-item active' : 'nav-item'} to={curr.url}> {curr.name} </Link>))}
            </nav>
        </div>
    )
}
