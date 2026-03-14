import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, TextInput, Button, FlatList  } from 'react-native';
import { useState} from 'react';



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
  const [myList, setMyList] = useState([ 
    {key:1, name:"Note 1"}, 
    {key:2, name:"Note 2"} 
  ]);

  function handleButton(item){
    navigation.navigate('DetailPage', {message:item})
  }

  function addNewNote() {
    navigation.navigate('DetailPage');
  }

  if (route.params?.newNote) {
    const noteExists = myList.some(note => note.key === route.params.newNote.key);

    if (!noteExists) {
      setMyList([...myList, route.params.newNote]);
    }
  }

  //Add Note button currently doesnt do anything.
  return (
    <View>
      <Text>Hej</Text>

      <Button title="Add Note" onPress={addNewNote} />
      
      <FlatList
        data={myList}
        renderItem={({ item }) => (
          <Button title={item.name} onPress={() => handleButton(item)} />
        )}
      />
    </View>
  );
};

const DetailPage = ({ navigation, route }) => {
  const [text, setText] = useState('')
  const message = route.params?.message;
  
  function handleButton(){
    const newNote = {
      key: Date.now().toString(),
      name: text
    };

    navigation.navigate('ListPage', {newNote: newNote });
  }

  return (
    <View>
      <Text>{message ? message.name: 'New Note'}</Text>
      <TextInput 
        value={text}
        onChangeText={(txt) => setText(txt)}
      />
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