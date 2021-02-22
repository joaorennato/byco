import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

import {
    Container, 
    LoadingIcon 
} from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import BarberLogo from '../../assets/logo.svg';
import Api from '../../Api';

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(() =>{

        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if(token !== null){
                //validar o token
                let json = await Api.checkToken(token);
                if(json.token){

                    await AsyncStorage.setItem('token', json.token);
                    userDispatch({
                        type: 'setAvatar',
                        payload: {
                            avatar: json.data.avatar
                        }
                    });
    
                    navigation.reset({
                        routes:[{
                            name: 'MainTab'
                        }]
                    });

                } else {
                    navigation.navigate('SignIn');
                }
                
            } else {
                //num tem token, manda pro login
                navigation.navigate('SignIn');
            }
        }
        checkToken();

    }, [])

    return (
        <Container>
            <BarberLogo width="100%" height="160" />
            <LoadingIcon size="large" color="#FFFFFF" />
        </Container>
    );
}