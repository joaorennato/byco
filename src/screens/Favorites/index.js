import React, { useState, useEffect } from 'react';
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

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    const getFavorites = async () => {
        setLoading(true);
        setList([]);

        let res = await Api.getFavorites();
        if(res.error == ''){
            setList(res.list);
        } else {
            alert('Erro: ' + res.error);
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