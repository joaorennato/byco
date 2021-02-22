import React, { useState, useEffect } from 'react';
import { 
    Container, 
    HeaderArea, 
    HeaderTitle, 
    SearchArea, 
    SearchInput, 
    Scroller, 
    LoadingIcon, 
    ListArea, 
    EmptyWarning
} from './styles';

import Api from '../../Api';
import BarberItem from '../../components/BarberItem';

export default () => {

    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [emptyList, setEmptyList] = useState(false);

    const searchBarbers = async () => {
        setLoading(true);
        setEmptyList(false);
        setList([]);

        if(searchText != ''){
            let res = await Api.search(searchText);
            if(res.error == ''){
                
                //console.log(res.list.length);

                if(res.list.length > 0){
                    setEmptyList(false);
                    setList(res.list);

                    
                } else {
                    setEmptyList(true);
                }
            } else {
                alert('Erro: ' + res.error);
            }
        }

        setLoading(false);
    }

    useEffect(()=>{
        searchBarbers();
    }, []);

    return (
        <Container>
            <HeaderArea>
                <HeaderTitle>Pesquisar</HeaderTitle>
            </HeaderArea>

            <SearchArea>
                <SearchInput 
                    placeholder="Digite o nome da diarista" 
                    placeholderTextColor="#C1660B" 
                    value={searchText} 
                    onChangeText={t=>setSearchText(t)} 
                    onEndEditing={searchBarbers} 
                    returnKeyType="search" 
                    autoFocus={true} 
                    selectTextOnFocus={true} 
                />
            </SearchArea>

            <Scroller>
                { loading && <LoadingIcon size="large" color="#000000" /> }
                { emptyList && <EmptyWarning>Não encontramos nenhuma diarista com esse nome ;(</EmptyWarning> }
                <ListArea>
                    { list.map((item, key)=>(
                        <BarberItem key={key} data={item} />
                    )) }
                </ListArea>
            </Scroller>
        </Container>
    );
}