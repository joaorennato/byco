import React, { useContext } from 'react';
import styled from 'styled-components/native';

import { UserContext } from '../contexts/UserContext';

import HomeIcon from '../assets/home.svg';
import SearchIcon from '../assets/search.svg';
import TodayIcon from '../assets/today.svg';
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';

const TabArea = styled.View`
    height: 60px;
    background-color: #F28518;
    flex-direction: row;
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TabItemCenter = styled.TouchableOpacity`
    width: 70px; height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
    border-radius: 35px;
    border: 3px solid #F28518;
    margin-top: -20px;
`;

const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;

export default ({state, navigation}) => {

    const { state:user } = useContext(UserContext);

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    const resetTo = (screenName) => {
        navigation.reset({
            routes:[{
                name: screenName
            }]
        });
    }

    return (
        <TabArea>
            <TabItem onPress={()=>goTo('Home')}>
                <HomeIcon width="24" height="24" fill="#FFFFFF" style={{opacity: state.index===0 ? 1 : .7}} />
            </TabItem>
            
            <TabItem onPress={()=>goTo('Search')}>
                <SearchIcon width="24" height="24" fill="#FFFFFF" style={{opacity: state.index===1 ? 1 : .7}} />
            </TabItem>
            
            <TabItemCenter onPress={()=>goTo('Appointments')}>
                <TodayIcon width="32" height="32" fill="#F28518" />
            </TabItemCenter>
            
            <TabItem onPress={()=>goTo('Favorites')}>
                <FavoriteIcon width="24" height="24" fill="#FFFFFF" style={{opacity: state.index===3 ? 1 : .7}} />
            </TabItem>
            
            <TabItem onPress={()=>goTo('Profile')}>
                { user.avatar !== '' ? 
                    <AvatarIcon source={{uri: user.avatar}} /> : 
                    <AccountIcon width="24" height="24" fill="#FFFFFF" style={{opacity: state.index===4 ? 1 : .7}} />
                }
            </TabItem>
        </TabArea>
    );
}