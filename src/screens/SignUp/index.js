import React, {useState, useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';
import AsyncStorage from '@react-native-community/async-storage';

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
import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignUpClick = async () => {

        if(nameField != '' && emailField != '' && passwordField != ''){
            let json = await Api.signUp(nameField, emailField, passwordField);
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
                })
            }
        } else {
            alert('Preencha os campos!');
        }

    }

    const handleMessagebuttonClick = () => {
        navigation.reset({
            routes: [{
                name: 'SignIn'
            }]
        });
    }

    return (
        <Container>
            <BarberLogo width="100%" height="160" />
            
            <InputArea>
                <SignInput 
                    IconSvg={PersonIcon} 
                    placeholder="Digite seu none"
                    value={nameField} 
                    onChangeText={t=>setNameField(t)}
                />
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

                <CustomButton onPress={handleSignUpClick}>
                    <CustomButtonText>CADASTRAR</CustomButtonText>
                </CustomButton>
            </InputArea>

            <SignMessageButton onPress={handleMessagebuttonClick}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça login</SignMessageButtonTextBold>
            </SignMessageButton>

        </Container>
    );
}