import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useFontFamily } from '@/hooks/useFontFamily';
import { useThemeColors } from '@/hooks/useThemeColors';

interface UpcomingItem {
  name: string;
  date: string;
  amount: number;
}

const UPCOMING: UpcomingItem[] = [
  { name: 'Netflix', date: 'Mar 1', amount: 15.99 },
  { name: 'EDP Energy', date: 'Mar 5', amount: 64.0 },
  { name: 'Metro Card', date: 'Mar 10', amount: 30.0 },
  { name: 'Spotify', date: 'Mar 12', amount: 9.99 },
  { name: 'Internet', date: 'Mar 15', amount: 39.99 },
];

const VISIBLE_COUNT = 3;
const AMBER = '#D4760E';
const AMBER_L = '#FEF3E2';
const AMBER_BORDER = 'rgba(212,118,14,0.22)';
const AMBER_ROW_BORDER = 'rgba(212,118,14,0.1)';
const SPRING = { friction: 9, tension: 55 } as const;

interface RowProps {
  item: UpcomingItem;
  isLast: boolean;
  ff: ReturnType<typeof useFontFamily>;
  colors: ReturnType<typeof useThemeColors>;
}

const UpcomingRow = ({ item, isLast, ff, colors }: RowProps) => (
  <View style={[styles.row, !isLast && { borderBottomWidth: 1, borderBottomColor: AMBER_ROW_BORDER }]}>
    <View style={styles.rowLeft}>
      <View style={[styles.dot, { backgroundColor: AMBER }]} />
      <Text style={[styles.name, { color: colors.textSecondary, fontFamily: ff.body }]}>
        {item.name}
      </Text>
      <Text style={[styles.date, { color: colors.textTertiary, fontFamily: ff.body }]}>
        · {item.date}
      </Text>
    </View>
    <Text style={[styles.amount, { color: AMBER, fontFamily: ff.mono }]}>
      €{item.amount.toFixed(2)}
    </Text>
  </View>
);

export const UpcomingExpenses: React.FC = () => {
  const colors = useThemeColors();
  const ff = useFontFamily();

  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [extraHeight, setExtraHeight] = useState(0);

  const animatedHeight = useRef(new Animated.Value(0)).current;
  const animatedRotation = useRef(new Animated.Value(0)).current;

  const visible = UPCOMING.slice(0, VISIBLE_COUNT);
  const extra = UPCOMING.slice(VISIBLE_COUNT);
  const hasMore = extra.length > 0;

  const toggle = useCallback(() => {
    const toExpanded = !expanded;
    Animated.spring(animatedHeight, {
      toValue: toExpanded ? extraHeight : 0,
      useNativeDriver: false,
      overshootClamping: true,
      ...SPRING,
    }).start();
    Animated.spring(animatedRotation, {
      toValue: toExpanded ? 1 : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 60,
    }).start();
    setExpanded(toExpanded);
  }, [expanded, extraHeight, animatedHeight, animatedRotation]);

  const chevronRotate = animatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  if (dismissed) return null;

  return (
    <View style={[styles.card, { backgroundColor: AMBER_L, borderColor: AMBER_BORDER }]}>
      {/* Dismiss */}
      <TouchableOpacity style={styles.closeBtn} onPress={() => setDismissed(true)}>
        <Text style={[styles.closeBtnText, { color: AMBER }]}>✕</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: AMBER, fontFamily: ff.heading }]}>
          🗓 Upcoming next month
        </Text>
      </View>

      {/* Always-visible rows */}
      {visible.map((item, index) => (
        <UpcomingRow
          key={index}
          item={item}
          isLast={index === visible.length - 1 && !(hasMore && expanded)}
          ff={ff}
          colors={colors}
        />
      ))}

      {/* Accordion — extra rows */}
      {hasMore && (
        <>
          {/* Hidden measurement view — position absolute so it doesn't affect flow */}
          <View
            style={styles.measureView}
            pointerEvents="none"
            onLayout={(e) => {
              const h = e.nativeEvent.layout.height;
              if (h > 0) setExtraHeight(h);
            }}
          >
            {extra.map((item, index) => (
              <UpcomingRow
                key={VISIBLE_COUNT + index}
                item={item}
                isLast={index === extra.length - 1}
                ff={ff}
                colors={colors}
              />
            ))}
          </View>

          {/* Animated clipping container */}
          <Animated.View style={{ height: animatedHeight, overflow: 'hidden' }}>
            {extra.map((item, index) => (
              <UpcomingRow
                key={VISIBLE_COUNT + index}
                item={item}
                isLast={index === extra.length - 1}
                ff={ff}
                colors={colors}
              />
            ))}
          </Animated.View>

          {/* Show all / Show less toggle */}
          <TouchableOpacity style={styles.toggleBtn} onPress={toggle} activeOpacity={0.7}>
            <Text style={[styles.toggleText, { color: AMBER, fontFamily: ff.bodyMedium }]}>
              {expanded ? 'Show less' : `Show ${extra.length} more`}
            </Text>
            <Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
              <Ionicons name="chevron-down" size={13} color={AMBER} />
            </Animated.View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1.5,
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(212,118,14,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
  header: {
    marginBottom: 10,
    paddingRight: 24,
  },
  title: {
    fontSize: 13,
    letterSpacing: 0.2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 7,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 8,
  },
  name: {
    fontSize: 12,
  },
  date: {
    fontSize: 10,
    marginLeft: 4,
  },
  amount: {
    fontSize: 12,
    fontWeight: '500',
  },
  measureView: {
    position: 'absolute',
    left: 14,
    right: 14,
    opacity: 0,
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingTop: 8,
    marginTop: 2,
    borderTopWidth: 1,
    borderTopColor: AMBER_ROW_BORDER,
  },
  toggleText: {
    fontSize: 11,
  },
});
