import { StyleSheet, StyleProp, TextStyle } from "react-native";
import { TextBoxStyle } from "./textbox";

export const style = StyleSheet.create({
    input: {
      height: 50,
      margin: 12,
      borderWidth: 2,
      borderColor: '#352F44',
      padding: 10,
      width: 300,
      borderRadius: 5,
      backgroundColor: '#FAF0E6'
    },
  });


export const defaultStyle: TextBoxStyle = {

  div: {
    flexDirection: 'row',
    justifyContent: "center"
  },

  box: {
    color: "#61677A",
    fontSize: 15,
    fontFamily: 'Inter',
    backgroundColor: "#D8D9DA",
    padding: 15,
    width: "85%",
    maxWidth: 500,
    maxHeight: 300,
    margin: 10,
    textAlign: 'left',
    borderRadius: 20
  }

};

export const ParamConfigStyle: TextBoxStyle = {

  div: {
    flexDirection: 'row',
    justifyContent: "center",
    width: "60%",
    maxWidth: 220,
  },

  box: {
    color: "#61677A",
    fontSize: 15,
    fontFamily: 'Inter',
    backgroundColor: "#D8D9DA",
    padding: 15,
    width: "100%",
    height: 50,
    margin: 10,
    textAlign: 'right',
    borderRadius: 10
  }

};

export const chatAreaStyle: TextBoxStyle = {

  div: {
    flexDirection: 'row',
    justifyContent: "center",
    width: "70%"
  },

  box: {
    color: "#61677A",
    fontSize: 15,
    fontFamily: 'Inter',
    backgroundColor: "#D8D9DA",
    padding: 15,
    width: "100%",
    maxWidth: 600,
    height: 50,
    margin: 10,
    textAlign: 'left',
    borderRadius: 20
  }

};

export const SearchBarConfigStyle: TextBoxStyle = {

  div: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    maxWidth: 400,
  },

  box: {
    color: "#61677A",
    fontSize: 15,
    fontFamily: 'Inter',
    backgroundColor: "#D8D9DA",
    padding: 15,
    width: "100%",
    height: 50,
    margin: 10,
    textAlign: 'left',
    borderRadius: 10
  }

};