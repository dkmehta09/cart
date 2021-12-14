import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  I18nManager,
  ActivityIndicator


} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useSelector, useDispatch } from 'react-redux'

import { setName } from '../Redux/actions'

import RNRestart from "react-native-restart";

const itemList = [
  {
    id: "1",
    title: "Apple",
    image: require('../Images/apple.png')
  },
  {
    id: "2",
    title: "Apricot",
    image: require('../Images/apricot.png')
  },
  {
    id: "3",
    title: "Banana",
    image: require('../Images/bananas.png')
  },

  {
    id: "4",
    title: "Black Currant ",
    image: require('../Images/black-currant.png')
  },
  {
    id: "5",
    title: "Blackberry",
    image: require('../Images/blackberry.png')
  },
  {
    id: "6",
    title: "Blueberry",
    image: require('../Images/blackberry.png')
  },
  {
    id: "7",
    title: "Black Currant ",
    image: require('../Images/black-currant.png')
  },
  {
    id: "8",
    title: "Blackberry",
    image: require('../Images/blackberry.png')
  },
  {
    id: "9",
    title: "Blueberry",
    image: require('../Images/blackberry.png')
  },
];

const Index = ({ navigation }) => {
  const [show, SetShow] = useState(false);
  const [text, setText] = useState([])
  const [count, setCount] = useState(0)
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [data, setData] = useState(itemList)
  const [loading,setLoading] = useState(false);

  const { name } = useSelector(state => state.userReducer)
  const dispatch = useDispatch();


  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('itemNumber', value)
    } catch (e) {
      console.log("error", e)
    }
  }

  const renderItem = ({ item, index }) => {

    const { id, title, image } = item;
    const isSelected = selectedBrands.filter((i) => i === id).length > 0;

    const AddCaart = (id) => {
      // alert(id)
      // const ids= id;
      // setIds(id)
      if (isSelected) {
        setSelectedBrands((prev) => prev.filter((i) => i !== id));
      } else {
        setSelectedBrands(prev => [...prev, id])
      }
    }

    const AddItem = async () => {

      console.log("----------------------ddd", name)
      if (isSelected) {
        setCount(count - 1)
      }
      else {
        setCount(count + 1)
      }

    }

    // const setIds = async (value) =>{
    //   try {
    //     await AsyncStorage.setItem("idsss",value)
    //     alert(await AsyncStorage.getItem("idsss"))
    //   } catch (error) {
    //     console.log("error",error)
    //   }
    // }
    return (
      <View style={Styles.itemView}>

        <View style={{ width: '30%' }}>
          <Image source={item.image}
            style={Styles.itemImage}
          />
        </View>

        <View style={{ width: '40%' }}>
          <Text style={Styles.title} >{item.title} </Text>
        </View>

        <View style={{ width: '30%', }}>


          <TouchableOpacity
            onPress={() => {
              AddCaart(id)
              AddItem()
              dispatch(setName("lnjatav"))
            }}
            style={[Styles.AddButton, isSelected && { backgroundColor: '#fff' }]}
          >
            {isSelected ?
              <Text style={[Styles.buttonTExt]}> Remove </Text>
              :
              <Text style={[Styles.buttonTExt]}> Add to Cart </Text>
            }

          </TouchableOpacity>
        </View>

      </View>
    );
  };

  const change = async () => {
    setLoading(true)
    await I18nManager.forceRTL(true);
    console.log("helo ---------")
    RNRestart.Restart();
  }
  const change2 = async () => {
    setLoading(true)
    await I18nManager.forceRTL(false);
    console.log("helo ---------")
    RNRestart.Restart();
  }

  return (
    <SafeAreaView style={Styles.mainBody}>

      <View style={Styles.Header}>
        <View style={{ width: '20%' }}>
        </View>
        <View style={{ width: '60%', alignItems: 'center' }}>
          <Text style={Styles.Heading}>
            Items List
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Cart')
            storeData(count.toString())
          }}
          style={{ width: '20%', paddingRight: 30, height: 50, justifyContent: 'center' }}>
          <Image source={require('../Images/cart.png')}
            style={Styles.CartImage}
          />
          <Text style={Styles.number}>{count}</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity
        onPress={() => change()}
        style={{ padding: 10 }}>
        <Text style={{ textAlign: 'left' }}> Left to right  </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => change2()}
        style={{ padding: 10 }}>
        <Text style={{ textAlign: 'left' }}> Right to left  </Text>
      </TouchableOpacity>


      <View style={Styles.flatlist}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        // extraData={count}
        />
      </View>
      {loading ? (
        <ActivityIndicator
          color="#F37269"
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
          size="large"
        />
      ) : null}
    </SafeAreaView>
  )
}

const Styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: '#fff'

  },
  Header: {
    height: 50,
    width: '100%',
    backgroundColor: 'lightblue',
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Heading: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold'
  },
  CartImage: {
    height: 30,
    width: 30,
    alignSelf: 'flex-end',

  },
  flatlist: {
    width: '100%',

  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    textAlign: 'left'
  },
  itemView: {
    backgroundColor: '#f2f2f2',
    marginVertical: 10,
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',

  },
  itemImage: {
    height: 70,
    width: 70
  },
  AddImage: {
    height: 25,
    width: 25
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    right: 10,
    top: 0
  },
  AddButton: {
    backgroundColor: 'lightblue',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center'

  },
  remove: {
    backgroundColor: 'lightblue',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonTExt: {
    fontSize: 15
  }

})

export default Index