import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../contexts/UserContext';
import { launchImageLibrary} from 'react-native-image-picker';

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
    ButtonAvatar, 
    ButtonAvatarText
} from './styles';

import Api from '../../Api';

export default () => {

    const { state:user } = useContext(UserContext);
    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const handleLogoutClick = async () => {
        await Api.logout();
        navigation.reset({
            routes: [{
                name: 'SignIn'
            }]
        });
    }

    const handleUpdateUser = async () => {
        setLoading(true);
        
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

        console.log(res);
        
        if(res.error == ''){
            if(newName != ''){
                userDispatch({ type: 'setName', payload: { name: newName } });
            }

            if(newEmail != ''){
                userDispatch({ type: 'setEmail', payload: { email: newEmail } });
            }

            alert('Perfil atualizado!');
        } else {
            //console.log(Object.keys(res.error).length);
            alert("Erro: " + JSON.stringify(res.error));
        }

        setLoading(false);

    }

    const createFormData = (photo, body) => {
        const data = new FormData();
      
        data.append("avatar", {
          name: photo.fileName,
          type: photo.type,
          uri:
            Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
        });
      
        Object.keys(body).forEach(key => {
          data.append(key, body[key]);
        });
      
        return data;
    }

    const handleUpdateAvatar = async (avatar) => {
        
        setLoading(true);

        const token = await AsyncStorage.getItem('token');
        let dados = createFormData(avatar, { token: token })
        let res = await Api.updateAvatar(dados);
        if(res.error == ''){
            alert('Foto de Perfil foi atualizada!');
            userDispatch({ type: 'setAvatar', payload: { avatar: avatar.uri } });
        } else {
            alert("Erro: " + JSON.stringify(json.error));
        }

        setLoading(false);
    }

    const abrirImagePicker = () => {
        let options = {
            mediaType: 'photo'
        };
        launchImageLibrary(options,(response) => {
            if(response.didCancel) {
                console.log('user cancelled image picker');
            } else if (response.error) {
                console.log('image picker error',response.error);
            } else {
                handleUpdateAvatar(response);
            }
        })
    }

    return (
        <Container>
            <HeaderArea>
                <HeaderTitle>Meu Perfil</HeaderTitle>
            </HeaderArea>
            
            {loading && <LoadingIcon size="large" color="#000000" />}

            {!loading && 
                <Scroller>
                    <ProfileArea>
                        <InfoArea>
                            <NameArea>{ user.name }</NameArea>
                            <EmailArea>{ user.email }</EmailArea>
                        </InfoArea>
                        <ButtonAvatar onPress={abrirImagePicker}>
                            <Avatar source={{uri: user.avatar}} />
                            <ButtonAvatarText>Toque para alterar</ButtonAvatarText>
                        </ButtonAvatar>
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