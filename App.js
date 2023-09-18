import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {  Text, View,SafeAreaView,TouchableOpacity,Modal,Pressable } from 'react-native';
import { RadioButton } from 'react-native-paper';
import styles from './styles/styles.js'; // Import your stylesheet

export default function App() {

  
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [question, setquestion] = useState('');
  const [goodanswer, setgoodanswer] = useState('');
  const [selectedanswer, setselectedanswer] = useState(null); 
  const [count, setCount] = useState(1);




  let [correctCount, setcorrectCount] = useState(0); 
  let [wrongCount, setwrongCount] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    LoadData()
   
  }, []);


  const playAgain = ()=>{
   setModalVisible(!modalVisible)
    setCount(0)
    setcorrectCount(0)
    setwrongCount(0)
    setselectedanswer(null)
    LoadData()

  }
  const LoadData = async () => {

    const apiUrl = 'https://quizzapi.jomoreschi.fr/api/v1/quiz?limit=5&category=tv_cinema&difficulty=facile';
    try {
      const response = await fetch(apiUrl); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setIsLoading(false);
      setselectedanswer(null)
      const json = await response.json();
      setData([json.quizzes[0].answer,...json.quizzes[0].badAnswers]);
      setquestion(json.quizzes[0].question);
      setgoodanswer(json.quizzes[0].answer);
      // console.log(count);
      

    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);

    }
  };



  const  SubmitData=()=>{

    // if (!selectedanswer.length) {

    if(selectedanswer!==null){
        selectedanswer===goodanswer?  setcorrectCount(prevCount => prevCount + 1) : setwrongCount(prevCount => prevCount + 1);
      setCount(prevCount => prevCount + 1);  
       
      if (count <3) {
         LoadData();  
      } else {
        setModalVisible(true)
       
      

      }
    }
    else{
      alert('you should chose an answer');
        }


      }   

  return (
    <View style={styles.body}>
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
      
      <Text style={styles.question}>{question}</Text>


      </View>
      <View style={styles.answer}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (


        <RadioButton.Group onValueChange={selectedanswer => setselectedanswer(selectedanswer)} value={selectedanswer}>
  
          {data.map((item,key) => (
          <RadioButton.Item  color='#20232a' label={item} value={item} key={key} />

          ))}
          </RadioButton.Group>     
   
   
   
   )}


      </View>
      <Pressable
             style={styles.submit}  onPress={SubmitData}>
        <Text style={styles.play}>Submit</Text>
            </Pressable>




      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        backdropStyle={styles.backdrop}

        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>your score is {correctCount} - {wrongCount}</Text>
            <Pressable
              style={[styles.play, styles.buttonClose]}
              onPress={playAgain}>
              <Text style={styles.textStyle}>Play Again </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
    </View>
  );
}
