import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Modal, ScrollView, Alert, Pressable, TextInput, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../Profile/profilestyles';
import { Profile, Expense, AllowanceRequest } from '../../../navigation/props';

// Mock Expense Data
const sampleExpenses: Expense[] = [
  { id: '1', category: 'Coffee', description: 'with Fresh Breast', amount: 80, date: 'Friday' },
  { id: '2', category: 'Gift', description: 'for Auditory Cookyload', amount: 1500, date: 'Friday' },
];

const ParentHome = () => {
  // State Management
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [requestModalVisible, setRequestModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);
  const [balanceModalVisible, setBalanceModalVisible] = useState(false);
  const [amountToAdd, setAmountToAdd] = useState('');
  
  const [requests, setRequests] = useState<AllowanceRequest[]>([
    {
      id: 'req1',
      profileId: 'placeholder-id',
      reason: 'Field trip food',
      amount: 300,
      status: 'pending',
    },
    {
      id: 'req2',
      profileId: 'placeholder-id',
      reason: 'School supplies',
      amount: 500,
      status: 'pending',
    },
  ]);

  
  // Profile Management
  const handleAddProfile = useCallback(() => {
    setNewProfileName('');
    setEditingProfileId(null);
    setEditModalVisible(true);
  }, []);

  const confirmAddProfile = useCallback(() => {
    if (!newProfileName.trim()) {
      Alert.alert('Error', 'Please enter a profile name');
      return;
    }

    if (editingProfileId) {
      // Update existing profile
      setProfiles(prev => prev.map(p => 
        p.id === editingProfileId 
          ? { ...p, name: newProfileName.trim() } 
          : p
      ));
      setSelectedProfile(prev => 
        prev?.id === editingProfileId 
          ? { ...prev, name: newProfileName.trim() } 
          : prev
      );
    } else {
      // Create new profile
      const newProfile: Profile = {
      id: Math.random().toString(36).substring(2, 9),
      name: newProfileName.trim(),
      image: 'https://wallpapers.com/images/hd/placeholder-profile-icon-20tehfawxt5eihco.jpg',
      balance: 0,
      };
      setProfiles(prev => [...prev, newProfile]);
      setSelectedProfile(newProfile);
      //temporary
      setRequests(prev => prev.map(r =>
      r.profileId === 'placeholder-id' ? { ...r, profileId: newProfile.id } : r
    ));
    }
    setEditModalVisible(false);
  }, [newProfileName, editingProfileId]);

  const handleRemoveProfile = useCallback((profileId: string) => {
    if (profiles.length <= 1) {
      Alert.alert('Error', 'You must keep at least one profile');
      return;
    }

    Alert.alert('Delete Profile', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setProfiles(prev => {
            const updated = prev.filter(p => p.id !== profileId);
            if (selectedProfile?.id === profileId) {
              setSelectedProfile(updated[0] || null);
            }
            return updated;
          });
        },
      },
    ]);
  }, [profiles.length, selectedProfile]);

  const handleRenameProfile = useCallback((profile: Profile) => {
    setNewProfileName(profile.name);
    setEditingProfileId(profile.id);
    setEditModalVisible(true);
  }, []);

  // Balance Management
  const handleAddBalance = useCallback(() => {
  setAmountToAdd('');
  setBalanceModalVisible(true);
  }, []);

  // Render Functions
  const renderExpenseItem = useCallback(({ item }: { item: Expense }) => (
    <View key={`expense-${item.id}`} style={styles.expenseItem}>
      <View style={styles.expenseCategoryIcon}>
        <Text style={styles.expenseCategoryText}>{item.category.charAt(0)}</Text>
      </View>
      <View style={styles.expenseDetails}>
        <Text style={styles.expenseCategory}>{item.category}</Text>
        <Text style={styles.expenseDescription}>{item.description}</Text>
      </View>
      <Text style={styles.expenseAmount}>₱{item.amount.toLocaleString('en-PH')}</Text>
    </View>
  ), []);

  const renderProfileItem = useCallback((profile: Profile) => (
    <View key={`profile-${profile.id}`} style={styles.profileItemContainer}>
      <TouchableOpacity 
        style={styles.profileItem}
        onPress={() => {
          setSelectedProfile(profile);
          setModalVisible(false);
        }}
      >
        <Image source={{ uri: profile.image }} style={styles.modalProfileImage} />
        <Text style={styles.profileName}>{profile.name}</Text>
      </TouchableOpacity>
      <View style={styles.profileActions}>
        <TouchableOpacity onPress={() => handleRenameProfile(profile)}>
          <Text style={styles.editButtonText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRemoveProfile(profile.id)}>
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  ), [handleRemoveProfile, handleRenameProfile]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {selectedProfile?.name || 'No Profile Selected'}
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image 
            source={{ uri: selectedProfile?.image || 'https://wallpapers.com/images/hd/placeholder-profile-icon-20tehfawxt5eihco.jpg' }} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
      </View>

      {/* Profile Selection Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Manage Profiles</Text>
            <ScrollView>
              {profiles.map(profile => (
                <React.Fragment key={`profile-fragment-${profile.id}`}>
                  {renderProfileItem(profile)}
                </React.Fragment>
              ))}
            </ScrollView>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={handleAddProfile}
            >
              <Text style={styles.addButtonText}>+ Add New Profile</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal
        visible={editModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setEditModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setEditModalVisible(false)}>
          <Pressable style={styles.editModalContainer}>
            <Text style={styles.modalTitle}>
              {editingProfileId ? 'Rename Profile' : 'Create Profile'}
            </Text>
            <TextInput
              style={styles.editInput}
              value={newProfileName}
              onChangeText={setNewProfileName}
              placeholder="Enter profile name"
              placeholderTextColor="#999"
              autoFocus
              maxLength={20}
            />
            <View style={styles.editButtonRow}>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.saveButton} 
                onPress={confirmAddProfile}
              >
                <Text style={styles.saveButtonText}>
                  {editingProfileId ? 'Save' : 'Create'}
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Balance Card */}
      {selectedProfile ? (
        <View style={styles.balanceCard}>
          <View style={styles.balanceTextGroup}>
            <Text style={styles.balanceAmount}>
              ₱{selectedProfile.balance.toLocaleString('en-PH')}
            </Text>
            <Text style={styles.balanceCurrency}>PHP</Text>
          </View>
          <View style={styles.balanceActions}>
            <TouchableOpacity 
              style={styles.notificationButton}
              onPress={() => setRequestModalVisible(true)}
            >
              <Text style={styles.notificationBadge}>
                {requests.filter(r => r.status === 'pending').length}
              </Text>
              <Text style={styles.notificationIcon}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.addBalanceButton}
              onPress={handleAddBalance}
            >
              <Text style={styles.addBalanceText}>+ Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No teen profiles yet</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddProfile}
          >
            <Text style={styles.addButtonText}>+ Create First Profile</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Adding Balance Section*/}
      <Modal
        visible={balanceModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setBalanceModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setBalanceModalVisible(false)}>
          <Pressable style={styles.editModalContainer}>
            <Text style={styles.modalTitle}>Add Allowance</Text>
            <Text style={styles.modalSubtitle}>
              Enter amount to add to {selectedProfile?.name}'s balance
            </Text>
            <TextInput
              style={styles.editInput}
              placeholder="Enter amount"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={amountToAdd}
              onChangeText={setAmountToAdd}
              autoFocus
            />
            <View style={styles.editButtonRow}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setBalanceModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                  const amountNum = parseFloat(amountToAdd);
                  if (isNaN(amountNum) || amountNum <= 0) {
                    Alert.alert('Invalid input', 'Please enter a valid number');
                    return;
                  }
                  setProfiles(prev =>
                    prev.map(p =>
                      p.id === selectedProfile?.id
                        ? { ...p, balance: p.balance + amountNum }
                        : p
                    )
                  );
                  setSelectedProfile(prev =>
                    prev ? { ...prev, balance: prev.balance + amountNum } : prev
                  );
                  setBalanceModalVisible(false);
                }}
              >
                <Text style={styles.saveButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
      {/* Request Allowance Section */}
      <Modal
        visible={requestModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setRequestModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setRequestModalVisible(false)}>
          <Pressable style={styles.editModalContainer}>
            <Text style={styles.modalTitle}>Allowance Requests</Text>
            <ScrollView style={{ maxHeight: 300 }}>
              {requests.filter(r => r.profileId === selectedProfile?.id).length === 0 ? (
                <Text style={styles.emptyText}>No requests</Text>
              ) : (
                requests
                  .filter(r => r.profileId === selectedProfile?.id)
                  .map(r => (
                    <View key={r.id} style={styles.requestItem}>
                      <Text style={styles.requestText}>
                        {r.reason} — ₱{r.amount}
                      </Text>
                      <View style={styles.requestActions}>
                        {r.status === 'pending' ? (
                          <>
                            <TouchableOpacity
                              style={styles.approveButton}
                              onPress={() => {
                                setRequests(prev =>
                                  prev.map(req =>
                                    req.id === r.id ? { ...req, status: 'approved' } : req
                                  )
                                );
                                setProfiles(prev =>
                                  prev.map(p =>
                                    p.id === selectedProfile?.id
                                      ? { ...p, balance: p.balance + r.amount }
                                      : p
                                  )
                                );
                                setSelectedProfile(prev =>
                                  prev ? { ...prev, balance: prev.balance + r.amount } : prev
                                );
                              }}
                            >
                              <Text style={styles.approveButtonText}>✔</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={styles.denyButton}
                              onPress={() => {
                                setRequests(prev =>
                                  prev.map(req =>
                                    req.id === r.id ? { ...req, status: 'denied' } : req
                                  )
                                );
                              }}
                            >
                              <Text style={styles.denyButtonText}>✖</Text>
                            </TouchableOpacity>
                          </>
                        ) : (
                          <Text style={styles.requestStatusText}>{r.status.toUpperCase()}</Text>
                        )}
                      </View>
                    </View>
                  ))
              )}
            </ScrollView>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setRequestModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Close</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
      {/* Expenses Section */}
      {selectedProfile && (
        <>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Expenses</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllButton}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={sampleExpenses}
            renderItem={renderExpenseItem}
            keyExtractor={item => `expense-${item.id}`}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default ParentHome;