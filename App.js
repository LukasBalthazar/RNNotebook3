import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { Button, FlatList } from 'react-native-web';

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ListPage'>
        <Stack.Screen
        name='ListPage'
        component={ListPage}
        />
        <Stack.Screen
        name='DetailPage'
        component={DetailPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const ListPage = ({navigation, route}) => {
  const myList = [{key:1, name:"Anna"}, {key:2, name:"Bob"} ]
  function handleButton(item){
      navigation.navigate('DetailPage', {message:item})
  }

  return (
    <View>
      <Text>Hej</Text>
      <FlatList
      data={myList}
      renderItem={(note) => <Button title={note.item.name} onPress={()=>handleButton(note.item)}/>}
      />
    </View>
  )
}

const DetailPage = ({navigation, route}) => {
  const message = route.params?.message
  return (
    <View>
      <Text>Detaljer...{message.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})