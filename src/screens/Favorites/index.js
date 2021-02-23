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
    
    const { state:user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState(user.favorites);

    const getFavorites = async () => {
        setLoading(true);
        setList([]);

        if(user.favorites.length > 0){
            setList(user.favorites);
        }

        setLoading(false);
    }

    return (
        <Container>
            <HeaderArea>
                <HeaderTitle>Favoritos</HeaderTitle>
            </HeaderArea>

            <Scroller refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getFavorites} />
            }>
                { !loading && list.length === 0 && 
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