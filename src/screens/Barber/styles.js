import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #FFFFFF;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
`;

/* ################################################### */

export const SwiperDot = styled.View`
    width: 10px;
    height: 10px;
    background-color: #FFFFFF;
    border-radius: 5px;
    margin: 3px;
`;

export const SwiperDotActive = styled.View`
    width: 10px;
    height: 10px;
    background-color: #000000;
    border-radius: 5px;
    margin: 3px;
`;

export const SwiperItem = styled.View`
    flex: 1;
    background-color: #FBD6B2;
`;

export const SwiperImage = styled.Image`
    width: 100%;
    height: 240px;
`;

export const FakeSwiper = styled.View`
    height: 160px;
    background-color: #FBD6B2;
`;

/* ################################################### */

export const PageBody = styled.View`
    background-color: #FFFFFF;
    border-top-left-radius: 50px;
    margin-top: -50px;
    min-height: 200px;
`;

/* ################################################### */

export const UserInfoArea = styled.View`
    flex-direction: row;
    margin-top: -30px;
`;

export const UserAvatar = styled.Image`
    width: 110px;
    height: 100px;
    border-radius: 20px;
    margin-left: 25px;
    margin-right: 20px;
    border-width: 3px;
    border-color: #FFFFFF;
`;

export const UserInfos = styled.View`
    flex: 1;
    justify-content: flex-end;
    padding-bottom: 3px;
`;

export const UserInfosName = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #000000;
    margin-bottom: 5px;
`;

export const UserFavButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    background-color: #FFFFFF;
    border-radius: 20px;
    border: 2px solid #999999;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    margin-left: 20px;
    margin-top: 10px;
    z-index: 9;
`;

/* ################################################### */

export const ServicesArea = styled.View``;

export const ServicesTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #000000;
    margin-top: 30px;
    margin-bottom: 20px;
    margin-left: 30px; 
    margin-right: 30px;
`;

export const ServiceItem = styled.View`
    flex-direction: row;
    margin-left: 30px;
    margin-right: 20px;
    margin-bottom: 20px;
`;

export const ServiceInfo = styled.View`
    flex: 1;
`;

export const ServiceName = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #C1660B;
`;

export const ServicePrice = styled.Text`
    font-size: 14px;
    color: #C1660B;
`;

export const ServiceButton = styled.TouchableOpacity`
    background-color: #C1660B;
    border-radius: 10px;
    padding: 10px 15px;
`;

export const ServiceButtonText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #FFFFFF;
`;

/* ################################################### */

export const TestimonialsArea = styled.View`
    margin-top: 30px;
    margin-bottom: 50px;
`;

export const TestimonialItem = styled.View`
    background-color: #C1660B;
    padding: 15px;
    border-radius: 10px;
    height: 110px;
    justify-content: center;
    margin: 0 50px;
`; 

export const TestimonialInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 5px;
`; 

export const TestimonialName = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #FFFFFF;
`; 

export const TestimonialBody = styled.Text`
    font-size: 13px;
    color: #FFFFFF;
`;

/* ################################################### */

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 0; top: 0;
    z-index: 9;
`;

/* ################################################### */

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 30px;
`;


