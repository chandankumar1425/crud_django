import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);

  const addTodo = () => {
    if (title.trim() === '') {
      return;
    }
    const newTodo = {
      id: new Date().getTime(),
      title: title,
      description: description,
    };
    setTodos([...todos, newTodo]);
    setTitle('');
    setDescription('');
  };

  const startEditing = (id) => {
    setEditingTodoId(id);
    const todoToEdit = todos.find((todo) => todo.id === id);
    setTitle(todoToEdit.title);
    setDescription(todoToEdit.description);
  };

  const saveEditing = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title, description } : todo
      )
    );
    setEditingTodoId(null);
    setTitle('');
    setDescription('');
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    setEditingTodoId(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo App</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Add Todo" onPress={addTodo} />
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            {editingTodoId === item.id ? (
              <>
                <TextInput
                  style={styles.editInput}
                  value={title}
                  onChangeText={setTitle}
                />
                <TextInput
                  style={styles.editInput}
                  value={description}
                  onChangeText={setDescription}
                />
                <Button title="Save" onPress={() => saveEditing(item.id)} />
              </>
            ) : (
              <>
                <Text style={styles.todoTitle}>{item.title}</Text>
                <Button title="Edit" onPress={() => startEditing(item.id)} />
                <Button title="Delete" onPress={() => deleteTodo(item.id)} />
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  todoTitle: {
    flex: 1,
    fontSize: 16,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
    padding: 8,
    borderRadius: 5,
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  
});

export default App;