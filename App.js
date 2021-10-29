
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';

const Stack = createNativeStackNavigator();



export default function Game() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Menu} />
        <Stack.Screen name="Game" component={App} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

function Menu({ navigation }) {
  return (
    <View style={styles.menuContainer}>
      <Text style={styles.menuTitle}>Trivia Game</Text>
      <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate('Game')}>
        <Text
          style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>Start</Text>
      </TouchableOpacity>
    </View>
  )
}

function App({ navigation }) {
  //States
  const [currentIndex, setCurrentIndex] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState(null)
  const [answerSelected, setAnswerSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [showModal, setShowModal] = useState(false)


  //Data
  let questions = [
    {
      question: "Which Apollo mission was the first one to land on the Moon?",
      options: ["Apollo 10", "Apollo 11", "Apollo 9", "Apollo 13"],
      correct_option: "Apollo 11"
    },
    {
      question: "What’s the biggest planet in our solar system??",
      options: ["Jupiter", "Saturn", "Neptune", "Mercury"],
      correct_option: "Jupiter"
    },
    {
      question: "What land animal can open its mouth the widest?",
      options: ["Alligator", "Crocodile", "Baboon", "Hippo"],
      correct_option: "Hippo"
    },
    {
      question: "Rhinoplasty is a surgical procedure on what part of the human body?",
      options: ["Nose", "Ears", "Chin", "Neck"],
      correct_option: "Nose",
    },
    {
      question: "Where are the Nazca Lines located?",
      options: ["Brazil", "Colombia", "Peru", "Ecuador"],
      correct_option: "Peru"
    }
  ]

  //methods

  const validate = (answer) => {
    setAnswerSelected(answer)
    setCorrectAnswer(questions[currentIndex].correct_option)
    setDisabled(true)

    if (answer === questions[currentIndex].correct_option) {
      setScore(score + 1)
    }
    ;
  }

  const next = () => {
    if (currentIndex == questions.length - 1) {
      setShowModal(true)
    } else {

      setCurrentIndex(currentIndex + 1);
      setAnswerSelected(null);
      setCorrectAnswer(null);
      setDisabled(false);
    }
  }

  const restartQuiz = () => {
    setShowModal(false);
    setCurrentIndex(0);
    setScore(0);
    setAnswerSelected(null);
    setCorrectAnswer(null);
    setDisabled(false)
    navigation.navigate('Home')
  }



  return (
    <View style={styles.body}>
      <View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionIndex}>Question {currentIndex + 1}</Text>

          <Text style={styles.question}>{questions[currentIndex].question}</Text>
        </View>
        {
          questions[currentIndex].options.map(answer => (
            <TouchableOpacity
              onPress={() => { console.log(answer); validate(answer) }}
              disabled={disabled}
              key={answer}
              style={{
                borderColor: answer == correctAnswer ? 'green'
                  : answer == answerSelected ? 'red'
                    : '#1E90FF',
                backgroundColor: answer == correctAnswer ? 'green'
                  : answer == answerSelected ? 'red'
                    : '#1E90FF' + '20',
                borderWidth: 3,
                height: 60,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginVertical: 10
              }}
            >
              <Text style={styles.answers}>{answer}</Text>
            </TouchableOpacity>
          ))
        }
        <TouchableOpacity
          onPress={next}
          disabled={!disabled}
          style={{
            marginTop: 20,
            width: '100%',
            backgroundColor: '#3498db',
            padding: 20,
            borderRadius: 10
          }}>
          <Text style={styles.btn}>Next Question</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
        >
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{score >= questions.length / 2 ? 'Congratulations!' : 'Oops!'}</Text>

              <View style={styles.modalDescription}>
                <Text style={{
                  fontSize: 30,
                  color: score >= questions.length / 2 ? 'green' : 'red'
                }}>{score}</Text>
                <Text style={{
                  fontSize: 20, color: 'black'
                }}>/ {questions.length}</Text>
              </View>
              <TouchableOpacity
                onPress={restartQuiz}
                style={styles.modalBtn}>
                <Text style={{
                  textAlign: 'center', color: 'white', fontSize: 20
                }}>Retry Quiz</Text>
              </TouchableOpacity>

            </View>

          </View>
        </Modal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  questionContainer: {
    marginVertical: 0
  },

  questionIndex: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20
  },

  question: {
    color: 'white',
    fontSize: 30
  },

  answers: {
    fontSize: 20,
    color: 'white'
  },

  btn: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  },

  body: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 16,
    backgroundColor: '#22283E',
    overflow: 'scroll'
  },

  modal: {
    flex: 1,
    backgroundColor: '#252c4a',
    alignItems: 'center',
    justifyContent: 'center'
  },

  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center'
  },

  modalDescription: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 20
  },

  modalTitle: {
    fontSize: 30,
    fontWeight: 'bold'
  },

  modalBtn: {
    backgroundColor: '#3498db',
    padding: 20,
    width: '100%',
    borderRadius: 20
  },

  menuContainer: {
    backgroundColor: '#22283E',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 100
  },

  menuTitle: {
    color: 'white',
    fontSize: 30,
  },

  menuBtn: {
    backgroundColor: '#3498db',
    padding: 20,
    width: '60%',
    borderRadius: 20
  }
})