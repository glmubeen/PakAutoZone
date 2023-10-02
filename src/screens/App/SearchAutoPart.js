import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
const {width, height} = Dimensions.get('window');
//local import
import {Images} from '../../assets/images';
import Input from '../../components/Input';
import MyStatusBar from '../../components/StatusBar';
import Header from '../../components/Header';
import CategoryModal from '../../components/CategoryModal';
import BrandModal from '../../components/BrandModal';
import axios from '../../utils/axios';
import BaseURL from '../../constants/apiEndPoints';
import Loader from '../../components/Loader.component';
import Alert from '../../components/Alert/index';
import Thumb from '../../components/Thumb';
import Rail from '../../components/Rail';
import RailSelected from '../../components/RailSelected';
import Label from '../../components/Label';
import Notch from '../../components/Notch';

//third party library
import {useSelector, useDispatch} from 'react-redux';
import RangeSlider from 'rn-range-slider';

const Index = ({navigation, ...props}) => {
  const user = useSelector(state => state.userReducer.userData);
  const [isLoader, setIsLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const [images, setImages] = useState([]);

  useEffect(() => {
    getBrands();
    getCategory();
  }, []);

  const [brand, setbrand] = useState([]);
  const getBrands = () => {
    axios
      .get(BaseURL.CAR_BRAND)
      .then(res => {
        setbrand(res.data.data);
      })
      .catch(err => {});
  };

  const [car_brands, setCar_brands] = useState([]);
  const getBrandsModals = id => {
    axios
      .get(BaseURL.CAR_BRAND + '/' + id + '/models')
      .then(res => {
        setCar_brands(res.data.data);
      })
      .catch(err => {});
  };

  const [category, setcategory] = useState([]);
  const getCategory = () => {
    axios
      .get(BaseURL.GET_CATEGORY + 'cat')
      .then(res => {
        setcategory(res.data.data);
      })
      .catch(err => {});
  };

  const [subCategory, setSubCategory] = useState([]);
  const getSubCategory = id => {
    axios
      .get(BaseURL.GET_CATEGORY + 'cat/' + id + '/sub')
      .then(res => {
        setSubCategory(res.data.data);
      })
      .catch(err => {});
  };

  const [categoryModal, setCategoryModal] = useState(false);
  const [subCategoryModal, setSubCategoryModal] = useState(false);
  const [brandModal, setBrandModal] = useState(false);
  const [modalModal, setModalModal] = useState(false);

  const [brands, setbrands] = useState(null);
  const [modals, setmodals] = useState(null);
  const [categories, setcategories] = useState(null);
  const [subcategories, setsubcategories] = useState(null);
  const [title, setTitle] = useState('');

  const config = {
    headers: {
      Authorization: user.accessToken,
    },
  };

  const [data, setData] = useState([]);

  const _handleAutoPart = () => {
    setIsLoader(true);

    let query = `autoparts?title=${title}&category=${
      categories?.id == undefined ? '' : categories.id
    }&sub_category=${
      subcategories?.id == undefined ? '' : subcategories.id
    }&brand=${brands?.id == undefined ? '' : brands.id}&model=${
      modals?.id == undefined ? '' : modals.id
    }&pricelt=${high}&pricegt=${low}`;

    axios
      .get(BaseURL.SEARCH + query, config)
      .then(res => {
        setData(res.data.data);
        setIsLoader(false);
      })
      .catch(err => {
        setIsLoader(false);
      });
  };

  //range
  const [low, setLow] = useState('');
  const [high, setHigh] = useState('');
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={`Search Auto Part & Accessories`}
            isBack
            handleIsBack={() => navigation.goBack()}
          />

          <View className={'flex self-center items-center'}>
            <Input
              mainText={'Title'}
              placeholderText={'Enter Title'}
              value={title}
              handleOnChangeTxt={text => setTitle(text)}
            />

            <Text
              className={
                'font-bold text-black flex self-start ml-4 text-lg uppercase mt-3'
              }>
              Category
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setCategoryModal(true)}
              style={{
                width: width * 0.9,
                borderWidth: 1,
                borderRadius: 10,
                paddingVertical: height * 0.01,
                paddingHorizontal: width * 0.03,
              }}
              className={'flex self-center mt-1 border-gray'}>
              <Text className={'text-lg text-black'}>
                {categories == null ? 'Categories' : categories.name}
              </Text>
            </TouchableOpacity>
            <Text
              className={
                'font-bold text-black flex self-start ml-4 text-lg uppercase mt-3'
              }>
              sub Category
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setSubCategoryModal(true)}
              style={{
                width: width * 0.9,
                borderWidth: 1,
                borderRadius: 10,
                paddingVertical: height * 0.01,
                paddingHorizontal: width * 0.03,
              }}
              className={'flex self-center mt-1 border-gray'}>
              <Text className={'text-lg text-black'}>
                {subcategories == null ? 'Sub Category' : subcategories.name}
              </Text>
            </TouchableOpacity>
            <Text
              className={
                'font-bold text-black text-lg uppercase flex self-start ml-4 mt-3'
              }>
              Brand Model
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setBrandModal(true)}
              style={{
                width: width * 0.9,
                borderWidth: 1,
                borderRadius: 10,
                paddingVertical: height * 0.01,
                paddingHorizontal: width * 0.03,
              }}
              className={'flex self-center mt-1 border-gray'}>
              <Text className={'text-lg text-black'}>
                {brands == null ? 'Brands' : brands.brands}
              </Text>
            </TouchableOpacity>
            <Text
              className={
                'font-bold text-black text-lg uppercase flex self-start ml-4 mt-3'
              }>
              Car Model
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setModalModal(true)}
              style={{
                width: width * 0.9,
                borderWidth: 1,
                borderRadius: 10,
                paddingVertical: height * 0.01,
                paddingHorizontal: width * 0.03,
              }}
              className={'flex self-center mt-1 border-gray'}>
              <Text className={'text-lg text-black'}>
                {modals == null ? 'Car Models' : modals.name}
              </Text>
            </TouchableOpacity>
            {/* Price */}
            <Text
              className={
                'font-bold text-black flex self-start ml-7 text-lg uppercase mt-3'
              }>
              Price
            </Text>
            <View
              style={{width: width * 0.9}}
              className={'flex flex-row justify-between self-center my-1'}>
              <Text className={'text-sm text-black'}>{low}</Text>
              <Text className={'text-sm text-black'}>{high}</Text>
            </View>
            <RangeSlider
              style={{
                width: width * 0.9,
                alignSelf: 'center',
              }}
              min={0}
              max={100000000}
              step={10000}
              floatingLabel
              renderThumb={renderThumb}
              renderRail={renderRail}
              renderRailSelected={renderRailSelected}
              renderLabel={renderLabel}
              renderNotch={renderNotch}
              onValueChanged={handleValueChange}
            />
            {/* Price */}
          </View>
          <TouchableOpacity
            onPress={() => _handleAutoPart()}
            activeOpacity={0.7}
            style={{width: width * 0.86}}
            className={
              'p-3 flex items-center justify-center bg-[#0095FF] rounded-lg mt-5 self-center'
            }>
            <Text className={'text-xl font-semibold text-white uppercase'}>
              Search
            </Text>
          </TouchableOpacity>

          {data.length !== 0 && (
            <>
              <Text className={'mt-4 ml-5 text-lg text-black font-semibold'}>
                Search Result
              </Text>
              <FlatList
                data={data}
                scrollEnabled={false}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('AutoPartsDetail', {
                          data: item,
                        });
                      }}
                      activeOpacity={0.8}
                      style={{
                        width: width * 0.95,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 3,
                        },
                        shadowOpacity: 0.29,
                        shadowRadius: 4.65,
                        elevation: 7,
                      }}
                      className={
                        'bg-white rounded-lg flex self-center p-3 mt-3'
                      }>
                      <View className={'flex flex-row items-center'}>
                        <Image
                          source={{uri: item.images[0].url}}
                          className={'w-32 h-28 mr-2'}
                          resizeMode={'contain'}
                        />

                        <View style={{width: width * 0.59}}>
                          <Text
                            className={'text-lg font-semibold text-black'}
                            numberOfLines={1}>
                            {item.title}
                          </Text>
                          <Text className={'text-lg font-semibold text-black'}>
                            PKR {item.price}
                          </Text>
                          <Text className={'text-lg font-medium text-black'}>
                            {item.category.name} {item.sub_category.name}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                contentContainerStyle={{paddingBottom: height * 0.07}}
                ListEmptyComponent={
                  <Text
                    className={
                      'text-xl text-black font-semibold flex self-center mt-12'
                    }>
                    No List Found
                  </Text>
                }
              />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
      <BrandModal
        data={brand}
        onPress={item => {
          setbrands({...brands, brands: item.name, id: item._id});
          getBrandsModals(item._id);
          setBrandModal(false);
        }}
        isVisible={brandModal}
        handleIsVisible={() => setBrandModal(false)}
      />
      <CategoryModal
        data={car_brands}
        title={'Car Model'}
        onPress={item => {
          setmodals({...modals, name: item.name, id: item._id});
          setModalModal(false);
        }}
        isVisible={modalModal}
        handleIsVisible={() => setModalModal(false)}
      />
      <CategoryModal
        data={category}
        onPress={item => {
          setcategories({...categories, name: item.name, id: item._id});
          getSubCategory(item._id);
          setCategoryModal(false);
        }}
        title={'Category'}
        isVisible={categoryModal}
        handleIsVisible={() => setCategoryModal(false)}
      />
      <CategoryModal
        data={subCategory}
        onPress={item => {
          setsubcategories({...subcategories, name: item.name, id: item._id});
          setSubCategoryModal(false);
        }}
        title={'Sub Category'}
        isVisible={subCategoryModal}
        handleIsVisible={() => setSubCategoryModal(false)}
      />
      {isLoader && <Loader />}
      <Alert
        isVisible={showAlert}
        message={alertText}
        onPress={() => {
          navigation.goBack();
          setShowAlert(false);
          setAlertText('');
        }}
      />
    </>
  );
};

export default Index;
