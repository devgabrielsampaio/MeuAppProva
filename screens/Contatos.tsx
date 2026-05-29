import { useEffect, useState } from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,        // Componente nativo para captura de entrada de texto do usuário
  TouchableOpacity, // Componente de área clicável que fornece feedback visual de opacidade reduzida ao toque
  View,
  StatusBar,        // Módulo de controle da barra de status do dispositivo mobile (bateria, hora, notificações)
} from "react-native"

// Importação da instância do cliente Supabase para persistência de dados no Backend-as-a-Service (BaaS)
import { supabase } from "../services/Supabase"

// Definição do tipo Contact estruturado conforme o esquema da tabela no banco de dados relacional PostgreSQL
type Contact = {
  id: string
  Nome: string
  Telefone: string
  created_at: string
}

export default function Contatos() {
  // Estados locais controlados para o armazenamento temporário dos dados do formulário de inserção
  const [Nome, setNome] = useState("")
  const [Telefone, setTelefone] = useState("")
  
  // Estado para armazenar a coleção de registros retornados do banco de dados
  const [contacts, setContacts] = useState<Contact[]>([])
  
  // Flag booleano para gerenciamento do estado de processamento assíncrono (UX)
  const [loading, setLoading] = useState(false)

  // Função assíncrona responsável pela consulta (query) de leitura no banco de dados Supabase
  async function fetchContacts() {
    const { data } = await supabase
      .from("Contatos") // Especificação da tabela alvo
      .select("*")      // Projeção SQL para selecionar todas as colunas
      .order("created_at", { ascending: false }) // Critério de ordenação do registro mais recente para o mais antigo

    // Atribuição dos dados ao estado caso o retorno seja válido
    if (data) setContacts(data)
  }

  // Hook que aciona a carga inicial de dados imediatamente após a montagem do componente na interface
  useEffect(() => {
    fetchContacts()
  }, [])

  // Função assíncrona responsável pelo envio e validação dos dados de um novo contato
  async function addContact() {
    // Cláusula de guarda (guard clause) para impedir submissões com campos vazios
    if (!Nome || !Telefone) return

    setLoading(true) // Ativação do estado de processamento

    // Execução da operação de inserção (INSERT) na tabela do banco remoto
    const { error } = await supabase
      .from("Contatos")
      .insert([{ Nome, Telefone }])

    setLoading(false) // Desativação do estado de processamento

    // Caso a operação ocorra sem erros, os campos do formulário são limpos e a lista é atualizada
    if (!error) {
      setNome("")
      setTelefone("")
      fetchContacts()
    }
  }

  return (
    <View style={styles.container}>
      {/* Configuração da barra de status para exibição de ícones escuros (ideal para fundos claros) */}
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>📇 Contatos</Text>
      <Text style={styles.subtitle}>Gerencie seus contatos com facilidade</Text>

      {/* Container estrutural do formulário de cadastro */}
      <View style={styles.form}>
        <TextInput
          placeholder="Nome"
          value={Nome}
          onChangeText={setNome} // Atualização síncrona do estado conforme digitação do usuário
          style={styles.input}
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="Telefone"
          value={Telefone}
          onChangeText={setTelefone}
          style={styles.input}
          keyboardType="phone-pad" // Configuração do teclado virtual otimizado para inserção numérica de contatos
          placeholderTextColor="#888"
        />

        {/* Componente acionador associado ao método de persistência */}
        <TouchableOpacity style={styles.button} onPress={addContact}>
          <Text style={styles.buttonText}>
            {/* Renderização condicional baseada no estado de carregamento */}
            {loading ? "Salvando..." : "Adicionar Contato"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contador dinâmico baseado na propriedade length do array de contatos */}
      <Text style={styles.count}>Total: {contacts.length}</Text>

      {/* Lista com rolagem e propriedade para ocultar a barra lateral padrão */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Mapeamento do array de contatos para renderização individual de elementos */}
        {contacts.map((item) => (
          <View key={item.id} style={styles.card}>
            {/* Bloco visual do Avatar */}
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {/* Operador de encadeamento opcional (Optional Chaining) para prevenir erros de execução se o nome for nulo */}
                {item.Nome?.[0]?.toUpperCase()}
              </Text>
            </View>

            {/* Container flexível para distribuição das informações textuais */}
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.Nome}</Text>
              <Text style={styles.phone}>{item.Telefone}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

// Definição e agrupamento de estilos para otimização em tempo de execução
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F6F7FB",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    marginTop: 10,
    color: "#111827",
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
  },

  form: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  input: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },

  count: {
    marginTop: 15,
    marginBottom: 10,
    color: "#6B7280",
    fontWeight: "500",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 12, // Borda arredondada suave (estilo quadrado suavizado)
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  phone: {
    color: "#6B7280",
    marginTop: 2,
  },
})