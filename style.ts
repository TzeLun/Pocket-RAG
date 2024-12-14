import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  frame: {
    flex: 1,
    display: 'flex',
    // flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#E6DDC4',
    // marginTop: 30,
    // margin: 'auto',
    // something to be mindful about
    // width: '100%',
  },

  title: {
    fontSize: 28,
    color: "#61677A",
    fontWeight: 'bold',
    paddingTop: 50,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center'
  }
});