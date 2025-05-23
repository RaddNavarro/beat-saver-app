import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AUTH } from '../../../db/firebase';
import { onAuthStateChanged, signOut, User } from '@firebase/auth';
import { Props } from '../../../navigation/props';

// Validation schema
const allowanceSchema = Yup.object().shape({
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be positive')
    .min(1, 'Amount must be at least $1')
    .max(10000, 'Amount cannot exceed $10,000'),
});

 const Profile: React.FC<Props> = ({navigation}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [allowanceRequests, setAllowanceRequests] = useState([]);

  onAuthStateChanged(AUTH, (user) => {
    if (user) {
      setUser(user);
    }
  });

  const signOutUser = async () => {
    try {
      const signedOut = await signOut(AUTH);
      if (signedOut !== null) {
        console.log("User signed out!");
        // navigation.navigate("LogIn");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAllowanceRequest = (values) => {
    // Store the request data
    const newRequest = {
      id: Date.now(),
      amount: values.amount,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    
    setAllowanceRequests(prev => [...prev, newRequest]);
    setIsModalVisible(false);
    
    // Show success message
    Alert.alert(
      'Request Submitted',
      `Your request for $${values.amount} has been submitted successfully.`,
      [{ text: 'OK' }]
    );
  };

  const openAllowanceModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#6b7280" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>B</Text>
        </View>
        <Text style={styles.profileName}>Admin</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {/* Request Extra Allowance */}
        <TouchableOpacity style={styles.menuItem} onPress={openAllowanceModal}>
          <View style={styles.menuItemLeft}>
            <View style={[styles.iconContainer, styles.purpleIcon]}>
              <Icon name="attach-money" size={24} color="#ffffff" />
            </View>
            <Text style={styles.menuItemText}>Request Extra Allowance</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#9ca3af" />
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity style={styles.menuItem} onPress={signOutUser}>
          <View style={styles.menuItemLeft}>
            <View style={[styles.iconContainer, styles.grayIcon]}>
              <Icon name="logout" size={24} color="#ffffff" />
            </View>
            <Text style={styles.menuItemText}>Logout</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      {/* Allowance Request Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Request Extra Allowance</Text>
              <TouchableOpacity onPress={closeModal}>
                <Icon name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <Formik
              initialValues={{ amount: '' }}
              validationSchema={allowanceSchema}
              onSubmit={handleAllowanceRequest}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                <View style={styles.formContainer}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Amount ($)</Text>
                    <TextInput
                      style={[
                        styles.textInput,
                        touched.amount && errors.amount ? styles.inputError : null
                      ]}
                      placeholder="Enter amount"
                      value={values.amount}
                      onChangeText={handleChange('amount')}
                      onBlur={handleBlur('amount')}
                      keyboardType="numeric"
                      placeholderTextColor="#9ca3af"
                    />
                    {touched.amount && errors.amount && (
                      <Text style={styles.errorText}>{errors.amount}</Text>
                    )}
                  </View>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={closeModal}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      style={[
                        styles.sendButton,
                        !isValid || !values.amount ? styles.disabledButton : null
                      ]}
                      onPress={handleSubmit}
                      disabled={!isValid || !values.amount}
                    >
                      <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#111827',
  },
  headerSpacer: {
    width: 24,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 48,
    backgroundColor: '#ffffff',
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#e5e7eb',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '600',
    color: '#374151',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '500',
    color: '#111827',
  },
  menuContainer: {
    backgroundColor: '#ffffff',
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  purpleIcon: {
    backgroundColor: '#8b5cf6',
  },
  grayIcon: {
    backgroundColor: '#6b7280',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#ffffff',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
  },
  sendButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
});