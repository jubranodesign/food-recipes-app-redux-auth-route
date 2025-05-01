import { useContext } from 'react';
import Nav from './Nav';
import { useQuery } from '@tanstack/react-query';
import AppContext from '../../contexts/AppContext';
import { useSelector } from 'react-redux';

export default function MainNavigation() {
    const services = useContext(AppContext);
    const { data: navigations = [] } = useQuery(
        ['navigations'],
        () => services!.navigationService.getAllItems(), // use ! because we're guarding it
        {
            enabled: !!services?.navigationService, // only run if service exists
        }
    );
    const token = useSelector((state: any) => state.tokenReducer.token);

    return (
        <>
            {!token ? (
                <div className='NavBar fixed top warn'>You need to login to access the content</div>
            ) : (
                <><Nav links={navigations} /><Nav isNavFixed={true} position="bottom" links={navigations} /></>
            )}
        </>
    )
}
