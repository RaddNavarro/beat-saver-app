import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';

export default function NumPadAdder() {
  const [currentInput, setCurrentInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Food');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [description, setDescription] = useState('');
  
  // Predefined categories
  const categories = ['Food', 'Transportation', 'School', 'Personal'];

  const handleNumber = (num) => {
    setCurrentInput(currentInput + num);
  };

  const handleSubmit = () => {
    if (currentInput === '') return;
    
    const value = parseFloat(currentInput);
    if (!isNaN(value)) {
      // Clear the current input and description
      setCurrentInput('');
      setDescription('');
    }
  };

  const handleDecimal = () => {
    if (!currentInput.includes('.')) {
      setCurrentInput(currentInput === '' ? '0.' : currentInput + '.');
    }
  };

  const handleDelete = () => {
    if (currentInput.length > 0) {
      setCurrentInput(currentInput.slice(0, -1));
    }
  };

  const handleClear = () => {
    setCurrentInput('');
  };

  const handleClearAll = () => {
    setCurrentInput('');
    setDescription('');
  };

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  const renderButton = (text, onPress, buttonStyle = {}, textStyle = {}) => (
    <TouchableOpacity 
      style={[styles.button, buttonStyle]} 
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Current Input Display */}
      <View style={styles.inputDisplay}>
        <Text style={styles.inputText}>
          {currentInput ? formatCurrency(parseFloat(currentInput) || 0) : '$0.00'}
        </Text>
      </View>

      {/* Category Selection Dropdown */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryLabel}>Category:</Text>
        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={toggleCategoryDropdown}
        >
          <Text style={styles.dropdownButtonText}>{selectedCategory}</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
        
        {/* Dropdown Modal */}
        <Modal
          transparent={true}
          visible={showCategoryDropdown}
          animationType="fade"
          onRequestClose={() => setShowCategoryDropdown(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowCategoryDropdown(false)}>
            <View style={styles.modalOverlay}>
              <View 
                style={[
                  styles.dropdownList,
                  { top: 190 } // Position the dropdown below the button
                ]}
              >
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.dropdownItem,
                      selectedCategory === category && styles.dropdownItemSelected
                    ]}
                    onPress={() => selectCategory(category)}
                  >
                    <Text 
                      style={[
                        styles.dropdownItemText,
                        selectedCategory === category && styles.dropdownItemTextSelected
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>

      {/* Description Input */}
      <View style={styles.descriptionContainer}>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Enter description (optional)"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor="#adb5bd"
        />
      </View>

      <View style={styles.actionsRow}>
        {/* Clear All Button */}
        <TouchableOpacity 
          style={styles.clearAllButton} 
          onPress={handleClearAll}
          activeOpacity={0.7}
        >
          <Text style={styles.clearAllButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      
      {/* Number Pad */}
      <View style={styles.keypadContainer}>
        <View style={styles.row}>
          {renderButton('7', () => handleNumber('7'))}
          {renderButton('8', () => handleNumber('8'))}
          {renderButton('9', () => handleNumber('9'))}
        </View>
        <View style={styles.row}>
          {renderButton('4', () => handleNumber('4'))}
          {renderButton('5', () => handleNumber('5'))}
          {renderButton('6', () => handleNumber('6'))}
        </View>
        <View style={styles.row}>
          {renderButton('1', () => handleNumber('1'))}
          {renderButton('2', () => handleNumber('2'))}
          {renderButton('3', () => handleNumber('3'))}
        </View>
        <View style={styles.row}>
          {renderButton('.', handleDecimal)}
          {renderButton('0', () => handleNumber('0'))}
          {renderButton('⌫', handleDelete, styles.deleteButton, styles.deleteButtonText)}
        </View>
        <View style={styles.row}>
          {renderButton('Clear', handleClear, styles.clearButton)}
          {renderButton('Add', handleSubmit, styles.addButton, styles.addButtonText)}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  inputDisplay: {
    padding: 10,
    backgroundColor: '#343a40',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    margin: 10,
    height: 50,
  },
  inputText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '400',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  descriptionContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  descriptionInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    fontSize: 16,
    color: '#212529',
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginRight: 10,
    color: '#212529',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ced4da',
    flex: 1,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#212529',
  },
  dropdownIcon: {
    fontSize: 12,
    color: '#6c757d',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownList: {
    position: 'absolute',
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ced4da',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  dropdownItemSelected: {
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#212529',
  },
  dropdownItemTextSelected: {
    color: '#8a2be2',
    fontWeight: '500',
  },
  actionsRow: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  clearAllButton: {
    backgroundColor: '#e9ecef',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  clearAllButtonText: {
    color: '#dc3545',
    fontWeight: '500',
    fontSize: 14,
  },
  keypadContainer: {
    padding: 5,
    flex: 1, // Take up remaining space
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  button: {
    backgroundColor: 'white',
    flex: 1,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#212529',
  },
  deleteButton: {
    backgroundColor: '#e9ecef',
  },
  deleteButtonText: {
    color: '#dc3545',
  },
  clearButton: {
    backgroundColor: '#e9ecef',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#8a2be2', // Purple color similar to the image
    flex: 1,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});