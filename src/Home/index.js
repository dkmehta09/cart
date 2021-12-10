import React, { useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA = [
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

    const AddItem = () => {
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
      <View style={Styles.flatlist}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        // extraData={count}
        />
      </View>
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