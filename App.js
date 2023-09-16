import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function App() {


  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async () => {
    const apiUrl = 'https://quizzapi.jomoreschi.fr/api/v1/quiz?limit=5&category=tv_cinema&difficulty=facile';
    try {
      const response = await fetch(apiUrl); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      // setData(json);
      console.log(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


const [value, setValue] = useState('first');
const handleSubmit=(value)=>{
 
  alert(value)
  
}


  return (
    <View style={styles.body}>
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

      <Text style={styles.question} >Open up App.js to start working on your app!</Text>


      </View>
      <View style={styles.answer}>

      <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
      <RadioButton.Item label="First item" value="first" />
      <RadioButton.Item label="Second item" value="second" />
    </RadioButton.Group>



      </View>
    
      <TouchableOpacity style={styles.submit}  onPress={() =>{handleSubmit(value)}}>
        <Text style={styles.play}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#22223b',
  },
  container: {
    width: '100%',
    height: 500,
    backgroundColor: 'white',
    position: 'relative',
  },
  content: {
    padding: 50,
  },
  question: {
    fontSize: 20,
  },
  answer: {
    fontSize: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#20232a",  
  },
  submit: {
    backgroundColor: 'rebeccapurple',
    color: 'white',
    border: 'none',
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  result: {
    display: 'none',
    padding: 50,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 50,
  },
  correct: {
    color: 'green',
  },
  wrong: {
    color: 'red',
  },
  play: {
    color: 'white',
    backgroundColor: 'rebeccapurple',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

});
