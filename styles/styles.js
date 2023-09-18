import { StyleSheet} from 'react-native';

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
      shadowColor: '#2f3e46',
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
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  export default styles;
  