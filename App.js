// Imports
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

// Código
export default function App() {

  const [altura,setAltura] = useState('')
  const [peso,setPeso] = useState('')
  const [IMC,setIMC] = useState('')

  function calcular(){
    var imc;
    imc = (peso/(altura^2)).toFixed(2)
    setIMC(imc)
  }
  
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, fontStyle: 'italic', fontWeight: 'bold', color: 'blue'}} >CALCULADORA IMC</Text>
      <TextInput
        style = {styles.textInput}
        placeholder = 'Altura'
        onChangeText = {setAltura}
        value = {altura}
      />
      <TextInput
        style = {styles.textInput}
        placeholder = 'Peso'
        onChangeText = {setPeso}
        value = {peso}
      />
      <View style = {{flexDirection: 'row', height: '10%', justifyContent: 'space-around', width: '100%'}}>
        <TouchableOpacity 
          style = {styles.botao}
          onPress = {calcular}  
        >
          <Text>Calcular</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style = {styles.botao}
          onPress = {() => {
            setAltura('')
            setPeso('')
            setIMC('')
          }}  
          >
          <Text>Limpar</Text>
        </TouchableOpacity>
      </View>
      <Text>SEU IMC: {IMC}</Text>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 1,
    width: '75%',
    height: '10%',
    margin: 20,
    paddingLeft: 10,
    borderRadius: 10
  },
  botao: {
    backgroundColor: 'deepskyblue',
    height: '100%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  }
});
