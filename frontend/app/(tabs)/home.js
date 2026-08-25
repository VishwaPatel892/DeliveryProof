// app/(tabs)/home.js — Green Palette
//
// COLOR ROLES:
//   #EAE7D6  → Screen background (warm off-white)
//   #A4C3A2  → Stat cards (soft green)
//   #5D7B6F  → Header, headings, text, dark stat cards (deep teal-green)
//   #B0D4B8  → Secondary stat card variant (light green)
//   #D7F9FA  → Quick Summary card (light cyan info area)

import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import deliveries from '../../data/deliveries';

// ── Stat Card ────────────────────────────────────────────────────────────────
// dark=true → uses deep teal (#5D7B6F) with white text
// dark=false → uses soft green (#A4C3A2) with deep teal text
function StatCard({ label, count, dark }) {
  return (
    <View style={[styles.statCard, dark && styles.statCardDark]}>
      <Text style={[styles.statCount, dark && styles.statCountDark]}>{count}</Text>
      <Text style={[styles.statLabel, dark && styles.statLabelDark]}>{label}</Text>
    </View>
  );
}

// ── Summary Row ──────────────────────────────────────────────────────────────
function SummaryRow({ label, value }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

// ── Home Screen ──────────────────────────────────────────────────────────────
export default function HomeScreen() {
  // Statistics using .filter() and .length
  const totalCount     = deliveries.length;
  const pendingCount   = deliveries.filter(d => d.status === 'Pending').length;
  const deliveredCount = deliveries.filter(d => d.status === 'Delivered').length;
  const failedCount    = deliveries.filter(d => d.status === 'Failed').length;
  const activeCount    = deliveries.filter(
    d => d.status !== 'Delivered' && d.status !== 'Failed'
  ).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.appName}>DeliveryProof</Text>
          <Text style={styles.greeting}>Good Morning 👋</Text>
          <Text style={styles.partnerLabel}>Delivery Partner</Text>
        </View>

        {/* ── Stats Grid ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Deliveries</Text>
          <View style={styles.statsGrid}>
            <StatCard label="Total"     count={totalCount}     />
            <StatCard label="Active"    count={activeCount}    />
            <StatCard label="Delivered" count={deliveredCount} dark />
            <StatCard label="Failed"    count={failedCount}    dark />
          </View>
        </View>

        {/* ── Quick Summary ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Summary</Text>
          <View style={styles.summaryCard}>
            <SummaryRow label="Pending"      value={pendingCount}               />
            <SummaryRow label="In Progress"  value={activeCount - pendingCount} />
            <SummaryRow label="Delivered"    value={deliveredCount}             />
            <SummaryRow label="Failed"       value={failedCount}                />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EAE7D6',         // Warm off-white background
  },

  // ── Header ──
  header: {
    backgroundColor: '#5D7B6F',         // Deep teal-green
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#EAE7D6',                   // Warm off-white on dark header
    letterSpacing: 1,
    marginBottom: 4,
  },
  greeting: {
    fontSize: 18,
    color: '#EAE7D6',
    marginBottom: 2,
  },
  partnerLabel: {
    fontSize: 13,
    color: '#B0D4B8',                   // Light green on dark header
  },

  // ── Section ──
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5D7B6F',                   // Deep teal-green
    marginBottom: 14,
  },

  // ── Stats Grid ──
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#A4C3A2',         // Soft green
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#5D7B6F',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  statCardDark: {
    backgroundColor: '#5D7B6F',         // Deep teal for Delivered / Failed
  },
  statCount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#5D7B6F',                   // Deep teal number on soft card
    marginBottom: 4,
  },
  statCountDark: {
    color: '#EAE7D6',                   // Off-white number on dark card
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5D7B6F',
  },
  statLabelDark: {
    color: '#B0D4B8',                   // Light green label on dark card
  },

  // ── Summary Card (light cyan info area) ──
  summaryCard: {
    backgroundColor: '#D7F9FA',         // Light cyan
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#5D7B6F',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(93, 123, 111, 0.15)',
  },
  summaryLabel: {
    fontSize: 15,
    color: '#5D7B6F',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D7B6F',
  },
});
