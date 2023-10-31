import './ListRecipes.css';
import IRecipe from '../../model/IRecipe';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Recipe from '../Recipe/Recipe';
import ILazy from '../../model/ILazy';

export default function ListRecipes() {
    const [recipesLazy, setRecipesLazy] = useState<ILazy>({
        items: [],
        startPage: 0,
        range: 10
    });
    const recipes: IRecipe[] | undefined = useSelector(
        (state: any) => state.recipesReducer.recipes
    )

    useEffect(() => {
        if (recipes?.length !== 0) {
            setRecipesLazy({
                items: initializeItems(),
                startPage: 7,
                range: 10
            });
        }
    }, [recipes])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [recipesLazy])

    function initializeItems() {
        const temp: IRecipe[] = []
        let maxRow = recipes!.length < 7 ? recipes!.length : 7;
        for (let i = 0; i < maxRow; i++) {
            temp.push(recipes![i]);
        }
        return temp;
    }

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
            return;
        }
        loadMore();
    }

    function loadMore() {
        for (let i = recipesLazy.startPage; (i < recipesLazy.startPage + recipesLazy.range) && (recipesLazy.startPage + recipesLazy.range <= recipes!.length); i++) {
            recipesLazy.items.push(recipes![i]);
        }
        setRecipesLazy({
            items: recipesLazy.items,
            startPage: recipesLazy.items.length,
            range: 10
        });

        if (recipesLazy.startPage + recipesLazy.range > recipes!.length) {
            setRecipesLazy({ ...recipesLazy, range: recipes!.length - recipesLazy.startPage });
        }
    }

    if (recipesLazy === null || recipesLazy === undefined || recipesLazy.items.length === 0) return (<div id="recipesMainDisplay"><h2>Choose Recipes Category from the Menu</h2></div>)

    return (
        <div id="recipesMainDisplay">
            {recipesLazy.items.map((curr) => (<Recipe key={curr._id} recipe={curr} />))}
        </div>
    )
}
