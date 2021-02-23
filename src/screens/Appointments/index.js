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
import AppointmentItem from '../../components/AppointmentItem';

export default () => {

    const { state:user, dispatch:userDispatch } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState(user.appointments);

    const getAppointments = async () => {
        setLoading(true);
        setList([]);

        if(user.appointments.length > 0){
            setList(user.appointments);
        }

        /*
        let res = await Api.getAppointments();
        if(res.error == ''){
            setList(res.list);
        } else {
            alert('Erro: ' + res.error);
        }
        */

        setLoading(false);
    }

    /*
    useEffect(()=>{
        getAppointments();
    }, []);
    */

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