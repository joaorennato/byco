import React, { useState, useEffect } from 'react';
import { Platform, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

import Api from '../../Api';

import {
    Container,
    Scroller,
    HeaderArea,
    HeaderTitle,
    SearchButton,
    LocationArea,
    LocationInput,
    LocationFinder, 
    LoadingIcon, 
    ListArea
} from './styles';

import BarberItem from '../../components/BarberItem';

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';

export default () => {

    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);


    const handleLocationFinder = async () => {
        setCoords(null);
        let result = await request(
            Platform.OS === 'ios' ? 
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : 
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );

        if(result == 'granted'){

            setLoading(true);
            setLocationText('');
            setList([]);

            Geolocation.getCurrentPosition((position) => {
                //console.log(position);
                setCoords(position.coords);
                getBarbers();
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { 
                enableHighAccuracy: true, 
                timeout: 15000, 
                maximumAge: 10000 
            });
        }
    }

    const getBarbers = async () => {
        setLoading(true);
        setList([]);

        let lat = null;
        let long = null;

        //console.log("Coords", coords);

        if(coords){
            lat = coords.latitude;
            long = coords.longitude;
        }

        let res = await Api.getBarbers(lat, long, locationText);

        //console.log(res);

        if(res.error == ''){
            if(res.loc){
                setLocationText(res.loc);
            }
            setList(res.data);
        } else {
            alert('Erro: ' + res.error);
        }

        setLoading(false);
    }

    const onRefresh = () => {
        setRefreshing(false);
        getBarbers();
    }

    const handleLocationSearch = () => {
        setCoords({});
        getBarbers();
    }

    useEffect(()=>{
        getBarbers();
    }, []);

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre uma diarista perfeita</HeaderTitle>
                    <SearchButton>
                        <SearchIcon width="26" height="26" fill="#C1660B" onPress={()=>navigation.navigate('Search')} />
                    </SearchButton>
                </HeaderArea>

                <LocationArea>
                    <LocationInput 
                        placeholder="Onde você está?" 
                        placeholderTextColor="#C1660B" 
                        value={locationText} 
                        onChangeText={t=>setLocationText(t)} 
                        onEndEditing={handleLocationSearch} />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#C1660B" />
                    </LocationFinder>
                </LocationArea>
                
                {loading && <LoadingIcon size="large" color="#FFFFFF" /> }

                <ListArea>
                    {list.map((item, k)=>(
                        <BarberItem key={k} data={item} />
                    ))}
                </ListArea>

            </Scroller>
        </Container>
    );
}