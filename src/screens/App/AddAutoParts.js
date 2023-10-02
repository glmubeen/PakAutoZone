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

//third party library
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

const Index = ({navigation, ...props}) => {
  const user = useSelector(state => state.userReducer.userData);
  const [isLoader, setIsLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');

  const [images, setImages] = useState([]);
  const selectImages = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
    })
      .then(response => {
        response.forEach(image => {
          data.append('images[]', {
            uri: image.path,
            type: image.mime,
            name: image.path.split('/').pop(),
          });
        });
        setImages(response);
      })
      .catch(error => {});
  };

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
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const data = new FormData();

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: user.accessToken,
    },
  };

  const _handleAutoPart = () => {
    setIsLoader(true);
    const selectedProperties = images.map(image => ({
      uri: image.path,
      type: image.mime,
      name: image.path.split('/').pop(),
    }));

    for (let index = 0; index < selectedProperties.length; index++) {
      data.append('images', selectedProperties[index]);
    }
    data.append('title', title);
    data.append('description', description);
    data.append('category', categories?.id);
    data.append('sub_category', subcategories?.id);
    if (brands != null) {
      data.append('brand', brands?.id);
    }
    if (modals != null) {
      data.append('model', modals?.id);
    }

    data.append('price', price);

    axios
      .post(BaseURL.ADD_AUTO_PARTS, data, config)
      .then(res => {
        setIsLoader(false);
        setShowAlert(true);
        setAlertText('Added Successfully');
      })
      .catch(err => {
        setIsLoader(false);
        setShowAlert(true);
        setAlertText('Something Went Wrong');
      });
  };

  return (
    <>
      <MyStatusBar backgroundColor={'#0095FF'} />
      <SafeAreaView className={'flex-1 bg-white'}>
        <ScrollView contentContainerStyle={{paddingBottom: height * 0.07}}>
          <Header
            title={`Add Auto Part & Accessories`}
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
            <Input
              mainText={'Description'}
              placeholderText={'Enter Description'}
              value={description}
              handleOnChangeTxt={text => setDescription(text)}
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
                {modals == null ? 'Car Modals' : modals.name}
              </Text>
            </TouchableOpacity>

            <Input
              mainText={'Price'}
              placeholderText={'Enter Price'}
              keyboardType={'numeric'}
              value={price}
              handleOnChangeTxt={text => setPrice(text)}
            />
            <Text
              className={
                'font-bold text-black text-lg uppercase flex self-start ml-7 mt-3'
              }>
              Image
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => selectImages()}>
              {images.length == 0 ? (
                <Image
                  source={Images.AddPhoto}
                  style={{width: width * 0.9}}
                  className={'h-48 flex self-center mt-5'}
                  resizeMode={'contain'}
                />
              ) : (
                <View style={{height: height * 0.21}}>
                  <FlatList
                    data={images}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => selectImages()}>
                          <Image
                            source={{uri: item.path}}
                            style={{width: width * 0.9}}
                            className={'h-48 flex self-center mr-4'}
                            resizeMode={'stretch'}
                          />
                        </TouchableOpacity>
                      );
                    }}
                    contentContainerStyle={{
                      alignSelf: 'center',
                      marginLeft: width * 0.06,
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
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => _handleAutoPart()}
            activeOpacity={0.7}
            style={{width: width * 0.86}}
            className={
              'p-3 flex items-center justify-center bg-[#0095FF] rounded-lg mt-5 self-center'
            }>
            <Text className={'text-xl font-semibold text-white'}>
              Publish Now
            </Text>
          </TouchableOpacity>
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
