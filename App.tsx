import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  const dataList = [
    {
      name: 'Chevrolet Ônix',
      price: 50000,
      category: 'HATCH',
      onSale: true,
    },
    {
      name: 'Honda Civic',
      price: 100000,
      category: 'SEDAN',
      onSale: false,
    },
    {
      name: 'Tiggo 8X',
      price: 160000,
      category: 'SUV',
      onSale: true,
    },
    {
      name: 'Toyota Corolla',
      price: 90000,
      category: 'SEDAN',
      onSale: true,
    },
  ]

  const userName = 'Eduardo'

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, seja bem vindo {userName}</Text>
      <Text style={styles.subtitle}>Confira nossos modelos:</Text>
      
      <View style={styles.list}>
        {dataList.map((car, index) => (
          <View key={index}>
            <Text>{car.name}</Text>
            <Text>Categoria: {car.category}</Text>
            <Text>
              Valor: R$ {car.price.toLocaleString('pt-BR')}
            </Text>
            {car.onSale && (
              <Text style={styles.saleText}>
                Em promoção
              </Text>
            )}
          </View>
        ))}
      </View>
      <StatusBar style="auto" />
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  list: {
   display: 'flex',
   gap: 16,
   alignItems: 'center',
  },
  saleText: {
    color: '#2E8B57',
    fontWeight: 'bold',
  }
});