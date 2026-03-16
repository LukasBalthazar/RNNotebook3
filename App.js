import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, TextInput, Button, FlatList  } from 'react-native';
import { useState} from 'react';


const Stack = createNativeStackNavigator()

export default function App() {
  const [tasks, setTasks] = useState([
    { key: '1', name: 'Task 1', details: 'Details for task 1' },
    { key: '2', name: 'Task 2', details: 'Details for task 2' }
  ]);

  function addTask(taskName) {
    if (!taskName.trim()) return;

    const newTask = {
      key: Date.now().toString(),
      name: taskName,
      details: ''
    };

    setTasks([...tasks, newTask]);
  }

  function updateTaskDetails(taskKey, newDetails) {
    const updatedTasks = tasks.map((task) =>  
      task.key === taskKey ? {...task, details: newDetails} : task
  );

  setTasks(updatedTasks);
}

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ListPage'>
        <Stack.Screen name='ListPage'>
          {(props) => (
            <ListPage
              {...props}
              tasks={tasks}
              addTask={addTask}
            />
          )}
        </Stack.Screen>
        
        <Stack.Screen name='DetailPage'>
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
    navigation.navigate('DetailPage', { taskKey: item.key });
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
        renderItem={({ item }) => 
          <View style={styles.taskButton}>
            <Button title={item.name} onPress={() => handleTaskPress(item)} />
          </View>
        }
      />
    </View>
  );
};

const DetailPage = ({ route, tasks, updateTaskDetails }) => {
  const taskKey = route.params?.taskKey;
  const task = tasks.find((t) => t.key === taskKey);
  
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
        onChangeText={(txt) => updateTaskDetails(task.key, txt)}
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