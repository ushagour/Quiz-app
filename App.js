import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity,Modal,Pressable } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function App() {

  
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  let [question, setquestion] = useState();
  let [goodanswer, setgoodanswer] = useState();
  const [selectedanswer, setselectedanswer] = useState([]); 
  const [count, setCount] = useState(1);




  let [correctCount, setcorrectCount] = useState(0); 
  let [wrongCount, setwrongCount] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    LoadData()
   
  }, []);


  const playAgain = ()=>{
    setCount(0)
    setcorrectCount(0)
    setwrongCount(0)
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
      const json = await response.json();
      setData([json.quizzes[0].answer,...json.quizzes[0].badAnswers]);
      setquestion(json.quizzes[0].question);
      setgoodanswer(json.quizzes[0].answer);
      console.log(question);
      

    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);

    }
  };



  const  SubmitData=()=>{


    if(selectedanswer.length!==0){
        selectedanswer===goodanswer?  setcorrectCount(prevCount => prevCount + 1) : setwrongCount(prevCount => prevCount + 1);
      setCount(prevCount => prevCount + 1);  
      if (count <3) {
         LoadData();  
      } else {
        setModalVisible(true)
        // alert(`your score is ${correctCount} - ${wrongCount}`);
        // playAgain()

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
    
      <TouchableOpacity style={styles.submit}  onPress={SubmitData}>
        <Text style={styles.play}>Submit</Text>
      </TouchableOpacity>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>your score is {correctCount} - {wrongCount}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity:1,
    shadowRadius: 4,
    elevation: 5,
  },  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
