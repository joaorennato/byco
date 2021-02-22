import React, { useState, useEffect, useContext } from 'react';
import { Platform, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary} from 'react-native-image-picker';
import { UserContext } from '../../contexts/UserContext';

import BackButtonIcon from '../../assets/back.svg';

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
    EmptySpace, 
    EmptySpaceText,
    InfoArea, 
    EmailArea, 
    BackButton
} from './styles';

import Api from '../../Api';

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [loading, setLoading] = useState(true);
    const [avatar, setAvatar] = useState('');
    const [hasNewAvatar, setHasNewAvatar] = useState(false);
    const [newAvatar, setNewAvatar] = useState({});

    useEffect(()=>{
        abrirImagePicker = () => {
            let options = {
                mediaType: 'photo'
            };
            launchImageLibrary(options,(response) => {
                if(response.didCancel) {
                    console.log('user cancelled image picker');
                } else if (response.error) {
                    console.log('image picker error',response.error);
                } else {
                    setNewAvatar(response);
                    setHasNewAvatar(true);
                    //console.log(newAvatar);
                }
            })
        }

    }, [newAvatar, hasNewAvatar]);

    useEffect(()=>{
        getUser();
    }, [avatar]);

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
    };

    const handleUpdateAvatar = async () => {
        //console.log(newAvatar);

        setLoading(true);

        const token = await AsyncStorage.getItem('token');
        let dados = createFormData(newAvatar, { token: token })
        let res = await Api.updateAvatar(dados);
        if(res.error == ''){
            alert('Foto de Perfil foi atualizada!');
            
            getUser();
            
            userDispatch({
                type: 'setAvatar',
                payload: {
                    avatar: newAvatar.uri
                }
            });
            
            navigation.reset({
                routes:[{
                    name: 'Profile'
                }]
            });
            
        } else {
            alert("Erro: " + res.error);
        }
    }

    const getUser = async () => {
        setLoading(true);

        let res = await Api.getUser();

        if(res.error == ''){
            setAvatar(res.data.avatar);
        } else {
            alert('Erro: ' + res.error);
        }

        setLoading(false);
    }

    const handleBackButtonClick = () => {
        navigation.goBack();
    }

    return (
        <Container>
            <HeaderArea>
                <BackButton onPress={handleBackButtonClick}>
                    <BackButtonIcon width="44" height="44" fill="#C1660B" />
                </BackButton>
                <HeaderTitle>Atualizar Foto de Perfil</HeaderTitle>
            </HeaderArea>
            
            {loading && <LoadingIcon size="large" color="#000000" />}

            {!loading && 
                <Scroller refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={getUser} />
                }>
                    <ProfileArea>
                        <InfoArea>
                            <EmailArea>{ hasNewAvatar ? 'Nova foto:' : 'Foto atual:' }</EmailArea>
                        </InfoArea>
                        <Avatar source={{uri: hasNewAvatar != '' ? newAvatar.uri : avatar }} />

                        <ButtonSubmit onPress={abrirImagePicker} style={{
                            marginTop: 0
                        }}>
                            <ButtonSubmitText>{ hasNewAvatar != '' ? 'Escolher outra foto' : 'Selecionar nova foto' }</ButtonSubmitText>
                        </ButtonSubmit>
                        
                        <ButtonSubmit onPress={handleUpdateAvatar}>
                            <ButtonSubmitText>Enviar</ButtonSubmitText>
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