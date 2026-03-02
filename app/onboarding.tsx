import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { useCreateAccount } from '@/hooks/queries';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SLIDES = [
  {
    id: 'welcome',
    icon: 'wallet' as const,
    gradient: ['#4DFFA0', '#22D3EE'] as [string, string],
    title: 'Welcome to Spendy',
    body: 'Your personal finance companion. Track spending, manage accounts, and stay on top of your money.',
  },
  {
    id: 'track',
    icon: 'receipt' as const,
    gradient: ['#5B8AF0', '#A78BFA'] as [string, string],
    title: 'Log every transaction',
    body: 'Quickly add expenses and income. See exactly where your money goes with clear summaries and categories.',
  },
  {
    id: 'habits',
    icon: 'bar-chart' as const,
    gradient: ['#FFB347', '#FF6B6B'] as [string, string],
    title: 'Understand your habits',
    body: 'Monthly trends, upcoming fixed bills, and spending breakdowns — all in one place.',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const createAccount = useCreateAccount();

  const [step, setStep] = useState(0); // 0-2 = slides, 3 = create account
  const [accountName, setAccountName] = useState('');
  const [createError, setCreateError] = useState('');

  const totalSteps = SLIDES.length + 1; // slides + create step

  const goToStep = (next: number) => {
    setStep(next);
    scrollRef.current?.scrollTo({ x: next * SCREEN_WIDTH, animated: true });
  };

  const handleNext = () => {
    if (step < SLIDES.length) {
      goToStep(step + 1);
    }
  };

  const handleCreate = async () => {
    if (!accountName.trim()) return;
    setCreateError('');
    try {
      await createAccount.mutateAsync({ name: accountName.trim() });
      router.replace('/(tabs)');
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const isLastInfoSlide = step === SLIDES.length - 1;
  const isCreateStep = step === SLIDES.length;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar style="light" />

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        style={styles.flex}
      >
        {/* Info slides */}
        {SLIDES.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            <View style={styles.slideContent}>
              <LinearGradient
                colors={slide.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.iconContainer}
              >
                <Ionicons name={slide.icon} size={48} color="#080C16" />
              </LinearGradient>
              <Text style={styles.slideTitle}>{slide.title}</Text>
              <Text style={styles.slideBody}>{slide.body}</Text>
            </View>
          </View>
        ))}

        {/* Create account step */}
        <View style={styles.slide}>
          <View style={styles.slideContent}>
            <View style={styles.createIconContainer}>
              <Ionicons name="add-circle" size={56} color="#4DFFA0" />
            </View>
            <Text style={styles.slideTitle}>Create your first account</Text>
            <Text style={styles.slideBody}>
              An account is a wallet, bank card, or any money pool you want to track.
            </Text>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Account name</Text>
              <TextInput
                style={styles.input}
                value={accountName}
                onChangeText={setAccountName}
                placeholder="e.g. Personal, Cash, Savings…"
                placeholderTextColor="#4A5A7A"
                autoFocus
                returnKeyType="done"
                onSubmitEditing={handleCreate}
              />
            </View>

            {createError !== '' && (
              <Text style={styles.errorText}>{createError}</Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom area */}
      <View style={styles.footer}>
        {/* Dots */}
        <View style={styles.dots}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === step ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* Action button */}
        {isCreateStep ? (
          <TouchableOpacity
            style={[
              styles.button,
              (!accountName.trim() || createAccount.isPending) && styles.buttonDisabled,
            ]}
            onPress={handleCreate}
            disabled={!accountName.trim() || createAccount.isPending}
          >
            {createAccount.isPending ? (
              <ActivityIndicator color="#080C16" />
            ) : (
              <Text style={styles.buttonText}>Get Started</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>
              {isLastInfoSlide ? 'Create Account' : 'Next'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#080C16" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#080C16',
  },
  flex: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  slideContent: {
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 104,
    height: 104,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  createIconContainer: {
    width: 104,
    height: 104,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#0F1522',
    borderWidth: 1,
    borderColor: 'rgba(77,255,160,0.2)',
  },
  slideTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#EEF2FF',
    textAlign: 'center',
  },
  slideBody: {
    fontSize: 15,
    color: '#8896B3',
    textAlign: 'center',
    lineHeight: 22,
  },
  inputWrapper: {
    width: '100%',
    marginTop: 8,
    gap: 6,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#8896B3',
  },
  input: {
    backgroundColor: '#151D2E',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#EEF2FF',
  },
  errorText: {
    fontSize: 13,
    color: '#FF6B6B',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 20,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 20,
    backgroundColor: '#4DFFA0',
  },
  dotInactive: {
    width: 6,
    backgroundColor: '#1C2538',
  },
  button: {
    backgroundColor: '#4DFFA0',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonDisabled: {
    backgroundColor: '#1C2538',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#080C16',
  },
});
