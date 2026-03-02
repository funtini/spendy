import { useSignIn, useSignUp } from '@clerk/clerk-expo';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

type Mode = 'signIn' | 'signUp';

export default function SignInScreen() {
  const { signIn, setActive: setSignInActive, isLoaded: signInLoaded } = useSignIn();
  const { signUp, setActive: setSignUpActive, isLoaded: signUpLoaded } = useSignUp();

  const [mode, setMode] = useState<Mode>('signIn');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const switchMode = (next: Mode) => {
    setMode(next);
    setError('');
    setFirstName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const isFormValid = () => {
    if (mode === 'signIn') return email.trim() !== '' && password !== '';
    return (
      firstName.trim() !== '' &&
      email.trim() !== '' &&
      password !== '' &&
      confirmPassword !== ''
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;
    setError('');
    setLoading(true);

    try {
      if (mode === 'signIn') {
        if (!signInLoaded || !signIn) return;
        const result = await signIn.create({ identifier: email.trim(), password });
        if (result.status === 'complete') {
          await setSignInActive({ session: result.createdSessionId });
        }
      } else {
        if (!signUpLoaded || !signUp) return;
        if (password !== confirmPassword) {
          setError('Passwords do not match.');
          setLoading(false);
          return;
        }
        const result = await signUp.create({
          firstName: firstName.trim(),
          emailAddress: email.trim(),
          password,
        });
        if (result.status === 'complete') {
          await setSignUpActive({ session: result.createdSessionId });
        }
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoArea}>
            <View style={styles.logoMark}>
              <Text style={styles.logoMarkText}>S</Text>
            </View>
            <Text style={styles.appName}>Spendy</Text>
            <Text style={styles.tagline}>Track your finances with ease</Text>
          </View>

          {/* Mode toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.togglePill, mode === 'signIn' && styles.togglePillActive]}
              onPress={() => switchMode('signIn')}
            >
              <Text style={[styles.toggleText, mode === 'signIn' && styles.toggleTextActive]}>
                Sign In
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.togglePill, mode === 'signUp' && styles.togglePillActive]}
              onPress={() => switchMode('signUp')}
            >
              <Text style={[styles.toggleText, mode === 'signUp' && styles.toggleTextActive]}>
                Create Account
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {mode === 'signUp' && (
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>First Name</Text>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholder="Your first name"
                  placeholderTextColor="#4A5A7A"
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              </View>
            )}

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="#4A5A7A"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#4A5A7A"
                secureTextEntry
                returnKeyType={mode === 'signUp' ? 'next' : 'done'}
                onSubmitEditing={mode === 'signIn' ? handleSubmit : undefined}
              />
            </View>

            {mode === 'signUp' && (
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#4A5A7A"
                  secureTextEntry
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />
              </View>
            )}

            {error !== '' && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity
              style={[styles.submitButton, (!isFormValid() || loading) && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={!isFormValid() || loading}
            >
              {loading ? (
                <ActivityIndicator color="#080C16" />
              ) : (
                <Text style={styles.submitText}>
                  {mode === 'signIn' ? 'Sign In' : 'Create Account'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoMark: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#4DFFA0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoMarkText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#080C16',
  },
  appName: {
    fontSize: 32,
    fontWeight: '700',
    color: '#EEF2FF',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 15,
    color: '#8896B3',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#151D2E',
    borderRadius: 12,
    padding: 4,
    marginBottom: 32,
  },
  togglePill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: 'center',
  },
  togglePillActive: {
    backgroundColor: '#1C2538',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A5A7A',
  },
  toggleTextActive: {
    color: '#EEF2FF',
  },
  form: {
    gap: 16,
  },
  inputWrapper: {
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
  submitButton: {
    backgroundColor: '#4DFFA0',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#1C2538',
  },
  submitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#080C16',
  },
});
