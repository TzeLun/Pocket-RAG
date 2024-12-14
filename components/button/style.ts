import { StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import { switchStyle, sliderStyle, CButtonStyle } from "./button";

export const style = StyleSheet.create({
  Btn: {
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#5C5470',
    width: 150
  },
  BtnPressed: {
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#B9B4C7',
    width: 150
  },
  Txt: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  });

export const ToggleSwitchStyle: switchStyle = {
  div: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  switch: {
    transform: [{ scaleX: 2 }, { scaleY: 2 }],
    margin: 10,
    marginRight: 40 
  },
  text: {
    fontSize: 20,
    color: '#BB8493',
    fontWeight: 'bold',
  }
};

export const SliderBarStyle: sliderStyle = {
  div: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
    marginBottom: 0,
    alignItems: 'center'
  },
  slider: {
    width: 220,
    height: 40,
    margin: 10,
    marginBottom: 0
  },
  text: {
    fontSize: 20,
    color: '#BB8493',
    fontWeight: 'bold',
  }
};

export const defaultButtonStyle: [CButtonStyle, CButtonStyle] = [
  // if pressed
  {
    div: {
      flexDirection: 'row',
      justifyContent: 'center',
      margin: 20,
      alignItems: 'center',
    },
    btn: {
      backgroundColor: "#5C5470",
      height: 50,
      width: 200,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 20,
      color: '#FFFFFF',
      fontWeight: 'bold',
    }
  },
  // if not pressed
  {
    div: {
      flexDirection: 'row',
      justifyContent: 'center',
      margin: 20,
      alignItems: 'center',
    },
    btn: {
      backgroundColor: "#B9B4C7",
      height: 50,
      width: 200,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 20,
      color: '#5C5470',
      fontWeight: 'bold',
    }
  }
]

export const chatButtonStyle: [CButtonStyle, CButtonStyle] = [
  // if pressed
  {
    div: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      padding: 0
    },
    btn: {
      backgroundColor: "#5C5470",
      height: 50,
      width: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 20,
      color: '#FFFFFF',
      fontWeight: 'bold',
    }
  },
  // if not pressed
  {
    div: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      padding: 0
    },
    btn: {
      backgroundColor: "#61677A",
      height: 50,
      width: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 20,
      color: '#D9D9D9',
      fontWeight: 'bold',
    }
  }
]


export const resetButtonStyle: [CButtonStyle, CButtonStyle] = [
  // if pressed
  {
    div: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      padding: 0
    },
    btn: {
      backgroundColor: "#FAF0E6",
      height: 50,
      width: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 20,
      color: '#FFFFFF',
      fontWeight: 'bold',
    }
  },
  // if not pressed
  {
    div: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      padding: 0
    },
    btn: {
      backgroundColor: "#FAF0E6",
      height: 50,
      width: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 20,
      color: '#D9D9D9',
      fontWeight: 'bold',
    }
  }
]

export const menuButtonStyle: [CButtonStyle, CButtonStyle] = [
  // if pressed
  {
    div: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
      padding: 0
    },
    btn: {
      backgroundColor: "#D8D9DA",
      height: 100,
      width: 200,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#61677A',
      borderWidth: 5,
      elevation: 5, // for Android
      shadowOffset: { width: 1, height: 5}, // for IOS
    },
    text: {
      fontSize: 20,
      color: '#61677A',
      fontWeight: 'bold',
    }
  },
  // if not pressed
  {
    div: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
      padding: 0
    },
    btn: {
      backgroundColor: "#D8D9DA",
      height: 100,
      width: 200,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5, // for Android
      shadowOffset: { width: 1, height: 5}, // for IOS
    },
    text: {
      fontSize: 20,
      color: '#61677A',
      fontWeight: 'bold',
    }
  }
]

export const configResetButtonStyle: [CButtonStyle, CButtonStyle] = [
  // if pressed
  {
    div: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
      // padding: 0
    },
    btn: {
      backgroundColor: "#272829",
      height: 60,
      width: 150,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 15,
      color: '#D8D9DA',
      fontWeight: 'bold',
    }
  },
  // if not pressed
  {
    div: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
      // padding: 0
    },
    btn: {
      backgroundColor: "#61677A",
      height: 60,
      width: 150,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 15,
      color: '#D8D9DA',
      fontWeight: 'bold',
    }
  }
]

export const searchButtonStyle: [CButtonStyle, CButtonStyle] = [
  // if pressed
  {
    div: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10
      // padding: 0
    },
    btn: {
      backgroundColor: "#D8D9DA",
      width: 50,
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 15,
      color: '#D8D9DA',
      fontWeight: 'bold',
    }
  },
  // if not pressed
  {
    div: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10
      // padding: 0
    },
    btn: {
      backgroundColor: "#FAF0E6",
      width: 50,
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 15,
      color: '#D8D9DA',
      fontWeight: 'bold',
    }
  }
]

export const linkButtonStyle: [CButtonStyle, CButtonStyle] = [
  // if pressed
  {
    div: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // padding: 0
    },
    btn: {
      backgroundColor: "#E8BCB9",
      width: 20,
      height: 20,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 15,
      color: '#61677A',
      fontWeight: 'bold',
    }
  },
  // if not pressed
  {
    div: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // padding: 0
    },
    btn: {
      backgroundColor: "#E8BCB9",
      width: 20,
      height: 20,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 15,
      color: '#61677A',
      fontWeight: 'bold',
    }
  }
]

export const exploreButtonStyle: [CButtonStyle, CButtonStyle] = [
  // if pressed
  {
    div: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10
      // padding: 0
    },
    btn: {
      backgroundColor: "#5C5470",
      width: 100,
      height: 40,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: 'bold',
    }
  },
  // if not pressed
  {
    div: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10
      // padding: 0
    },
    btn: {
      backgroundColor: "#5C5470",
      width: 100,
      height: 40,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: 'bold',
    }
  }
]

export const closeButtonStyle: [CButtonStyle, CButtonStyle] = [
  // if pressed
  {
    div: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // padding: 0
    },
    btn: {
      backgroundColor: "#FAF0E6",
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 15,
      color: '#61677A',
      fontWeight: 'bold',
    }
  },
  // if not pressed
  {
    div: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // padding: 0
    },
    btn: {
      backgroundColor: "#FAF0E6",
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 15,
      color: '#61677A',
      fontWeight: 'bold',
    }
  }
]