import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { RefreshControl } from 'react-native';
import { 
    Container, 
    HeaderArea, 
    HeaderTitle, 
    Scroller, 
    ListArea,
    EmptyWarning, 
} from './styles';

import Api from '../../Api';
import BarberItem from '../../components/BarberItem';

export default () => {
    
    const { state:user, dispatch:userDispatch } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    const getFavorites = () => {
        setLoading(true);
        setList([]);

        let favoritos = user.favorites ? user.favorites : false;

        if(favoritos && favoritos.length > 0){
            setList(prevFavorites => ([...prevFavorites, ...favoritos]));
        }

        setLoading(false);
    }

    useEffect(()=>{
        getFavorites();
    }, []);

    return (
        <Container>
            <HeaderArea>
                <HeaderTitle>Favoritos</HeaderTitle>
            </HeaderArea>

            <Scroller refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getFavorites} />
            }>
                { !loading && Object.keys(list).length === 0 && 
                    <EmptyWarning>Não há favoritos na sua lista.</EmptyWarning>
                }
                <ListArea>
                    { list.map((item, key)=>(
                        <BarberItem key={key} data={item} />
                    )) }
                </ListArea>
            </Scroller>
        </Container>
    );
}