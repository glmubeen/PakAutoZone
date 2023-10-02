import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
const {width, height} = Dimensions.get('window');
//local import
import {Images} from '../../assets/images';
import MyStatusBar from '../../components/StatusBar';
import CarComponent from '../../components/CarComponent';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';
import CategoryItems from '../../components/CategoryItems';

//third party library
import {useSelector, useDispatch} from 'react-redux';

const Index = ({navigation, ...props}) => {
  const [isLoader, setIsLoader] = useState(false);
  const [car, setCar] = useState([]);
  const [bike, setBike] = useState([]);
  const user = useSelector(state => state.userReducer.isLogin);
  const [carInfo, setCarInfo] = useState([]);
  const [oldCars, setOldCars] = useState([]);

  useEffect(() => {
    _getCarBrand();
    _getRecentCar();
    _getOldCar();
    _getBikeBrand();
    _getAutoParts();
    getLocation();
  }, []);

  const _getCarBrand = () => {
    setIsLoader(true);
    axios
      .get(BaseURL.CAR_BRAND)
      .then(res => {
        setCar(res.data.data);
        setIsLoader(false);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  const _getBikeBrand = () => {
    setIsLoader(true);
    axios
      .get(BaseURL.BIKE_BRAND)
      .then(res => {
        setBike(res.data.data);
        setIsLoader(false);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  const _getRecentCar = () => {
    setIsLoader(true);
    axios
      .get(BaseURL.USED_CAR + 'new/all/page/1')
      .then(res => {
        setCarInfo(res.data.data);
        setIsLoader(false);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  const _getOldCar = () => {
    setIsLoader(true);
    axios
      .get(BaseURL.USED_CAR + 'used/all/page/1')
      .then(res => {
        setOldCars(res.data.data);
        setIsLoader(false);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  const [location, setLocation] = useState([]);
  const getLocation = () => {
    axios
      .get(BaseURL.GET_CITIES)
      .then(res => {
        setLocation(res.data.data);
      })
      .catch(err => {});
  };

  const [autoParts, setAutoParts] = useState([]);
  const _getAutoParts = () => {
    setIsLoader(true);
    axios
      .get(BaseURL.GET_AUTO_PARTS)
      .then(res => {
        setAutoParts(res.data.data.slice(0, 9));
        setIsLoader(false);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  const [browseData, setbrowseData] = useState([
    {id: 1, name: 'Category', isActive: true},
    {id: 2, name: 'Budget', isActive: false},
    {id: 3, name: 'Brand', isActive: false},
    {id: 4, name: 'Cities', isActive: false},
    {id: 5, name: 'Auto Parts', isActive: false},
  ]);

  const _handleBrowse = updateItem => {
    const tempArr = browseData.map(item => {
      if (updateItem.id === item.id) {
        if (updateItem.isActive) {
          // If the item is already active, no need to update
          return item;
        } else {
          return {
            ...item,
            isActive: true,
          };
        }
      } else {
        return {
          ...item,
          isActive: false,
        };
      }
    });
    setbrowseData(tempArr);
  };

  const browseFilter = browseData.filter(x => x.isActive === true);

  let category1 = [
    {name: 'Family Car', image: Images.FamilyCar, api: ''},
    {
      name: 'Automatic Cars',
      image: Images.AutomaticCar,
      api: 'transmission_type=automatic',
    },
    {
      name: 'Imported Cars',
      image: Images.ImportedCar,
      api: 'assembly=imported',
    },
    {name: '1300 cc Cars', image: Images.cc1300, api: 'engine_capacity=1300'},
    {name: '1000 cc Cars', image: Images.cc1000, api: 'engine_capacity=1000'},
    {
      name: 'Low Mileage Cars',
      image: Images.LowMileage,
      api: 'distance_driven=10000',
    },
  ];

  let category2 = [
    {
      name: 'Low Priced Cars',
      image: Images.LowPriced,
      api: 'pricelt=3000000&pricegt=1',
    },
    {name: '660 cc Cars', image: Images.cc660, api: 'engine_capacity=660'},
    {name: 'Diesel Cars', image: Images.DieselCar, api: 'fuel_type=diesel'},
    {name: 'Hybrid Cars', image: Images.hybridCar, api: 'fuel_type=hybrid'},
    {
      name: 'Electric Cars',
      image: Images.ElectricCar,
      api: 'fuel_type=electric',
    },
  ];

  let budget = [
    {name: 'Cars under 2 lakhs', api: 'pricelt=200000&pricegt=1'},
    {name: 'Cars under 4 lakhs', api: 'pricelt=400000&pricegt=1'},
    {name: 'Cars under 6 lakhs', api: 'pricelt=600000&pricegt=1'},
    {name: 'Cars under 8 lakhs', api: 'pricelt=800000&pricegt=1'},
    {name: 'Cars under 10 lakhs', api: 'pricelt=1000000&pricegt=1'},
    {name: 'Cars under 12 lakhs', api: 'pricelt=1200000&pricegt=1'},
    {name: 'Cars under 15 lakhs', api: 'pricelt=1500000&pricegt=1'},
    {name: 'Cars under 25 lakhs', api: 'pricelt=2500000&pricegt=1'},
    {name: 'Cars under 30 lakhs', api: 'pricelt=3000000&pricegt=1'},
    {name: 'Cars under 40 lakhs', api: 'pricelt=4000000&pricegt=1'},
  ];

  let cities = [
    {
      id: '64383875bdf719cd28d89f18',
      name: 'Lahore',
      api: 'location=64383875bdf719cd28d89f18',
      img: Images.Lahore,
    },
    {
      id: '64383875bdf719cd28d89ee8',
      name: 'Karachi',
      api: 'location=64383875bdf719cd28d89ee8',
      img: Images.Karachi,
    },
    {
      id: '64383875bdf719cd28d89ebd',
      name: 'Islamabad',
      api: 'location=64383875bdf719cd28d89ebd',
      img: Images.Islamabad,
    },
    {
      id: '64383875bdf719cd28d89f81',
      name: 'Rawalpindi',
      api: 'location=64383875bdf719cd28d89f81',
      img: Images.Rawalpindi,
    },
    {
      id: '64383875bdf719cd28d89f6b',
      name: 'Peshawar',
      api: 'location=64383875bdf719cd28d89f6b',
      img: Images.Peshawar,
    },
    {
      id: '64383875bdf719cd28d89e94',
      name: 'Faisalabad',
      api: 'location=64383875bdf719cd28d89e94',
      img: Images.Faisalabad,
    },
    {
      id: '64383875bdf719cd28d89ea9',
      name: 'Gujranwala',
      api: 'location=64383875bdf719cd28d89ea9',
      img: Images.Gujranwala,
    },
    {
      id: '64383875bdf719cd28d89f47',
      name: 'Multan',
      api: 'location=64383875bdf719cd28d89f47',
      img: Images.Multan,
    },
    {
      id: '64383875bdf719cd28d89f77',
      name: 'Quetta',
      api: 'location=64383875bdf719cd28d89f77',
      img: Images.Quetta,
    },
  ];

  const autoPartsArray = [
    ...autoParts,
    {
      title: 'View Auto Parts & Accessories',
    },
  ];

  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          {/* Header */}
          <View className={'w-full pt-2 pb-2 bg-[#0095FF] rounded-b-3xl'}>
            <View
              style={{width: width * 0.95}}
              className={
                'flex items-center justify-between flex-row self-center'
              }>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.openDrawer();
                }}>
                <Image
                  source={Images.WhiteMenu}
                  className={'w-6 h-6'}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              <View className={'flex flex-row'}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('Search')}>
                  <Image
                    source={Images.Search}
                    className={'w-6 h-6 mr-4'}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>

                {!user && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('SignIn')}>
                    <Image
                      source={Images.Profile}
                      className={'w-6 h-6'}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View className={'mt-9 ml-6 mb-9'}>
              <Text className={'text-2xl text-white font-semibold'}>
                Let’s find your favourite car Here{' '}
              </Text>
              <Text className={'text-base text-white'}>
                The best platform to buy used cars!
              </Text>
            </View>
          </View>
          {/* Header */}

          {/* Browse Used Car */}

          <Text className={'text-black font-semibold text-2xl my-3 ml-3'}>
            Browse Used Cars
          </Text>
          <View style={{width: width * 0.95, alignSelf: 'center'}}>
            <FlatList
              data={browseData}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => _handleBrowse(item)}
                    activeOpacity={0.7}
                    className={`mr-2 w-fit px-3 pt-1 pb-4 flex items-center ${
                      item.isActive && 'border-[#0095FF] border-b-2'
                    }`}>
                    <Text className={`text-lg text-[#0095FF] font-medium`}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              ListEmptyComponent={
                <Text
                  className={
                    'text-xl text-black font-semibold flex self-center mt-12'
                  }>
                  No List Found
                </Text>
              }
            />
          </View>

          {browseFilter[0].id === 1 && (
            <View
              style={{width: width * 0.97}}
              className={'my-5 flex self-center'}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                contentContainerStyle={{
                  flexDirection: 'column',
                  paddingVertical: height * 0.01,
                }}>
                <FlatList
                  data={category1}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    return (
                      <CategoryItems
                        image={item.image}
                        title={item.name}
                        onPress={() => {
                          navigation.navigate('BrowseCars', {
                            data: item,
                          });
                        }}
                      />
                    );
                  }}
                  ListEmptyComponent={
                    <Text
                      className={
                        'text-xl text-black font-semibold flex self-center mt-12'
                      }>
                      No List Found
                    </Text>
                  }
                />
                <FlatList
                  data={category2}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    return (
                      <CategoryItems
                        image={item.image}
                        title={item.name}
                        onPress={() => {
                          navigation.navigate('BrowseCars', {
                            data: item,
                          });
                        }}
                      />
                    );
                  }}
                  ListEmptyComponent={
                    <Text
                      className={
                        'text-xl text-black font-semibold flex self-center mt-12'
                      }>
                      No List Found
                    </Text>
                  }
                />
              </ScrollView>
            </View>
          )}

          {browseFilter[0].id === 2 && (
            <View
              style={{width: width * 0.95}}
              className={'my-2 flex self-center'}>
              <FlatList
                data={budget}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('BrowseCars', {
                          data: item,
                        });
                      }}
                      activeOpacity={0.7}
                      key={index}
                      style={{width: width * 0.45}}
                      className={'flex items-center mt-2'}>
                      <Text className={'mt-2 text-base text-black font-medium'}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                contentContainerStyle={{
                  alignSelf: 'center',
                  width: width * 0.95,
                }}
                ListEmptyComponent={
                  <Text
                    className={
                      'text-xl text-black font-semibold flex self-center mt-12'
                    }>
                    No List Found
                  </Text>
                }
              />
            </View>
          )}

          {browseFilter[0].id === 3 && (
            <>
              <View
                style={{width: width * 0.95}}
                className={'h-fit py-2 mt-5 flex self-center pl-3'}>
                <Text className={'text-xl font-bold text-black mb-2'}>
                  Cars Brand:
                </Text>
                <FlatList
                  data={car}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    return (
                      <>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('CarList', {
                              data: item,
                            })
                          }
                          activeOpacity={0.7}
                          key={index}
                          className={'flex items-center mr-10'}>
                          <Image
                            source={{uri: item.image}}
                            className={'w-12 h-12'}
                            resizeMode={'contain'}
                          />
                          <Text
                            className={'mt-2 text-base text-black font-medium'}>
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      </>
                    );
                  }}
                  ListEmptyComponent={
                    <Text
                      className={
                        'text-xl text-black font-semibold flex self-center mt-12'
                      }>
                      No List Found
                    </Text>
                  }
                />
              </View>
              <View
                style={{width: width * 0.95}}
                className={'h-fit py-2 mt-5 flex self-center pl-3'}>
                <Text className={'text-xl font-bold text-black mb-2'}>
                  Bikes Brand:
                </Text>
                <FlatList
                  data={bike}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('BikeList', {
                            data: item,
                          })
                        }
                        activeOpacity={0.7}
                        key={index}
                        className={'flex items-center mr-10'}>
                        <Image
                          source={{uri: item.image}}
                          className={'w-12 h-12'}
                          resizeMode={'contain'}
                        />
                        <Text
                          className={'mt-2 text-base text-black font-medium'}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  ListEmptyComponent={
                    <Text
                      className={
                        'text-xl text-black font-semibold flex self-center mt-12'
                      }>
                      No List Found
                    </Text>
                  }
                />
              </View>
            </>
          )}

          {browseFilter[0].id === 4 && (
            <View
              style={{width: width * 0.95}}
              className={'my-2 flex self-center'}>
              <FlatList
                data={cities}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('BrowseCars', {
                          data: item,
                        });
                      }}
                      activeOpacity={0.7}
                      className={
                        'w-24 h-24 bg-white flex justify-center items-center rounded-lg ml-2 mt-3'
                      }>
                      <Image
                        source={item.img}
                        className={'w-14 h-14'}
                        resizeMode={'contain'}
                      />
                      <Text
                        className={'text-base font-semibold mt-1 text-black'}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                contentContainerStyle={{
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: width * 0.07,
                  width: width * 0.9,
                  alignSelf: 'center',
                  paddingBottom: '10%',
                  paddingTop: '2%',
                }}
                ListEmptyComponent={
                  <Text
                    className={
                      'text-xl text-black font-semibold flex self-center mt-12'
                    }>
                    No List Found
                  </Text>
                }
              />
            </View>
          )}

          {browseFilter[0].id === 5 && (
            <View
              style={{width: width * 0.95}}
              className={'my-2 flex self-center'}>
              <FlatList
                data={autoPartsArray}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        if (index == 9) {
                          navigation.navigate('AutoParts');
                        } else {
                          navigation.navigate('AutoPartsDetail', {
                            data: item,
                          });
                        }
                      }}
                      activeOpacity={0.7}
                      key={index}
                      style={{width: width * 0.42}}
                      className={'flex mt-1 ml-3'}>
                      <Text
                        numberOfLines={1}
                        className={'mt-2 text-base text-black font-medium'}>
                        {index + 1}. {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                contentContainerStyle={{
                  alignSelf: 'center',
                  alignItems: 'center',

                  width: width * 0.95,
                }}
                ListEmptyComponent={
                  <Text
                    className={
                      'text-xl text-black font-semibold flex self-center mt-12'
                    }>
                    No List Found
                  </Text>
                }
              />
            </View>
          )}

          {/* Browse Used Car */}

          {/* Offering */}
          <View
            style={{width: width * 0.95}}
            className={'flex self-center justify-between items-center'}>
            <Text className={'self-start text-xl font-medium text-black'}>
              Pak Auto Zone Offerings
            </Text>

            <View
              className={'flex-row justify-between mt-4'}
              style={{width: width * 0.95}}>
              <Pressable
                onPress={() => navigation.navigate('CarInspection')}
                className={'bg-white rounded-md p-3'}
                style={[styles.shadow, {width: '48%'}]}>
                <Image
                  resizeMode="contain"
                  source={Images.CarInspection}
                  style={{width: 100, height: 100}}
                />
                <View className={'flex-row items-center justify-between'}>
                  <Text
                    className={
                      'text-lg font-semibold text-black'
                    }>{`CAR\nINSPECTION`}</Text>
                  <Image
                    resizeMode="contain"
                    source={Images.ForwardArrowBlack}
                    style={{
                      width: width * 0.08,
                      height: width * 0.08,
                      alignSelf: 'flex-end',
                    }}
                  />
                </View>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate('CarFinance')}
                className={'bg-white rounded-md p-3'}
                style={[styles.shadow, {width: '48%'}]}>
                <Image
                  resizeMode="contain"
                  source={Images.CarFinance}
                  style={{width: 100, height: 100}}
                />
                <View className={'flex-row items-center justify-between'}>
                  <Text
                    className={
                      'text-lg font-semibold text-black'
                    }>{`CAR\nFINANCE`}</Text>
                  <Image
                    resizeMode="contain"
                    source={Images.ForwardArrowBlack}
                    style={{
                      width: width * 0.08,
                      height: width * 0.08,
                      alignSelf: 'flex-end',
                    }}
                  />
                </View>
              </Pressable>
            </View>
            <Pressable
              onPress={() => navigation.navigate('CarInsurance')}
              className={'bg-white rounded-md p-3 self-start mt-4'}
              style={[styles.shadow, {width: '48%'}]}>
              <Image
                resizeMode="contain"
                source={Images.CarInsurance}
                style={{width: 100, height: 100}}
              />
              <View className={'flex-row items-center justify-between'}>
                <Text
                  className={
                    'text-lg font-semibold text-black'
                  }>{`CAR\nINSURANCE`}</Text>
                <Image
                  resizeMode="contain"
                  source={Images.ForwardArrowBlack}
                  style={{
                    width: width * 0.08,
                    height: width * 0.08,
                    alignSelf: 'flex-end',
                  }}
                />
              </View>
            </Pressable>
          </View>
          {/* Offering */}

          <View
            style={{width: width * 0.95}}
            className={
              'flex self-center flex-row justify-between items-center mt-6'
            }>
            <Text className={'text-xl font-medium text-black'}>
              Recent Upload
            </Text>
          </View>
          <View
            style={{width: width * 0.95}}
            className={'h-72 mt-5 flex self-center'}>
            <FlatList
              data={carInfo}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <CarComponent
                    item={item}
                    onPress={() =>
                      navigation.navigate('CarInfo', {
                        data: item,
                      })
                    }
                  />
                );
              }}
              ListEmptyComponent={
                <Text
                  className={
                    'text-xl text-black font-semibold flex self-center mt-12'
                  }>
                  No List Found
                </Text>
              }
            />
          </View>
          <View
            style={{width: width * 0.95}}
            className={
              'flex self-center flex-row justify-between items-center'
            }>
            <Text className={'text-xl font-medium text-black'}>
              Best Car Near Me
            </Text>
          </View>
          <View
            style={{width: width * 0.95}}
            className={'h-72 mt-5 flex self-center'}>
            <FlatList
              data={oldCars}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <CarComponent
                    item={item}
                    onPress={() =>
                      navigation.navigate('CarInfo', {
                        data: item,
                      })
                    }
                  />
                );
              }}
              ListEmptyComponent={
                <Text
                  className={
                    'text-xl text-black font-semibold flex self-center mt-12'
                  }>
                  No List Found
                </Text>
              }
            />
          </View>
          {/* Body */}
        </ScrollView>
      </SafeAreaView>
      {/* {isLoader && <Loader />} */}
    </>
  );
};

export default Index;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
