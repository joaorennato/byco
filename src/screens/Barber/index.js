import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { 
    Container, Scroller, PageBody, 
    SwiperDot, SwiperDotActive, SwiperItem, SwiperImage, FakeSwiper, 
    UserInfoArea, UserAvatar, UserInfos, UserInfosName, UserFavButton, 
    ServicesArea, ServicesTitle, ServiceItem, ServiceInfo, ServiceName, ServicePrice, ServiceButton, ServiceButtonText,
    TestimonialsArea, TestimonialItem, TestimonialInfo, TestimonialName, TestimonialBody, 
    BackButton, LoadingIcon 
} from './styles';

import UserFavButtonIcon from '../../assets/favorite.svg';
import UserFavFullButtonIcon from '../../assets/favorite_full.svg';
import BackButtonIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';

import Stars from '../../components/Stars';
import BarberModal from '../../components/BarberModal';
import Api from '../../Api';

export default () => {

    const { state:user, dispatch:userDispatch } = useContext(UserContext);
    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    });

    const [loading, setLoading] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleFavoriteButtonClick = async() => {
        setFavorited( !favorited );
        Api.setFavorite(userInfo.id);

        let res = await Api.getFavorites();
        if(res.error == ''){
            userDispatch({ type: 'setFavorites', payload: { favorites: res.list } });
        } else {
            alert('Erro: ' + res.error);
        }
    }

    const handleBackButtonClick = () => {
        navigation.goBack();
    }

    const handleServiceButton = (key) => {
        setSelectedService(key);
        setShowModal(true);
    }

    useEffect(()=>{
        const getBarberInfo = async () => {
            setLoading(true);
            
            let json = await Api.getBarber(userInfo.id);
            if(json.error == ''){
                setUserInfo(json.data);
                setFavorited(json.data.favorited);

                //console.log(json.data.available);

            } else {
                alert('Erro: ' + json.error);
            }

            setLoading(false);
        }
        getBarberInfo();
    }, []);

    return (
        <Container>
            <Scroller>
                {userInfo.photos && userInfo.photos.length > 0 ? 
                    <Swiper 
                        style={{height: 240}} 
                        dot={<SwiperDot />} 
                        activeDot={<SwiperDotActive />} 
                        paginationStyle={{top:15, right:15, bottom:null, left:null}} 
                        autoplay={true}>
                        
                        {userInfo.photos.map((item, key)=>(
                            <SwiperItem key={key}>
                                <SwiperImage source={{uri:item.url}} resizeMode="cover" />
                            </SwiperItem>
                        ))}

                    </Swiper>
                : 
                    <FakeSwiper></FakeSwiper>
                }

                <PageBody>
                    <UserInfoArea>
                        <UserAvatar source={{uri: userInfo.avatar}} />
                        <UserInfos>
                            <UserInfosName>{userInfo.name}</UserInfosName>
                            <Stars stars={userInfo.stars} showNumber={true} />
                        </UserInfos>
                        <UserFavButton onPress={handleFavoriteButtonClick}>
                            { favorited ? 
                                <UserFavFullButtonIcon width="24" height="24" fill="#FF0000" /> 
                            : 
                                <UserFavButtonIcon width="24" height="24" fill="#FF0000" />
                            }
                        </UserFavButton>
                    </UserInfoArea>

                    {loading && 
                        <LoadingIcon size="large" color="#000000" />
                    }

                    { userInfo.services && userInfo.services.length > 0 && 
                        <ServicesArea>
                            <ServicesTitle>Lista de Serviços</ServicesTitle>
                            {userInfo.services.map((item, key)=>(
                                <ServiceItem key={key}>
                                    <ServiceInfo>
                                        <ServiceName>{item.name}</ServiceName>
                                        <ServicePrice>R$ {item.price.toFixed(2)}</ServicePrice>
                                    </ServiceInfo>
                                    <ServiceButton onPress={()=>handleServiceButton(key)}>
                                        <ServiceButtonText>Agendar</ServiceButtonText>
                                    </ServiceButton>
                                </ServiceItem>
                            ))}
                        </ServicesArea>
                    }
                    
                    { userInfo.testimonials && userInfo.testimonials.length > 0 && 
                        <TestimonialsArea>
                            <Swiper 
                            style={{height: 110}} 
                            showsPagination={false} 
                            showsButtons={true} 
                            prevButton={<NavPrevIcon width="35" height="35" fill="#000000" />} 
                            nextButton={<NavNextIcon width="35" height="35" fill="#000000" />}>
                                {userInfo.testimonials.map((item, key)=>(
                                    <TestimonialItem key={key}>
                                        <TestimonialInfo>
                                            <TestimonialName>{item.name}</TestimonialName>
                                            <Stars stars={item.rate} showNumber={false} />
                                        </TestimonialInfo>
                                        <TestimonialBody>{item.body}</TestimonialBody>
                                    </TestimonialItem>
                                ))}
                            </Swiper>
                        </TestimonialsArea>
                    }
                </PageBody>
            </Scroller>
            
            <BackButton onPress={handleBackButtonClick}>
                <BackButtonIcon width="44" height="44" fill="#FFFFFF" />
            </BackButton>

            <BarberModal 
                show={showModal} 
                setShowModal={setShowModal} 
                user={userInfo} 
                service={selectedService} />

        </Container>
    );
}