// app/Styles.js

import { StyleSheet } from 'react-native';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    width: 200,
    height: 40,
    backgroundColor: '#002D62',
    color:'#fff',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    
    marginTop: 20,
  },
  
  buttonContainerMain: {
    flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  marginTop: 20,
  backgroundColor: '#002D62',
  },
  
  
});
