import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #FBD6B2;
`;

export const HeaderArea = styled.View`
    height: 40px;
    justify-content: center;
    padding: 10px 20px 0 20px;
`;

export const HeaderTitle = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #C1660B;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 0 20px;
`;

export const ListArea = styled.View`
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const EmptyWarning = styled.Text`
    font-size: 24px;
    font-weight: bold;
    color: #C1660B;
    margin-top: 30px;
`;
