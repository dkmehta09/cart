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
  const [count, setCount] = useState(0)

  const [data, setData] = useState(itemList)

  const AddItem = (id) => {
    if (count == 0) {
      setCount(0)
    }
    else if (count > 0) {
      setCount(count - 1)
    }
  }

  const setItemnumber = (id) =>{
    setCount(count+1)
  }

  const removeItem = (id) => {
    let arr = data.filter(function (item) {
      return item.id !== id
    })
    setData(arr);
  };

  return (
    <SafeAreaView style={Styles.mainBody}>

      <View style={Styles.Header}>

        <TouchableOpacity
          style={{ width: '20%' }}
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../Images/back.png')}
            style={{ height: 25, width: 25, marginLeft: 10 }}
          />
        </TouchableOpacity>


        <View style={{ width: '60%', alignItems: 'center' }}>
          <Text style={Styles.Heading}>
            Cart Items
          </Text>
        </View>
        <TouchableOpacity
         
          style={{ width: '20%', paddingRight: 30, height: 50, justifyContent: 'center' }}>
          <Image source={require('../Images/cart.png')}
            style={Styles.CartImage}
          />
          <Text style={Styles.number}>{count}</Text>
        </TouchableOpacity>

      </View>

      <View style={Styles.flatlist}>
        <FlatList
          data={data}
          renderItem={({ item }) =>
            <View style={Styles.itemView}>

              <View style={{ width: '30%' }}>
                <Image source={item.image}
                  style={Styles.itemImage}
                />
              </View>

              <View style={{ width: '40%' }}>
                <Text style={Styles.title} >{item.title}</Text>
              </View>

              <View style={{ width: '30%', }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 }}>
                  
                  <TouchableOpacity
                  onPress ={()=> setItemnumber(item.id)}
                  >
                    <Image source={require('../Images/add.png')}
                      style={Styles.AddImage}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Image source={require('../Images/remove.png')}
                      style={Styles.AddImage}
                    />
                  </TouchableOpacity>

                </View>
                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                  style={Styles.AddButton}
                >
                  <Text style={{ fontSize: 15 }}> Remove</Text>
                  {/* <Text style={{ fontSize: 15 }}> Add To Cart</Text> */}

                </TouchableOpacity>
              </View>
            </View>
          }
          keyExtractor={(item) => item.id}
          extraData={count}
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
  }

})

export default Index