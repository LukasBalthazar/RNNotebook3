import { app, database } from './firebase';
import { collection, addDoc} from 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, TextInput, Button, FlatList  } from 'react-native';
import { useState} from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';


const Stack = createNativeStackNavigator()

export default function App() {
  const [values, loading, error] = useCollection(collection(database, 'tasks'))
 
  const tasks = values?.docs.map((doc) => ({ 
    id: doc.id,
    ...doc.data(),
  })) || [];

  async function addTask(taskName) {
    if (!taskName.trim()) return;

    try {
      await addDoc(collection(database, 'tasks'), {
        name: taskName,
        details: '',
        createdAt: new Date()
      });
    } catch (error){
      console.error('Error adding task: ', error)
    }
  }

  function updateTaskDetails(taskKey, newDetails) {
    console.log('Update not implemented in Firestore yet:', taskKey, newDetails);
  }

  if(loading) {
    return (
      <View style={styles.container}>
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  if(error) {
    return (
      <View style={styles.container}>
        <Text>Error loading tasks</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListPage">
        <Stack.Screen name="ListPage">
          {(props) => (
            <ListPage
              {...props}
              tasks={tasks}
              addTask={addTask}
            />
          )}
        </Stack.Screen>
        
        <Stack.Screen name="DetailPage">
          {(props) => (
              <DetailPage
                {...props}
                tasks={tasks}
                updateTaskDetails={updateTaskDetails}
              />
            )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const ListPage = ({ navigation, tasks, addTask }) => {
  const [text, setText] = useState('');

  function handleTaskPress(item){
    navigation.navigate('DetailPage', { taskKey: item.id });
  }

  function handleAddTask() {
    addTask(text);
    setText('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks</Text>

      <TextInput
        style={styles.input}
        placeholder="Write new task"
        value={text}
        onChangeText={(txt) => setText(txt)}
      />

      <Button title="Add task" onPress={handleAddTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskButton}>
            <Button title={item.name} onPress={() => handleTaskPress(item)} />
          </View>
        )}
      />
    </View>
  );
};

const DetailPage = ({ route, tasks, updateTaskDetails }) => {
  const taskKey = route.params?.taskKey;
  const task = tasks.find((t) => t.id === taskKey);
  
  if(!task) {
    return (
      <View style={styles.container}>
        <Text>Task not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.name}</Text>
      
      <Text style={styles.label}>Task details:</Text>

      <TextInput
        style={styles.detailsInput}
        placeholder="Write details here"
        value={task.details}
        onChangeText={(txt) => updateTaskDetails(task.id, txt)}
        multiline={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  detailsInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    height: 120,
    textAlignVertical: 'top'
  },
  taskButton: {
    marginTop: 10,
  }
})