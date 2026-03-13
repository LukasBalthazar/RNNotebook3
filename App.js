import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, TextInput, Button, FlatList  } from 'react-native';
import { useState} from 'react';



export default function App() {
  const Stack = createNativeStackNavigator()
  const [notes, setNotes] = useState([])
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
  const myList = [{key:1, name:"Note 1"}, {key:2, name:"Note 2"} ]
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
  const [text, setText] = useState('')
  const message = route.params?.message
  
  function handleButton(){
    //alert("Task saved " + text)
    setNotes(
      [...notes, {key:notes.length, name:text}]
    )
  }
  return (
    <View>
      <Text>{message.name}</Text>
      <TextInput onChangeText={(txt) => setText(txt)}/>
      <Button title='Save Note' onPress={handleButton}></Button>
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