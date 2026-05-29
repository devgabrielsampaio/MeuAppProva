import { router } from "expo-router"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo 👋</Text>

      <Text style={styles.subtitle}>Projeto React Native com Expo Router</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/Api")}
      >
        <Text style={styles.buttonText}>Consumir API</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.push("/Contatos")}
      >
        <Text style={styles.buttonText}>Meus Contatos</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#CBD5E1",
    textAlign: "center",
    marginBottom: 40,
  },

  button: {
    width: "100%",
    backgroundColor: "#2563EB",
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: "center",
    elevation: 5,
  },

  secondaryButton: {
    backgroundColor: "#10B981",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
})
