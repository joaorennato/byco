import React, {useState, useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';

import {
    Container,
    InputArea,
    CustomButton,
    CustomButtonText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold
} from './styles';

import Api from '../../Api';

import SignInput from '../../components/SignInput';

import BarberLogo from '../../assets/logo.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import AsyncStorage from '@react-native-community/async-storage';

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignInClick = async () => {
        if(emailField != '' && passwordField != ''){

            let json = await Api.signIn(emailField, passwordField);
            if(json.token){
                await AsyncStorage.setItem('token', json.token);
                
                userDispatch({ type: 'setName', payload: { name: json.data.name } });
                userDispatch({ type: 'setEmail', payload: { email: json.data.email } });
                userDispatch({ type: 'setAvatar', payload: { avatar: json.data.avatar } });
                userDispatch({ type: 'setFavorites', payload: { favorites: json.favorites } });
                userDispatch({ type: 'setAppointments', payload: { appointments: json.appointments } });

                navigation.reset({
                    routes:[{
                        name: 'MainTab'
                    }]
                });
            } else {
                alert('E-mail e/ou senha errados.');
            }

        } else {
            alert('Preencha os campos!');
        }
    }

    const handleMessagebuttonClick = () => {
        navigation.reset({
            routes: [{
                name: 'SignUp'
            }]
        });
    }

    return (
        <Container>
            <BarberLogo width="100%" height="160" />
            
            <InputArea>
                <SignInput 
                    IconSvg={EmailIcon} 
                    placeholder="Digite seu email"
                    value={emailField} 
                    onChangeText={t=>setEmailField(t)}
                />
                <SignInput 
                    IconSvg={LockIcon} 
                    placeholder="Digite sua senha" 
                    value={passwordField} 
                    onChangeText={t=>setPasswordField(t)} 
                    password={true}
                />

                <CustomButton onPress={handleSignInClick}>
                    <CustomButtonText>LOGIN</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessagebuttonClick}>
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    );
}