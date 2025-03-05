import React from 'react';
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
      { id: '1.1', nombre: 'Miel Artesanal', cantidad: 5, icon: 'ice-cream-outline' },
      { id: '1.2', nombre: 'Pizza Casera', cantidad: 10, icon: 'pizza-outline' },
    ],
  },
  {
    id: '2',
    nombre: 'Artesanales',
    icon: 'basket-outline',
    items: [
      { id: '2.1', nombre: 'Tejidos a Mano', cantidad: 20, icon: 'shirt-outline' },
      { id: '2.2', nombre: 'Cesta Tejida', cantidad: 15, icon: 'basket-outline' },
    ],
  },
  {
    id: '3',
    nombre: 'Arte',
    icon: 'brush-outline',
    items: [
      { id: '3.1', nombre: 'Cuadro Pintado', cantidad: 8, icon: 'image-outline' },
    ],
  },
];

const CategoriasScreen: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();

  const containerStyle = theme === 'light' ? styles.containerLight : styles.containerDark;
  const titleStyle = theme === 'light' ? styles.titleLight : styles.titleDark;

  return (
    <View style={[styles.container, containerStyle]}>
      {
        
      }
      <View style={styles.headerContainer}>
        {

        }
        <Ionicons name="storefront-outline" size={40} color={Colors.primary} style={styles.iconStore} />

        {

        }
        <Text style={[styles.title, titleStyle]}>Categorías</Text>
      </View>

      {

      }
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
              renderItem={({ item: subItem }) => (
                <TouchableOpacity 
                  style={styles.item}
                  onPress={() => router.push({ pathname: `../item/${subItem.id}`, params: subItem })}
                >
                  <View style={styles.infoRow}>
                    <Ionicons name={subItem.icon} size={20} color="#666" />
                    <Text style={styles.itemTitle}>{subItem.nombre}</Text>
                  </View>

                  <View style={styles.infoRow}>
                    <Ionicons name="layers-outline" size={20} color="#666" />
                    <Text style={styles.itemQuantity}>{subItem.cantidad} disponibles</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      />

      {

      }
      <TouchableOpacity style={[styles.addButton, theme === 'light' ? styles.addButtonLight : styles.addButtonDark]} onPress={() => router.push('/(protected)/home')}>
        <Text style={[styles.addButtonText, theme === 'light' ? styles.addButtonTextLight : styles.addButtonTextDark]}>Ir a Inicio</Text>
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
    justifyContent: 'center',  
    alignItems: 'center',     
    marginBottom: 20,
  },
  iconStore: {
    marginRight: 10,  
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
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
  categoryContainer: {
    marginBottom: 20,
  },
  item: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#444',
    fontWeight: 'bold',
    marginLeft: 8,
  },

  
  addButton: {
    backgroundColor: Colors.primary, 
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',  
    marginVertical: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  containerLight: {
    backgroundColor: Colors.background,
  },
  titleLight: {
    color: Colors.primary, 
  },
  addButtonLight: {
    backgroundColor: Colors.secondary, 
  },
  addButtonTextLight: {
    color: Colors.white, 
  },

  containerDark: {
    backgroundColor: Colors.black,
  },
  titleDark: {
    color: Colors.white,
  },
  addButtonDark: {
    backgroundColor: Colors.accent,
  },
  addButtonTextDark: {
    color: Colors.white,
  },
});

export default CategoriasScreen;

