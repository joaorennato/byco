import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #FBD6B2;
`;

export const HeaderArea = styled.View`
    flex-direction: row;
    align-items: center; 
    padding: 10px 20px 0 20px;
`;

export const HeaderTitle = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #C1660B;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 30px;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 0 20px;
`;

export const ProfileArea = styled.View`
    align-items: center;
    background-color: #FFFFFF;
    border-radius: 20px;
    padding: 20px;
    margin-top: 30px;
`; 

export const Avatar = styled.Image`
    width: 150px;
    height: 150px;
    border-radius: 20px;
    border-width: 1px;
    border-color: #999999;
    margin-bottom: 20px;
`;

export const ButtonSubmit = styled.TouchableOpacity`
    width: 100%;
    align-items: center;
    background-color: #C1660B;
    border-radius: 10px;
    padding: 10px 15px;
    margin-top: 15px;
`;

export const ButtonSubmitText = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #FFFFFF;
`;

export const InputArea = styled.View`
    width: 100%;
    background-color: #FDEBD8;
    border-radius: 20px;
    height: 40px;
    margin-bottom: 20px;
`;

export const InputField = styled.TextInput`
    padding-left: 20px;
    padding-right: 20px;
    color: #C1660B;
`;

export const EmptySpace = styled.View`
    background-color: #FBD6B2;
    width: 100%;
    height: 50px;
`;

export const EmptySpaceText = styled.Text`
    font-size: 16px;
    color: #FBD6B2;
`;

export const InfoArea = styled.View`
    align-items: center;
    margin-bottom: 15px;
`;
export const NameArea = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #000000;
`;

export const EmailArea = styled.Text`
    font-size: 16px;
    color: #000000;
`;

export const BackButton = styled.TouchableOpacity`
    margin-left: -20px;
`;