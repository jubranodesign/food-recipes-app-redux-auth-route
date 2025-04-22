import { Link, useLocation } from "react-router-dom";
import { INav } from "../../model/INav";
import './Nav.css'
import { useCallback, useEffect, useRef, useState } from "react";
import { SiAcclaim } from 'react-icons/si';
import useScrollListener from "../../hooks/useScrollListener";

interface NavPops {
    links: INav[];
    isNavFixed?: boolean;
    position?: string
}

export default function Nav({ links = [], isNavFixed = false, position = 'top' }: NavPops) {
    const location = useLocation();
    const [navClass, setNavClass] = useState<string>('');
    const lastPositionRef = useRef<number>(0);
    const handleScroll = useCallback((): void => {
        if (isNavFixed && position === 'bottom') {
            if (lastPositionRef.current > 20 && navClass === 'NavBar fixed bottom hide') {
                setNavClass('NavBar fixed bottom');
            } else if (lastPositionRef.current < 20 && navClass === 'NavBar fixed bottom') {
                setNavClass('NavBar fixed bottom hide');
            }
            lastPositionRef.current = document.documentElement.scrollTop;
        }
    }, [isNavFixed, position, navClass]);

    useEffect(() => {
        if (isNavFixed) {
            if (position === 'top') {
                setNavClass('NavBar fixed top');
            } else {
                setNavClass('NavBar fixed bottom hide');
            }
        } else {
            setNavClass('NavBar')
        }
    }, [location])

    useScrollListener(handleScroll);

    const scrollTop = (): void => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div>
            <nav className={navClass}>
                <SiAcclaim width={'400'} className={isNavFixed ? 'siAcclaim' : 'hideSiAcclaim'} onClick={scrollTop} />
                {
                    links.length === 0 ?
                        (<p className="nav-item">No navigations links available</p>)
                        :
                        links?.map((curr) => (<Link key={curr._id} className={curr.url === location.pathname ? 'nav-item active' : 'nav-item'} to={curr.url}> {curr.name} </Link>))
                }
            </nav>
        </div>
    )
}
