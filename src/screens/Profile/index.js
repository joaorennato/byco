import React, { useState, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
    Container, 
    HeaderArea, 
    HeaderTitle, 
    LoadingIcon, 
    Scroller, 
    Avatar, 
    ButtonSubmit, 
    ButtonSubmitText, 
    ProfileArea, 
    InputArea, 
    InputField, 
    EmptySpace, 
    EmptySpaceText,
    InfoArea, 
    NameArea, 
    EmailArea, 
} from './styles';

import Api from '../../Api';

export default () => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [newName, setNewName] = useState('');
    const [email, setEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    useEffect(()=>{
        getUser();
    }, []);

    const getUser = async () => {
        setLoading(true);

        let res = await Api.getUser();

        if(res.error == ''){
            setAvatar(res.data.avatar);
            setName(res.data.name);
            setEmail(res.data.email);
        } else {
            alert('Erro: ' + res.error);
        }

        setLoading(false);
    }

    const handleUpdateUser = async () => {
        let body = {};

        if(newName != ''){
            body.name = newName;
        }

        if(newEmail != ''){
            body.email = newEmail;
        }

        if(newPassword != ''){
            body.password = newPassword;
        }

        if(newPasswordConfirm != ''){
            body.password_confirm = newPasswordConfirm;
        }

        let res = await Api.updateUser(body);
        if(res.error == ''){
            setLoading(true);
            alert('Perfil atualizado!');
            getUser();
            setLoading(false);
        } else {
            console.log("ERRO", res.error);
            alert("Erro: " + res.error);
        }

    }

    const handleLogoutClick = async () => {
        await Api.logout();
        navigation.reset({
            routes: [{
                name: 'SignIn'
            }]
        });
    }

    return (
        <Container>
            <HeaderArea>
                <HeaderTitle>Meu Perfil</HeaderTitle>
            </HeaderArea>
            
            {loading && <LoadingIcon size="large" color="#000000" />}

            {!loading && 
                <Scroller refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={getUser} />
                }>
                    <ProfileArea>
                        <InfoArea>
                            <NameArea>{name}</NameArea>
                            <EmailArea>{email}</EmailArea>
                        </InfoArea>
                        <Avatar source={{uri: avatar}} />
                        <ButtonSubmit onPress={()=>navigation.navigate('Avatar')}>
                            <ButtonSubmitText>Trocar Foto de Perfil</ButtonSubmitText>
                        </ButtonSubmit>
                    </ProfileArea>

                    <ProfileArea>
                        <InputArea>
                            <InputField 
                                value={newName} 
                                onChangeText={t=>setNewName(t)} 
                                placeholder="Novo Nome" 
                                placeholderTextColor="#C1660B" 
                            />
                        </InputArea>
                        <InputArea>
                            <InputField 
                                value={newEmail} 
                                onChangeText={t=>setNewEmail(t)} 
                                placeholder="Novo E-mail" 
                                placeholderTextColor="#C1660B" 
                            />
                        </InputArea>
                        <InputArea>
                            <InputField 
                                value={newPassword} 
                                onChangeText={t=>setNewPassword(t)} 
                                placeholder="Nova Senha" 
                                placeholderTextColor="#C1660B" 
                                password={true}
                            />
                        </InputArea>
                        <InputArea>
                            <InputField 
                                value={newPasswordConfirm} 
                                onChangeText={t=>setNewPasswordConfirm(t)} 
                                placeholder="Confirme sua Nova Senha" 
                                placeholderTextColor="#C1660B" 
                                password={true}
                            />
                        </InputArea>
                        <ButtonSubmit onPress={handleUpdateUser} style={{
                            marginTop: 0
                        }}>
                            <ButtonSubmitText>Salvar</ButtonSubmitText>
                        </ButtonSubmit>
                    </ProfileArea>

                    <ProfileArea>
                        <ButtonSubmit onPress={handleLogoutClick} style={{
                            marginTop: 0, backgroundColor: '#FF0000'
                        }}>
                            <ButtonSubmitText>Sair</ButtonSubmitText>
                        </ButtonSubmit>
                    </ProfileArea>

                    <EmptySpace>
                        <EmptySpaceText>a</EmptySpaceText>
                    </EmptySpace>
                </Scroller>
            } 
        </Container>
    );
}