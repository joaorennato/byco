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
import AppointmentItem from '../../components/AppointmentItem';

export default () => {

    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    const getAppointments = async () => {
        setLoading(true);
        setList([]);

        let res = await Api.getAppointments();
        if(res.error == ''){
            setList(res.list);
        } else {
            alert('Erro: ' + res.error);
        }

        setLoading(false);
    }

    useEffect(()=>{
        getAppointments();
    }, []);

    //console.log(list);

    return (

        <Container>
            <HeaderArea>
                <HeaderTitle>Agendamentos</HeaderTitle>
            </HeaderArea>
            <Scroller refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getAppointments} />
            }>
                { !loading && list.length === 0 && 
                    <EmptyWarning>Você não tem nenhum agendamento.</EmptyWarning>
                }
                <ListArea>
                    { list.map((item, key)=>(
                        <AppointmentItem key={key} data={item} />
                    )) }
                </ListArea>
            </Scroller>
        </Container>
    );
}