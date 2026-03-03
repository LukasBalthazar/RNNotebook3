import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-web';

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

  function handleButton(){
      navigation.navigate('DetailPage')
  }

  return (
    <View>
      <Text>Hej</Text>
      <Button title='DetailPage' onPress={handleButton}></Button>
    </View>
  )
}

const DetailPage = ({navigation, route}) => {
  return (
    <View>
      <Text>Detaljer...</Text>
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