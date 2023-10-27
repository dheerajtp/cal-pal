// app/Styles.js

import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  input: {
    width: 200,
    height: 40,
    backgroundColor: "#002D62",
    color: "#fff",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",

    marginTop: 20,
  },

  buttonContainerMain: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 20,
    backgroundColor: "#002D62",
  },
  inputNew: {
    fontSize: 14,
    borderRadius: 6,
    lineHeight: 22,
    padding: 5,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "#dee1e2",
    color: "rgb(14, 14, 16)",
    backgroundColor: "#dee1e2",
    display: "flex",
    height: 36,
    marginBottom: 8,
    width: 200,
  },
  buttonNew: {
    backgroundColor: "#000000",
    color: "#FFFFFF",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 22,
    textAlign: "center",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    width: 200,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
  },
  errorMessage: {
    color: "red",
    padding: 2,
    fontSize: 12,
  },
});
