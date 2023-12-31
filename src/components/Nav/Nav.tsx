import { Link, useLocation } from "react-router-dom";
import { INav } from "../../model/INav";
import './Nav.css'
import { useEffect, useState } from "react";
import { SiAcclaim } from 'react-icons/si';

export default function Nav(props: { links: INav[] | undefined, isNavFixed?: boolean | false, position?: string | 'top' }) {
    const location = useLocation();
    const [navClass, setNavClass] = useState<string>('');
    const [lastPosition, setLastPosition] = useState<number>(0);

    useEffect(() => {

        if (props.isNavFixed) {
            if (props.position === 'top') {
                setNavClass('NavBar fixed top');
            } else {
                setNavClass('NavBar fixed bottom hide');
            }
        } else {
            setNavClass('NavBar')
        }
    }, [location])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastPosition])

    function handleScroll() {
        if (props.isNavFixed && props.position === 'bottom') {
            if (lastPosition > 20 && navClass === 'NavBar fixed bottom hide') {
                setNavClass('NavBar fixed bottom');
            } else if (lastPosition < 20 && navClass === 'NavBar fixed bottom') {
                setNavClass('NavBar fixed bottom hide');
            }
            setLastPosition(document.documentElement.scrollTop)
        }
    }

    function scrollTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div>
            <nav className={navClass}>
                <SiAcclaim width={'400'} className={props.isNavFixed ? 'siAcclaim' : 'hideSiAcclaim'} onClick={scrollTop} />
                {props.links?.map((curr) => (<Link key={curr._id} className={curr.url === location.pathname ? 'nav-item active' : 'nav-item'} to={curr.url}> {curr.name} </Link>))}
            </nav>
        </div>
    )
}
