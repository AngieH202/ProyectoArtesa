import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../contexts/ThemeContext';
import { Colors } from '../../constants/Colors';

const categorias = [
  {
    id: '1',
    nombre: 'Comida',
    icon: 'fast-food-outline',
    items: [
      { id: '1.1', nombre: 'Miel Artesanal', cantidad: 5, icon: 'ice-cream-outline', precioUSD: 2.5 },
      { id: '1.2', nombre: 'Pizza Casera', cantidad: 10, icon: 'pizza-outline', precioUSD: 4.0 },
    ],
  },
  {
    id: '2',
    nombre: 'Artesanales',
    icon: 'basket-outline',
    items: [
      { id: '2.1', nombre: 'Tejidos a Mano', cantidad: 20, icon: 'shirt-outline', precioUSD: 15.0 },
      { id: '2.2', nombre: 'Cesta Tejida', cantidad: 15, icon: 'basket-outline', precioUSD: 8.0 },
    ],
  },
];

const tasaDeCambio = 24;

const CategoriasScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const containerStyle = theme === 'light' ? styles.containerLight : styles.containerDark;
  const titleStyle = theme === 'light' ? styles.titleLight : styles.titleDark;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.headerContainer}>
        <Ionicons name="storefront-outline" size={40} color={Colors.primary} style={styles.iconStore} />
        <Text style={[styles.title, titleStyle]}>Categorías</Text>
        <TouchableOpacity onPress={() => router.push({ pathname: '/carrito', params: { carrito: JSON.stringify(carrito) } })}>
          <Ionicons name="cart-outline" size={32} color={Colors.primary} />
          {carrito.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{carrito.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryContainer}>
            <View style={styles.itemHeader}>
              <Ionicons name={item.icon} size={24} color="#4A90E2" />
              <Text style={styles.itemCategory}>{item.nombre}</Text>
            </View>
            <FlatList
              data={item.items}
              keyExtractor={(subItem) => subItem.id}
              renderItem={({ item: subItem }) => {
                const precioLempiras = (subItem.precioUSD * tasaDeCambio).toFixed(2);
                return (
                  <View style={styles.item}>
                    <View style={styles.infoRow}>
                      <Ionicons name={subItem.icon} size={20} color="#666" />
                      <Text style={styles.itemTitle}>{subItem.nombre}</Text>
                    </View>
                    <Text style={styles.itemQuantity}>{subItem.cantidad} disponibles</Text>
                    <Text style={styles.itemPrice}>${precioLempiras}</Text> 
                    <TouchableOpacity 
                      style={styles.addButton}
                      onPress={() => agregarAlCarrito(subItem)}
                    >
                      <Text style={styles.addButtonText}>Agregar al carrito</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        )}
      />

      <TouchableOpacity 
        style={styles.goHomeButton} 
        onPress={() => router.push('/home')}
      >
        <Ionicons name="arrow-back-circle" size={40} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconStore: {
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#444',
  },
  itemPrice: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  goHomeButton: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -20 }],
  },

  // Estilos para el tema claro
  containerLight: {
    backgroundColor: Colors.background,
  },
  titleLight: {
    color: Colors.primary, 
  },

  // Estilos para el tema oscuro
  containerDark: {
    backgroundColor: Colors.black,
  },
  titleDark: {
    color: Colors.white,
  },
});

export default CategoriasScreen;
