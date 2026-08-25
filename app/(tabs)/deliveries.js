// app/(tabs)/deliveries.js — Green Palette
//
// PART 3 — SEARCH & FILTER DELIVERIES
//
// What's new in Part 3:
// - Search Bar input to filter deliveries dynamically by text.
// - Status Filter buttons (chips) below the search bar to filter by status.
// - Filter logic combining both text search AND status filter.
// - Clear button to reset filters when they are active.
// - Dynamic delivery count displayed above the list.
// - Custom Empty State for search results.

import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, Alert, SafeAreaView, StyleSheet } from 'react-native';
import deliveries from '../../data/deliveries';
import DeliveryCard from '../../components/DeliveryCard';

// ── Available Status Filter Options ──────────────────────────────────────────
const STATUS_OPTIONS = [
  'All',
  'Pending',
  'Picked Up',
  'On the Way',
  'Arrived',
  'Delivered',
  'Failed'
];

export default function DeliveriesScreen() {
  // ── 1. useState Hooks ──
  // searchText: stores the current text typed into the Search input
  // selectedStatus: stores the currently selected status filter (default: 'All')
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // ── 2. Filter Logic ──
  // We filter the original list by checking BOTH text search and status filter.
  const filteredDeliveries = deliveries.filter((item) => {
    // A. Search by Order ID, customerName, area, address (Case-insensitive)
    const searchLower = searchText.toLowerCase().trim();
    const matchesSearch = 
      item.orderId.toLowerCase().includes(searchLower) ||
      item.customerName.toLowerCase().includes(searchLower) ||
      item.area.toLowerCase().includes(searchLower) ||
      item.address.toLowerCase().includes(searchLower);

    // B. Filter by Status
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;

    // Both conditions must be met
    return matchesSearch && matchesStatus;
  });

  // ── 3. Helper Flags ──
  // Checks if the user has typed anything or selected a status filter
  const isFilterActive = searchText !== '' || selectedStatus !== 'All';

  // ── 4. Clear Filters Handler ──
  // Resets search input and resets status to 'All'
  const handleClearFilters = () => {
    setSearchText('');
    setSelectedStatus('All');
  };

  // ── 5. Delivery Count Label Helper ──
  const getCountText = () => {
    const count = filteredDeliveries.length;
    if (count === 1) return '1 Delivery';
    return `${count} Deliveries`;
  };

  // ── 6. Dynamic Empty State Component ──
  // Displays custom message depending on whether search/filter is active or not
  const renderEmptyComponent = () => {
    if (isFilterActive) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyTitle}>No deliveries found</Text>
          <Text style={styles.emptySubtitle}>
            Try changing your search or filter.
          </Text>
          <Pressable style={styles.clearButton} onPress={handleClearFilters}>
            <Text style={styles.clearButtonText}>Reset Filters</Text>
          </Pressable>
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📭</Text>
        <Text style={styles.emptyTitle}>No deliveries found</Text>
        <Text style={styles.emptySubtitle}>
          Your assigned deliveries will appear here.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* ── Screen Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Deliveries</Text>
      </View>

      {/* ── Search & Filter Controls Container ── */}
      <View style={styles.controlsContainer}>
        
        {/* ── Search Bar Input ── */}
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search deliveries..."
            placeholderTextColor="#8C9A8E"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* ── Status Filter Chips (Wrapped Grid) ── */}
        <View style={styles.filterWrapper}>
          {STATUS_OPTIONS.map((status) => {
            const isSelected = selectedStatus === status;
            return (
              <Pressable
                key={status}
                style={[
                  styles.filterChip,
                  isSelected ? styles.filterChipSelected : styles.filterChipUnselected,
                ]}
                onPress={() => setSelectedStatus(status)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    isSelected ? styles.filterChipTextSelected : styles.filterChipTextUnselected,
                  ]}
                >
                  {status}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* ── Clear Filters & Count Header ── */}
        <View style={styles.summaryBar}>
          <Text style={styles.countText}>{getCountText()}</Text>
          {isFilterActive && (
            <Pressable style={styles.clearLink} onPress={handleClearFilters}>
              <Text style={styles.clearLinkText}>CLEAR</Text>
            </Pressable>
          )}
        </View>

      </View>

      {/* ── FlatList List of Cards ── */}
      <FlatList
        data={filteredDeliveries}
        renderItem={({ item }) => (
          <DeliveryCard
            delivery={item}
            onPress={() => {
              Alert.alert('Delivery', `${item.orderId} selected`);
            }}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAE7D6',         // Warm Off-White
  },

  // ── Header ──
  header: {
    backgroundColor: '#5D7B6F',         // Deep Teal-Green
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#EAE7D6',                   // Off-white
  },

  // ── Search & Filter Panel ──
  controlsContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: '#B0D4B8',             // Light Green border
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#5D7B6F',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#5D7B6F',                   // Deep Teal-Green input text
    height: '100%',
  },

  // Wrapped Filter Chips Container
  filterWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  filterChipUnselected: {
    backgroundColor: '#A4C3A2',         // Secondary Green
    borderColor: '#A4C3A2',
  },
  filterChipSelected: {
    backgroundColor: '#5D7B6F',         // Primary / Dark Green
    borderColor: '#5D7B6F',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  filterChipTextUnselected: {
    color: '#5D7B6F',                   // Teal-green text on soft green chip
  },
  filterChipTextSelected: {
    color: '#EAE7D6',                   // Off-white text on dark chip
  },

  // Results bar (count + clear link)
  summaryBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(93, 123, 111, 0.1)',
  },
  countText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5D7B6F',
  },
  clearLink: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  clearLinkText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#5D7B6F',
    textDecorationLine: 'underline',
  },

  // ── List Area ──
  listContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },

  // ── Empty State ──
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D7B6F',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 15,
    color: '#5D7B6F',
    textAlign: 'center',
    lineHeight: 22,
    opacity: 0.7,
    marginBottom: 16,
  },
  clearButton: {
    backgroundColor: '#5D7B6F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#EAE7D6',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
