import { useEffect, useState } from "react"
import {
  ActivityIndicator, // Componente nativo para exibição de indicador visual de carregamento (feedback de UX)
  SafeAreaView,       // Garante que a renderização respeite os limites físicos da tela (notch e áreas do sistema)
  ScrollView,        // Permite a rolagem da interface caso o volume de dados ultrapasse o viewport vertical
  StyleSheet,        // Módulo para gerenciamento e otimização das regras de estilização (CSS-in-JS)
  Text,              // Componente fundamental para renderização de strings de texto
  View,              // Componente estrutural base para construção de layouts (equivalente à div no ambiente Web)
} from "react-native"

// Definição da interface TypeScript para tipagem estática do objeto de dados da API
interface User {
  id: number
  name: string
  email: string
}

export default function Api() {
  // Estado local para o armazenamento do array de usuários, inicializado como vazio
  const [users, setUsers] = useState<User[]>([])
  // Estado booleano para controle do ciclo de carregamento da aplicação
  const [loading, setLoading] = useState(true)

  // Hook useEffect configurado com array de dependências vazio, executando a lógica exclusivamente na montagem do componente
  useEffect(() => {
    // Requisição assíncrona HTTP GET utilizando a API Fetch
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json()) // Tratamento da resposta para conversão em formato JSON
      .then((data) => setUsers(data))     // Atribuição dos dados tratados ao estado local 'users'
      .catch((error) => console.log(error)) // Tratamento de exceções e captura de eventuais erros na requisição
      .finally(() => setLoading(false))     // Finalização do estado de loading, independente do sucesso ou falha da requisição
  }, [])

  // Renderização condicional: Exibe a tela de carregamento caso a requisição ainda esteja pendente
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Carregando usuários...</Text>
      </View>
    )
  }

  // Renderização principal do componente após a persistência dos dados no estado
  return (
    <SafeAreaView style={styles.container}>
      {/* Seção de Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Usuários Cadastrados na API</Text>
      </View>

      {/* Exibição dos dados através de rolagem com espaçamento inferior de segurança */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Utilização do método map para iterar sobre o array de usuários e renderizar a coleção de componentes */}
        {users.map((item) => (
          // Definição da propriedade 'key' obrigatória para otimização da reconciliação do Virtual DOM do React
          <View key={item.id} style={styles.card}>
            {/* Componente visual do Avatar, extraindo o caractere inicial do nome */}
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>

            {/* Bloco de informações textuais do usuário */}
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

// Abstração de estilos utilizando StyleSheet para ganho de performance e organização do código
const styles = StyleSheet.create({
  container: {
    flex: 1, // Expansão do componente para ocupar toda a dimensão disponível da tela
    backgroundColor: "#F3F4F6",
  },

  header: {
    padding: 24,
    backgroundColor: "#000000",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
  },

  title: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  // Propriedade declarada para futura expansão de subtítulos na interface
  subtitle: {
    color: "#DBEAFE",
    fontSize: 14,
    marginTop: 4,
  },

  card: {
    flexDirection: "row", // Configuração do Flexbox para alinhamento horizontal dos elementos internos
    alignItems: "center",
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,

    // Propriedades para estilização de sombras específicas para a plataforma iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,

    // Propriedade de elevação necessária para a renderização de sombras na plataforma Android
    elevation: 4,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30, // Valor atribuído para garantir a geometria circular do componente
    backgroundColor: "#eb6e25",
    justifyContent: "center",  // Centralização interna horizontal do texto do avatar
    alignItems: "center",      // Centralização interna vertical do texto do avatar
  },

  avatarText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  info: {
    marginLeft: 16,
    flex: 1, // Permite que o container ocupe o espaço restante, evitando estouro de layout em strings extensas
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  email: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center", // Centralização do ActivityIndicator no eixo principal
    alignItems: "center",     // Centralização do ActivityIndicator no eixo transversal
    backgroundColor: "#F3F4F6",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
})