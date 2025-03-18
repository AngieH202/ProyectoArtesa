import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

const tasaDeCambio = 24; // Tasa de cambio: 1 USD = 24 Lempiras

const CarritoScreen = () => {
  const { carrito } = useLocalSearchParams();
  const router = useRouter();
  const productos = carrito ? JSON.parse(carrito) : [];
  

  const total = useMemo(() => {
    return productos
      .reduce((acc, item) => acc + item.cantidad * item.precioUSD * tasaDeCambio, 0)
      .toFixed(2);
  }, [productos]);

  const handleCompra = () => {
    router.push('/categories');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Carrito de Compras</Text>
      {productos.length === 0 ? (
        <Text style={styles.emptyText}>El carrito está vacío.</Text>
      ) : (
        <>
          <FlatList
            data={productos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const precioLempiras = (item.cantidad * item.precioUSD * tasaDeCambio).toFixed(2); // Convertir precio a lempiras
              return (
                <View style={styles.item}>
                  <Ionicons name={item.icon} size={30} color={Colors.primary} style={styles.itemIcon} />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.nombre}</Text>
                    <Text style={styles.itemPrice}>{precioLempiras} Lempiras</Text> {/* Mostrar el precio en Lempiras */}
                  </View>
                </View>
              );
            }}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: {total} Lempiras</Text> {/* Mostrar el total en Lempiras */}
            <TouchableOpacity style={styles.buyButton} onPress={handleCompra}>
              <Text style={styles.buyButtonText}>Comprar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 24, 
    backgroundColor: Colors.background 
  },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    textAlign: 'center', 
    color: Colors.primary 
  },
  emptyText: { 
    fontSize: 18, 
    color: 'gray', 
    textAlign: 'center', 
    marginTop: 20 
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  itemIcon: { 
    marginRight: 15 
  },
  itemInfo: { 
    flex: 1 
  },
  itemName: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  itemPrice: { 
    fontSize: 16, 
    color: Colors.primary, 
    marginTop: 5 
  },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    alignItems: 'center',
  },
  totalText: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: Colors.primary 
  },
  buyButton: {
    marginTop: 10,
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buyButtonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});

export default CarritoScreen;
