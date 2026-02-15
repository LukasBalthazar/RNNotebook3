import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';


export default function App() {

  const [Text, setText] = useState('')
  function buttonHandler(){
    alert("Note added!")
  }


  return (
      <View style={styles.container}>
        <TextInput/>
        <Button title='Add Note' onPress={buttonHandler}></Button>
        <StatusBar style="auto" />
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
